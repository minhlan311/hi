/* eslint-disable @typescript-eslint/no-explicit-any */
import classApi from '@/apis/class.api'
import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
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
import TextAreaCustom from '../TextAreaCustom/TextAreaCustom'
import useResponsives from '@/hooks/useResponsives'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setType?: React.Dispatch<React.SetStateAction<string>>
  type: string
  eventDetail: EventState | null
  selectTime?: { start: Date; end: Date } | null
  setSelectTime?: React.Dispatch<React.SetStateAction<{ start: Date; end: Date } | null>>
}
interface Time {
  label: string
  value: number
}

const EventActionModal = (props: Props) => {
  const { open, setOpen, setType, type = 'event', eventDetail, selectTime, setSelectTime } = props
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm()
  const [allDay, setAllDay] = useState(false)
  const [classSelect, setClassSelect] = useState()
  const [studentIds, setStudentIds] = useState<string[]>([])

  const [classData, setClassData] = useState<any>()
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
          ? `Cập nhật ${type === 'test' ? 'lịch thi' : 'cuộc họp'} thành công`
          : `Tạo ${type === 'test' ? 'lịch thi' : 'cuộc họp'} thành công`,
      })
      form.resetFields()
      setType && setType('event')
    },
  })

  const studentsId = classData?.find((e: any) => e._id === classSelect)?.students

  const handleSubmit = () => {
    form.submit()
  }

  const testTime = [
    { label: '15 phút', value: 15 },
    { label: '35 phút', value: 35 },
    { label: '45 phút', value: 45 },
    { label: '60 phút', value: 60 },
    { label: '90 phút', value: 90 },
    { label: '120 phút', value: 120 },
  ]
  const daysOfWeek = [
    { label: 'T2', value: 1 },
    { label: 'T3', value: 2 },
    { label: 'T4', value: 3 },
    { label: 'T5', value: 4 },
    { label: 'T6', value: 5 },
    { label: 'T7', value: 6 },
    { label: 'CN', value: 0 },
  ]

  const [repeat, setRepeat] = useState(false)

  const [schedules, setSchedules] = useState<number[]>([])

  const handleChangeRepeat = (e: string) => {
    if (e === 'none') {
      setSchedules([])
      setRepeat(false)

      return
    }

    setRepeat(true)

    setSchedules(
      (e === 'allWeek' && [0, 1, 2, 3, 4, 5, 6]) ||
        (e === 'T2-T6' && [1, 2, 3, 4, 5]) ||
        (e === 'weekEnd' && [0, 6]) ||
        [],
    )
  }

  const onChangeDate = (list: any[]) => {
    setSchedules(list)
  }

  useEffect(() => {
    form.setFieldsValue({ schedules: schedules })
  }, [schedules])

  useEffect(() => {
    if (eventDetail) {
      if (eventDetail.testId) {
        const examTime = dayjs(eventDetail.end).diff(dayjs(eventDetail.start)) / 60000
        const closestTime = testTime.reduce((closest: Time | null, time: Time) => {
          if (
            time.value <= examTime &&
            (closest === null || Math.abs(time.value - examTime) < Math.abs(closest.value - examTime))
          ) {
            return time
          } else {
            return closest
          }
        }, null)

        if (closestTime)
          setInitVal({
            name: eventDetail.name,
            classId: eventDetail.classId,
            testId: eventDetail.testId,
            students: eventDetail.students,
            status: eventDetail.status,
            date: dayjs(eventDetail.start),
            time: dayjs(eventDetail.start),
            timeTest: closestTime.value,
            timeAdd: examTime - closestTime.value,
          })
      } else
        setInitVal({
          name: eventDetail.name,
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

  useEffect(() => {
    if (initVal) {
      form.setFieldsValue(initVal)
    }
  }, [initVal])

  const handleFinish = (values: any) => {
    if (type === 'event') {
      const payload = {
        id: eventDetail?._id,
        name: values.name,
        description: values.description,
        classId: values.classId,
        start: allDay ? moment(values.time[0].$d).startOf('day') : moment(values.time[0].$d),
        end: allDay ? moment(values.time[1].$d).endOf('day') : moment(values.time[1].$d),
        students: studentIds,
        mentorId: profile?._id,
        type: 'CLASS',
        isRepeat: repeat,
        schedules: !repeat ? [] : schedules,
      }
      mutate(payload as unknown as any)
    } else {
      const date = moment(values.date.$d).format('YYYY/MM/DD')
      const time = moment(values.time.$d).format('HH:mm')
      const start = date + ' ' + time

      const newTime = moment(values.time.$d)
        .add(values.timeTest + parseInt(values.timeAdd ? values.timeAdd : 0), 'minutes')
        .format('HH:mm')

      const end = date + ' ' + newTime

      const payload = {
        id: eventDetail?._id,
        name: values.name,
        description: values.description,
        classId: values.classId,
        testId: values.testId,
        type: 'TEST',
        start: new Date(start),
        end: new Date(end),
        students: studentIds,
        mentorId: profile?._id,
      }
      mutate(payload as unknown as any)
    }

    setOpen(!open)
    form.resetFields()
  }

  const { xs, sm, md, lg } = useResponsives()

  return (
    <Modal
      title={
        eventDetail
          ? `Cập nhật ${type === 'test' ? 'lịch thi' : 'cuộc họp'}`
          : `Tạo ${type === 'test' ? 'lịch thi' : 'cuộc họp'}`
      }
      open={open}
      onCancel={() => {
        setOpen(!open)
        setSelectTime && setSelectTime(null)
      }}
      onOk={handleSubmit}
      width={(md && '80vw') || ((sm || xs) && undefined) || (lg && '60vw') || '45vw'}
      okText={eventDetail ? 'Lưu thay đổi' : `Tạo ${type === 'test' ? 'lịch thi' : 'cuộc họp'}`}
    >
      <Form onFinish={handleFinish} form={form} layout='vertical' initialValues={initVal}>
        <Form.Item
          label={`Tiêu đề ${type === 'test' ? 'lịch thi' : 'cuộc họp'}`}
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder='Nhập tiêu đề' />
        </Form.Item>
        <TextAreaCustom name='description' data={eventDetail} label='Ghi chú' />
        <Row gutter={12}>
          <Col span={24} md={eventDetail ? 9 : 12}>
            <Form.Item label='Lớp học' name='classId' rules={[{ required: true, message: 'Vui lòng chọn lớp' }]}>
              <SelectCustom
                placeholder='Tìm kiếm lớp học'
                type='search'
                searchKey='classId'
                labelKey='title'
                apiFind={classApi.getClass}
                filterQuery={{ mentorId: profile._id }}
                callBackDataSearch={setClassData}
                onChange={setClassSelect}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24} md={eventDetail ? 9 : 12}>
            <Form.Item
              label='Thêm người tham dự'
              name='students'
              // rules={[{ required: true, message: 'Vui lòng chọn người dự' }]}
            >
              <SelectCustom
                placeholder='Tìm kiếm tham người dự'
                type='search'
                searchKey='user'
                apiFind={userApi.findUser}
                filterQuery={{ _id: studentsId }}
                defaultValue={eventDetail?.students}
                mode='multiple'
                allowClear
                selectAll
                selectAllLabel='Chọn tất cả'
                disabled={classSelect ? false : true}
                callBackSelected={setStudentIds}
              />
            </Form.Item>
          </Col>
          {eventDetail && (
            <Col span={24} md={6}>
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
          {type === 'test' && (
            <>
              <Col span={24} md={12}>
                <Form.Item label='Bài thi' name='testId' rules={[{ required: true, message: 'Vui lòng chọn bài thi' }]}>
                  <SelectCustom
                    placeholder='Tìm kiếm bài thi'
                    type='search'
                    searchKey='exams'
                    apiFind={examApi.findExam}
                    filterQuery={{ mentorId: profile._id }}
                    defaultValue={eventDetail?.students}
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item label='Ngày thi' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
                  <DatePicker className='sp100' placeholder='Chọn ngày thi' format={'DD-MM-YYYY'} />
                </Form.Item>
              </Col>
            </>
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
              <Form.Item name='allDay' label={sm ? '' : ' '}>
                <Checkbox onChange={(e) => setAllDay(e.target.checked)} checked={allDay}>
                  Cả ngày
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row gutter={12}>
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
        {type === 'event' && (
          <Row gutter={24}>
            <Col span={24} md={6}>
              <Form.Item name='repeat'>
                <SelectCustom
                  options={[
                    { label: 'Không lặp lại', value: 'none' },
                    { label: 'Hàng ngày', value: 'allWeek' },
                    { label: 'T2-T6', value: 'T2-T6' },
                    { label: 'Cuối tuần', value: 'weekEnd' },
                    { label: 'Chọn ngày', value: 'any' },
                  ]}
                  placeholder='Lặp lại'
                  onChange={handleChangeRepeat}
                ></SelectCustom>
              </Form.Item>
            </Col>

            <Col span={24} md={18}>
              <Form.Item name='schedules' rules={[{ required: repeat, message: 'Vui lòng chọn thứ' }]}>
                <Checkbox.Group
                  value={schedules}
                  options={daysOfWeek}
                  onChange={onChangeDate}
                  disabled={!repeat}
                ></Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  )
}

export default EventActionModal
