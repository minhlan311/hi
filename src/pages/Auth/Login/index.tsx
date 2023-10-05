/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from '@/apis/auth.api'
import { AuthState } from '@/interface/auth'
import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import { UserState } from '@/interface/user'
import openNotification from '@/components/Notification'
import { validatePassword } from '@/constants/utils'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [form] = Form.useForm()
  const navitage = useNavigate()

  const { isLoading, mutate } = useMutation({ mutationFn: (body: AuthState) => authApi.login(body) })

  const onFinish = (values: AuthState) => {
    mutate(values, {
      onSuccess: (data) => {
        navitage('/')
        setIsAuthenticated(true)
        setProfile(data.data as unknown as UserState)
      },
      onError: (data: any) => {
        openNotification({
          status: 'error',
          message: 'Thông báo',
          description: data.response.data.message,
        })
      },
    })
  }

  return (
    <Form form={form} name='login' onFinish={onFinish} layout='vertical' disabled={isLoading}>
      <Form.Item
        name='account'
        label='Email hoặc số điện thoại'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập Email hoặc số điện thoại',
          },
        ]}
      >
        <Input placeholder='Nhập Email hoặc số điện thoại' size='large' />
      </Form.Item>
      <Form.Item
        name='password'
        label='Mật khẩu'
        rules={[
          {
            validator: validatePassword,
          },
        ]}
      >
        <Input.Password placeholder='Nhập mật khẩu' size='large' />
      </Form.Item>
      <Form.Item name='remember'>
        <Checkbox>Nhớ mật khẩu</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' size='large' className='sp100' loading={isLoading}>
          Đăng nhập
        </Button>
      </Form.Item>
      <Space direction='vertical' align='center' className='sp100'>
        <Space size='small'>
          <p>Bạn chưa có tài khoản?</p>
          <Link to='/register' className='link'>
            Đăng ký ngay
          </Link>
        </Space>
        <Link to='/forgot-password' className='link'>
          Quên mật khẩu
        </Link>
      </Space>
    </Form>
  )
}

export default Login
