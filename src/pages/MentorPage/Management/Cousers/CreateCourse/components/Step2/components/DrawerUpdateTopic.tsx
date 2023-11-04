/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import topicApi from '@/apis/topic.api'
import openNotification from '@/components/Notification'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'

export default function DrawerUpdateTopic({ onOpen, onClose, reFetchData, dataUpdateTopic }: any) {
  const [form] = Form.useForm()
  const [refetch, setRefetch] = useState('')
  const [content, setContent] = useState('')

  const mutation = useMutation({
    mutationFn: (body: any) => topicApi.updateTopic(body),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Sửa chuyên đề thành công',
      })
      form.resetFields()
      setRefetch(refetch + 1)
      onClose(false)
    },
  })

  useEffect(() => {
    reFetchData(refetch)
  }, [refetch])

  useEffect(() => {
    if (dataUpdateTopic) {
      form.setFieldValue('name', dataUpdateTopic?.name)
      form.setFieldValue('parentId', dataUpdateTopic?.parentId)
      form.setFieldValue('id', dataUpdateTopic?.id)
      form.setFieldValue('descriptions', dataUpdateTopic?.id)
      setContent(dataUpdateTopic?.descriptions)
      editorRef.current = dataUpdateTopic?.descriptions
    }
    return
  }, [dataUpdateTopic])

  const editorRef = useRef()

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData()
    // Cập nhật ref thay vì state để tránh re-render
    editorRef.current = data
  }

  const onFinish = (values: any) => {
    mutation.mutate({ ...values, descriptions: editorRef.current })
  }

  const onFinishFailed = (_values: any) => {}

  return (
    <Drawer destroyOnClose size='large' open={onOpen} onClose={() => onClose(false)} title={'Thêm chuyên đề mới'}>
      <Form onFinishFailed={onFinishFailed} onFinish={onFinish} layout='vertical' form={form}>
        <Form.Item label={'Tên chuyên đề'} name='name' rules={[{ required: true, message: 'Hãy nhập chuyên đề' }]}>
          <Input placeholder='Nhập tên chuyên đề' allowClear />
        </Form.Item>
        <Form.Item label={'Mô tả'} name='descriptions' rules={[{ required: true, message: 'Hãy nhập mô tả' }]}>
          <CKEditor editor={ClassicEditor} data={content || editorRef.current} onChange={handleEditorChange} />
        </Form.Item>
        <Form.Item hidden name='parentId' />
        <Form.Item hidden name='id' />
        <Form.Item>
          <Button onClick={() => onClose(false)}>Hủy bỏ</Button>
          <Button type='primary' htmlType='submit' className='btn-sn'>
            Sửa chuyên đề
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
