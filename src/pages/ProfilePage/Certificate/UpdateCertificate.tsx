/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select, Upload, UploadProps, message } from 'antd'
import { ENDPOINT } from '@/constants/endpoint'
import { MentorForm, MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import openNotification from '@/components/Notification'
import { useParams } from 'react-router-dom'
import { optionsEducationType } from './constants/ultil'
import UploadCer from '@/pages/ProfilePage/Certificate/components/UploadCer'
import UploadOtherDilopma from './components/UploadOtherDIlopma'
import UploadCMNDBefore from '@/pages/ProfilePage/Certificate/components/UploadCMNDBefore'
import UploadCMNDAfter from './components/UploadCMNDAfter'

export default function UpdateCertificate() {
  const [data, setData] = useState<MentorForm>()
  const { id } = useParams()
  const mutation = useMutation((dataForm: MentorForm) => {
    return userApi.updateMentorForm(dataForm)
  })
  const queryClient = useQueryClient()

  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const propsImageDocument: UploadProps = {
    name: 'image',
    multiple: true,
    listType: 'picture-card',
    action: import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE,
    onChange(info) {
      const { status } = info.file
      setFileList(info.fileList)

      if (status === 'done') {
        message.success(`Tải file ${info.file.name} thành công.`)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    },
  }
  const diplomaData = data?.diploma?.fileList?.map((item: any) => ({
    image: item?.response?.url,
    schoolName: data?.schoolName,
  }))

  const certificateData = data?.certificates?.fileList?.map((item: any) => item?.response?.url)
  const imageBefore = data?.imageBefore?.fileList?.map((item: any) => item?.response?.url)
  const imageAfter = data?.imageAfter?.fileList?.map((item: any) => item?.response?.url)

  const otherDiplomaData = data?.otherDiploma?.fileList?.map((item: any) => ({
    image: item?.response?.url,
    schoolName: 'other',
  }))

  const result = diplomaData?.concat(otherDiplomaData)

  const onFinish = async (values: TMentorForm) => {
    setData(values)
  }

  const confirm = () => {
    if (
      data?.diploma.fileList?.length === 0 ||
      data?.imageAfter.fileList?.length === 0 ||
      data?.imageBefore.fileList?.length === 0
    ) {
      openNotification({
        status: 'warning',
        message: 'Thông báo',
        description: 'Vui lòng điền đầy đủ thông tin Bằng cấp và CMND',
      })
    } else {
      mutation.mutate(
        {
          diploma: otherDiplomaData ? result : diplomaData,
          userId: id,
          imageAfter: imageAfter[0],
          imageBefore: imageBefore[0],
          educationType: data?.educationType,
          certificates: certificateData,
        },
        {
          onSuccess: () => {
            openNotification({
              status: 'success',
              message: 'Thông báo',
              description: 'Cập Nhật thông tin thành công !',
            })
            queryClient.invalidateQueries({ queryKey: ['userDetail'] })
          },
          onError: () => {
            openNotification({
              status: 'error',
              message: 'Thông báo',
              description: 'Có lỗi xảy ra,vui lòng thử lại sau !',
            })
          },
        },
      )
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
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
          label='Học vị'
          name='educationType'
          rules={[{ required: true, message: 'Vui lòng cập nhật học vị của bạn' }]}
        >
          <Select size='large' placeholder='Học vị của bạn là ' options={optionsEducationType} />
        </Form.Item>
        <Form.Item<TMentorForm>
          label='Tên trường'
          name='schoolName'
          rules={[{ required: true, message: 'Vui lòng cập nhật trường của bạn' }]}
        >
          <Input size='large' placeholder='Tên trường của bạn' />
        </Form.Item>

        <Form.Item<TMentorForm>
          label='Bằng cấp '
          name='diploma'
          rules={[{ required: true, message: 'Vui lòng cập nhật bằng cấp' }]}
        >
          <Upload listType='picture-card' {...propsImageDocument} fileList={fileList}>
            {fileList.length >= 8 ? null : <Button icon={<UploadOutlined />}></Button>}
          </Upload>
        </Form.Item>
        <UploadCer />
        <UploadOtherDilopma />
        <UploadCMNDBefore />
        <UploadCMNDAfter />
        <div className='flex-btn'>
          <Form.Item<TMentorForm>>
            <Popconfirm
              arrow
              destroyTooltipOnHide
              placement='topLeft'
              title={'Thông báo'}
              description={'Bạn có chắc chắn muốn cập nhật bằng cấp không ?'}
              onConfirm={confirm}
              okText='Đồng ý'
              cancelText='Hủy bỏ'
            >
              {' '}
              <Button type='primary' htmlType='submit'>
                Cập nhật
              </Button>
            </Popconfirm>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
