/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import openNotification from '@/components/Notification'
import { FORM_TYPE } from '@/constants'
import { AppContext } from '@/contexts/app.context'
import { formatDate } from '@/helpers/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'

type Props = {
  onOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  idClass: string
  typeForm: string | undefined
}

type FormClass = {
  courseId: string
  endAt: string
  endDate: string
  schedules: number[]
  startAt: string
  startDate: string
}

export default function ClassCourseCreate({ onOpen, onClose, idClass, typeForm }: Props) {
  const [form] = useForm()
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const { data: dataCource } = useQuery({
    queryKey: ['course'],
    queryFn: () => courseApi.getCourses({ filterQuery: { mentorId: profile?._id } }),
  })

  const { data: dataClass, isLoading } = useQuery({
    queryKey: ['classOne', idClass],
    queryFn: () => classApi.getOneClass(idClass),
    enabled: idClass ? true : false,
  })

  const courseList = dataCource?.data?.docs?.map((item) => ({
    label: item?.name,
    value: item?._id,
  }))

  useEffect(() => {
    if (dataClass && typeForm === 'UPDATE') {
      form.setFieldValue('courseId', dataClass?.data?.courseId?._id)
      form.setFieldValue('startDate', dayjs(formatDate(dataClass?.data?.startDate as string), 'DD/MM/YYYY'))
      form.setFieldValue('endDate', dayjs(formatDate(dataClass?.data?.endDate as string), 'DD/MM/YYYY'))
      form.setFieldValue('schedules', dataClass?.data?.schedules)
      form.setFieldValue('limitStudent', dataClass?.data?.limitStudent)
      form.setFieldValue('title', dataClass?.data?.title)
      form.setFieldValue('id', idClass)
    } else {
      form.resetFields()
    }
  }, [dataClass, typeForm])

  const mutation = useMutation({
    mutationFn: (body: FormClass) => classApi.createClass(body),
    onSuccess: () => {
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['course'] })
      queryClient.invalidateQueries({ queryKey: ['dataClass'] })
      openNotification({
        message: 'Thông báo',
        status: 'success',
        description: 'Thêm lớp thành công !',
      })
    },
    onError: () => {
      openNotification({
        message: 'Thông báo',
        status: 'error',
        description: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: (body: FormClass) => classApi.updateClass(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataClass'] })
      openNotification({
        message: 'Thông báo',
        status: 'success',
        description: 'Cập nhật lớp thành công !',
      })
    },
    onError: () => {
      openNotification({
        message: 'Thông báo',
        status: 'error',
        description: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    },
  })

  const onFinish = async (values: any) => {
    console.log(values, 'values')
    onClose(false)

    {
      typeForm === FORM_TYPE.CREATE ? mutation.mutate(values) : mutationUpdate.mutate(values)
    }

    form.resetFields([])
  }

  return (
    <Drawer
      extra={
        <Button type='primary' onClick={() => form.submit()}>
          {typeForm === 'CREATE' ? 'Tạo mới' : 'Cập nhật'}
        </Button>
      }
      title={typeForm === 'CREATE' ? 'Tạo mới lớp học' : 'Cập nhật lớp học'}
      width={'1000px'}
      destroyOnClose
      open={onOpen}
      onClose={() => onClose(false)}
    >
      <Form
        disabled={typeForm === 'UPDATE' && isLoading ? true : false}
        form={form}
        onFinish={onFinish}
        layout='vertical'
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='courseId'
              label='Khóa học'
              required
              rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
            >
              <Select options={courseList} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='title'
              label='Tên lớp học'
              required
              rules={[{ required: true, message: 'Vui lòng chọn tên lớp học' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name='startDate'
              label='Ngày bắt đầu'
              required
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
            >
              <DatePicker placeholder='Ngày bắt đầu' format='DD/MM/YYYY' />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              name='endDate'
              label='Ngày kết thúc '
              required
              rules={[
                { required: true, message: 'Vui lòng chọn ngày kết thúc' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('startDate').isBefore(value)) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'))
                  },
                }),
              ]}
            >
              <DatePicker placeholder='Ngày kết thúc' format='DD/MM/YYYY' />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              required
              rules={[
                {
                  type: 'number',
                  message: 'Hãy nhập số',
                },
                {
                  validator(_, value) {
                    if (!value || value <= 0) {
                      return Promise.reject(new Error('Số lượng học viên ít nhất là 1'))
                    }
                    return Promise.resolve()
                  },
                },
              ]}
              name='limitStudent'
              label='Giới hạn số lượng học viên'
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Form.Item name='mentorId' hidden initialValue={profile?._id} />
        </Row>
      </Form>
    </Drawer>
  )
}
