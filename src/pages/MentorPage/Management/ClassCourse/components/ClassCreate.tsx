import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import openNotification from '@/components/Notification'
import SelectCustom from '@/components/SelectCustom/SelectCustom'
import { AppContext } from '@/contexts/app.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DatePicker, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import moment from 'moment-timezone'
import { useContext, useEffect } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

type Props = {
  onOpen: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  idClass: string
}

export default function ClassCreate({ onOpen, onClose, idClass }: Props) {
  const [form] = useForm()
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { data: dataCource } = useQuery({
    queryKey: ['courseData'],
    queryFn: () => courseApi.getCourses({ filterQuery: { mentorId: profile?._id } }),
  })

  const { data: classData } = useQuery({
    queryKey: ['classOne', idClass],
    queryFn: () => classApi.getOneClass(idClass),
    enabled: Boolean(idClass),
  })
  const classDetail = classData?.data
  const courseList = dataCource?.data?.docs?.map((item) => ({
    label: item.name,
    value: item._id,
  }))

  useEffect(() => {
    if (classDetail) {
      form.setFieldsValue({ ...classDetail, dates: [dayjs(classDetail.startDate), dayjs(classDetail.endDate)] })
    }
  }, [classDetail])

  const actionClass = useMutation({
    mutationFn: (body) => (idClass ? classApi.updateClass(body) : classApi.createClass(body)),
    onSuccess: () => {
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['classList'] })
      openNotification({
        message: 'Thông báo',
        status: 'success',
        description: `${idClass ? 'Cập nhật ' : 'Thêm mới '} lớp học thành công`,
      })
      onClose(false)
    },
    onError: () => {
      openNotification({
        message: 'Thông báo',
        status: 'error',
        description: 'Có lỗi xảy ra, vui lòng thử lại sau!',
      })
    },
  })

  useEffect(() => {
    if (!idClass) {
      form.resetFields()
    }
  }, [idClass])

  const onFinish = (values: any) => {
    const categoryId = dataCource?.data?.docs?.find((item) => item._id === values.courseId)

    if (categoryId) {
      const payload = {
        id: idClass ? idClass : undefined,
        title: values.title,
        courseId: values.courseId,
        limitStudent: parseInt(values.limitStudent),
        categoryId: categoryId.categoryId,
        startDate: moment(values.dates[0].$d).startOf('day'),
        endDate: moment(values.dates[1].$d).endOf('day'),
        mentorId: profile._id,
      }

      actionClass.mutate(payload as any)
    }
  }

  return (
    <DrawerCustom
      title={`${idClass ? 'Cập nhật ' : 'Thêm mới '} lớp học`}
      open={onOpen}
      onClose={onClose}
      onFinish={() => {
        form.submit()
      }}
    >
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item
          name='title'
          label='Tên lớp học'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên lớp học',
            },
          ]}
        >
          <Input placeholder='Nhập tên đề lớp học' />
        </Form.Item>
        <Form.Item
          label='Khóa học'
          name='courseId'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn khóa học',
            },
          ]}
        >
          <SelectCustom placeholder='Chọn khóa học' options={courseList} defaultValue={classDetail?.courseId} />
        </Form.Item>
        <Form.Item
          label='Sĩ số tối đa'
          name='limitStudent'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập sĩ số tối đa',
            },
            {
              validator(_, value) {
                if (!value || value <= 0) {
                  return Promise.reject(new Error('Sĩ số ít nhất là 1'))
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <Input type='number' placeholder='Nhập sĩ số' min={1} />
        </Form.Item>
        <Form.Item
          name='dates'
          label='Thời gian'
          required
          rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
        >
          <DatePicker.RangePicker format='DD/MM/YYYY' className='sp100' />
        </Form.Item>
      </Form>
    </DrawerCustom>
  )
}
