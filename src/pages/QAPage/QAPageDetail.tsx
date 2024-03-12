import FaqApi from '@/apis/faq.api'
import LikeApi from '@/apis/like.api'
import { AppContext } from '@/contexts/app.context'
import { formatDate } from '@/helpers/common'
import { AnswerState } from '@/interface/faq'
import { LikeState, TargetModelEnum, TypeEnum } from '@/interface/like'
import { CommentOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Avatar, Button, Card, Col, Image, Popconfirm, Row, Skeleton, Space, Tooltip, message } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { AiFillLike, AiOutlineDislike, AiOutlineLike, AiTwotoneDislike } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import './QAPage.scss'
import AnswerList from './components/answer'
import ModalFormAnswer from './components/answer/ModalFormAnswer'
import CateGoriesList from './components/category'
import ModalForm from './components/question/ModalForm'

export default function QADetail() {
  const params = useParams()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)

  const [openForm, setOpenForm] = useState<boolean>(false)

  const { data, isLoading } = useQuery({
    queryFn: () => FaqApi.getQaDetail(params.id as string),
    queryKey: ['getFaqDetail', reload],
    enabled: params.id ? true : false,
  })
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()

  const faq = data?.data
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: (id: string) => FaqApi.deleteFaq(id),
    onSuccess() {
      message.success('Xóa câu trả lời thành công')
      navigate('/hoi-dap')
    },
    onError() {
      message.error('Có lỗi xảy ra! Vui lòng thử lại sau')
    },
  })

  const deleteFaq = () => {
    mutate.mutate(faq?._id as string)
  }

  const actions = () => {
    if (faq?.createdById === profile?._id) {
      return [
        <Tooltip title='Chỉnh sửa'>
          <Button
            onClick={() => {
              // setAnswer(answer)
              setOpenForm(true)
            }}
            icon={<EditOutlined />}
          ></Button>
        </Tooltip>,
        <Tooltip title='Xóa'>
          <Popconfirm
            title='Cảnh báo'
            description='Bạn có muốn xóa câu trả lời này?'
            onConfirm={() => {
              deleteFaq()
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

  const checkLike =
    (faq?.likes && faq?.likes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1) ||
    (faq?.dislikes && faq?.dislikes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1)

  const mutateLike = useMutation({
    mutationFn: (body: LikeState) => (!checkLike ? LikeApi.createLike(body) : LikeApi.updateLike(body)),
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

  const likeFaq = (type: TypeEnum, method: string) => {
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
    <div id='qa-page_container'>
      <Row gutter={16}>
        <Col span={7} lg={6}>
          <CateGoriesList></CateGoriesList>
        </Col>
        <Col span={10} lg={18}>
          {isLoading ? (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          ) : (
            <>
              <Card
                actions={actions()}
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
                <div style={{ margin: '10px 0' }}>
                  {faq?.files?.map((item: string) => (
                    <Image width={200} src={`${import.meta.env.VITE_FILE_ENDPOINT}/${item}`}></Image>
                  ))}
                </div>
                {faq?.content && (
                  <p
                    style={{ margin: '10px 0', fontSize: '16px', display: 'block' }}
                    className={'dangerHTML'}
                    dangerouslySetInnerHTML={{ __html: faq?.content }}
                  ></p>
                )}
                <Space align='center' style={{ margin: '10px 0' }}>
                  {faq?.likes && faq?.likes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1 ? (
                    <AiFillLike
                      size={25}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => {
                        likeFaq(TypeEnum.LIKE, 'delete')
                      }}
                    />
                  ) : (
                    <AiOutlineLike
                      size={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        likeFaq(TypeEnum.LIKE, 'create')
                      }}
                    />
                  )}
                  {faq?.countLike}
                  {faq?.dislikes &&
                  faq?.dislikes?.findIndex((item: LikeState) => item?.userId === profile?._id) !== -1 ? (
                    <AiTwotoneDislike
                      size={25}
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => {
                        likeFaq(TypeEnum.DISLIKE, 'delete')
                      }}
                    />
                  ) : (
                    <AiOutlineDislike
                      size={25}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        likeFaq(TypeEnum.DISLIKE, 'create')
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
                </Space>
                {profile && profile?._id !== faq?.createdById && (
                  <Card style={{ backgroundColor: '#EEE' }}>
                    <h3>Trả lời câu hỏi của {faq?.user?.fullName}</h3>
                    <p>Làm sao để có câu trả lời hay nhất?</p>
                    <ul style={{ marginLeft: '20px' }}>
                      <li className='list_style'>Luôn có GIẢI THÍCH các bước giải</li>
                      <li className='list_style'> Không copy câu trả lời của Timi</li>
                      <li className='list_style'>Không sao chép trên mạng</li>
                      <li className='list_style'>Không spam câu trả lời để nhận điểm</li>
                      <li className='list_style'>Spam sẽ bị khóa tài khoản</li>
                    </ul>
                    <Button
                      onClick={() => {
                        setIsModalOpen(true)
                      }}
                      style={{ marginTop: '10px' }}
                      icon={<CommentOutlined />}
                      type='primary'
                    >
                      Viết câu trả lời
                    </Button>
                  </Card>
                )}
              </Card>
              <AnswerList faq={faq} />
            </>
          )}
        </Col>
        {/* <Col span={7} lg={6}>
          Câu hỏi liên quan
        </Col> */}
      </Row>

      <ModalFormAnswer
        faqId={params.id}
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setReload((reload: boolean) => !reload)
        }}
        answer={null}
        onSuccess={() => {
          setIsModalOpen(false)
          setReload((reload: boolean) => !reload)
        }}
      />
      {openForm && (
        <ModalForm
          onClose={() => {
            setOpenForm(false)
          }}
          onSuccess={() => {}}
          isModalOpen={openForm}
          faq={faq}
        />
      )}
    </div>
  )
}
