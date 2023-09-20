import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload, UploadProps, message } from 'antd'
import { ENDPOINT } from '@/constants/endpoint'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'
import UploadCMNDBefore from './UploadCMNDBefore'

export default function UploadProfileSteps3({ setDataStep3 }: any) {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [complete, setComplete] = useState<boolean>(false)
  console.log(complete, 'complete')

  const propsImageDocument: UploadProps = {
    name: 'image',
    maxCount: 1,
    multiple: true,
    listType: 'picture-card',
    action: import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE,
    onChange(info) {
      const { status } = info.file
      console.log(info.file.response, 'inffoooo')

      setFileList(info.fileList)
      if (status === 'done') {
        message.success(`Tải file ${info.file.name} thành công.`)
        form.setFieldValue('coverMedia', info)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    }
  }
  const names = fileList.map((item) => item?.response?.url)
  console.log(fileList, 'fileListfileList')
  console.log(names, 'names')
  const onFinish = (values: TMentorForm) => {
    setDataStep3({ ...values, check: true })
    setComplete(true)
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
          label='Mặt sau CMND'
          name='imageAfter'
          rules={[{ required: true, message: 'Vui lòng cập nhật ảnh căn cước mặt sau' }]}
        >
          <Upload listType='picture-card' {...propsImageDocument} fileList={fileList}>
            {fileList.length >= 8 ? null : <Button icon={<UploadOutlined />}></Button>}
          </Upload>
        </Form.Item>
        <UploadCMNDBefore />
        {!complete && (
          <div className='flex-btn'>
            <Form.Item<TMentorForm>>
              <Button
                htmlType='button'
                style={{
                  display: 'none'
                }}
              >
                Quay lại
              </Button>
            </Form.Item>
            <Form.Item<TMentorForm>>
              <Button type='primary' htmlType='submit'>
                Hoàn tất
              </Button>
            </Form.Item>
          </div>
        )}
      </Form>
    </>
  )
}
