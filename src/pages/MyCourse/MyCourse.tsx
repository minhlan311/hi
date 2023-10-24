/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { Card, Col, Row, Pagination, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '@/contexts/app.context'
import enrollsApi from '@/apis/enrolls.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import './MyCourse.scss'
import { useNavigate } from 'react-router-dom'
import Meta from 'antd/es/card/Meta'

export default function MyCourse() {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const pageSize = 6
  const [current, setCurrent] = useState<number>(1)

  const { data, isLoading } = useQuery({
    queryKey: ['myCourse'],
    queryFn: () =>
      enrollsApi.getEnroll({
        filterQuery: {
          userId: profile._id,
        },
        options: {
          pagination: false,
          sort: { createdAt: -1 },
        },
      }),
  })

  const enrollData = data?.data?.docs || []
  const listData = enrollData.filter((item: any) => item.course)

  const currentData = listData.slice((current - 1) * pageSize, current * pageSize)

  const onChange = (page: number) => {
    setCurrent(page)
  }

  return (
    <div className='div-mycourse'>
      <div className='h1-title'>
        <h1>Khóa học của tôi</h1>
        <div>
          {isLoading ? (
            <LoadingCustom
              style={{
                marginTop: '50px',
              }}
            />
          ) : listData.length > 0 ? (
            <>
              <Row justify={'center'} gutter={{ xs: 0, sm: 0, md: 24, lg: 32 }}>
                {currentData.map((item: any) => (
                  <Col className='col' key={item.course._id}>
                    <Card
                      onClick={() => navigate('/myCourseLearning/' + item?.course?._id)}
                      hoverable
                      style={{ width: 340, height: 300 }}
                      cover={
                        <ImageCustom
                          preview={false}
                          height='160px'
                          width='100%'
                          src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.course?.coverMedia}
                        />
                      }
                    >
                      <Meta
                        description={
                          <>
                            <TextWithTooltip rows={1} children={item?.course?.name} className='link-h4-config' />
                            <div className='flexButton-mycourse'>
                              <Button type='primary'>
                                Vào học ngay
                                <SendOutlined />
                              </Button>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className='pagina'>
                <Pagination
                  total={listData.length}
                  pageSize={pageSize}
                  current={current}
                  defaultCurrent={1}
                  onChange={onChange}
                />
              </div>
            </>
          ) : (
            <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Bạn chưa tham gia khóa học nào!</h2>
          )}
        </div>
      </div>
    </div>
  )
}
