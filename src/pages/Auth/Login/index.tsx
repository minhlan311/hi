import authApi from '@/apis/auth.api'
import { REGEX_PATTERN } from '@/constants/utils'
import { AuthState } from '@/interface/auth'
import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import { UserState } from '@/interface/user'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const [form] = Form.useForm()
  const navitage = useNavigate()
  const mutaionLogin = useMutation({ mutationFn: (body: AuthState) => authApi.login(body) })
  const onFinish = (values: AuthState) => {
    mutaionLogin.mutate(values, {
      onSuccess: (data) => {
        navitage('/')
        setIsAuthenticated(true)
        setProfile(data.data as unknown as UserState)
      }
    })
  }
  return (
    <Form form={form} name='login' onFinish={onFinish} layout='vertical'>
      <Form.Item
        name='account'
        label='Email hoặc số điện thoại'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập Email hoặc số điện thoại'
          }
        ]}
      >
        <Input placeholder='Nhập Email hoặc số điện thoại' size='large' />
      </Form.Item>
      <Form.Item
        name='password'
        label='Mật khẩu'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu'
          },
          {
            min: 8,
            message: 'Mật khẩu phải có ít nhất 8 ký tự'
          },
          {
            pattern: REGEX_PATTERN.regexPassword,
            message: `Mật khẩu bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt`
          }
        ]}
      >
        <Input.Password placeholder='Nhập mật khẩu' size='large' />
      </Form.Item>
      <Form.Item name='remember'>
        <Checkbox>Nhớ mật khẩu</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' size='large' className='sp100'>
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
