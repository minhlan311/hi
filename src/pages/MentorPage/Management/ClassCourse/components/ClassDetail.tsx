import classApi from '@/apis/class.api'
import eventApi from '@/apis/event.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { Attendance, EventState } from '@/interface/event'
import { UserState } from '@/interface/user'
import { useQuery } from '@tanstack/react-query'
import { Col, Descriptions, Progress, Row, Space, Table } from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import { TbListDetails } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import AttendanceDetail from './AttendanceDetail'
/* eslint-disable @typescript-eslint/no-explicit-any */

const ClassDetail = () => {
  const location = useLocation().pathname
  const classId = location.split('/')?.[3]
  const [openDetail, setOpenDetail] = useState<boolean>(false)

  const [eventData, setEventData] = useState<{ docs: EventState[]; limit: number; page: number; totalDocs: number }>()
  const [attendanceData, setAttendanceData] = useState<{ name: string; data: Attendance[] }>()
  const { data: classData, isLoading } = useQuery({
    queryKey: ['classOne', classId],
    queryFn: () => classApi.getOneClass(classId),
    enabled: Boolean(classId),
  })

  const data = classData?.data

  document.title = data?.title + ' | Ucam'
  const [page, setPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)
  const tableColumns: any = [
    {
      title: 'STT',
      key: 'STT',
      align: 'center',
      width: '5%',
      render: (_: any, _a: UserState, index: number) => index + 1,
    },
    {
      title: 'Họ tên',
      key: 'fullName',
      dataIndex: 'fullName',
      render: (_: any, record: UserState) => (
        <Link className='link' to={`/profiles/${record._id}`}>
          {record.fullName}
        </Link>
      ),
    },
    {
      title: 'Ngày sinh',
      key: 'birthday',
      width: '15%',
      render: (_: any, record: UserState) => moment(record.birthday).format('DD/MM/YYYY'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
      render: (phoneNumber: string) => {
        if (typeof phoneNumber !== 'string' || phoneNumber.length < 3) {
          return phoneNumber
        }

        const lastThreeDigits = phoneNumber.slice(-3)
        const hiddenPart = '*'.repeat(phoneNumber.length - 3)
        const maskedPhoneNumber = hiddenPart + lastThreeDigits

        return maskedPhoneNumber
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Lộ trình học',
      render: (record: UserState) => (
        <Progress
          percent={(record?.progression?.done.length / (record?.progression?.remains.length + 1)) * 100}
          format={(percent) => percent?.toFixed(0) + '%'}
        />
      ),
    },
  ]

  const attendanceColumns: any = [
    {
      title: 'STT',
      key: 'STT',
      align: 'center',
      width: '5%',
      render: (_: any, _a: EventState, index: number) => index + 1,
    },
    {
      title: 'Buổi học',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Thời gian',
      key: 'start',
      width: '15%',
      sorter: (a: any, b: any) => moment(a.start).millisecond() - moment(b.start).millisecond(),
      render: (_: any, record: EventState) =>
        `     ${moment(record.start).format('HH:mmA')} - ${moment(record.end).format('HH:mmA')}
                    ${moment(record.end).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Điểm danh',
      key: 'attendance',
      align: 'center',
      width: '15%',
      render: (_: any, record: EventState) =>
        `${record.attendance.filter(
          (obj, index, self) =>
            obj.userId !== record.mentorId && index === self.findIndex((o) => o.userId === obj.userId),
        )?.length}/${data?.countStudents}`,
    },

    {
      title: 'Ghi chú',
      key: 'note',
    },
    {
      title: 'Hành động',
      width: '10%',
      key: 'action',
      align: 'center',
      render: (_: any, record: EventState) => (
        <ButtonCustom
          icon={<TbListDetails size={18} />}
          tooltip='Xem chi tiết'
          type='text'
          onClick={() => {
            setOpenDetail(true)
            setAttendanceData({ name: record.name as string, data: record.attendance })
          }}
        ></ButtonCustom>
      ),
    },
  ]

  return (
    <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
      <Row>
        <Col span={24}>
          <Space direction='vertical' size='large'>
            <h2>{data?.title}</h2>
            <Descriptions column={4}>
              <Descriptions.Item label='Khóa học'>
                <b>{data?.courseData?.name}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Thời gian'>
                <b>{`${moment(data?.startDate).format('DD/MM/YYYY')} - ${moment(data?.endDate).format(
                  'DD/MM/YYYY',
                )}`}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Sĩ số'>
                <b>{data?.countStudents}</b>
              </Descriptions.Item>

              <Descriptions.Item label='Số buổi đã học'>
                <b>
                  {eventData &&
                    eventData.docs?.filter((item) => data?._id === item.classId && item.attendance.length > 0).length}
                </b>
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Col>
        <Col span={24}>
          <TabsCustom
            data={[
              {
                name: 'Học trực tuyến',
                id: 'online',
                children: (
                  <Space direction='vertical' className='sp100'>
                    <FilterAction
                      type='event'
                      apiFind={eventApi.getEvent}
                      keyFilter='eventsData'
                      filterQuery={{ classId: data?._id }}
                      sort={{ start: -1 }}
                      checkQuery={Boolean(data?._id)}
                      callBackData={setEventData}
                      page={page}
                      limit={10}
                    ></FilterAction>
                    <Table
                      bordered
                      scroll={{
                        x: 1024,
                      }}
                      dataSource={eventData?.docs}
                      columns={attendanceColumns}
                      pagination={{
                        current: eventData?.page,
                        pageSize: eventData?.limit,
                        total: eventData?.totalDocs,
                        onChange: (p) => setPage(p),
                      }}
                    />
                  </Space>
                ),
              },
              {
                name: 'Danh sách lớp',
                id: 'studenList',
                children: (
                  <Table
                    bordered
                    scroll={{
                      x: 1024,
                    }}
                    dataSource={data?.studentList}
                    columns={tableColumns}
                    pagination={{
                      current: pages,
                      pageSize: 10,
                      total: data?.studentList?.length,
                      onChange: (p) => setPages(p),
                    }}
                  />
                ),
              },
            ]}
          ></TabsCustom>
        </Col>
        <AttendanceDetail
          isOpen={openDetail}
          setOpen={setOpenDetail}
          attendanceList={attendanceData ? attendanceData : null}
        ></AttendanceDetail>
      </Row>
    </LoadingCustom>
  )
}

export default ClassDetail
