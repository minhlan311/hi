/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import { ExamState } from '@/interface/exam'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Drawer, Form, Input, Select, Space } from 'antd'
import { useState, useEffect } from 'react'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  resetData?: () => void
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  examData?: ExamState
}
const DrawerExam = (props: Props) => {
  const { open, setOpen, resetData, setLoading, examData } = props

  const [action, setAction] = useState('create')
  const [form] = Form.useForm()
  const [typePlan, setTypePlan] = useState('FREE')

  useEffect(() => {
    if (examData) {
      setAction('update')
      form.setFieldsValue(examData)
    } else {
      setAction('create')
      form.resetFields()
    }
  }, [examData])

  const onCloseDrawer = () => {
    setOpen(false)
  }

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af'
      })
    }
  })

  const subjectList = categoriesData?.data?.docs?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name
    }
  })
  const { isLoading, status, mutate, error } = useMutation(
    action === 'create'
      ? { mutationFn: (body) => examApi.createExam(body) }
      : { mutationFn: (body) => examApi.putExam(body) }
  )

  useEffect(() => {
    if (status === 'success') {
      openNotification({
        status: status,
        message: action === 'create' ? 'Tạo bài thi thành công' : 'Cập nhật bài thi thành công'
      })
      setOpen(false)
      resetData && resetData()
      form.resetFields()
    }
    if (status === 'error' && error) {
      openNotification({ status: status, message: error.name, description: error.message })
    }
  }, [status])

  useEffect(() => {
    setLoading && setLoading(isLoading)
  }, [isLoading])
  const onFinish = (values: any) => {
    const payload = {
      ...values,
      cost: parseInt(values?.cost),
      id: examData?._id
    }
    mutate(payload)
  }

  return (
    <div>
      <Drawer
        title={action === 'create' ? 'Thêm bộ đề' : 'Chỉnh sửa'}
        width={'50%'}
        onClose={onCloseDrawer}
        open={open}
        extra={
          <Space>
            <ButtonCustom
              onClick={() => {
                setOpen(false)
                form.resetFields()
              }}
            >
              Hủy
            </ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary'>
              {action === 'create' ? 'Tạo bài thi' : 'Cập nhật'}
            </ButtonCustom>
          </Space>
        }
      >
        <Form
          onFinish={onFinish}
          layout='vertical'
          form={form}
          initialValues={{
            plan: 'FREE'
          }}
        >
          <Form.Item
            name='name'
            label='Tiêu đề bài thi'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề bài thi'
              }
            ]}
          >
            <Input placeholder='Nhập tên tiêu đề bài thi' />
          </Form.Item>

          <Form.Item
            name='type'
            label='Loại bài thi'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn loại bài thi'
              }
            ]}
          >
            <Select
              placeholder='Chọn loại bài thi'
              options={[
                {
                  value: 'QUIZ',
                  label: 'Bài Quiz'
                },
                {
                  value: 'TEST',
                  label: 'Bài thi thử'
                }
              ]}
            />
          </Form.Item>

          <Form.Item
            name='plan'
            label='Loại phí'
            rules={[
              {
                required: true,
                message: 'Vui lòng loại phí'
              }
            ]}
          >
            <Select
              placeholder='Chọn loại phí'
              options={[
                {
                  value: 'FREE',
                  label: 'Miễn phí'
                },
                {
                  value: 'PREMIUM',
                  label: 'Có phí'
                }
              ]}
              onChange={(e) => setTypePlan(e)}
            />
          </Form.Item>

          <Form.Item
            name='cost'
            label='Số tiền'
            rules={[
              {
                required: typePlan === 'PREMIUM',
                message: `Vui lòng nhập số tiền`
              }
            ]}
          >
            <Input type='number' disabled={typePlan !== 'PREMIUM'} placeholder='Nhập số tiền'></Input>
          </Form.Item>

          <Form.Item
            name='subjectId'
            label='Chọn khóa học'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn khóa học'
              }
            ]}
          >
            <Select placeholder='Chọn khóa học' options={subjectList} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
export default DrawerExam
