/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from '@/apis/auth.api'
import openNotification from '@/components/Notification'
import { REGEX_PATTERN } from '@/constants/utils'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [form] = Form.useForm()

  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    if (countdown === 0) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [countdown])

  const onFinish = (values: any) => {
    mutate.mutate(values.account)
  }

  const mutate = useMutation({
    mutationFn: (username: string) => authApi.forgot(username),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Đã gửi mật khẩu mới đến email của bạn!',
      })
      setCountdown(120)
    },
    onError: (err: any) =>
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: err.response.data.message,
      }),
  })

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
          {
            pattern: REGEX_PATTERN.regexCombineEmailPhoneNumber,
            message: `Email hoặc số điện thoại không hợp lệ!`,
          },
        ]}
      >
        <Input placeholder='Nhập Email hoặc số điện thoại' size='large' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' size='large' className='sp100' disabled={countdown > 0}>
          {countdown > 0 ? <b>{countdown} giây</b> : 'Gửi yêu cầu'}
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
