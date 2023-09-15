/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Drawer, Form, Input, Select, Space } from 'antd'
import { useState, useEffect } from 'react'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setResetFilter?: React.Dispatch<React.SetStateAction<boolean>>
  testId?: string
}
const DrawerExam = (props: Props) => {
  const { open, setOpen, refreshPage, testId } = props

  const [action, setAction] = useState('create')
  const [form] = Form.useForm()
  const [typePlan, setTypePlan] = useState('FREE')
  console.log(typePlan)

  useEffect(() => {
    if (testId) {
      setAction('update')
    } else {
      setAction('create')
      form.resetFields()
    }
  }, [testId])

  useEffect(() => {
    const body = {
      filterQuery: {},
      options: {
        pagination: false
      }
    }
  }, [])

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
  const { isLoading, status, mutate } = useMutation({ mutationFn: (body) => examApi.createExam({ payload: body }) })

  useEffect(() => {
    if (status === 'success') {
      setResetFilter(true)
      setOpen(false)
    }
  }, [status])
  const onFinish = (values: any) => {
    mutate(values)
    // openNotification({ status: 'success', message: 'Test', description: 'âsassa' })
    console.log(values)
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
              Tạo bài thi
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
            <Input disabled={typePlan !== 'PREMIUM'} type='number' placeholder='Nhập số tiền'></Input>
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
