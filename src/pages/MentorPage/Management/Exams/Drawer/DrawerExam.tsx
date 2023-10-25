/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { CategoryState } from '@/interface/category'
import { ExamState } from '@/interface/exam'
import { SuccessResponse } from '@/types/utils.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Drawer, Form, Input, Select, Space } from 'antd'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  examData?: ExamState
  size?: string
}

const DrawerExam = (props: Props) => {
  const { open, setOpen, setLoading, examData, size } = props

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

  const queryClient = useQueryClient()

  const categoriesData = queryClient.getQueryData<{ data: SuccessResponse<CategoryState[]> }>(['categoriesList'])

  const subjectList = categoriesData?.data?.docs?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })

  const { isLoading, mutate } = useMutation({
    mutationFn: (body) => (action === 'create' ? examApi.createExam(body) : examApi.putExam(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examFilter'] })

      openNotification({
        status: 'success',
        message: action === 'create' ? 'Tạo bộ đề thành công' : 'Cập nhật bộ đề thành công',
      })
      setOpen(false)

      form.resetFields()
    },
    onError: () => openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi xảy ra' }),
  })

  useEffect(() => {
    setLoading && setLoading(isLoading)
  }, [isLoading])

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      cost: parseInt(values?.cost),
      id: examData?._id,
    }
    mutate(payload)
  }

  return (
    <div>
      <Drawer
        title={action === 'create' ? 'Thêm bộ đề' : 'Chỉnh sửa'}
        width={size}
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
              {action === 'create' ? 'Tạo bộ đề' : 'Cập nhật'}
            </ButtonCustom>
          </Space>
        }
      >
        <Form
          onFinish={onFinish}
          layout='vertical'
          form={form}
          initialValues={{
            plan: 'FREE',
          }}
        >
          <Form.Item
            name='name'
            label='Tiêu đề bộ đề'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề bộ đề',
              },
            ]}
          >
            <Input placeholder='Nhập tên tiêu đề bộ đề' />
          </Form.Item>

          <TextAreaCustom name='description' label='Chú thích' data={examData} />

          <Form.Item
            name='type'
            label='Loại bộ đề'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn loại bộ đề',
              },
            ]}
          >
            <Select
              placeholder='Chọn loại bộ đề'
              options={[
                {
                  value: 'QUIZ',
                  label: 'Bài Quiz',
                },
                {
                  value: 'TEST',
                  label: 'Bài thi thử',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name='plan'
            label='Loại phí'
            rules={[
              {
                required: true,
                message: 'Vui lòng loại phí',
              },
            ]}
          >
            <Select
              placeholder='Chọn loại phí'
              options={[
                {
                  value: 'FREE',
                  label: 'Miễn phí',
                },
                {
                  value: 'PREMIUM',
                  label: 'Có phí',
                },
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
                message: `Vui lòng nhập số tiền`,
              },
            ]}
          >
            <Input type='number' disabled={typePlan !== 'PREMIUM'} placeholder='Nhập số tiền'></Input>
          </Form.Item>

          <Form.Item
            name='categoryId'
            label='Chọn khóa học'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn khóa học',
              },
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
