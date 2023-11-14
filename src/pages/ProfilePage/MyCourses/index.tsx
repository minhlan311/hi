/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import Header from '@/components/layout/Header/Header'
import { useQuery } from '@tanstack/react-query'
import { Card, Col, Descriptions, Divider, Popover, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import { BsCalendarWeek } from 'react-icons/bs'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
type Props = { userId: string }

const MyCourses = ({ userId }: Props) => {
  const [current, setCurrent] = useState<number>(1)

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['coursesByMentor', current],
    queryFn: () => {
      return courseApi.getCourses({ filterQuery: { createdById: userId }, options: { page: current, limit: 6 } })
    },
  })
  const courses = courseData?.data.docs

  const RenderCourse = ({ item }: { item: any }) => {
    return (
      <Card
        hoverable
        cover={
          <ImageCustom
            preview={false}
            height='160px'
            width='100%'
            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverMedia}
          />
        }
        size='small'
        style={{ minHeight: 400 }}
      >
        <Card.Meta
          title={
            <h3 className='dangerHTMLTwoLine' style={{ minHeight: 75 }}>
              {item.name}
            </h3>
          }
        />
        <Space direction='vertical' style={{ minHeight: 100 }}>
          <Descriptions column={1}>
            <Descriptions.Item label='Khai giảng'>
              <div>
                {item?.class.length > 0 ? (
                  <>
                    {item?.class?.slice(0, 1).map((item: any) => (
                      <Space>
                        <BsCalendarWeek />
                        <b>{moment(item.startDate).format('DD/MM/YYYY')}</b>
                      </Space>
                    ))}
                    {item?.class?.length > 1 && (
                      <Popover
                        content={
                          <Space direction='vertical'>
                            {item.class.map((item: any) => (
                              <Space>
                                <BsCalendarWeek />
                                <b>{moment(item.startDate).format('DD/MM/YYYY')}</b>
                              </Space>
                            ))}
                          </Space>
                        }
                        title='Lịch khai giảng'
                      >
                        <p className={'link'}>Xem thêm {item?.class.length - 1} buổi</p>
                      </Popover>
                    )}
                  </>
                ) : (
                  'Đang cập nhật'
                )}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label='Mức phí'>
              <div style={{ marginTop: -5 }}>
                {' '}
                <PriceCalculator price={item.plan === 'FREE' ? 0 : item.cost} discount={0} showTotal />
              </div>
            </Descriptions.Item>
          </Descriptions>

          <ButtonCustom type='primary' href={`/courses/${item._id}`}>
            Xem chi tiết
          </ButtonCustom>
        </Space>
      </Card>
    )
  }

  return (
    <div>
      <Header
        title={
          <Divider>
            <VscDebugBreakpointLog />
          </Divider>
        }
        desc={<h3>KHÓA HỌC CỦA TÔI</h3>}
        padding={'25px 0 50px 0'}
        size='sm'
      >
        <Space direction='vertical' className={'sp100'}>
          <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
            {courses?.length === 0 ? (
              <EmptyCustom description='Hiện không có khóa học nào' />
            ) : (
              <Row gutter={[24, 24]}>
                {courses?.map((item) => (
                  <Col span={24} md={12} xl={8} key={item._id}>
                    <RenderCourse item={item}></RenderCourse>
                  </Col>
                ))}
              </Row>
            )}
          </LoadingCustom>
          <PaginationCustom
            limit={6}
            dataArr={courses}
            totalData={courseData?.data.totalDocs}
            callbackCurrent={setCurrent}
          ></PaginationCustom>
        </Space>
      </Header>
    </div>
  )
}

export default MyCourses
