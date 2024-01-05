/* eslint-disable @typescript-eslint/no-explicit-any */
import classApi from '@/apis/class.api'
import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
import userApi from '@/apis/user.api'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { EventState } from '@/interface/event'
import { Class } from '@/types/class.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, TimePicker } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import openNotification from '../Notification'
import SelectCustom from '../SelectCustom/SelectCustom'
import TextAreaCustom from '../TextAreaCustom/TextAreaCustom'

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
  const [nowTime, setNowTime] = useState<Date>()
  const [classData, setClassData] = useState<Class[]>()
  const [initVal, setInitVal] = useState<any>()
  const [dateSelect, setDateSelect] = useState<any[]>([])

  const queryClient = useQueryClient()

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
  const [repeatType, setRepeatType] = useState<'allWeek' | 'T2-T6' | 'weekEnd' | 'any'>()
  const [target, setTarget] = useState<boolean>(false)
  const [schedules, setSchedules] = useState<number[]>([])

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
      setRepeat(false)
      setRepeatType(undefined)
    },
  })

  const handleChangeRepeat = (e: 'allWeek' | 'T2-T6' | 'weekEnd' | 'any') => {
    setTarget(false)
    setRepeatType(e)
  }

  const start = dateSelect?.[0]?.format('YYYY/MM/DD')
  const end = dateSelect?.[1]?.format('YYYY/MM/DD')
  const checkDate = start === end

  useEffect(() => {
    if (checkDate) {
      setRepeat(false)
      setSchedules([])
    } else {
      setRepeatType('allWeek')
      setTarget(false)
    }
  }, [checkDate])

  useEffect(() => {
    if (repeatType && !target) {
      setSchedules(
        (repeatType === 'allWeek' && [0, 1, 2, 3, 4, 5, 6]) ||
          (repeatType === 'T2-T6' && [1, 2, 3, 4, 5]) ||
          (repeatType === 'weekEnd' && [0, 6]) ||
          [],
      )
      setRepeat(true)
    }
  }, [repeatType, target])

  const onChangeDate = (list: any[]) => {
    setSchedules(list)
    setTarget(true)
  }

  const checkSchedule = (arr: number[]) => {
    const fullWeek = [0, 1, 2, 3, 4, 5, 6]

    if (arr.length === 0) {
      return
    } else if (arr.length === fullWeek.length && arr.every((item) => fullWeek.includes(item))) {
      return 'allWeek'
    } else if (arr.length === 2 && ((arr.includes(0) && arr.includes(6)) || (arr.includes(6) && arr.includes(0)))) {
      return 'weekEnd'
    } else if (arr.length === 5) {
      const sortedArr = arr.slice().sort((a, b) => a - b)
      const isT2T6 =
        sortedArr[0] === 1 && sortedArr[1] === 2 && sortedArr[2] === 3 && sortedArr[3] === 4 && sortedArr[4] === 5

      if (isT2T6) {
        return 'T2-T6'
      }
    }

    return 'any'
  }

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
      } else {
        setInitVal({
          name: eventDetail.name,
          classId: eventDetail.classId,
          students: eventDetail.students,
          status: eventDetail.status,
          time: [dayjs(eventDetail.start), dayjs(eventDetail.end)],
          date: [dayjs(eventDetail.start), dayjs(eventDetail.end)],
          schedules: eventDetail.schedules,
        })
        // setRepeat(eventDetail.isRepeat)
        // setRepeatType(checkSchedule(eventDetail.schedules))
      }
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
        date: [dayjs(selectTime.start), dayjs(selectTime.end)],
      })
  }, [selectTime])

  useEffect(() => {
    setNowTime(new Date())

    if (initVal) {
      form.setFieldsValue(initVal)
      setClassSelect(initVal.classId)
    }
  }, [initVal])

  const handleFinish = (values: any) => {
    if (type === 'event') {
      const newTime: any[] = []
      if (values.time)
        values.date.forEach((d: any, index: number) => {
          const time = moment(values.time[index].$d).format('HH:mm')
          const date = moment(d.$d).format('YYYY/MM/DD')
          newTime.push(moment(date + ` ${time}`))
        })

      const payload = {
        id: eventDetail?._id,
        name: values.name,
        description: values.description,
        classId: values.classId,
        start: allDay ? moment(values.date[0]).startOf('day') : newTime[0],
        end: allDay ? moment(values.date[1]).endOf('day') : newTime[1],
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

  useEffect(() => {
    form.setFieldValue('schedules', schedules)

    if (target) {
      setRepeatType(checkSchedule(schedules))
    }
  }, [schedules])

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
                filterQuery={{
                  mentorId: profile._id,
                  betweenDate: nowTime,
                }}
                callBackDataSearch={setClassData}
                defaultValue={initVal?.classId}
                onChange={setClassSelect}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24} md={eventDetail ? 9 : 12}>
            <Form.Item label='Thêm người tham dự' name='students'>
              <SelectCustom
                placeholder='Tìm kiếm tham người dự'
                type='search'
                searchKey='user'
                apiFind={userApi.findUser}
                filterQuery={{ _id: studentsId }}
                defaultValue={studentsId ? studentsId : eventDetail?.students}
                mode='multiple'
                allowClear
                selectAll
                selectAllLabel='Chọn tất cả'
                disabled={Boolean(!classSelect)}
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
                    showType
                    type='search'
                    searchKey='exams'
                    apiFind={examApi.findExam}
                    defaultValue={initVal?.testId}
                    filterQuery={{ createdById: profile._id }}
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
            <Col span={24} md={9}>
              <Form.Item label='Ngày' name='date' rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
                <DatePicker.RangePicker format='DD-MM-YYYY' className='sp100' onChange={(e: any) => setDateSelect(e)} />
              </Form.Item>
            </Col>
            <Col span={24} md={9}>
              <Form.Item label='Thời gian' name='time' rules={[{ required: !allDay, message: 'Vui lòng chọn ngày' }]}>
                <TimePicker.RangePicker format='HH:mm' className='sp100' disabled={allDay} />
              </Form.Item>
            </Col>

            <Col span={24} md={6}>
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
                <SelectCustom placeholder='Chọn thời gian' options={testTime} defaultValue={initVal?.timeTest} />
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
              <Form.Item name='repeat' label='Lặp lại'>
                <SelectCustom
                  options={[
                    { label: 'Hàng ngày', value: 'allWeek' },
                    { label: 'T2-T6', value: 'T2-T6' },
                    { label: 'Cuối tuần', value: 'weekEnd' },
                    { label: 'Chọn ngày', value: 'any' },
                  ]}
                  placeholder='Lặp lại'
                  defaultValue={repeatType}
                  onChange={handleChangeRepeat}
                  disabled={checkDate}
                ></SelectCustom>
              </Form.Item>
            </Col>

            <Col span={24} md={18}>
              <Form.Item name='schedules' label='Thứ' rules={[{ required: repeat, message: 'Vui lòng chọn thứ' }]}>
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
