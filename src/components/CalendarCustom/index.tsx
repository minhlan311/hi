import ButtonCustom from '../ButtonCustom/ButtonCustom'
import Calendar from '@toast-ui/react-calendar'
import categoryApi from '@/apis/categories.api'
import classApi from '@/apis/class.api'
import moment from 'moment-timezone'
import useResponsives from '@/hooks/useResponsives'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { AppContext } from '@/contexts/app.context'
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Space } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import openNotification from '../Notification'
import { EventObject } from '@/interface/class'
import { ISchedule } from 'tui-calendar'
/* eslint-disable @typescript-eslint/no-explicit-any */

const CalendarCustom = () => {
  const calRef = useRef<any>(null)
  const { profile } = useContext(AppContext)
  const { xl, xxl } = useResponsives()
  const [openModal, setOpenModal] = useState(false)
  const [view, setView] = useState<string>('week')
  const [form] = Form.useForm()
  const [events, setEvents] = useState<ISchedule[]>([])
  const [eventDetail, setEventDetail] = useState<ISchedule>()

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af',
      })
    },
  })

  const { data: classEvents } = useQuery({
    queryKey: ['classEvents'],
    queryFn: () => {
      return classApi.getClass({
        createdById: profile._id,
      })
    },
  })

  useEffect(() => {
    if (classEvents?.data?.totalDocs) {
      const newEvent = classEvents?.data?.docs?.map((item) => {
        const currentTime = moment()
        const startTime = moment(item.startAt)
        const endTime = moment(item.endAt)
        const between = currentTime.isBetween(startTime, endTime)
        const endClass = currentTime.isAfter(endTime)

        console.log(between, endClass)

        return {
          id: item._id,
          title: item.title,
          body: item.description,
          calendarId: item.courseId,
          start: item.startAt,
          end: item.endAt,
          backgroundColor: '#019d44b5',
          color: 'var(--white)',
          location: 'Class online',
          category: 'time',
          attendees: [item.createdBy.fullName],
          isReadOnly: profile._id !== item.createdById,
          isPrivate: true,
          recurrenceRule: between ? '1' : '',
          dueDateClass: endClass ? '1' : '',
        }
      })

      setEvents(newEvent as unknown as ISchedule[])
    }
  }, [classEvents])

  const { mutate, isLoading, status, isSuccess } = useMutation({
    mutationFn: (body) => classApi.createClass(body),
  })

  const subjectList = courses?.data?.docs?.map((sj) => ({
    value: sj._id,
    label: sj.name,
  }))

  const handleSubmit = () => {
    form.submit()
  }

  const handleFinish = (values: any) => {
    const payload = {
      title: values.title,
      description: values.description,
      courseId: values.courseId,
      startDate: values.time[0].$d,
      endDate: values.time[1].$d,
      startAt: values.time[0].$d,
      endAt: values.time[1].$d,
      schedules: [2, 4, 6],
    }

    mutate(payload as unknown as any)
    setOpenModal(!openModal)
    form.resetFields()
  }

  useEffect(() => {
    if (status === 'success' && (isSuccess || !eventDetail)) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: eventDetail ? 'Cập nhật lịch thành công' : 'Tạo lịch thành công',
      })

      form.resetFields()
    }
  }, [isLoading])

  const calAction: any = calRef?.current?.calendarInstance

  useEffect(() => {
    if (calAction) {
      calAction.setTheme({
        common: {
          holiday: {
            color: 'var(--red)',
          },
        },
      })
      calAction.setOptions({
        template: {
          popupIsAllday() {
            return 'Cả ngày'
          },
          popupStateFree() {
            return 'Miễn phí'
          },
          popupStateBusy() {
            return 'Có phí'
          },
          titlePlaceholder() {
            return 'Tiêu đề cuộc họp'
          },
          startDatePlaceholder() {
            return 'Thời gian bắt đầu'
          },
          endDatePlaceholder() {
            return 'Thời gian kết thúc'
          },
          popupSave() {
            return 'Tạo lịch'
          },
          popupUpdate() {
            return 'Cập nhật'
          },
          popupEdit() {
            return 'Sửa'
          },
          popupDelete() {
            return 'Xóa'
          },
          popupDetailTitle({ title }: EventObject) {
            return title
          },
          popupDetailDate({ start, end }: EventObject) {
            return (
              <b style={{ color: 'var(--light-gray-2)' }}>{`${moment(start.d.d as unknown as string).format(
                'HH:mm DD/MM/YY',
              )} - ${moment(end.d.d as unknown as string).format('HH:mm DD/MM/YY')}`}</b>
            )
          },

          popupDetailAttendees({ attendees = [] }) {
            return <b>{attendees.join(', ')}</b>
          },
          popupDetailLocation({ location }: EventObject) {
            return <b>{location}</b>
          },
          popupDetailState({ state }: EventObject) {
            return <b>{state === 'Busy' ? 'Có phí' : 'Miễn phí'}</b>
          },
          popupDetailBody({ recurrenceRule, dueDateClass, id, body }: ISchedule) {
            return `<Space direction='vertical'>
                <p>${body}</p>
                ${
                  recurrenceRule && !dueDateClass
                    ? `<a href="/live/index.html?room_id=${id}"><button class="buttJoin">Tham gia</button></a>`
                    : '<button class="buttJoin disabledButt">Tham gia</button>'
                }
              
              </Space>`
          },
        },
        week: {
          dayNames: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        },
        month: {
          dayNames: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        },
      })
    }
  }, [calAction])

  const onBeforeCreateEvent = (eventData: any): void => {
    const { calendar } = eventData
    const event: any = {
      id: Math.random().toString(),
      title: eventData.title,
      isAllDay: eventData.isAllDay,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: eventData.location,
      state: eventData.state,
      backgroundColor: '#019d44b5',
      color: 'white',
    }

    if (calendar) {
      event.calendarId = calendar.id
      event.color = calendar.color
      event.bgColor = calendar.bgColor
      event.borderColor = calendar.borderColor
    }

    calAction.createEvents([event])
  }

  const onBeforeUpdateEvent = (res: any) => {
    const { event, changes } = res
    const payload = {
      id: event.id,
      title: changes ? changes.title : event.title,
      description: changes ? changes.body : event.body,
      startDate: changes ? changes.start : event.start,
      startAt: changes ? changes.start : event.start,
      endDate: changes ? changes.end : event.end,
      endAt: changes ? changes.end : event.end,
      schedules: [1, 2],
    }
    setEventDetail(payload)
    calAction.updateEvent(event.id, event.calendarId, changes)
  }

  const onBeforeDeleteEvent = (res: any) => {
    calAction.deleteEvent(res.id, res.calendarId)
  }

  return (
    <Space direction='vertical' className='sp100'>
      <Row justify='space-between'>
        <Col span={10}>
          <Space>
            <ButtonCustom onClick={() => calAction.today()}>Hôm nay</ButtonCustom>
            <ButtonCustom icon={<AiOutlineLeft />} onClick={() => calAction.prev()}></ButtonCustom>
            <ButtonCustom icon={<AiOutlineRight />} onClick={() => calAction.next()}></ButtonCustom>
            <Select
              onChange={(e) => setView(e)}
              defaultValue='week'
              options={[
                {
                  value: 'day',
                  label: 'Ngày',
                },
                {
                  value: 'week',
                  label: 'Tuần',
                },
                {
                  value: 'month',
                  label: 'Tháng',
                },
              ]}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Input.Search placeholder='Tìm kiếm' />
            {!profile.isMentor ? (
              <></>
            ) : (
              <ButtonCustom type='primary' onClick={() => setOpenModal(true)}>
                Tạo cuộc họp
              </ButtonCustom>
            )}
          </Space>
        </Col>
      </Row>
      <Calendar
        ref={calRef}
        height={(xl && '67vh') || (xxl && '75vh') || '80vh'}
        events={events}
        view={view}
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
          {
            id: '1',
            name: 'Company',
            bgColor: '#00a9ff',
            borderColor: '#00a9ff',
          },
        ]}
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
          taskView: false,
          eventView: ['time'],
        }}
        usageStatistics={false}
        useCreationPopup={true}
        useFormPopup={true}
        useDetailPopup={true}
        disableDblClick={false}
        onBeforeCreateEvent={onBeforeCreateEvent}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
        isReadOnly={!profile.isMentor}
      />

      <Modal title='Tạo cuộc họp' open={openModal} onCancel={() => setOpenModal(!openModal)} onOk={handleSubmit}>
        <Form onFinish={handleFinish} form={form} layout='vertical'>
          <Form.Item label='Tiêu đề cuộc họp' name='title' rules={[{ required: true }]}>
            <Input placeholder='Nhập tiêu đề' />
          </Form.Item>
          <Form.Item label='Mô tả' name='description'>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>
          <Form.Item label='Khóa học' name='courseId' rules={[{ required: true }]}>
            <Select placeholder='Chọn khóa học' options={subjectList} />
          </Form.Item>
          <Form.Item label='Thời gian cuộc họp' name='time' rules={[{ required: true }]}>
            <DatePicker.RangePicker
              className='sp100'
              showTime={{
                format: 'HH:mm',
              }}
              format={'HH:mm DD/MM/YYYY'}
            />
          </Form.Item>

          <Space>
            <Form.Item name='allDay'>
              <Checkbox>Cả ngày</Checkbox>
            </Form.Item>
            <Form.Item name='everyWeek'>
              <Checkbox>Hàng tuần</Checkbox>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default CalendarCustom
