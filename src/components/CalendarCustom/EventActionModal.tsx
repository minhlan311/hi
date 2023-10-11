/* eslint-disable @typescript-eslint/no-explicit-any */
import classApi from '@/apis/class.api'
import eventApi from '@/apis/event.api'
import userApi from '@/apis/user.api'
import { AppContext } from '@/contexts/app.context'
import { EventState } from '@/interface/event'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Col, DatePicker, Form, Modal, Row } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import openNotification from '../Notification'
import SelectCustom from '../SelectCustom/SelectCustom'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  eventDetail: EventState | null
  selectTime?: { start: Date; end: Date } | null
}

const EventActionModal = (props: Props) => {
  const { open, setOpen, eventDetail, selectTime } = props
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm()
  const [allDay, setAllDay] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (body) => (eventDetail ? eventApi.updateEvent(body) : eventApi.createEvent(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventsData'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: eventDetail ? 'Cập nhật sự kiện thành công' : 'Tạo sự kiện thành công',
      })
      form.resetFields()
    },
  })

  const handleSubmit = () => {
    form.submit()
  }

  const handleFinish = (values: any) => {
    const payload = {
      id: eventDetail?._id,
      classId: values.classId,
      start: allDay ? moment(values.time[0].$d).startOf('day') : moment(values.time[0].$d),
      end: allDay ? moment(values.time[1].$d).endOf('day') : moment(values.time[1].$d),
      students: values.students,
    }
    mutate(payload as unknown as any)
    setOpen(!open)
    form.resetFields()
  }

  useEffect(() => {
    if (eventDetail) {
      form.setFieldsValue({
        classId: eventDetail.classId,
        students: eventDetail.students,
        status: eventDetail.status,
        time: [dayjs(eventDetail.start), dayjs(eventDetail.end)],
      })
    }
  }, [eventDetail])

  useEffect(() => {
    if (selectTime) {
      form.setFieldsValue({
        time: [dayjs(selectTime.start), dayjs(selectTime.end)],
      })
    }
  }, [selectTime])

  return (
    <Modal
      title={eventDetail ? 'Cập nhật sự kiện' : 'Tạo sự kiện'}
      open={open}
      onCancel={() => setOpen(!open)}
      onOk={handleSubmit}
      width={'40vw'}
      okText={eventDetail ? 'Lưu thay đổi' : 'Tạo sự kiện'}
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
                defaultValue={eventDetail?.classId}
                filterQuery={{ createdById: profile._id }}
                allowClear
              />
            </Form.Item>
          </Col>

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
        <Row gutter={24}>
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
              <Checkbox onChange={(e) => setAllDay(e.target.checked)}>Cả ngày</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default EventActionModal
