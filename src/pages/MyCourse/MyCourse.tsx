/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import enrollsApi from '@/apis/enrolls.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import { AppContext } from '@/contexts/app.context'
import { SendOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Pagination, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useContext, useState } from 'react'
import './MyCourse.scss'
import { useNavigate } from 'react-router-dom'

export default function MyCourse() {
  const { profile } = useContext(AppContext)
  const [current, setCurrent] = useState<number>(1)
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['myCourse', current],
    queryFn: () =>
      enrollsApi.getEnroll({
        filterQuery: {
          userId: profile._id,
        },
        options: {
          page: current,
          limit: 6,
        },
      }),
  })

  const listData = data?.data?.docs

  console.log(listData, '==-=-=-=-')

  const onChange = (page: number) => {
    setCurrent(page)
  }

  return (
    <div className='div-mycourse'>
      <div className='h1-title'>
        <h1>Khóa học của tôi</h1>
        <div>
          <Row justify={'center'} gutter={{ xs: 0, sm: 0, md: 24, lg: 32 }}>
            {isLoading ? (
              <LoadingCustom
                style={{
                  marginTop: '50px',
                }}
              />
            ) : listData?.length > 0 ? (
              listData?.map((item: any) => (
                <Col className='col'>
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
              ))
            ) : (
              <h2
                style={{
                  marginTop: '30px',
                }}
              >
                Bạn chưa mua khóa học nào !
              </h2>
            )}
          </Row>
          {listData?.length > 0 && (
            <div className='pagina'>
              <Pagination
                total={data?.data?.totalDocs}
                pageSize={6}
                current={current}
                defaultCurrent={1}
                onChange={onChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
