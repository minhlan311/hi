/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatNumber } from '@/common'
import { CoursesState } from '@/interface/courses'
import { Card, Col, Divider, Flex, Popover, Rate, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { LuBookMarked, LuCalendarDays, LuUsers } from 'react-icons/lu'
import { TbBrandDaysCounter } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import ImageCustom from '../ImageCustom/ImageCustom'
import PriceCalculator from '../PriceCalculator/PriceCalculator'

type Props = {
  item: CoursesState
}

const CourseCard = ({ item }: Props) => {
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
        size='small'
      >
        <Space direction='vertical' style={{ display: 'flex' }}>
          <Card.Meta title={item.name} />
          <Space>
            <Avatar avtUrl={item.mentor?.avatarUrl} userData={item.mentor} />
            {item.mentor?.fullName}
          </Space>
          <Space>
            <Rate value={item.assessment?.totalAssessmentsAverages} style={{ fontSize: 14 }} allowHalf disabled />
            {`(${formatNumber(item.countAssessment)} Đánh giá)`}
          </Space>
          <Row justify='space-between' gutter={[12, 12]}>
            <Col>
              <Flex align='center'>
                <LuBookMarked style={{ marginRight: 5 }} />
                {item.countTopics} Bài
              </Flex>
            </Col>

            <Col>
              <Flex align='center'>
                <LuUsers style={{ marginRight: 5 }} />
                {`${formatNumber(item.countStudents)} / ${
                  item?.class.length ? formatNumber(item?.class?.[0]?.limitStudent) : 0
                }`}
              </Flex>
            </Col>
            <Col>
              <Flex align='center'>
                <TbBrandDaysCounter style={{ marginRight: 5 }} />
                {item?.class.length
                  ? `${moment(item?.class[0]?.endDate).diff(moment(item?.class[0]?.startDate), 'weeks')} Tuần`
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
            {/* <Col>
              <Flex align='center'>
                <MdOutlineViewDay style={{ marginRight: 5 }} />
                Ca 2/4/5
              </Flex>
            </Col> */}
          </Row>

          <Divider style={{ margin: '5px 0' }} />

          <Flex justify='space-between'>
            <PriceCalculator price={item.plan === 'FREE' ? 0 : item.cost} discount={0} showTotal priceSize={20} />
          </Flex>
        </Space>
      </Card>
    </Link>
  )
}

export default CourseCard
