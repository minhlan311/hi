import FaqApi from '@/apis/faq.api'
import { AnswerState } from '@/interface/faq'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Avatar, Button, Card, Image, Row, Skeleton, Space, Tooltip, Col, Popconfirm, message } from 'antd'
import Meta from 'antd/es/card/Meta'
// import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { UserOutlined, CommentOutlined } from '@ant-design/icons'
import './QAPage.scss'
import ModalFormAnswer from './components/answer/ModalFormAnswer'
import { useState, useContext } from 'react'
import AnswerList from './components/answer'
import CateGoriesList from './components/category'
import { AppContext } from '@/contexts/app.context'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
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

  // const likeFaq = () => {
  //   // FaqApi.likeFaq(faq?._id as string)
  // }

  return (
    <div id='qa-page_container'>
      <Row gutter={16}>
        <Col span={7} lg={6}>
          <CateGoriesList
            setCategoryId={(id: string) => {
              console.log('categoryId', id)
              // setCategoryId(id)
            }}
          ></CateGoriesList>
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
                  description={faq?.createdAt}
                />
                <div style={{ margin: '10px 0' }}>
                  {faq?.files?.map((item: string) => (
                    <Image width={200} src={`${import.meta.env.VITE_FILE_ENDPOINT}/${item}`}></Image>
                  ))}
                </div>
                {faq?.content && (
                  <p
                    style={{ margin: '10px 0', fontSize: '16px' }}
                    dangerouslySetInnerHTML={{ __html: faq?.content }}
                  ></p>
                )}
                <Space align='center' style={{ margin: '10px 0' }}>
                  {/* <AiOutlineLike
                    size={25}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      likeFaq()
                    }}
                  />{' '}
                  0
                  <AiOutlineDislike size={25} style={{ cursor: 'pointer' }} /> 0 */}
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
                {profile?._id !== faq?.createdById && (
                  <Card style={{ backgroundColor: '#EEE' }}>
                    <h3>Trả lời câu hỏi của {faq?.user?.fullName}</h3>
                    <p>Làm sao để có câu trả lời hay nhất?</p>
                    <ul style={{ marginLeft: '20px' }}>
                      <li className='list_style'>Luôn có GIẢI THÍCH các bước giải</li>
                      <li className='list_style'>Luôn có GIẢI THÍCH các bước giải</li>
                      <li className='list_style'> Không copy câu trả lời của Timi</li>
                      <li className='list_style'>Không sao chép trên mạng</li>
                      <li className='list_style'>Không spam câu trả lời để nhận điểm</li>
                      <li className='list_style'>Spam sẽ bị khóa tài khoản</li>
                    </ul>
                    <Button
                      onClick={() => {
                        console.log('click')
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
          console.log('thành công')

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
