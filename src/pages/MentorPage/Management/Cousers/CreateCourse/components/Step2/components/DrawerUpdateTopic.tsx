/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import topicApi from '@/apis/topic.api'
import openNotification from '@/components/Notification'
import { debounce } from '@/helpers/common'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input } from 'antd'
import { useEffect, useState } from 'react'

export default function DrawerUpdateTopic({ onOpen, onClose, reFetchData, dataUpdateTopic }: any) {
  const [form] = Form.useForm()
  const [content, setContent] = useState('')
  const [refetch, setRefetch] = useState('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const mutation = useMutation({
    mutationFn: (body: any) => topicApi.updateTopic(body),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Sửa chuyên đề thành công',
      })
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
      setContent(dataUpdateTopic?.descriptions)
    }
    return
  }, [dataUpdateTopic])

  useEffect(() => {
    if (content) form.setFieldValue('descriptions', content)
    return
  }, [content])

  function handleEditorChange(_event: any, editor: any) {
    const data = editor.getData()
    setContent(data)
  }

  const debouncedHandleEditorChange = debounce((_event: any, editor: any) => {
    handleEditorChange(_event, editor)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }, 1500)

  const onFinish = (values: any) => {
    mutation.mutate(values)
    form.resetFields()
    setContent('')
  }

  const onFinishFailed = (_values: any) => {}

  return (
    <Drawer destroyOnClose size='large' open={onOpen} onClose={() => onClose(false)} title={'Thêm chuyên đề mới'}>
      <Form onFinishFailed={onFinishFailed} onFinish={onFinish} layout='vertical' form={form}>
        <Form.Item label={'Tên chuyên đề'} name='name' rules={[{ required: true, message: 'Hãy nhập chuyên đề' }]}>
          <Input placeholder='Nhập tên chuyên đề' allowClear />
        </Form.Item>
        <Form.Item label={'Mô tả'} name='descriptions' rules={[{ required: true, message: 'Hãy nhập mô tả' }]}>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(_event: any, editor: any) => {
              setIsSubmitting(true)
              debouncedHandleEditorChange(_event, editor)
            }}
          />
        </Form.Item>
        <Form.Item hidden name='parentId' />
        <Form.Item hidden name='id' />
        <Form.Item>
          <Button onClick={() => onClose(false)}>Hủy bỏ</Button>
          <Button type='primary' htmlType='submit' className='btn-sn' loading={isSubmitting}>
            Sửa chuyên đề
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
