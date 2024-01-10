/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import Header from '@/components/layout/Header/Header'
import { CoursesState } from '@/interface/courses'
import { SuccessResponse } from '@/types/utils.type'
import { Card, Col, Divider, Flex, Popover, Rate, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { LuBookMarked, LuCalendarDays, LuUsers } from 'react-icons/lu'
type Props = {
  coursesData: SuccessResponse<CoursesState[]>
  loading: boolean
  showPagination?: boolean
  fullSize?: boolean
  maxLength?: number
  setCurrent?: React.Dispatch<React.SetStateAction<number>>
}

const MyCourses = ({ coursesData, loading, showPagination = true, fullSize, maxLength, setCurrent }: Props) => {
  const formatNumber = (num: number) => {
    if (num < 1000) {
      return num.toString()
    } else if (num < 1000000) {
      return (num / 1000).toFixed(0) + 'k'
    } else {
      return (num / 1000000).toFixed(0) + 'm'
    }
  }

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
      >
        <Space direction='vertical' style={{ display: 'flex' }}>
          <Card.Meta title={item.name} />
          <Space>
            <Avatar avtUrl={item.owner.avatarUrl} userData={item.owner} />
            {item.owner.fullName}
          </Space>
          <Space>
            <Rate value={item.avgAssessment} style={{ fontSize: 14 }} allowHalf disabled />
            {`(${formatNumber(item.countAssessment)} Đánh giá)`}
          </Space>
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <LuBookMarked style={{ marginRight: 5 }} />
              {item.countTopics}
            </Flex>

            <Flex align='center'>
              <LuUsers style={{ marginRight: 5 }} />
              {`(${formatNumber(item.countStudents)} Học viên)`}
            </Flex>
            <Flex align='center'>
              <LuCalendarDays style={{ marginRight: 5 }} />
              {item?.class.length > 0
                ? item?.class?.slice(0, 1).map((i: any) => (
                    <Popover
                      content={
                        <Space direction='vertical'>
                          {item.class.map((d: any, id: number) => (
                            <p key={d}>
                              {id + 1}. <b>{moment(d.startDate).format('DD/MM/YYYY')}</b>
                            </p>
                          ))}
                        </Space>
                      }
                      title='Lịch khai giảng'
                    >
                      <Space className='link'>
                        {moment(i.startDate).format('DD/MM/YYYY')}
                        {item?.class?.length > 1 && <p>+ {item?.class.length - 1}</p>}
                      </Space>
                    </Popover>
                  ))
                : 'Đang cập nhật'}
            </Flex>
          </Flex>

          <Divider style={{ margin: '5px 0' }} />

          <Flex justify='space-between'>
            <PriceCalculator price={item.plan === 'FREE' ? 0 : item.cost} discount={0} showTotal priceSize={20} />
            <ButtonCustom type='primary' href={'/courses/' + item._id}>
              Xem chi tiết
            </ButtonCustom>
          </Flex>
        </Space>
      </Card>
    )
  }

  return (
    <div>
      <Header
        title={fullSize ? undefined : <h3>Khóa học nổi bật</h3>}
        titleSize={fullSize ? undefined : 30}
        padding={'25px 0 50px 0'}
        size={fullSize ? undefined : 'sm'}
      >
        <Space direction='vertical' className={'sp100'}>
          <LoadingCustom loading={loading} tip='Vui lòng chờ...'>
            {coursesData?.totalDocs === 0 ? (
              <EmptyCustom description='Hiện không có khóa học nào' />
            ) : (
              <Row gutter={[12, 12]}>
                {coursesData?.docs?.slice(0, maxLength).map((item) => (
                  <Col
                    span={24}
                    md={maxLength ? 24 / maxLength : 12}
                    xl={maxLength ? 24 / maxLength : 8}
                    key={item._id}
                  >
                    <RenderCourse item={item}></RenderCourse>
                  </Col>
                ))}
              </Row>
            )}
          </LoadingCustom>

          {showPagination ? (
            <PaginationCustom
              limit={6}
              dataArr={coursesData?.docs}
              totalData={coursesData?.totalDocs}
              callbackCurrent={setCurrent}
            ></PaginationCustom>
          ) : (
            <Flex justify='center' style={{ marginTop: 24 }}>
              <ButtonCustom href={'/profiles/' + coursesData?.docs?.[0]?.mentorId}>Xem thêm</ButtonCustom>
            </Flex>
          )}
        </Space>
      </Header>
    </div>
  )
}

export default MyCourses
