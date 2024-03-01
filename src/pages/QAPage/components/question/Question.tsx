import FaqApi from '@/apis/faq.api'
import LikeApi from '@/apis/like.api'
import { AppContext } from '@/contexts/app.context'
import { formatDate } from '@/helpers/common'
import { AnswerState, FaqSate } from '@/interface/faq'
import { LikeState, TargetModelEnum, TypeEnum } from '@/interface/like'
import { CommentOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Avatar, Button, Card, Flex, Pagination, Space, Tooltip, message } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AxiosError } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AiFillLike, AiOutlineDislike, AiOutlineLike, AiTwotoneDislike } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

interface IFaqListProp {
  categoryId?: string
}

export default function FaqList(props: IFaqListProp) {
  const { categoryId } = props

  const [category, setCategory] = useState<string>()
  const [page, setPage] = useState<number>(1)

  const { data } = useQuery({
    queryFn: () =>
      FaqApi.getFaqs(category ? { categoryId: category } : {}, {
        limit: 10,
        page: page,
      }),
    queryKey: ['getFaqList', category, page],
  })
  const navigate = useNavigate()
  const faqs = data?.data?.docs
  const { profile } = useContext(AppContext)

  useEffect(() => {
    setCategory(categoryId)
  }, [categoryId])

  const queryClient = useQueryClient()
  const mutateLike = useMutation({
    mutationFn: (body: LikeState) => (!body.id ? LikeApi.createLike(body) : LikeApi.updateLike(body)),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getFaqList'] })
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

  const likeFaq = (faq: FaqSate, type: TypeEnum, method: string) => {
    const id =
      faq?.likes?.find((item: LikeState) => item?.userId === profile?._id)?._id ??
      faq?.dislikes?.find((item: LikeState) => item?.userId === profile?._id)?._id

    if (method == 'create') {
      mutateLike.mutate({
        targetId: faq?._id as string,
        targetType: TargetModelEnum.FAQ,
        type: type,
        userId: profile?._id as string,
        id: id,
      })
    } else {
      if (type === TypeEnum.LIKE) {
        mutateDeleteLike.mutate(faq?.likes?.find((item: LikeState) => item?.userId === profile?._id)?._id as string)
      } else {
        mutateDeleteLike.mutate(faq?.dislikes?.find((item: LikeState) => item?.userId === profile?._id)?._id as string)
      }
    }
  }

  return (
    <>
      {faqs?.map((faq) => (
        <Card
          title={faq?.title}
          style={{ marginBottom: '10px' }}
          extra={
            <>
              <p>{'Môn học: ' + faq?.category?.name}</p>
            </>
          }
        >
          <Meta
            avatar={<Avatar src={import.meta.env.VITE_FILE_ENDPOINT + '/' + faq?.user?.avatarUrl} />}
            title={faq?.user?.fullName}
            description={formatDate(faq?.createdAt as string)}
          />

          <Link to={'/hoi-dap/' + faq._id}>
            <p
              style={{ margin: '10px 0', fontSize: '16px', display: 'block' }}
              className='dangerHTML'
              dangerouslySetInnerHTML={{ __html: faq.content }}
            ></p>
          </Link>

          <Space align='center'>
            {faq?.likes && faq?.likes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1 ? (
              <AiFillLike
                size={25}
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => {
                  likeFaq(faq, TypeEnum.LIKE, 'delete')
                }}
              />
            ) : (
              <AiOutlineLike
                size={25}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  likeFaq(faq, TypeEnum.LIKE, 'create')
                }}
              />
            )}
            {faq?.countLike}
            {faq?.dislikes && faq?.dislikes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1 ? (
              <AiTwotoneDislike
                size={25}
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => {
                  likeFaq(faq, TypeEnum.DISLIKE, 'delete')
                }}
              />
            ) : (
              <AiOutlineDislike
                size={25}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  likeFaq(faq, TypeEnum.DISLIKE, 'create')
                }}
              />
            )}
            {faq?.countDislike}
            <Avatar.Group maxCount={2}>
              {faq?.answers?.map((item: AnswerState) => (
                <Tooltip title={item?.user?.fullName} placement='top'>
                  <Avatar
                    src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.user?.avatarUrl}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
            <span>{faq?.answers?.length || 0} câu trả lời</span>
            <Button
              onClick={() => {
                navigate('/hoi-dap/' + faq?._id)
              }}
              icon={<CommentOutlined />}
            >
              Trả lời
            </Button>
          </Space>
        </Card>
      ))}

      <Flex justify='center'>
        {faqs?.length && (
          <Pagination
            defaultCurrent={page}
            total={data?.data.totalDocs}
            onChange={(page) => {
              setPage(page)
            }}
          />
        )}
      </Flex>
    </>
  )
}
