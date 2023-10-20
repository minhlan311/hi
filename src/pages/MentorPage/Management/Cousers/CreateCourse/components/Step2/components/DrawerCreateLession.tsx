/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import documentApi from '@/apis/document.type'
import examApi from '@/apis/exam.api'
import lessionApi from '@/apis/lession.api'
import { TypeLessonEnum } from '@/constants'
import { ENDPOINT } from '@/constants/endpoint'
import { debounce } from '@/helpers/common'
import { LessionForm } from '@/types/lession.type'
import { InboxOutlined } from '@ant-design/icons'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, InputNumber, Select, UploadFile, message } from 'antd'
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
  const [hidden, setHidden] = useState<boolean>(false)
  const [questionShow, setQuestionShow] = useState<boolean>(true)
  const [dataDrawer, setDataDrawer] = useState<any[]>([])
  const [id, setId] = useState<string>()
  useEffect(() => {
    dataCollapLession(dataDrawer)
  }, [dataDrawer])

  const { data: dataExamLession } = useQuery({
    queryKey: ['queryExam'],
    queryFn: () => examApi.findExam({}),
  })

  const optionsLession = dataExamLession?.data?.docs?.map((item) => ({
    label: item.name,
    value: item._id,
  }))

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
    mutationFn: (body: LessionForm) => lessionApi.createLession(body),
    onSuccess: (value: any) => {
      setId(value?.data?._id)
      setDataDrawer(value?.data?._id)
    },
  })

  useEffect(() => {
    if (mutation.isSuccess && fileList.length > 0) {
      mutationDocument.mutate({
        isDownloadable: true,
        name: ` Tài liệu `,
        description: content,
        type: 'CURRICULUM',
        files: newArray,
        courseId: userId,
        lessonId: id,
      })
      setFileList([])
    }
  }, [mutation.isSuccess, id])

  const mutationDocument = useMutation({
    mutationFn: (body: any) => documentApi.createDocument(body),
    onSuccess: (value: any) => {
      const newDataDrawer = [...dataDrawer, { name: value?.data?.name, _id: idLessCheck }]
      setDataDrawer(newDataDrawer)
    },
  })

  useEffect(() => {
    form.setFieldValue('descriptions', content)
  }, [content])

  form.setFieldValue('parentId', idLessCheck)
  form.setFieldValue('id', idLessCheck)

  function handleEditorChange(_event: any, editor: any) {
    const data = editor.getData()
    setContent(data)
  }

  const debouncedHandleEditorChange = debounce(handleEditorChange, 100)

  const onFinish = (values: any) => {
    delete values.document
    mutation.mutate(values)

    form.resetFields()
    setContent('')
    onClose(false)
  }

  const onChange = (value: string) => {
    if (value !== TypeLessonEnum.VIDEO_LESSON) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    if (value === TypeLessonEnum.LIVE_LESSON) {
      setContent(
        '<p>Đây là bài học sẽ học tại lớp học online <b><a href="/schedule">CLICK VÀO ĐÂY</a></b> để xem lịch học của bạn</p>',
      )
    } else {
      setContent('')
    }

    if (value === TypeLessonEnum.EXAM) {
      setQuestionShow(false)
    } else {
      setQuestionShow(true)
    }
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
        <Form.Item
          initialValue={TypeLessonEnum.VIDEO_LESSON}
          label={'Loại bài học'}
          name='type'
          rules={[{ required: true, message: 'Hãy chọn loại bài học' }]}
        >
          <Select
            onChange={onChange}
            options={[
              { value: TypeLessonEnum.VIDEO_LESSON, label: 'VIDEO' },
              { value: TypeLessonEnum.DOCUMENT_LESSON, label: 'VĂN BẢN' },
              { value: TypeLessonEnum.LIVE_LESSON, label: 'TRỰC TUYẾN' },
              { value: TypeLessonEnum.EXAM, label: 'BÀI TEST' },
            ]}
          />
        </Form.Item>
        {!hidden && (
          <>
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
        {!questionShow && (
          <Form.Item label={'Thêm bộ câu hỏi'} name='testId' rules={[{ required: true, message: 'Hãy chọn câu hỏi' }]}>
            <Select options={optionsLession} placeholder='Thêm bộ câu hỏi cho bài học này' />
          </Form.Item>
        )}
        <Form.Item label={'Tài liệu'} name='document'>
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click hoặc kéo file vào đây để tải lên</p>
          </Dragger>
        </Form.Item>
        <Form.Item hidden name='parentId' />
        <Form.Item hidden name='lessonid' />
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
