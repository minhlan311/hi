/* eslint-disable @typescript-eslint/no-explicit-any */
import classApi from '@/apis/class.api'
import eventApi from '@/apis/event.api'
import userApi from '@/apis/user.api'
import { AppContext } from '@/contexts/app.context'
import { EventState } from '@/interface/event'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, TimePicker } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import openNotification from '../Notification'
import SelectCustom from '../SelectCustom/SelectCustom'
import examApi from '@/apis/exam.api'
import { ClassState } from '@/interface/class'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setType?: React.Dispatch<React.SetStateAction<string>>
  type: string
  eventDetail: EventState | null
  selectTime?: { start: Date; end: Date } | null
  setSelectTime?: React.Dispatch<React.SetStateAction<{ start: Date; end: Date } | null>>
}

const EventActionModal = (props: Props) => {
  const { open, setOpen, setType, type = 'event', eventDetail, selectTime, setSelectTime } = props
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm()
  const [allDay, setAllDay] = useState(false)
  const [callBackClass, setCallBackClass] = useState<ClassState[]>([])
  const [initVal, setInitVal] = useState<any>()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (body) => (eventDetail ? eventApi.updateEvent(body) : eventApi.createEvent(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventsData'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: eventDetail
          ? `Cập nhật ${type === 'test' ? 'lịch thi' : 'sự kiện'} thành công`
          : `Tạo ${type === 'test' ? 'lịch thi' : 'sự kiện'} thành công`,
      })
      form.resetFields()
      setType && setType('event')
    },
  })

  const handleSubmit = () => {
    form.submit()
  }

  const handleFinish = (values: any) => {
    if (type === 'event') {
      const payload = {
        id: eventDetail?._id,
        classId: values.classId,
        start: allDay ? moment(values.time[0].$d).startOf('day') : moment(values.time[0].$d),
        end: allDay ? moment(values.time[1].$d).endOf('day') : moment(values.time[1].$d),
        students: values.students,
      }
      mutate(payload as unknown as any)
    } else {
      const students = callBackClass.find((e) => e._id === values.classId)?.students
      const date = moment(values.date.$d).format('YYYY-MM-DD')
      const time = moment(values.time.$d).format('HH:mm')
      const start = date + ' ' + time

      const newTime = moment(values.time.$d)
        .add(values.timeTest + parseInt(values.timeAdd), 'minutes')
        .format('HH:mm')

      const end = date + ' ' + newTime

      if (students) {
        const payload = {
          id: eventDetail?._id,
          classId: values.classId,
          testId: values.testId,
          type: 'TEST',
          start: start,
          end: end,
          students: students,
        }
        mutate(payload as unknown as any)
      }
    }

    setOpen(!open)
    form.resetFields()
  }

  const testTime = [
    { label: '15 phút', value: 15 },
    { label: '35 phút', value: 35 },
    { label: '45 phút', value: 45 },
    { label: '60 phút', value: 60 },
    { label: '90 phút', value: 90 },
    { label: '120 phút', value: 120 },
  ]

  useEffect(() => {
    if (eventDetail) {
      if (eventDetail.testId) {
        const examTime = dayjs(eventDetail.end).diff(dayjs(eventDetail.start)) / 60000
        const selectedOption = testTime.find(
          (item) =>
            item.value <= examTime &&
            (testTime[testTime.indexOf(item) + 1]?.value > examTime || item.value === examTime),
        )
        if (selectedOption)
          setInitVal({
            classId: eventDetail.classId,
            testId: eventDetail.testId,
            students: eventDetail.students,
            status: eventDetail.status,
            date: dayjs(eventDetail.start),
            time: dayjs(eventDetail.start),
            timeTest: selectedOption.value,
            timeAdd: examTime - selectedOption.value,
          })
      } else
        setInitVal({
          classId: eventDetail.classId,
          students: eventDetail.students,
          status: eventDetail.status,
          time: [dayjs(eventDetail.start), dayjs(eventDetail.end)],
        })
    }
  }, [eventDetail])

  useEffect(() => {
    if (!selectTime) {
      form.setFieldsValue({
        time: undefined,
      })
    } else
      form.setFieldsValue({
        time: [dayjs(selectTime.start), dayjs(selectTime.end)],
      })
  }, [selectTime])

  console.log(initVal)

  return (
    <Modal
      title={
        eventDetail
          ? `Cập nhật ${type === 'test' ? 'lịch thi' : 'sự kiện'}`
          : `Tạo ${type === 'test' ? 'lịch thi' : 'sự kiện'}`
      }
      open={open}
      onCancel={() => {
        setOpen(!open)
        setSelectTime && setSelectTime(null)
      }}
      onOk={handleSubmit}
      width={'40vw'}
      okText={eventDetail ? 'Lưu thay đổi' : `Tạo ${type === 'test' ? 'lịch thi' : 'sự kiện'}`}
    >
      <Form onFinish={handleFinish} form={form} layout='vertical'>
        <Row gutter={12}>
          <Col span={24} md={eventDetail ? 9 : 12}>
            <Form.Item label='Lớp học' name='classId' rules={[{ required: true, message: 'Vui lòng chọn lớp' }]}>
              <SelectCustom
                placeholder='Tìm kiếm lớp học'
                type='search'
                searchKey='classId'
                labelKey='title'
                apiFind={classApi.getClass}
                filterQuery={{ createdById: profile._id }}
                allowClear
                callBackDataSearch={setCallBackClass}
              />
            </Form.Item>
          </Col>

          {type === 'event' ? (
            <Col span={24} md={eventDetail ? 9 : 12}>
              <Form.Item
                label='Thêm người tham dự'
                name='students'
                rules={[{ required: true, message: 'Vui lòng chọn người dự' }]}
              >
                <SelectCustom
                  placeholder='Tìm kiếm tham người dự'
                  type='search'
                  searchKey='user'
                  apiFind={userApi.findUser}
                  filterQuery={{ _id: profile._id }}
                  defaultValue={eventDetail?.classData.students}
                  mode='multiple'
                  allowClear
                  selectAll
                  selectAllLabel='Chọn tất cả'
                />
              </Form.Item>
            </Col>
          ) : (
            <Col span={24} md={eventDetail ? 9 : 12}>
              <Form.Item label='Bài thi' name='testId' rules={[{ required: true, message: 'Vui lòng chọn bài thi' }]}>
                <SelectCustom
                  placeholder='Tìm kiếm bài thi'
                  type='search'
                  searchKey='exams'
                  apiFind={examApi.findExam}
                  filterQuery={{ createdById: profile._id }}
                  defaultValue={eventDetail?.classData.students}
                />
              </Form.Item>
            </Col>
          )}

          {eventDetail && (
            <Col span={6}>
              <Form.Item label='Trạng thái' name='status'>
                <SelectCustom
                  placeholder='Chọn trạng thái'
                  defaultValue={eventDetail?.status}
                  options={[
                    { label: 'Hoạt động', value: 'ACTIVE' },
                    { label: 'Ẩn', value: 'INACTIVE' },
                    { label: 'Khóa', value: 'LOCK' },
                    { label: 'Hủy', value: 'CANCEL' },
                  ]}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        {type === 'event' ? (
          <Row gutter={12}>
            <Col span={24} md={16}>
              <Form.Item
                label='Thời gian cuộc họp'
                name='time'
                rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
              >
                <DatePicker.RangePicker format='HH:mm DD-MM-YYYY' showTime />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item name='allDay' label=' '>
                <Checkbox onChange={(e) => setAllDay(e.target.checked)} checked={allDay}>
                  Cả ngày
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item label='Ngày thi' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
                <DatePicker className='sp100' placeholder='Chọn ngày thi' format={'DD-MM-YYYY'} />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item
                label='Thời gian thi'
                name='time'
                rules={[{ required: true, message: 'Vui lòng chọn thời gian thi' }]}
              >
                <TimePicker format={'HH:mm'} className='sp100' />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item
                label='Thời làm bài'
                name='timeTest'
                rules={[{ required: true, message: 'Vui lòng chọn thời gian làm bài' }]}
              >
                <SelectCustom placeholder='Chọn thời gian' options={testTime} />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label='Thời gian cộng thêm' name='timeAdd'>
                <Input type='number' placeholder='Nhập thời gian thêm' />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  )
}

export default EventActionModal
