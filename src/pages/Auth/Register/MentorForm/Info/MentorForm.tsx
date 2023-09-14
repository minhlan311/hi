/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'
import { DatePicker, Form, Input, notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/apis/auth.api'
import { REGEX_PATTERN } from '@/constants/utils'
import { MentorForm as TMentorForm } from '../../constants'
import { ROLE } from '../../Roles/constants'
import { useNavigate } from 'react-router-dom'

const MentorForm = forwardRef(({ onFinishs, formRef, roles }: any) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  formRef.current = form

  const registerAccountMutation = useMutation({
    mutationFn: (body: TMentorForm) => authApi.registerAccount(body)
  })
  const onFinish = (values: any) => {
    const dataUpload = { ...values, isMentor: roles === ROLE.MENTOR ? true : false }
    registerAccountMutation.mutate(dataUpload, {
      onSuccess: (data) => {
        localStorage.setItem('id', data?.data?._id)
        onFinishs(values)
        if (roles === ROLE.STUDENT) {
          navigate('/')
          notification.open({
            type: 'success',
            message: 'Thông báo',
            description: 'Đăng ký tài khoản thành công 1'
          })
          return
        }
      },
      onError: (error: any) => {
        notification.open({
          type: 'error',
          message: 'Thông báo',
          description: error?.response?.data?.message
        })
      }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      layout='vertical'
      form={form}
      name='basic'
      initialValues={{ remember: true }}
      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item<TMentorForm>
        label='Họ tên'
        name='fullName'
        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
      >
        <Input size='large' placeholder='Nhập họ và tên của bạn' />
      </Form.Item>

      <Form.Item<TMentorForm>
        label='Email'
        name='email'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập email'
          },
          {
            pattern: REGEX_PATTERN.regexEmail,
            message: `Email không hợp lệ!`
          }
        ]}
      >
        <Input size='large' placeholder='Nhập email của bạn' />
      </Form.Item>

      <Form.Item<TMentorForm>
        label='Password'
        name='password'
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
      <Form.Item<TMentorForm>
        label='confirmPassword'
        name='confirmPassword'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập lại mật khẩu'
          },
          {
            min: 8,
            message: 'Mật khẩu phải có ít nhất 8 ký tự'
          },
          {
            pattern: REGEX_PATTERN.regexPassword,
            message: `Mật khẩu bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt`
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Mật khẩu không trùng khớp'))
            }
          })
        ]}
      >
        <Input.Password size='large' placeholder='Nhập lại mật khẩu' />
      </Form.Item>
      <Form.Item<TMentorForm>
        label='SĐT liên kết với tài khoản Zalo'
        name='phoneNumber'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập số điện thoại'
          },
          {
            pattern: REGEX_PATTERN.regexPhoneNumber,
            message: `SĐT không hợp lệ!`
          }
        ]}
      >
        <Input type='number' placeholder='Nhập số điện thoại' size='large' />
      </Form.Item>
      <Form.Item<TMentorForm>
        label='Sinh nhật'
        name='birthDay'
        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
      >
        <DatePicker size='large' />
      </Form.Item>
    </Form>
  )
})
export default MentorForm
