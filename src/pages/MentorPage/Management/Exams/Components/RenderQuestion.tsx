import questionApi from '@/apis/question.api'
import { stateAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import openNotification from '@/components/Notification'
import TagCustom from '@/components/TagCustom/TagCustom'
import { QuestionState } from '@/interface/question'
import { useMutation } from '@tanstack/react-query'
import { Card, Checkbox, Col, Popconfirm, Row, Space } from 'antd'
import { useEffect } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import css from '../Questions/styles.module.scss'
type Props = {
  data: QuestionState[] | undefined
  type: 'questionsSelect' | 'questionsBank'
  setQuestionsSelectData: React.Dispatch<React.SetStateAction<QuestionState[]>>
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  resetData: () => void
}

const RenderQuestion = (props: Props) => {
  const { data, type, setQuestionsSelectData, setQuestionUpdate, setOpen, resetData } = props

  const { status, mutate, error } = useMutation({ mutationFn: (id: string) => questionApi.deleteQuestion(id) })

  useEffect(() => {
    if (status === 'success') {
      openNotification({ status: status, message: 'Xóa câu hỏi thành công' })
      resetData()
    }

    if (status === 'error' && error) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [status, error])

  return !data?.length ? (
    <EmptyCustom
      description={
        type === 'questionsSelect' ? (
          <p>
            Không có câu hỏi nào. <p>Có thể tạo câu hỏi hoặc thêm câu hỏi tại ngân hàng câu hỏi.</p>
          </p>
        ) : (
          'Không có câu hỏi nào'
        )
      }
    ></EmptyCustom>
  ) : (
    <Space direction='vertical' className={'sp100'}>
      {data?.map((item, id) => (
        <div className={css.qItem}>
          {item.status === 'INACTIVE' && (
            <div className={css.disable}>
              <Space direction='vertical' align='center' className={'p-center'}>
                <MdOutlineDisabledVisible className={css.iconDisable} />
                <div>Câu hỏi đang được ẩn</div>
              </Space>
            </div>
          )}
          <Card size='small' key={item._id} className={'sp100'}>
            <Checkbox
              onChange={(e) =>
                e.target.checked
                  ? stateAction(setQuestionsSelectData, item._id, item, 'add')
                  : stateAction(setQuestionsSelectData, item._id, null, 'remove')
              }
            >
              <Space direction='vertical' className={'sp100'} style={{ minWidth: '74vw' }}>
                <Row justify='space-between'>
                  <Col span={24} md={19}>
                    <Space>
                      <h3>Câu {id + 1}: </h3>
                      <TagCustom content={item.type} />
                      <TagCustom color='gold' content={`${item.point} Điểm`} />
                      <TagCustom
                        intArrType={['EASY', 'MEDIUM', 'DIFFICULT']}
                        intColor={['green', 'blue', 'red']}
                        intAlternativeType={['Dễ', 'Vừa phải', 'Khó']}
                        content={item.difficulty}
                      />
                    </Space>
                  </Col>
                  <Col>
                    <Space size='small'>
                      <ButtonCustom
                        shape='circle'
                        type='text'
                        icon={<AiOutlineEdit />}
                        size='small'
                        onClick={() => {
                          setQuestionUpdate(item)
                          setOpen(true)
                        }}
                      ></ButtonCustom>
                      <Popconfirm
                        placement='right'
                        title='Bạn có muốn xóa câu hỏi này?'
                        onConfirm={() => mutate(item._id)}
                        okText='Xóa'
                        cancelText='Hủy'
                      >
                        <ButtonCustom
                          shape='circle'
                          type='text'
                          icon={<AiOutlineDelete style={{ color: 'var(--red)' }} />}
                          size='small'
                        ></ButtonCustom>
                      </Popconfirm>
                    </Space>
                  </Col>
                </Row>

                <h4>{item.question}</h4>
                <Card size='small' className={css.anws}>
                  <Space className={'sp100'}>
                    {item.choices.map((anw) => {
                      if (anw.isCorrect) return <p className={css.isAnswer}>{anw.answer}</p>
                    })}
                    {item.choices.map((anw) => {
                      if (!anw.isCorrect) return <p>{anw.answer}</p>
                    })}
                    {item.answer && item.answer}
                  </Space>
                </Card>
                {item.hint && (
                  <Space className={`${css.hint} sp100`} align='center'>
                    <AiOutlineQuestionCircle />
                    <p>{item.hint}</p>
                  </Space>
                )}
              </Space>
            </Checkbox>
          </Card>
        </div>
      ))}
    </Space>
  )
}

export default RenderQuestion
