import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TagCustom from '@/components/TagCustom/TagCustom'
import { AppContext } from '@/contexts/app.context'
import { QuestionState } from '@/interface/question'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Popconfirm, Row, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
import css from './RenderIten.module.scss'

type Props = {
  type: 'questionsSelected' | 'questionsBank'
  data: QuestionState
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderItem = (props: Props) => {
  const { type, data, setQuestionUpdate, setOpen } = props
  const { setQuestionList, questionList, profile } = useContext(AppContext)

  const [isHover, setIsHover] = useState(false)
  const queryClient = useQueryClient()

  const { status, mutate, error } = useMutation({
    mutationFn: (id: string) => questionApi.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] })
    },
  })

  useEffect(() => {
    if (status === 'success') {
      openNotification({ status: status, message: 'Xóa câu hỏi thành công' })
    }

    if (status === 'error' && error) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [status, error])

  if (data) {
    const check = questionList?.includes(data._id)

    return (
      <div className={css.qItem}>
        <div
          className={`${data.status === 'INACTIVE' && css.disable} ${check ? css.unSave : css.save}`}
          onClick={() => {
            setQuestionList(data._id as unknown as string[])
            // queryClient.invalidateQueries({ queryKey: ['questionsSelected'] })
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Space direction='vertical' align='center' className={'p-center'}>
            {data.status === 'INACTIVE' && <MdOutlineDisabledVisible className={css.iconDisable} />}
            <h3>{data.status === 'INACTIVE' ? 'Câu hỏi đang được ẩn' : check ? 'Xóa khỏi bộ đề' : 'Thêm vào bộ đề'}</h3>
          </Space>
          <div className={css.iconCheck}>
            {isHover && check ? (
              <RiCloseCircleFill className={css.unCheck} />
            ) : (
              check && <b className={css.check}>{questionList?.findIndex((val) => val === data._id) + 1}</b>
            )}
          </div>
        </div>

        <Card size='small' hoverable>
          <Space direction='vertical' className={'sp100'}>
            <Row justify='space-between'>
              <Col span={24} md={19}>
                <Space>
                  {/* <h3>Câu {id + 1}: </h3> */}
                  <TagCustom content={data.type} />
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
                    <ButtonCustom
                      shape='circle'
                      type='text'
                      icon={<AiOutlineEdit />}
                      size='small'
                      onClick={() => {
                        setQuestionUpdate(data)
                        setOpen(true)
                      }}
                    ></ButtonCustom>
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
                        icon={<AiOutlineDelete />}
                        size='small'
                        danger
                      ></ButtonCustom>
                    </Popconfirm>
                  </Space>
                </Col>
              )}
            </Row>

            <h4 dangerouslySetInnerHTML={{ __html: data.question }}></h4>
            <Card size='small' className={css.anws}>
              <Space className={'sp100'}>
                {data.choices.map((anw) => {
                  if (anw.isCorrect)
                    return (
                      <div
                        className={css.isAnswer}
                        key={anw._id}
                        dangerouslySetInnerHTML={{ __html: anw.answer }}
                      ></div>
                    )
                })}
                {data.choices.map((anw) => {
                  if (!anw.isCorrect) return <div key={anw._id} dangerouslySetInnerHTML={{ __html: anw.answer }}></div>
                })}

                {data?.answer && <div dangerouslySetInnerHTML={{ __html: data?.answer }}></div>}
              </Space>
            </Card>
            {data.explanation !== '<p></p>' && (
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
