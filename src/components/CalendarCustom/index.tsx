import { useState, useEffect, useRef, useCallback } from 'react'
import Calendar from '@toast-ui/react-calendar'
import { ISchedule, ICalendarInfo } from 'tui-calendar'

import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'

import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Space, TimePicker } from 'antd'
import moment from 'moment-timezone'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

type Props = {}

const CalendarCustom = (props: Props) => {
  const calRef = useRef()
  const [openModal, setOpenModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [alltime, setAllTime] = useState(false)

  const [form] = Form.useForm()

  const showModal = (e) => {
    const calendar = e.calendar
    const schedule = calendar.getSchedule(e.schedule.id, e.schedule.calendarId)
    const startDate = moment(schedule.start.toDate())
    const endDate = moment(schedule.end.toDate())

    setSelectedDate([startDate, endDate])
    setOpenModal(true)
  }

  const onClickSchedule = (e) => {
    const { calendarId, id } = e.schedule
    const el = cal.current.calendarInst.getElement(id, calendarId)
    console.log(e, el.getBoundingClientRect())
  }

  const handleSubmit = () => {
    setOpenModal(!openModal)
    form.submit()
  }

  const handleFinish = (values: any) => {
    console.log(values)
  }

  useEffect(() => {
    if (selectedDate) {
      setOpenModal(true)
      form.setFieldsValue({ start: moment(selectedDate), date: moment(selectedDate) })
    }

    if (!selectedDate) {
      form.setFieldsValue({ startTime: moment(new Date()), date: moment(new Date()) })
    }
  }, [selectedDate])

  useEffect(() => {
    if (calRef) console.log(calRef)
  }, [calRef])

  const handleClick = () => {
    if (calRef) {
      const inst = calRef.current.getInstance()
      console.log(inst.getDate())
    }
  }
  console.log(alltime)

  return (
    <Space direction='vertical' className='sp100'>
      <Row justify='space-between'>
        <Col span={6}>
          <Input.Search placeholder='Tìm kiếm' />
        </Col>
        <ButtonCustom type='primary' onClick={() => setOpenModal(true)}>
          Tạo cuộc họp
        </ButtonCustom>
      </Row>
      <Calendar
        ref={calRef}
        height='500px'
        onClickSchedule={(e) => {
          console.log(e.schedule)
        }}
      />

      <Modal title='Tạo cuộc họp' open={openModal} onCancel={() => setOpenModal(!openModal)} onOk={handleSubmit}>
        <Form onFinish={handleFinish} form={form} layout='vertical'>
          <Form.Item label='Tiêu đề cuộc họp' name='title'>
            <Input placeholder='Nhập tiêu đề' />
          </Form.Item>
          <Form.Item label='Mô tả' name='desc'>
            <Input placeholder='Nhập mô tả' />
          </Form.Item>
          <Row justify='space-between'>
            <Space.Compact>
              <Form.Item label='Bắt đầu' name='startTime'>
                <TimePicker />
              </Form.Item>
              <Form.Item label='Kết thúc' name='endTime'>
                <TimePicker disabled={alltime} />
              </Form.Item>
            </Space.Compact>
            <Form.Item label='Ngày' name='date'>
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
          </Row>
          <Form.Item name='allTime'>
            <Checkbox onChange={(e) => setAllTime(e.target.checked)}>Cả ngày</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}

export default CalendarCustom
