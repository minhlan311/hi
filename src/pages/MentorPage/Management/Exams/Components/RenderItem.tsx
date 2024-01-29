import questionApi from '@/apis/question.api'
import { localAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TagCustom from '@/components/TagCustom/TagCustom'
import { AppContext } from '@/contexts/app.context'
import { QuestionState } from '@/interface/question'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Popconfirm, Row, Space } from 'antd'
import { useContext, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import css from './RenderIten.module.scss'

type Props = {
  type: 'questionsSelected' | 'questionsBank' | string
  data: QuestionState
  typeQuestion?: 'TEST' | 'QUIZ'
  setQuestionUpdate?: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderItem = (props: Props) => {
  const { type, data, typeQuestion, setQuestionUpdate, setOpen } = props
  const { questionList, profile, setQuestionList } = useContext(AppContext)
  const { id } = useParams()
  const [isHover, setIsHover] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: string) => questionApi.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] })
      openNotification({ status: 'success', message: 'Xóa câu hỏi thành công' })
    },
    onError: () => {
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    },
  })

  if (data) {
    const questionDetail = questionList && questionList.find((item) => item._id === id)
    const check = questionDetail?.data.includes(data._id)

    return (
      <div className={css.qItem}>
        {typeQuestion !== 'TEST' && (
          <div
            className={`${data.status === 'INACTIVE' && css.disable} ${check ? css.unSave : css.save}`}
            onClick={() => {
              localAction('questionsList', { _id: id, data: [data._id] }, 'updateSwitch', null, 'data', setQuestionList)
              queryClient.cancelQueries({ queryKey: ['questionList'], exact: true })
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <Space direction='vertical' align='center' className={'p-center sp100'}>
              {data.status === 'INACTIVE' && <MdOutlineDisabledVisible className={css.iconDisable} />}
              <h3>
                {data.status === 'INACTIVE' ? 'Câu hỏi đang được ẩn' : check ? 'Xóa khỏi bộ đề' : 'Thêm vào bộ đề'}
              </h3>
            </Space>
            <div className={css.iconCheck}>
              {isHover && check ? (
                <RiCloseCircleFill className={css.unCheck} />
              ) : (
                check && (
                  <b className={css.check}>
                    {questionDetail && questionDetail.data.findIndex((val) => val === data._id) + 1}
                  </b>
                )
              )}
            </div>
          </div>
        )}

        <Card size='small' hoverable>
          <Space direction='vertical' className={'sp100'}>
            <Row justify='space-between' align='middle'>
              <Col span={18} md={19}>
                <Space>
                  {/* <h3>Câu {id + 1}: </h3> */}
                  <TagCustom content={data.type as unknown as string} />
                  <TagCustom color='gold' content={`${data.point} Điểm`} />
                  <TagCustom
                    intArrType={['EASY', 'MEDIUM', 'DIFFICULT']}
                    intColor={['green', 'blue', 'red']}
                    intAlternativeType={['Dễ', 'Vừa phải', 'Khó']}
                    content={data.difficulty}
                  />
                </Space>
              </Col>
              {profile._id === data.createdById && (
                <Col className={css.buttAction}>
                  <Space size='small'>
                    {typeQuestion !== 'TEST' && (
                      <ButtonCustom
                        shape='circle'
                        type='text'
                        icon={<AiOutlineEdit size={22} />}
                        size='small'
                        onClick={() => {
                          setQuestionUpdate && setQuestionUpdate(data)
                          setOpen && setOpen(true)
                        }}
                      ></ButtonCustom>
                    )}
                    <Popconfirm
                      placement='right'
                      title='Bạn có muốn xóa câu hỏi này?'
                      onConfirm={() => mutate(data._id)}
                      okText='Xóa'
                      cancelText='Hủy'
                    >
                      <ButtonCustom
                        shape='circle'
                        type='text'
                        icon={<AiOutlineDelete size={22} />}
                        size='small'
                        danger
                      ></ButtonCustom>
                    </Popconfirm>
                  </Space>
                </Col>
              )}
            </Row>

            <h4 dangerouslySetInnerHTML={{ __html: data.question }}></h4>
            {data.type !== 'LIKERT SCALE' && data.type !== 'MATCHING' && (
              <Card size='small' className={css.anws}>
                <Row gutter={[12, 12]}>
                  {data.choices.map((anw) => {
                    if (data.correctAnswers?.includes(anw.id))
                      return (
                        <Col span={24} md={12} xl={6} key={anw._id}>
                          <div
                            className={css.isAnswer}
                            key={anw._id}
                            dangerouslySetInnerHTML={{ __html: anw.answer }}
                          ></div>
                        </Col>
                      )
                  })}

                  {data.choices.map((anw) => {
                    if (!anw.isCorrect)
                      return (
                        <Col span={24} md={12} xl={6} key={anw._id}>
                          <Card size='small'>
                            <div key={anw._id} dangerouslySetInnerHTML={{ __html: anw.answer }}></div>
                          </Card>
                        </Col>
                      )
                  })}
                </Row>
                {data && (data.type === 'WRITING' || data.type === 'NUMERICAL') && (
                  <p>
                    {data?.answer || data?.answer !== '<p></p>' ? (
                      <div dangerouslySetInnerHTML={{ __html: data?.answer as string }}></div>
                    ) : (
                      'Không có câu trả lời'
                    )}
                  </p>
                )}
              </Card>
            )}
            {(data.explanation !== '<p></p>' || undefined) && (
              <Space className={`${css.hint} sp100 `}>
                <AiOutlineQuestionCircle />
                <div dangerouslySetInnerHTML={{ __html: data.explanation }} style={{ marginTop: -3 }}></div>
              </Space>
            )}
          </Space>
        </Card>
      </div>
    )
  }
}

export default RenderItem
