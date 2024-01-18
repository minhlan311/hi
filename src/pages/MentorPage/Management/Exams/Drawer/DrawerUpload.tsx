/* eslint-disable @typescript-eslint/no-explicit-any */
import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Drawer, Form, Space } from 'antd'
import { useEffect } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { HiOutlineUpload } from 'react-icons/hi'
import css from './styles.module.scss'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  categoryId: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerUpload = (props: Props) => {
  const [form] = Form.useForm()
  const { open, setOpen, categoryId, setLoading } = props
  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationFn: (body) => questionApi.importQuestion(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionsBank'] })
    },
  })

  const onCloseDrawer = () => {
    setOpen(false)
  }

  const onFinish = (value: any) => {
    if (categoryId) {
      const payload = {
        categoryId: categoryId,
        url: value.attachment[0],
      }
      mutate(payload as unknown as any)

      onCloseDrawer()
    }
  }

  useEffect(() => {
    if (isLoading && setLoading) {
      setLoading(isLoading)
      setTimeout(() => {
        setLoading(false)
      }, 200)
    }
  }, [isLoading])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = import.meta.env.VITE_FILE_ENDPOINT + '/upload/attachments/Upload_Question_Form-c354.xlsx'
    link.target = '_blank'
    link.download = 'ten_file'
    link.click()
  }

  return (
    <div>
      <Drawer
        title='Đăng tải câu hỏi'
        onClose={onCloseDrawer}
        open={open}
        extra={
          <Space>
            <ButtonCustom
              onClick={() => {
                setOpen(false)
                onCloseDrawer()
              }}
            >
              Hủy
            </ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary'>
              Thêm câu hỏi
            </ButtonCustom>
          </Space>
        }
      >
        <Space direction='vertical' size='large' align='center' className={css.uploadQues}>
          <Form form={form} onFinish={onFinish}>
            <UploadCustom accessType='.xlsx, .xls' uploadKey='attachment' name='attachment' dropArea showUploadList>
              <ButtonCustom icon={<HiOutlineUpload />} tooltip='Thêm file câu hỏi'></ButtonCustom>
            </UploadCustom>
          </Form>
          <Space align='center'>
            <AiOutlineQuestionCircle />
            <p>
              Tải mẫu form câu hỏi
              <ButtonCustom type='link' size='small' className={css.buttDown} onClick={handleDownload}>
                tại đây
              </ButtonCustom>
            </p>
          </Space>
        </Space>
      </Drawer>
    </div>
  )
}

export default DrawerUpload
