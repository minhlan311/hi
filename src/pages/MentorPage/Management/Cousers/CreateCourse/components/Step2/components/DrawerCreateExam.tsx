/* eslint-disable @typescript-eslint/no-explicit-any */
import topicApi from '@/apis/topic.api'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { TopicState } from '@/interface/topic'
import { Topic } from '@/types/course.type'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
  onOpen?: boolean
  onClose?: any
  userId?: string
  dataCollap: React.Dispatch<React.SetStateAction<TopicState[]>>
  dataTopic?: Topic | undefined
  reFetchData: Dispatch<SetStateAction<string>>
}

export default function DrawerCreateExam({ onOpen, onClose, userId, dataCollap, reFetchData }: Props) {
  const [form] = Form.useForm()
  const [refetch, setRefetch] = useState('')
  const [dataDrawer, setDataDrawer] = useState<TopicState | []>([])

  const queryClient = new QueryClient()
  useEffect(() => {
    dataCollap(dataDrawer as TopicState[])
  }, [dataDrawer])

  useEffect(() => {
    reFetchData(refetch)
  }, [refetch])

  const mutation = useMutation({
    mutationFn: (body: any) => topicApi.createTopic(body),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Thêm chuyên đề thành công',
      })
      setRefetch(refetch + 1)
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['topicsAll'] })
    },
  })

  const onFinish = (values: any) => {
    mutation.mutate({ ...values, parentId: userId })
    setDataDrawer(values)
    onClose(false)
  }

  return (
    <Drawer destroyOnClose size='large' open={onOpen} onClose={() => onClose(false)} title='Thêm chuyên đề'>
      <Form onFinish={onFinish} layout='vertical' form={form}>
        <Form.Item label='Tên chuyên đề' name='name' rules={[{ required: true, message: 'Nhập chuyên đề' }]}>
          <Input placeholder='Nhập tên chuyên đề' allowClear />
        </Form.Item>

        <TextAreaCustom label='Mô tả' name='descriptions' />

        <Form.Item>
          <Button onClick={() => onClose(false)}>Hủy bỏ</Button>
          <Button type='primary' htmlType='submit' className='btn-sn'>
            Thêm chuyên đề
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
