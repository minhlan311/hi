/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import userApi from '@/apis/user.api'
import { AppContext } from '@/contexts/app.context'
import { EventState } from '@/interface/event'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Switch, TimePicker } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import openNotification from '../Notification'
import SelectCustom from '../SelectCustom/SelectCustom'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  eventDetail: EventState | null
}

const EventActionModal = (props: Props) => {
  const { open, setOpen, eventDetail } = props
  const { profile } = useContext(AppContext)

  const [form] = Form.useForm()

  const [allDay, setAllDay] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [plan, setPlan] = useState('')
  const queryClient = useQueryClient()
  const { mutate, isLoading, status, isSuccess } = useMutation({
    mutationFn: (body) => (eventDetail ? classApi.updateClass(body) : classApi.createClass(body)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['eventsData'] }),
  })

  const { data: categorys } = useQuery({
    queryKey: ['categorys'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af',
      })
    },
  })

  const subjectList = categorys?.data?.docs?.map((sj) => ({
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
      startAt: allDay
        ? moment(values.time[0].$d).startOf('day').format('HH:mm')
        : moment(values.time[0].$d).format('HH:mm'),
      endAt: allDay
        ? moment(values.time[1].$d).endOf('day').format('HH:mm')
        : moment(values.time[1].$d).format('HH:mm'),
      startDate: moment(values.date[0].$d).format('YYYY-MM-DD'),
      endDate: moment(values.date[1].$d).format('YYYY-MM-DD'),
      categoryId: values.categoryId,
      students: values.students,
      isRepeat: repeat,
      plan: values.plan,
      cost: values.cost && plan === 'PREMIUM' ? parseInt(values.cost) : undefined,
      schedules: !repeat ? [] : values.schedules,
    }
    mutate(payload as unknown as any)
    setOpen(!open)
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

  const daysOfWeek = [
    { label: 'T2', value: 1 },
    { label: 'T3', value: 2 },
    { label: 'T4', value: 3 },
    { label: 'T5', value: 4 },
    { label: 'T6', value: 5 },
    { label: 'T7', value: 6 },
    { label: 'CN', value: 0 },
  ]
  const [check, setCheck] = useState(false)

  useEffect(() => {
    if (eventDetail) {
      setCheck(eventDetail.status === 'ACTIVE')

      const oldData = eventDetail.classData
      setPlan(oldData.plan)
      setRepeat(oldData.isRepeat)
      form.setFieldsValue({
        title: oldData.title,
        description: oldData.description,
        cost: oldData.cost,
        courseId: oldData.courseId,
        categoryId: oldData.categoryId,
        students: oldData.students,
      })
    }
  }, [eventDetail])

  return (
    <Modal
      title={eventDetail ? 'Cập nhật cuộc họp' : 'Tạo cuộc họp'}
      open={open}
      onCancel={() => setOpen(!open)}
      onOk={handleSubmit}
      width={'50vw'}
      okText={eventDetail ? 'Lưu thay đổi' : 'Tạo cuộc họp'}
    >
      <Form onFinish={handleFinish} form={form} layout='vertical'>
        <Row gutter={24}>
          <Col span={eventDetail ? 20 : 24}>
            <Form.Item
              label='Tiêu đề cuộc họp'
              name='title'
              rules={[{ required: true, message: 'Vui nhập tiêu đề cuộc họp' }]}
            >
              <Input placeholder='Nhập tiêu đề' />
            </Form.Item>
          </Col>
          {eventDetail && (
            <Col span={4}>
              <Form.Item label='Trạng thái' name='status'>
                <Switch checked={check} onChange={() => setCheck(!check)} />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Nhập mô tả' />
        </Form.Item>

        <Row gutter={24}>
          <Col span={24} md={10}>
            <Form.Item label='Chọn loại' name='plan' rules={[{ required: true, message: 'Vui lòng chọn loại' }]}>
              <SelectCustom
                placeholder='Chọn loại'
                options={[
                  { value: 'FREE', label: 'Miễn phí' },
                  { value: 'PREMIUM', label: 'Trả phí' },
                ]}
                onChange={(e) => setPlan(e)}
                defaultValue={plan}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={14}>
            <Form.Item label='Giá' name='cost' rules={[{ required: plan === 'PREMIUM', message: 'Vui lòng nhập giá' }]}>
              <Input type='number' placeholder='Nhập giá' disabled={plan === 'FREE'} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} md={8}>
            <Form.Item label='Khóa học' name='courseId'>
              <SelectCustom
                placeholder='Tìm kiếm khóa học'
                type='search'
                searchKey='courses'
                apiFind={courseApi.getCourses}
                filterQuery={{ createdById: profile._id }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24} md={6}>
            <Form.Item label='Môn học' name='categoryId' rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}>
              <Select placeholder='Chọn môn học' options={subjectList} />
            </Form.Item>
          </Col>
          <Col span={24} md={10}>
            <Form.Item label='Thêm người tham dự' name='students'>
              <SelectCustom
                placeholder='Tìm kiếm tham người dự'
                type='search'
                searchKey='user'
                apiFind={userApi.findUser}
                mode='multiple'
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} md={7}>
            <Form.Item
              label='Thời gian cuộc họp'
              name='time'
              rules={[{ required: !allDay, message: 'Vui lòng chọn thời gian' }]}
            >
              <TimePicker.RangePicker
                className='sp100'
                defaultValue={[dayjs(eventDetail?.classData?.startAt), dayjs(eventDetail?.classData?.endAt)]}
                format={'HH:mm'}
                disabled={allDay}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={10}>
            <Form.Item label='Ngày cuộc họp' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
              <DatePicker.RangePicker
                className='sp100'
                defaultValue={[dayjs(eventDetail?.classData?.startDate), dayjs(eventDetail?.classData?.endDate)]}
                format={'DD/MM/YYYY'}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={7}>
            <Form.Item name='allDay' label=' '>
              <Checkbox onChange={(e) => setAllDay(e.target.checked)}>Cả ngày</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} md={7}>
            <Form.Item name='repeat' noStyle>
              <Checkbox onChange={(e) => setRepeat(e.target.checked)} style={{ marginTop: 10 }}>
                Lặp lại
              </Checkbox>
            </Form.Item>
          </Col>

          <Col span={24} md={15}>
            <Form.Item name='schedules' rules={[{ required: repeat, message: 'Vui lòng chọn thứ' }]}>
              <Checkbox.Group disabled={!repeat}>
                {daysOfWeek.map((d) => (
                  <Checkbox value={d.value}>{d.label}</Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default EventActionModal
