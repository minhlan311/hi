import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload, UploadProps, message } from 'antd'
import { ENDPOINT } from '@/constants/endpoint'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'

export default function UploadOtherDilopma() {
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
        const names = fileList.map((item) => item?.response?.url)
        form.setFieldValue('certificate', names)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    },
  }

  return (
    <Form.Item<TMentorForm> label='Bằng cấp khác' name='otherDiploma'>
      <Upload listType='picture-card' {...propsImageDocument} fileList={fileList}>
        {fileList.length >= 8 ? null : <Button icon={<UploadOutlined />}></Button>}
      </Upload>
    </Form.Item>
  )
}
