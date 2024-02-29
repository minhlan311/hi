/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatNumber } from '@/common'
import { CoursesState } from '@/interface/courses'
import { Card, Col, Divider, Flex, Popover, Rate, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { GrSchedulePlay } from 'react-icons/gr'
import { LuBookMarked, LuCalendarDays, LuUsers } from 'react-icons/lu'
import { TbBrandDaysCounter } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import ImageCustom from '../ImageCustom/ImageCustom'
import PriceCalculator from '../PriceCalculator/PriceCalculator'
import './style.scss'
type Props = {
  item: CoursesState
}

const CourseCard = ({ item }: Props) => {
  const formatDate = (start: string, end: string, schedule: number) => {
    const dayOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const sm = moment(start).minutes()
    const em = moment(end).minutes()

    return `${dayOfWeek[schedule]}: ${moment(start).format(sm === 0 ? 'hh[h]' : 'hh[h]mm[p]')} - ${moment(end).format(
      em === 0 ? 'hh[h]' : 'hh[h]mm[p]',
    )}`
  }

  return (
    <Link to={'/courses/' + item._id}>
      <Card
        hoverable
        cover={
          <ImageCustom
            preview={false}
            height='180px'
            width='100%'
            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverMedia}
          />
        }
        className='card-course'
        size='small'
      >
        <Flex vertical justify='space-between' style={{ height: '100%' }}>
          <Space direction='vertical' className='sp100'>
            <Card.Meta title={item.name} className='title-course' />
            <Space>
              <Avatar avtUrl={item.mentor?.avatarUrl} userData={item.mentor} />
              {item.mentor?.fullName}
            </Space>
            <Space>
              <Rate value={item.assessment?.totalAssessmentsAverages} style={{ fontSize: 14 }} allowHalf disabled />
              {`(${formatNumber(item.countAssessment)} Đánh giá)`}
            </Space>
            <Row justify='space-between' gutter={[12, 12]}>
              <Col span={24}>
                <Flex align='center'>
                  <LuBookMarked style={{ marginRight: 5 }} />
                  SL bài học: {item.countTopics}
                </Flex>
              </Col>

              <Col span={24}>
                <Flex align='center'>
                  <LuUsers style={{ marginRight: 5 }} />
                  SL học viên đã tham gia:{' '}
                  {`${formatNumber(item.countStudents)} / ${
                    item?.class.length ? formatNumber(item?.class?.[0]?.limitStudent) : 0
                  }`}
                </Flex>
              </Col>
              <Col>
                <Flex align='center'>
                  <TbBrandDaysCounter style={{ marginRight: 5 }} />
                  {item?.class.length
                    ? `${moment(item?.class[0]?.endDate).diff(moment(item?.class[0]?.startDate), 'weeks')} Tuần học`
                    : 'Đang cập nhật'}
                </Flex>
              </Col>
              <Col>
                <Flex align='center'>
                  <LuCalendarDays style={{ marginRight: 5 }} />
                  {item?.class.length > 0
                    ? item?.class?.slice(0, 1).map((i) => (
                        <Popover
                          content={
                            <Space direction='vertical'>
                              {item.class.map((d: any, id: number) => (
                                <p key={d}>
                                  {id + 1}. <b>{moment(d.startDate).format('hh:mm DD/MM/YYYY')}</b>
                                </p>
                              ))}
                            </Space>
                          }
                          title='Lịch khai giảng'
                        >
                          <Space className='link'>
                            {moment(i.startDate).format('hh:mm DD/MM/YYYY')}
                            {item?.class?.length > 1 && <p>+ {item?.class.length - 1}</p>}
                          </Space>
                        </Popover>
                      ))
                    : 'Đang cập nhật'}
                </Flex>
              </Col>
              <Col span={24}>
                <Flex align='center'>
                  <GrSchedulePlay style={{ marginRight: 5 }} />
                  Lịch học: {!item?.class.length && 'Đang cập nhật'}
                </Flex>
                <Flex vertical style={{ marginLeft: 80 }}>
                  {item?.class.length > 0 && (
                    <ul>
                      {item.class[0]?.event?.schedules?.slice(0, 4).map((num, index) =>
                        index < 3 ? (
                          <li key={num}>{formatDate(item.class[0].startDate, item.class[0].endDate, num)}</li>
                        ) : (
                          <Popover
                            content={
                              <Space direction='vertical'>
                                {item.class?.[0]?.event.schedules?.map((num, id) => (
                                  <p key={num}>
                                    {id + 1}. <b>{formatDate(item.class[0].startDate, item.class[0].endDate, num)}</b>
                                  </p>
                                ))}
                              </Space>
                            }
                            title='Lịch khai giảng'
                          >
                            <p className='link'>Xem thêm</p>
                          </Popover>
                        ),
                      )}
                    </ul>
                  )}
                </Flex>
              </Col>
            </Row>
          </Space>
          <div>
            <Divider style={{ margin: '5px 0' }} />

            <Flex justify='space-between'>
              <PriceCalculator price={item.plan === 'FREE' ? 0 : item.cost} discount={0} showTotal priceSize={20} />
            </Flex>
          </div>
        </Flex>
      </Card>
    </Link>
  )
}

export default CourseCard
