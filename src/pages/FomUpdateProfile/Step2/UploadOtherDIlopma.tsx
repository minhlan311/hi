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
    console.log(values, 'values222222')
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
    <Form.Item<TMentorForm> label='Bằng cấp khác' name='otherDilopma'>
      <Upload listType='picture-card' {...propsImageDocument} fileList={fileList}>
        {fileList.length >= 8 ? null : <Button icon={<UploadOutlined />}></Button>}
      </Upload>
    </Form.Item>
  )
}
