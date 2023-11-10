import FaqApi from '@/apis/faq.api'
import { AnswerState } from '@/interface/faq'
import { UserOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Button, Card, Pagination, Space, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
// import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
        page: page
      }),
    queryKey: ['getFaqList', category, page]
  })
  const navigate = useNavigate()
  const faqs = data?.data?.docs

  useEffect(() => {
    setCategory(categoryId)
  }, [categoryId])

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
          <Meta avatar={<Avatar src={faq?.user.avatarUrl} />} title={faq?.user?.fullName} description={faq.createdAt} />

          <Link to={'/hoi-dap/' + faq._id}>
            <p style={{ margin: '10px 0', fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: faq.content }}></p>
          </Link>

          <Space align='center'>
            {/* <AiOutlineLike size={25} style={{ cursor: 'pointer' }} /> 0
            <AiOutlineDislike size={25} style={{ cursor: 'pointer' }} /> 0 */}
            <Avatar.Group maxCount={2}>
              {faq?.answers?.map((item: AnswerState) => (
                <Tooltip title={item?.user?.fullName} placement='top'>
                  <Avatar src={item?.user?.avatarUrl} icon={<UserOutlined />} />
                </Tooltip>
              ))}
            </Avatar.Group>
            <span>{faq?.answers?.length || 0} câu trả lời</span>
            <Button
              onClick={() => {
                navigate('/hoi-dap/' + faq?._id)
              }}
            >
              Trả lời
            </Button>
          </Space>
        </Card>
      ))}

      <Pagination
        defaultCurrent={page}
        total={data?.data.totalDocs}
        onChange={(page) => {
          setPage(page)
        }}
      />
    </>
  )
}
