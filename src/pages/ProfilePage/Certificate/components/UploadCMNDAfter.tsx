import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload, UploadProps, message } from 'antd'
import { ENDPOINT } from '@/constants/endpoint'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'

export default function UploadCMNDAfter() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const propsImageDocument: UploadProps = {
    name: 'image',
    maxCount: 1,
    listType: 'picture-card',
    action: import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE,
    onChange(info) {
      const { status } = info.file
      console.log(info.file.response, 'inffoooo')

      setFileList(info.fileList)

      if (status === 'done') {
        message.success(`Tải file ${info.file.name} thành công.`)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    },
  }
  const names = fileList.map((item) => item?.response?.url)
  console.log(fileList, 'fileListfileList')
  console.log(names, 'names')

  return (
    <Form.Item<TMentorForm>
      label='Mặt sau CMND'
      name='imageAfter'
      rules={[{ required: true, message: 'Vui lòng cập nhật ảnh căn cước mặt sau' }]}
    >
      <Upload listType='picture-card' {...propsImageDocument} fileList={fileList}>
        {fileList.length >= 8 ? null : <Button icon={<UploadOutlined />}></Button>}
      </Upload>
    </Form.Item>
  )
}
