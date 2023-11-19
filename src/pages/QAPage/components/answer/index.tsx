import { AnswerState, FaqSate } from '@/interface/faq'
import { Avatar, Button, Card, Image, Space, Tooltip, message, Popconfirm } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AiFillLike, AiOutlineDislike, AiOutlineLike, AiTwotoneDislike } from 'react-icons/ai'
import { useContext, useMemo, useState } from 'react'
import { AppContext } from '@/contexts/app.context'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalFormAnswer from './ModalFormAnswer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FaqApi from '@/apis/faq.api'
import { LikeState, TypeEnum } from '@/interface/like'
import { TargetModelEnum } from '@/types/utils.type'
import { AxiosError } from 'axios'
import LikeApi from '@/apis/like.api'
import { CommentOutlined } from '@ant-design/icons'
import { formatDate } from '@/helpers/common'
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
  const [parentId, setParentId] = useState<string>('')

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

  const mutateLike = useMutation({
    mutationFn: (body: LikeState) => (!body.id ? LikeApi.createLike(body) : LikeApi.updateLike(body)),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getFaqDetail'] })
    },
    onError(error: AxiosError): void {
      if (error?.response?.status) {
        message.warning('Vui lòng đăng nhập để yêu thích câu hỏi')
      } else {
        message.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      }
    },
  })
  const mutateDeleteLike = useMutation({
    mutationFn: (id: string) => LikeApi.deleteLike(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getFaqDetail'] })
    },
    onError(error: AxiosError): void {
      if (error?.response?.status) {
        message.warning('Vui lòng đăng nhập để yêu thích câu hỏi')
      } else {
        message.error('Có lỗi xảy ra! Vui lòng thử lại sau')
      }
    },
  })

  const likeAnswer = (answer: AnswerState, type: TypeEnum, method: string) => {
    const id =
      answer?.likes?.find((item: LikeState) => item?.userId === profile?._id)?._id ??
      answer?.dislikes?.find((item: LikeState) => item?.userId === profile?._id)?._id

    if (method == 'create') {
      mutateLike.mutate({
        targetId: answer?._id as string,
        targetType: TargetModelEnum.ANSWER,
        type: type,
        userId: profile?._id as string,
        id: id,
      })
    } else {
      if (type === TypeEnum.LIKE) {
        mutateDeleteLike.mutate(answer?.likes?.find((item: LikeState) => item?.userId === profile?._id)?._id as string)
      } else {
        mutateDeleteLike.mutate(
          answer?.dislikes?.find((item: LikeState) => item?.userId === profile?._id)?._id as string,
        )
      }
    }
  }

  const answerList = useMemo(() => {
    return (
      <>
        <h1 style={{ margin: '10px' }}>Câu trả lời</h1>
        <div id='answer_container'>
          {sortedAnswers?.map((answer: AnswerState) => (
            <>
              <Card style={{ marginBottom: '10px' }} actions={actions(answer)}>
                <Meta
                  avatar={<Avatar src={import.meta.env.VITE_FILE_ENDPOINT + '/' + answer?.user?.avatarUrl} />}
                  title={answer?.user?.fullName}
                  description={formatDate(answer?.createdAt as string)}
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
                  {answer?.likes &&
                  answer?.likes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1 ? (
                    <AiFillLike
                      size={25}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => {
                        likeAnswer(answer, TypeEnum.LIKE, 'delete')
                      }}
                    />
                  ) : (
                    <AiOutlineLike
                      size={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        likeAnswer(answer, TypeEnum.LIKE, 'create')
                      }}
                    />
                  )}
                  {answer?.countLike}
                  {answer?.dislikes &&
                  answer?.dislikes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1 ? (
                    <AiTwotoneDislike
                      size={25}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => {
                        likeAnswer(answer, TypeEnum.DISLIKE, 'delete')
                      }}
                    />
                  ) : (
                    <AiOutlineDislike
                      size={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        likeAnswer(answer, TypeEnum.DISLIKE, 'create')
                      }}
                    />
                  )}
                  {answer?.countDislike}
                  <Button
                    onClick={() => {
                      setIsModalOpen(true)
                      setParentId(answer?._id as string)
                    }}
                    icon={<CommentOutlined />}
                  >
                    Trả lời
                  </Button>
                </Space>
                {/* <h3>Trả lời</h3>
                <Card></Card> */}
              </Card>
            </>
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
          setParentId('')
          setAnswer(null)
        }}
        onSuccess={() => {
          setIsModalOpen(false)
          setParentId('')
          setAnswer(null)
        }}
        parentId={parentId}
      />
    </>
  )
}
