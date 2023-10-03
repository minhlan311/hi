/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from '@/apis/auth.api'
import { Button, Form, Input, Space } from 'antd'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    authApi.forgot(values)
  }

  return (
    <Form form={form} name='forgot' onFinish={onFinish} layout='vertical'>
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

      <Form.Item>
        <Button type='primary' htmlType='submit' size='large' className='sp100'>
          Gửi yêu cầu
        </Button>
      </Form.Item>
      <Space direction='vertical' align='center' className='sp100'>
        <Space size='small'>
          <p>Bạn đã có tài khoản?</p>
          <Link to='/login' className='link'>
            Đăng nhập ngay
          </Link>
        </Space>
      </Space>
    </Form>
  )
}

export default ForgotPassword
