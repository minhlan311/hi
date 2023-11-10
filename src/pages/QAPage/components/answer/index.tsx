import { AnswerState, FaqSate } from '@/interface/faq'
import { Avatar, Button, Card, Image, Space, Tooltip, message, Popconfirm } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useContext, useMemo, useState } from 'react'
import { AppContext } from '@/contexts/app.context'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalFormAnswer from './ModalFormAnswer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FaqApi from '@/apis/faq.api'
interface IAnswerListProps {
  faq?: FaqSate
}

export default function AnswerList(props: IAnswerListProps) {
  const { faq } = props
  // sort createAt
  const sortedAnswers = faq?.answers?.sort(function (a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  const { profile } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [answer, setAnswer] = useState<AnswerState | null>(null)
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: (body: { answerId: string; id: string }) => FaqApi.deleteAnswer(body),
    onSuccess() {
      message.success('Xóa câu trả lời thành công')
      queryClient.invalidateQueries({ queryKey: ['getFaqDetail'] })
    },
    onError() {
      message.error('Có lỗi xảy ra! Vui lòng thử lại sau')
    },
  })

  const deleteAnswer = (answer: AnswerState) => {
    mutate.mutate({
      id: faq?._id as string,
      answerId: answer?._id as string,
    })
  }

  const actions = (answer: AnswerState) => {
    if (answer?.user?._id === profile?._id) {
      return [
        <Tooltip title='Chỉnh sửa'>
          <Button
            onClick={() => {
              setAnswer(answer)
              setIsModalOpen(true)
            }}
            icon={<EditOutlined />}
          ></Button>
        </Tooltip>,
        <Tooltip title='Xóa'>
          <Popconfirm
            title='Cảnh báo'
            description='Bạn có muốn xóa câu trả lời này?'
            onConfirm={() => {
              deleteAnswer(answer)
            }}
            onCancel={() => {}}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Tooltip>,
      ]
    }

    return []
  }

  const answerList = useMemo(() => {
    return (
      <>
        <h1 style={{ margin: '10px' }}>Câu trả lời</h1>
        <div id='answer_container'>
          {sortedAnswers?.map((answer: AnswerState) => (
            <Card style={{ marginBottom: '10px' }} actions={actions(answer)}>
              <Meta
                avatar={<Avatar src={answer?.user.avatarUrl} />}
                title={answer?.user?.fullName}
                description={answer?.createdAt}
              />
              <div style={{ margin: '10px 0' }}>
                {answer?.files?.map((item: string) => (
                  <Image width={200} src={`${import.meta.env.VITE_FILE_ENDPOINT}/${item}`}></Image>
                ))}
              </div>
              {answer?.content && (
                <p
                  style={{ margin: '10px 0', fontSize: '16px' }}
                  dangerouslySetInnerHTML={{ __html: answer?.content }}
                ></p>
              )}

              <Space align='center' style={{ marginTop: '10px' }}>
                <AiOutlineLike size={25} style={{ cursor: 'pointer' }} /> 0
                <AiOutlineDislike size={25} style={{ cursor: 'pointer' }} /> 0
              </Space>
            </Card>
          ))}
        </div>
      </>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedAnswers])

  return (
    <>
      {answerList}
      <ModalFormAnswer
        faqId={faq?._id}
        answer={answer}
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setAnswer(null)
        }}
        onSuccess={() => {
          setIsModalOpen(false)
          setAnswer(null)
        }}
      />
    </>
  )
}
