/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import openNotification from '@/components/Notification'
import { debounce } from '@/helpers/common'
import { TopicList } from '@/interface/topic'
import { Topic } from '@/types/course.type'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input } from 'antd'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Props = {
  onOpen?: boolean
  onClose?: any
  userId?: string
  dataCollap: React.Dispatch<React.SetStateAction<TopicList[]>>
  dataTopic?: Topic | undefined
  reFetchData: Dispatch<SetStateAction<string>>
}

export default function DrawerCreateExam({ onOpen, onClose, userId, dataCollap, reFetchData }: Props) {
  const [form] = Form.useForm()
  const [content, setContent] = useState('')
  const [refetch, setRefetch] = useState('')
  const [dataDrawer, setDataDrawer] = useState<TopicList | []>([])

  const queryClient = new QueryClient()
  useEffect(() => {
    dataCollap(dataDrawer as TopicList[])
  }, [dataDrawer])

  useEffect(() => {
    reFetchData(refetch)
  }, [refetch])

  // const query = useQuery({ queryKey: ['todos'], queryFn: ()=> })

  const mutation = useMutation({
    mutationFn: (body: any) => courseApi.createTopics(body),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Thêm chuyên đề mới thành công',
      })
      form.resetFields()
      setContent('')
      queryClient.invalidateQueries({ queryKey: ['topicsAll'] })
    },
  })

  useEffect(() => {
    form.setFieldValue('descriptions', content)
  }, [content])

  form.setFieldValue('parentId', userId)

  function handleEditorChange(_event: any, editor: any) {
    const data = editor.getData()
    setContent(data)
  }

  const debouncedHandleEditorChange = debounce(handleEditorChange, 100)

  const onFinish = (values: any) => {
    mutation.mutate(values)
    setDataDrawer(values)
    onClose(false)
    setRefetch(refetch + 1)
  }

  const onFinishFailed = (values: any) => {
    console.log(values, 'values')
  }

  return (
    <Drawer destroyOnClose size='large' open={onOpen} onClose={() => onClose(false)} title={'Sửa chuyên đề'}>
      <Form onFinishFailed={onFinishFailed} onFinish={onFinish} layout='vertical' form={form}>
        <Form.Item label={'Tên chuyên đề'} name='name' rules={[{ required: true, message: 'Hãy nhập chuyên đề' }]}>
          <Input placeholder='Nhập tên bài thi' allowClear />
        </Form.Item>
        <Form.Item label={'Mô tả'} name='descriptions' rules={[{ required: true, message: 'Hãy nhập mô tả' }]}>
          <CKEditor editor={ClassicEditor} data={content} onChange={debouncedHandleEditorChange} />
        </Form.Item>
        <Form.Item hidden name='parentId' />
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
