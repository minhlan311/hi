import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import useResponsives from '@/hooks/useResponsives'
import { QuestionState } from '@/interface/question'
import { Drawer, Form, Space } from 'antd'
import CreateQuestion from '../Components/CreateQuestion'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  open: boolean
  questionData?: QuestionState | null
  categoryId: string
  typeQuestion: 'TEST' | 'QUIZ'
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerQuestion = (props: Props) => {
  const { open, questionData = null, categoryId, typeQuestion, setOpen, setQuestionData, setLoading } = props
  const [form] = Form.useForm()
  const { sm, lg, xl, xxl } = useResponsives()

  return (
    <div>
      <Drawer
        title={!questionData ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
        onClose={() => setOpen(false)}
        open={open}
        width={(sm && '100vw') || (lg && '65vw') || (xl && '45vw') || (xxl && '42vw') || '100vw'}
        extra={
          <Space>
            <ButtonCustom
              onClick={() => {
                setOpen(false)
                form.resetFields()
              }}
              size={sm ? 'small' : undefined}
            >
              Hủy
            </ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary' size={sm ? 'small' : undefined}>
              {!questionData ? 'Tạo câu hỏi' : 'Cập nhật'}
            </ButtonCustom>
          </Space>
        }
      >
        <CreateQuestion
          questionData={questionData}
          isForm={form}
          isOpen={open}
          setOpen={setOpen}
          categoryId={categoryId}
          typeQuestion={typeQuestion}
          setQuestionData={setQuestionData}
          setLoading={setLoading}
        />
      </Drawer>
    </div>
  )
}

export default DrawerQuestion
