/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, UploadProps, message } from 'antd'
import { ENDPOINT } from '@/constants/endpoint'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'
import UploadOtherDilopma from './UploadOtherDIlopma'
import UploadCer from './UploadCer'

export default function UploadProfileSteps2({ setDataStep2 }: any) {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const propsImageDocument: UploadProps = {
    name: 'image',
    multiple: true,
    listType: 'picture-card',
    action: import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE,
    onChange(info) {
      const { status } = info.file
      console.log(info.file.response, 'inffoooo')
      setFileList(info.fileList)
      if (status === 'done') {
        message.success(`Tải file ${info.file.name} thành công.`)
        const names = fileList.map((item) => item?.response?.url)
        form.setFieldValue('certificate', names)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    }
  }

  const onFinish = (values: TMentorForm) => {
    console.log(values, 'values')
    setDataStep2(values)
    // const imageCer = getImageUrls(values?.certificate?.fileList)
    // const imageAfter = getImageUrls(values?.imageAfter?.fileList)
    // const imageBefore = getImageUrls(values?.imageBefore?.fileList)
    // const otherDilopma = values?.otherDilopma?.fileList?.map((item: any) => ({
    //   dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
    //   schoolName: null
    // }))
    // const dilopma = values?.dilopma?.fileList?.map((item: any) => ({
    //   dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
    //   schoolName: values.schoolName
    // }))
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
          label='Tên trường'
          name='schoolName'
          rules={[{ required: true, message: 'Vui lòng cập nhật trường của bạn' }]}
        >
          <Input size='large' placeholder='Tên trường của bạn' />
        </Form.Item>

        <Form.Item<TMentorForm>
          label='Bằng cấp '
          name='dilopma'
          rules={[{ required: true, message: 'Vui lòng cập nhật bằng cấp' }]}
        >
          <Upload listType='picture-card' {...propsImageDocument} fileList={fileList}>
            {fileList.length >= 8 ? null : <Button icon={<UploadOutlined />}></Button>}
          </Upload>
        </Form.Item>
        <UploadOtherDilopma />
        <UploadCer />
        <div className='flex-btn'>
          <Form.Item<TMentorForm>>
            <Button style={{ display: 'none' }} disabled>
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
    </>
  )
}
