/* eslint-disable @typescript-eslint/no-explicit-any */
import { REGEX_PATTERN } from '@/constants/utils'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { Link } from 'react-router-dom'

const Login = () => {
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log(values)
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
