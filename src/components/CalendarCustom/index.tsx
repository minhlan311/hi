/* eslint-disable @typescript-eslint/no-explicit-any */
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import TuiCalendar from '@toast-ui/react-calendar'
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Space } from 'antd'
import moment from 'moment-timezone'
import { useEffect, useRef, useState } from 'react'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { ISchedule } from 'tui-calendar'
import useResponsives from '@/hooks/useResponsives'

const CalendarCustom = () => {
  const calRef = useRef(null)
  const { xl, xxl } = useResponsives()
  const [openModal, setOpenModal] = useState(false)
  const [view, setView] = useState<string>('week')
  const [alltime, setAllTime] = useState(false)
  const [form] = Form.useForm()
  const [events, setEvents] = useState([
    {
      id: '1',
      calendarId: '0',
      title: 'FE Workshop',
      dueDateClass: '',
      isAllDay: true,
      backgroundColor: 'rgb(211 214 243)',
    },
  ])

  const handleSubmit = () => {
    form.submit()
  }

  const handleFinish = (values: any) => {
    setEvents((prev: any[]) => [
      ...prev,
      {
        id: parseInt(prev[prev.length - 1].id + 1).toString(),
        calendarId: parseInt(prev[prev.length - 1].calendarId + 1).toString(),
        title: values.title,
        start: values.time[0].$d,
        end: values.time[1].$d,
        backgroundColor: '#019d44b5',
        color: 'white',
      },
    ])

    setOpenModal(!openModal)
    form.resetFields()
    console.log(alltime)
  }

  useEffect(() => {
    form.setFieldsValue({ time: moment(new Date()), date: moment(new Date()) })
  }, [])

  // TODO
  useEffect(() => {
    if (calRef.current) {
      // const inst = calRef.current?.getInstance()
      // console.log(inst.getDateRangeEnd())
      console.log(calRef.current)
    }
  }, [calRef])

  const onBeforeCreateSchedule = (scheduleData: any): void => {
    const { calendar } = scheduleData
    const schedule: ISchedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw['class'],
      },
      state: scheduleData.state,
    }

    if (calendar) {
      schedule.calendarId = calendar.id
      schedule.color = calendar.color
      schedule.bgColor = calendar.bgColor
      schedule.borderColor = calendar.borderColor
    }

    if (calRef.current) {
      // calRef.current?.getInstance().createSchedules([schedule])
    }
  }

  return (
    <Space direction='vertical' className='sp100'>
      <Row justify='space-between'>
        <Col span={10}>
          <Space>
            <ButtonCustom>Hôm nay</ButtonCustom>
            <ButtonCustom icon={<AiOutlineLeft />}></ButtonCustom>
            <ButtonCustom icon={<AiOutlineRight />}></ButtonCustom>
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
            <ButtonCustom type='primary' onClick={() => setOpenModal(true)}>
              Tạo cuộc họp
            </ButtonCustom>
          </Space>
        </Col>
      </Row>
      <TuiCalendar
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
        useCreationPopup
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        useDetailPopup
        isReadOnly={false}
      />

      <Modal title='Tạo cuộc họp' open={openModal} onCancel={() => setOpenModal(!openModal)} onOk={handleSubmit}>
        <Form onFinish={handleFinish} form={form} layout='vertical'>
          <Form.Item label='Tiêu đề cuộc họp' name='title' rules={[{ required: true }]}>
            <Input placeholder='Nhập tiêu đề' />
          </Form.Item>
          <Form.Item label='Mô tả' name='desc' rules={[{ required: true }]}>
            <Input placeholder='Nhập mô tả' />
          </Form.Item>

          <Form.Item label='Thời gian cuộc họp' name='time' rules={[{ required: true }]}>
            <DatePicker.RangePicker showTime className='sp100' />
          </Form.Item>

          <Space>
            <Form.Item name='allTime'>
              <Checkbox onChange={(e) => setAllTime(e.target.checked)} checked={alltime}>
                Cả ngày
              </Checkbox>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default CalendarCustom
