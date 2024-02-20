/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from '@/apis/auth.api'
import openNotification from '@/components/Notification'
import { validatePassword } from '@/constants/utils'
import { AppContext } from '@/contexts/app.context'
import { UserState } from '@/interface/user'
import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [form] = Form.useForm()
  const navitage = useNavigate()

  const { isLoading, mutate } = useMutation({ mutationFn: (body: any) => authApi.login(body) })

  const rememberUser = (account: string, password: string) => {
    const userData = JSON.stringify(`${btoa(account)}/${btoa(password)}`)
    document.cookie = `wer234rffdsa=${userData}; expires=Wed, 31 Dec 2099 23:59:59 UTC; path=/`
  }

  const getRememberedUser = () => {
    const cookies = document.cookie
    const cookieData = cookies.split('; ').find((cookie) => cookie.startsWith('wer234rffdsa='))

    if (cookieData) {
      const userData = cookieData.split('/')
      const newData = { account: userData[0].split('"')[1], password: userData[1].split('"')[0] }

      return newData
    }

    return null
  }

  useEffect(() => {
    const userInfo = getRememberedUser()

    if (userInfo) {
      const account = userInfo.account

      const password = userInfo.password

      form.setFieldsValue({ account: atob(account), password: atob(password), remember: Boolean(account) })
    }
  }, [])

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: (data) => {
        navitage('/')
        setIsAuthenticated(true)
        setProfile(data.data as unknown as UserState)
        if (values.remember) return rememberUser(values.account, values.password)
        else rememberUser('', '')
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
      <Form.Item name='remember' valuePropName='checked'>
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
