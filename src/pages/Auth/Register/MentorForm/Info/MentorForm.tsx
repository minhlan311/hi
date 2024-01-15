/* eslint-disable @typescript-eslint/no-explicit-any */
import authApi from '@/apis/auth.api'
import openNotification from '@/components/Notification'
import { REGEX_PATTERN, validateName, validatePassword } from '@/constants/utils'
import { useMutation } from '@tanstack/react-query'
import { Col, DatePicker, Form, Input, Radio, Row } from 'antd'
import { forwardRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROLE } from '../../Roles/constants'

const MentorForm = forwardRef(({ onFinishs, formRef, roles, ids }: any) => {
  const [userId, setUserId] = useState<string>('')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  formRef.current = form
  useEffect(() => {
    ids(userId)
  }, [userId])

  const registerAccountMutation = useMutation({
    mutationFn: (body: any) => authApi.registerAccount(body),
  })

  const onFinish = (values: any) => {
    const dataUpload = {
      ...values,
      isMentor: roles === ROLE.MENTOR ? true : false,
      mentorStatus: roles === ROLE.MENTOR ? 'PENDING' : '',
    }
    registerAccountMutation.mutate(dataUpload, {
      onSuccess: (data) => {
        setUserId(data?.data?._id)
        onFinishs(values)
        navigate('/login')
        openNotification({
          status: 'success',
          message: 'Thông báo',
          description: 'Đăng ký tài khoản thành công , vui lòng đăng nhập để sử dụng dịch vụ !',
        })
      },
      onError: (error: any) => {
        openNotification({
          status: 'error',
          message: 'Thông báo',
          description: error?.response?.data?.message,
        })
      },
    })
  }

  return (
    <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label='Họ tên'
            name='fullName'
            rules={[
              {
                validator: validateName,
              },
            ]}
          >
            <Input placeholder='Nhập họ và tên của bạn' size='large' />
          </Form.Item>
        </Col>
        <Col span={24} sm={12}>
          <Form.Item label='Ngày sinh' name='birthday' rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
            <DatePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
              placeholder='DD/MM/YYYY'
              placement='topLeft'
              size='large'
            />
          </Form.Item>
        </Col>
        <Col span={24} sm={12}>
          <Form.Item
            label='Giới tính'
            name='gender'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính',
              },
            ]}
          >
            <Radio.Group
              options={[
                { label: 'Nam', value: 'MALE' },
                { label: 'Nữ', value: 'FEMALE' },
                { label: 'Khác', value: 'OTHER' },
              ]}
              size='large'
            />
          </Form.Item>
        </Col>
        <Col span={24} md={14}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
              {
                pattern: REGEX_PATTERN.regexEmail,
                message: `Email không hợp lệ!`,
              },
            ]}
          >
            <Input placeholder='Nhập email của bạn' size='large' />
          </Form.Item>
        </Col>
        <Col span={24} md={10}>
          <Form.Item
            label='Số điện thoại'
            name='phoneNumber'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
              {
                pattern: REGEX_PATTERN.regexPhoneNumber,
                message: `SĐT không hợp lệ!`,
              },
            ]}
          >
            <Input placeholder='Nhập số điện thoại' size='large' />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password placeholder='Nhập mật khẩu' size='large' />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            label='Nhập lại mật khẩu'
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
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
            <Input.Password placeholder='Nhập lại mật khẩu' size='large' />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})
export default MentorForm
