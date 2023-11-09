/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Modal, Upload, Button, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { UploadFile } from 'antd/lib'
import { useContext, useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import FaqApi from '@/apis/faq.api'
import { AnswerState, FaqSate } from '@/interface/faq'
import { AppContext } from '@/contexts/app.context'

interface IModalFormProps {
  isModalOpen: boolean
  onClose: () => void
  faqId?: string
  onSuccess: () => void
  answer: AnswerState | null
}

export default function ModalFormAnswer(props: IModalFormProps) {
  const { isModalOpen, onClose, onSuccess, faqId, answer } = props
  const [form] = useForm()
  const [images, setImages] = useState<UploadFile[]>([])
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: (body: FaqSate) => (!answer ? FaqApi.updateFaq(body) : FaqApi.updateAnswer(body)),
    onSuccess() {
      message.success('Trả lời câu hỏi thành công')
      form.resetFields()
      setImages([])
      onClose()
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['getFaqDetail'] })
    },
    onError() {
      message.error('Lỗi không mong muốn, vui lòng thử lại vào lúc khác')
    }
  })

  const handleCancel = () => {
    form.resetFields()
    setImages([])
    onClose()
  }

  const onFinish = (values: any) => {
    const query = { ...values }
    query.id = faqId

    if (!answer) {
      query.answer = {
        content: values.content,
        files: values?.files?.fileList.map((item: UploadFile) => {
          return item.response.url
        }),
        userId: profile?._id
      }
      delete query.files
      delete query.content
    } else {
      query.files = query?.files?.fileList?.map((item: UploadFile) => {
        console.log(item)

        return item?.response?.url || item?.uid
      })
      query.answerId = answer?._id
    }

    mutate.mutate(query)
  }

  useEffect(() => {
    console.log(answer)

    if (answer) {
      form.setFieldsValue({
        content: answer?.content,
        files: {
          fileList: answer?.files?.map((item: string) => {
            return {
              uid: item,
              name: item,
              status: 'done',
              response: {
                url: `${item}`
              }
            } as UploadFile<any>
          })
        }
      })
      setImages(
        answer?.files?.map((item: string) => {
          return {
            uid: item,
            name: item,
            status: 'done',
            url: `${import.meta.env.VITE_FILE_ENDPOINT}/${item}`
          } as UploadFile<any>
        })
      )
    }
  }, [answer, form])

  return (
    <>
      <Modal
        title='Trả lời câu hỏi'
        maskClosable={false}
        open={isModalOpen}
        onOk={() => {
          form.submit()
        }}
        onCancel={handleCancel}
        okText='Gửi câu trả lời'
        cancelText='Đóng'
        width={'50%'}
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label='Ảnh' name='files'>
            <Upload
              accept='image/*'
              name='image'
              action={`${import.meta.env.VITE_FILE_ENDPOINT}/upload/large-image`}
              listType='picture'
              onChange={({ fileList: newFileList }) => {
                setImages(newFileList as UploadFile<any>[])
              }}
              fileList={images}
            >
              <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='Nội dung'
            name='content'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung'
              }
            ]}
          >
            <CKEditor
              editor={ClassicEditor}
              data={answer?.content}
              onChange={(event: any, editor: any) => {
                const data = editor.getData()
                form.setFieldsValue({ content: data })
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
