/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from '@/apis/auth.api'
import openNotification from '@/components/Notification'
import { validatePassword } from '@/constants/utils'
import { AppContext } from '@/contexts/app.context'
import { clearLS } from '@/utils/auth'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useContext } from 'react'

export default function ChangePassword() {
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    mutate.mutate(values)
  }

  const mutate = useMutation({
    mutationFn: (body: any) => authApi.changePassword(body),
    onSuccess: () => {
      openNotification({
        message: 'Thông báo',
        status: 'success',
        description: 'Thay đổi mật khẩu thành công!',
      })
      clearLS()

      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    },
    onError: () => {
      openNotification({
        message: 'Thông báo',
        status: 'error',
        description: 'Có lỗi xảy ra, vui lòng thử lại sau!',
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
          Đổi mật khẩu
        </Button>
      </Form>
    </div>
  )
}
