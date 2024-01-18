/* eslint-disable @typescript-eslint/no-explicit-any */
import topicApi from '@/apis/topic.api'
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import useResponsives from '@/hooks/useResponsives'
import { TopicState } from '@/interface/topic'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Input } from 'antd'
import { useEffect } from 'react'

type Props = {
  courseId: string
  topicId: string
  topicData: TopicState
  openTopic: boolean
  setOpenTopic: React.Dispatch<React.SetStateAction<boolean>>
}

const TopicForm = ({ courseId, topicId, openTopic, topicData, setOpenTopic }: Props) => {
  const { sm, md } = useResponsives()
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const topicMutation = useMutation({
    mutationFn: (body) => (topicId ? topicApi.updateTopic(body) : topicApi.createTopic(body)),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `${topicId ? 'Cập nhật' : 'Tạo'} chuyên đề thành công`,
      })
      form.resetFields()
      setOpenTopic(false)
      queryClient.invalidateQueries(['topicList'])
    },
  })

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      id: topicId,
      parentId: courseId,
    }
    topicMutation.mutate(payload)
  }

  useEffect(() => {
    if (topicData) form.setFieldsValue({ ...topicData })
  }, [topicData])

  return (
    <DrawerCustom
      open={openTopic}
      onFinish={() => {
        form.submit()
      }}
      onClose={setOpenTopic}
      placement='right'
      title={`${topicId ? 'Cập nhật' : 'Tạo'} chuyên đề`}
      width={sm || md ? '100%' : '50vw'}
      okText={`${topicId ? 'Cập nhật' : 'Tạo'}`}
    >
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Tiêu đề chuyên đề'
          name='name'
          rules={[{ required: true, message: 'Nhập tiêu đề chuyên đề' }]}
        >
          <Input placeholder='Nhập tiêu đề chuyên đề' />
        </Form.Item>

        <TextAreaCustom name='descriptions' label='Mô tả' data={topicData} required />
      </Form>
    </DrawerCustom>
  )
}

export default TopicForm
