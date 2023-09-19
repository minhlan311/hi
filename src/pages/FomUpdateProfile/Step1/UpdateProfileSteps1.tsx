/* eslint-disable @typescript-eslint/no-explicit-any */
import { REGEX_PATTERN } from '@/constants/utils'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import './UpdateProfileSteps1.scss'
import { useQuery } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import { useParams } from 'react-router-dom'

export default function UpdateProfileSteps1({ setDataValue }: any) {
  const [form] = Form.useForm()
  const { id } = useParams()

  const { isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.getUserDetail(id!),
  })
  console.log(data, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaa')

  form.setFieldsValue({
    fullName: data?.data?.fullName,
    cccd: data?.data?.cccd,
    email: data?.data?.email,
    educationType: data?.data?.educationType,
    phoneNumber: data?.data?.phoneNumber,
    birthDay: data?.data?.birthDay,
  })

  const onFinish = (values: TMentorForm) => {
    console.log(values, 'values')
    setDataValue(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      disabled={isLoading}
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
        label='Số căn cước công dân'
        name='cccd'
        rules={[
          { required: true, message: 'Vui lòng nhập số căn cước của bạn' },
          { min: 12, message: 'Số căn cước chưa đúng định dạng' },
          { max: 12, message: 'Số căn cước chưa đúng định dạng' },
        ]}
      >
        <Input type='number' size='large' placeholder='Nhập số căn cước của bạn' />
      </Form.Item>
      <Form.Item<TMentorForm>
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
        <Input size='large' placeholder='Nhập email của bạn' />
      </Form.Item>
      <Form.Item<TMentorForm>
        label='Học vị'
        name='educationType'
        rules={[{ required: true, message: 'Vui lòng chọn học vị của bạn' }]}
      >
        <Select
          size='large'
          placeholder='Chọn học vị của bạn'
          options={[
            { value: 'Cử nhân', label: 'Cử nhân' },
            { value: 'Thạc sĩ', label: 'Thạc sĩ' },
            { value: 'Tiến sĩ ', label: 'Tiến sĩ' },
            { value: 'Phó giáo sư', label: 'Phó giáo sư' },
          ]}
        />
      </Form.Item>
      <Form.Item<TMentorForm>
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
        <Input type='number' placeholder='Nhập số điện thoại' size='large' />
      </Form.Item>
      <Form.Item<TMentorForm>
        label='Ngày sinh'
        name='birthDay'
        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
      >
        <DatePicker
          style={{
            width: '100%',
          }}
          size='large'
          format={'DD/MM/YYYY'}
          placeholder='DD/MM/YYYY'
          placement='topLeft'
        />
      </Form.Item>
      <div className='flex-btn'>
        <Form.Item<TMentorForm>>
          <Button
            disabled
            style={{
              display: 'none',
            }}
          >
            {' '}
            Quay lại{' '}
          </Button>
        </Form.Item>
        <Form.Item<TMentorForm>>
          <Button type='primary' htmlType='submit'>
            Tiếp theo
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
