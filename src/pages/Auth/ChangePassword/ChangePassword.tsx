/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '@/contexts/app.context'
import authApi from '@/apis/auth.api'
import { ChangePassword } from '@/types/auth.type'
import openNotification from '@/components/Notification'
import { validatePassword } from '@/constants/utils'

export default function ChangePassword() {
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log(values, 'values')
    mutate.mutate(values)
  }

  const mutate = useMutation({
    mutationFn: (body: ChangePassword) => authApi.changePassword(body),
    onSuccess: () => {
      openNotification({
        message: 'Thông báo',
        status: 'success',
        description: 'Thay đổi mật khẩu thành công !',
      })
    },
    onError: () => {
      openNotification({
        message: 'Thông báo',
        status: 'error',
        description: 'Có lỗi xảy ra, vui lòng thử lại sau !',
      })
    },
  })

  form.setFieldValue('id', profile?.email)

  return (
    <div>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item name='id' hidden />
        <Form.Item
          required
          name='oldPassword'
          label={'Mật khẩu cũ'}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
            {
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự',
            },
            {
              max: 32,
              message: 'Mật khẩu không quá 32 ký tự',
            },
          ]}
        >
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item
          required
          name='password'
          label={'Mật khẩu mới'}
          rules={[
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password size='large' />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name='confirmPassword'
          label={'Nhập lại mật khẩu'}
          rules={[
            {
              validator: validatePassword,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('Mật khẩu không trùng khớp'))
              },
            }),
          ]}
        >
          <Input.Password size='large' />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Cập nhật
        </Button>
      </Form>
    </div>
  )
}
