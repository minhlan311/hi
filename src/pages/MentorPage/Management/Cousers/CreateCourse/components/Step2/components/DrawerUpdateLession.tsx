/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import documentApi from '@/apis/document.type'
import lessionApi from '@/apis/lession.api'
import openNotification from '@/components/Notification'
import { TypeLessonEnum } from '@/constants'
import { ENDPOINT } from '@/constants/endpoint'
import { debounce } from '@/helpers/common'
import { Lession } from '@/types/lession.type'
import { InboxOutlined } from '@ant-design/icons'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, Select, UploadFile, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { UploadProps } from 'antd/lib'
import { useEffect, useState } from 'react'

type Props = {
  onOpen?: boolean
  onClose?: any
  userId?: string
  idLessCheck?: string
  reFetchData?: any
  dataUpdateLession?: any
}

export default function DrawerUpdateLession({
  onOpen,
  onClose,
  userId,
  dataUpdateLession,
  idLessCheck,
  reFetchData,
}: Props) {
  const [form] = Form.useForm()
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [dataDrawer, setDataDrawer] = useState<any[]>([])
  const [refetch, setRefetch] = useState('')
  const [hidden, setHidden] = useState<boolean>(false)

  useEffect(() => {
    form.setFieldValue('name', dataUpdateLession?.name)
    form.setFieldValue('media', dataUpdateLession?.media)
    form.setFieldValue('length', dataUpdateLession?.length)
    form.setFieldValue('parentId', dataUpdateLession?.parentId)
    form.setFieldValue('id', dataUpdateLession?._id)
    form.setFieldValue('type', dataUpdateLession?.type)
    setContent(dataUpdateLession?.descriptions)
  }, [dataUpdateLession])

  useEffect(() => {
    reFetchData(refetch)
  }, [refetch])

  useEffect(() => {
    if (dataUpdateLession?.type !== 'VIDEO') {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }, [dataUpdateLession?.type])

  useEffect(() => {
    form.setFieldValue('descriptions', content)
  }, [content])

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

  const newArray = fileList?.map((item) => item?.response).flat()

  const mutation = useMutation({
    mutationFn: (body: Lession) => lessionApi.updateLession(body),
    onSuccess: (value: any) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `Cập nhật bài học ${value?.data?.name} thành công !`,
      })
      setRefetch(refetch + 1)
    },
    onError: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `Có lỗi xảy ra !`,
      })
      setRefetch(refetch + 1)
    },
  })

  const mutationDocument = useMutation({
    mutationFn: (body: any) => documentApi.createDocument(body),
    onSuccess: (value: any) => {
      const newDataDrawer = [...dataDrawer, { name: value?.data?.name, _id: idLessCheck }]
      setDataDrawer(newDataDrawer)
    },
  })

  function handleEditorChange(_event: any, editor: any) {
    const data = editor.getData()
    setContent(data)
  }

  const debouncedHandleEditorChange = debounce(handleEditorChange, 100)

  useEffect(() => {
    if (mutation.isSuccess && newArray.length > 0) {
      mutationDocument.mutate({
        isDownloadable: true,
        name: ` Tài liệu `,
        description: content,
        type: 'CURRICULUM',
        files: newArray,
        courseId: userId,
        lessonId: dataUpdateLession._id,
      })
      form.resetFields([''])
      setContent('')
      setFileList([])
    }
  }, [mutation.isSuccess])

  const onFinish = (values: any) => {
    delete values.document
    mutation.mutate(values)
    form.resetFields([''])
    setContent('')
    onClose(false)
  }

  const onChange = (value: string) => {
    if (value !== 'VIDEO') {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }

  const onFinishFailed = (_values: any) => {}

  return (
    <Drawer destroyOnClose size='large' open={onOpen} onClose={() => onClose(false)} title={'Sửa bài học '}>
      <Form onFinishFailed={onFinishFailed} onFinish={onFinish} layout='vertical' form={form}>
        <Form.Item label={'Tiêu đề bài học'} name='name' rules={[{ required: true, message: 'Hãy nhập chuyên đề' }]}>
          <Input placeholder='Nhập tên bài thi' allowClear />
        </Form.Item>
        <Form.Item label={'Loại bài học'} name='type' rules={[{ required: true, message: 'Hãy chọn loại bài học' }]}>
          <Select
            onChange={onChange}
            options={[
              { value: TypeLessonEnum.VIDEO_LESSON, label: TypeLessonEnum.VIDEO_LESSON },
              { value: TypeLessonEnum.DOCUMENT_LESSON, label: TypeLessonEnum.DOCUMENT_LESSON },
              { value: TypeLessonEnum.LIVE_LESSON, label: TypeLessonEnum.LIVE_LESSON },
            ]}
          />
        </Form.Item>
        {!hidden && (
          <>
            {' '}
            <Form.Item label={'Link video'} name='media'>
              <Input placeholder='Nhập Link video' allowClear />
            </Form.Item>
            <Form.Item label={'Thời lượng'} name='length'>
              <InputNumber
                style={{
                  width: '100%',
                }}
                placeholder='Nhập thời lượng video nếu có'
              />
            </Form.Item>
          </>
        )}
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
        <Form.Item hidden name='id' />
        <Form.Item>
          <Button onClick={() => onClose(false)}>Hủy bỏ</Button>
          <Button type='primary' htmlType='submit' className='btn-sn'>
            Cập nhật Bài học
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
