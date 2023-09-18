/* eslint-disable @typescript-eslint/no-explicit-any */
import { REGEX_PATTERN } from '@/constants/utils'
import { useEffect } from 'react'
import { MentorForm as TMentorForm } from '../Auth/Register/constants'
import './FormUpdateProfile.scss'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import UploadCMNDAfter from './UploadFIle/UploadCMNDAfter'
import UploadCMNDBefore from './UploadFIle/UploadCMNDBefore'
import openNotification from '@/components/Notification'
import UploadCer from './UploadFIle/UploadCer'
import UploadDilopma from './UploadFIle/UploadDilopma'
import UploadOtherDilopma from './UploadFIle/UploadOtherDIlopma'
import { useParams } from 'react-router-dom'

export default function FormUpdateProfile() {
  const { id } = useParams()
  const [form] = Form.useForm()

  const { isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.getInfoUser(id!)
  })

  console.log(data, 'dataaaaaaaaaaaaaaaaaa')

  const mutation = useMutation((body: TMentorForm) => {
    return userApi.updateProfileUser(body)
  })

  const onFinish = (values: TMentorForm) => {
    console.log(values, 'values')

    const imageCer = values?.certificate?.fileList?.map(
      (item: any) => import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url
    )
    const imageAfter = values?.imageAfter?.fileList?.map(
      (item: any) => import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url
    )
    const imageBefore = values?.imageBefore?.fileList?.map(
      (item: any) => import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url
    )
    const otherDilopma = values?.otherDilopma?.fileList?.map(
      (item: any) => import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url
    )
    const dilopma = values?.dilopma?.fileList?.map((item: any) => ({
      dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
      schoolName: values.schoolName
    }))

    mutation.mutate(
      {
        ...values,
        certificate: imageCer,
        imageAfter: imageAfter,
        imageBefore: imageBefore,
        otherDilopma: otherDilopma,
        dilopma: dilopma
      },
      {
        onSuccess: (data) => {
          if (data) {
            openNotification({
              status: 'success',
              message: 'Thông báo',
              description: 'Update thành công thông tin!'
            })
          }
        }
      }
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    form.setFieldsValue({
      fullName: data?.data?.fullName,
      email: data?.data?.email,
      phoneNumber: data?.data?.phoneNumber
    })
  }, [form, data])

  console.log(data, 'datadata')

  return (
    <div className='div-form-update'>
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
            { max: 12, message: 'Số căn cước chưa đúng định dạng' }
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
        {data?.data.isMentor && (
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
                { value: 'Phó giáo sư', label: 'Phó giáo sư' }
              ]}
            />
          </Form.Item>
        )}
        <Form.Item<TMentorForm>
          label='Số điện thoại'
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
          label='Ngày sinh'
          name='birthDay'
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker size='large' format={'DD/MM/YYYY'} placeholder='DD/MM/YYYY' placement='topLeft' />
        </Form.Item>
        {data?.data.isMentor && (
          <>
            <UploadCer />
            <UploadDilopma />
            <UploadOtherDilopma />
            <UploadCMNDBefore />
            <UploadCMNDAfter />
          </>
        )}

        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
