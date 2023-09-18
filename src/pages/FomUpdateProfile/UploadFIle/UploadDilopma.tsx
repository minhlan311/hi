import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload, UploadProps, message } from 'antd'
import { ENDPOINT } from '@/constants/endpoint'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'

export default function UploadDilopma() {
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

  return (
    <>
      <Form.Item<TMentorForm>
        label='Tên trường'
        name='schoolName'
        rules={[{ required: true, message: 'Vui lòng cập nhật trường của bạn' }]}
      >
        <Input placeholder='Tên trường của bạn' />
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
    </>
  )
}
