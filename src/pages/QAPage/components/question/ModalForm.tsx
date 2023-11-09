/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import { CategoryState } from '@/interface/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form, Input, Modal, Select, Upload, Button, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { UploadFile } from 'antd/lib'
import { useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import FaqApi from '@/apis/faq.api'
import { FaqSate } from '@/interface/faq'

interface IModalFormProps {
  isModalOpen: boolean
  onClose: () => void
  onSuccess: () => void
  faq?: FaqSate
}

export default function ModalForm(props: IModalFormProps) {
  const { isModalOpen, onClose, onSuccess, faq } = props
  const [form] = useForm()
  const [images, setImages] = useState<UploadFile[]>([])
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryFn: () =>
      categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af'
      }),
    queryKey: ['getCategoryOptions']
  })
  const mutate = useMutation({
    mutationFn: (body: FaqSate) => (!faq ? FaqApi.createFaq(body) : FaqApi.updateFaq(body)),
    onSuccess() {
      message.success('Đặt câu hỏi thành công')
      form.resetFields()
      setImages([])
      onClose()
      onSuccess()

      if (faq) {
        queryClient.invalidateQueries({ queryKey: ['getFaqDetail'] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['getFaqList'] })
      }
    },
    onError() {
      message.error('Lỗi không mong muốn, vui lòng thử lại vào lúc khác')
    }
  })

  const categoryOptions = data?.data.docs?.map((item: CategoryState) => {
    return {
      label: item.name,
      value: item._id
    }
  })

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    setImages([])
    onClose()
  }

  const onFinish = (values: any) => {
    const query = { ...values }
    query.files = query?.files?.fileList?.map((item: UploadFile) => {
      return item?.response?.url || item?.uid
    })

    if (faq) {
      query.id = faq?._id
    }

    mutate.mutate(query)
  }

  useEffect(() => {
    if (faq) {
      form.setFieldsValue({
        categoryId: faq?.categoryId,
        title: faq?.title,
        content: faq?.content,
        files: {
          fileList: faq?.files?.map((item: string) => {
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
        faq?.files?.map((item: string) => {
          return {
            uid: item,
            name: item,
            status: 'done',
            url: `${import.meta.env.VITE_FILE_ENDPOINT}/${item}`
          }
        })
      )
    }
  }, [faq, form])

  return (
    <>
      <Modal
        title='Đặt câu hỏi'
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Gửi câu hỏi'
        cancelText='Đóng'
        width={'50%'}
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label='Chủ đề' name='categoryId' rules={[{ required: true, message: 'Vui lòng chọn chủ đề' }]}>
            <Select options={categoryOptions} />
          </Form.Item>
          <Form.Item
            label='Tiêu đề'
            name='title'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề câu hỏi' }]}
          >
            <Input placeholder='Nhập tiêu đề câu hỏi' />
          </Form.Item>
          <Form.Item label='Ảnh' name='files'>
            <Upload
              accept='image/*'
              name='image'
              action={`${import.meta.env.VITE_FILE_ENDPOINT}/upload/large-image`}
              listType='picture'
              onChange={({ fileList: newFileList }) => {
                setImages(newFileList)
              }}
              fileList={images}
            >
              <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item label='Nội dung' name='content'>
            <CKEditor
              editor={ClassicEditor}
              data={form.getFieldValue('content')}
              onChange={(_event: any, editor: any) => {
                const data = editor.getData()
                form.setFieldValue('content', data)
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
