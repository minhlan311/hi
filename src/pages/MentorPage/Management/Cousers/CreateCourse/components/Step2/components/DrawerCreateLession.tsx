/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import documentApi from '@/apis/document.type'
import lessionApi from '@/apis/lession.api'
import { ENDPOINT } from '@/constants/endpoint'
import { debounce } from '@/helpers/common'
import { LessionForm } from '@/types/lession.type'
import { InboxOutlined } from '@ant-design/icons'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, UploadFile, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { UploadProps } from 'antd/lib'
import { useEffect, useState } from 'react'

type Props = {
  onOpen: boolean
  onClose: any
  userId: string
  dataCollapLession: (dataCollapLession?: any) => void
  idLessCheck: string
}

export default function DrawerCreateLession({ onOpen, onClose, userId, dataCollapLession, idLessCheck }: Props) {
  const [form] = Form.useForm()
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [dataDrawer, setDataDrawer] = useState<any[]>([])

  useEffect(() => {
    dataCollapLession(dataDrawer)
  }, [dataDrawer])

  const props: UploadProps = {
    name: 'attachment',
    action: import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_ATTACHMENT,
    onChange(info) {
      const { status } = info.file

      if (status !== 'uploading') {
        setFileList(info.fileList)
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }
  const newArray = fileList?.map((item) => item?.response)

  const mutation = useMutation({
    mutationFn: (body: LessionForm) => lessionApi.createLession(body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['topicAll'] })
    },
  })

  const mutationDocument = useMutation({
    mutationFn: (body: any) => documentApi.createDocument(body),
    onSuccess: (value: any) => {
      const newDataDrawer = [...dataDrawer, { name: value?.data?.name, _id: idLessCheck }]

      setDataDrawer(newDataDrawer)
    },
  })

  //   console.log(dataDrawer, 'dataDrawerdataDrawer')

  useEffect(() => {
    form.setFieldValue('descriptions', content)
  }, [content])

  useEffect(() => {
    form.setFieldValue('parentId', idLessCheck)
  }, [idLessCheck])

  function handleEditorChange(_event: any, editor: any) {
    const data = editor.getData()
    setContent(data)
  }

  const debouncedHandleEditorChange = debounce(handleEditorChange, 200)

  const onFinish = (values: any) => {
    delete values.document
    mutation.mutate(values)
    mutationDocument.mutate({
      isDownloadable: true,
      name: ` Tài liệu ${values.name}`,
      description: values.descriptions,
      type: 'CURRICULUM',
      files: newArray,
      courseId: userId,
    })
    form.resetFields()
    onClose(false)
    // console.log(values, 'values')
  }

  const onFinishFailed = (values: any) => {
    console.log(values, 'values')
  }

  return (
    <Drawer destroyOnClose size='large' open={onOpen} onClose={() => onClose(false)} title={'Thêm Bài học mới '}>
      <Form onFinishFailed={onFinishFailed} onFinish={onFinish} layout='vertical' form={form}>
        <Form.Item label={'Tiêu đề bài học'} name='name' rules={[{ required: true, message: 'Hãy nhập chuyên đề' }]}>
          <Input placeholder='Nhập tên bài thi' allowClear />
        </Form.Item>
        <Form.Item label={'Link video'} name='media' rules={[{ required: true, message: 'Hãy nhập link video' }]}>
          <Input placeholder='Nhập Link video' allowClear />
        </Form.Item>
        <Form.Item label={'Thời lượng'} name='length' rules={[{ required: true, message: 'Hãy nhập thời lượng' }]}>
          <InputNumber
            style={{
              width: '100%',
            }}
            placeholder='Nhập thời lượng bài thi'
          />
        </Form.Item>
        <Form.Item
          label={'Nội dung giới thiệu'}
          name='descriptions'
          rules={[{ required: true, message: 'Hãy nhập mô tả' }]}
        >
          <CKEditor editor={ClassicEditor} data={content} onChange={debouncedHandleEditorChange} />
        </Form.Item>
        <Form.Item label={'Tài liệu'} name='document'>
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click hoặc kéo file vào đây để tải lên</p>
          </Dragger>
        </Form.Item>
        <Form.Item hidden name='parentId' />
        <Form.Item>
          <Button onClick={() => onClose(false)}>Hủy bỏ</Button>
          <Button type='primary' htmlType='submit' className='btn-sn'>
            Thêm Bài học
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
