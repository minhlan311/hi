/* eslint-disable @typescript-eslint/no-explicit-any */
import enrollsApi from '@/apis/enrolls.api'
import { formatNumber } from '@/common'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import { EnrollsState } from '@/interface/courses'
import { useQuery } from '@tanstack/react-query'
import { Card, Col, Flex, Progress, Row, Space } from 'antd'
import { useContext, useState } from 'react'
import { LuBookMarked, LuUsers } from 'react-icons/lu'
import { MdLanguage } from 'react-icons/md'
import './MyCourse.scss'

const RenderCourse = ({ item }: { item: EnrollsState }) => {
  let percent = item.progression ? (item.progression?.done?.length / item.progression?.remains?.length) * 100 : 0

  if (isNaN(percent)) {
    percent = 0
  }

  return (
    <Card
      hoverable
      cover={
        <ImageCustom
          preview={false}
          height='160px'
          width='100%'
          src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.course?.coverMedia}
        />
      }
      size='small'
    >
      <Space direction='vertical' style={{ display: 'flex' }}>
        <Flex justify='space-between' align='center' gap={12}>
          <Card.Meta title={item.course?.name} />
        </Flex>
        <Space>
          <Avatar avtUrl={item.course?.mentor?.avatarUrl} userData={item.course?.mentor} />
          {item.course?.mentor?.fullName}
        </Space>
        <Flex align='center' justify='space-between'>
          <Space align='center'>
            <MdLanguage />
            {item.course?.category?.name}
          </Space>
          <Flex align='center'>
            <LuBookMarked style={{ marginRight: 5 }} />
            {item.course?.countTopics} bài học
          </Flex>

          <Flex align='center'>
            <LuUsers style={{ marginRight: 5 }} />
            {`(${formatNumber(item.course?.countStudents ? item.course?.countStudents : 0)} Học viên)`}
          </Flex>
        </Flex>

        <Progress percent={percent} />
        <Flex justify='flex-end'>
          <ButtonCustom type='primary' href={'/myCourseLearning/' + item.course?._id}>
            Vào học ngay
          </ButtonCustom>
        </Flex>
      </Space>
    </Card>
  )
}

export default function MyCourse() {
  const { profile } = useContext(AppContext)
  const [current, setCurrent] = useState<number>(1)

  const { data, isLoading } = useQuery({
    queryKey: ['enrollData', current],
    queryFn: () =>
      enrollsApi.findEnroll({
        filterQuery: {
          userId: profile._id,
          targetModel: 'COURSE',
        },
        options: {
          page: current,
          limit: 6,
          sort: { createdAt: -1 },
        },
      }),
  })

  const enrollData = data?.data

  if (enrollData)
    return (
      <Header title='Khóa học của tôi' padding='24px 0' size='sm'>
        {enrollData.totalDocs > 0 ? (
          <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
            <Row gutter={[24, 24]}>
              {enrollData?.docs?.map((item) => (
                <Col key={item._id} span={24} md={8}>
                  <RenderCourse item={item} />
                </Col>
              ))}
              <Col span={24}>
                <PaginationCustom callbackCurrent={setCurrent} totalData={enrollData?.totalDocs} limit={6} />
              </Col>
            </Row>
          </LoadingCustom>
        ) : (
          <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Bạn chưa tham gia khóa học nào!</h2>
        )}
      </Header>
    )
}
