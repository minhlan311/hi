import { AppContext } from '@/contexts/app.context'
import { CaretRightOutlined } from '@ant-design/icons'
import { Button, Card, Space, message } from 'antd'
import { useContext, useMemo, useState } from 'react'
import ModalForm from './ModalForm'
import FaqList from './Question'

interface IQuestionListProp {
  categoryId?: string
}

export default function Questions(props: IQuestionListProp) {
  const { categoryId } = props
  const { isAuthenticated } = useContext(AppContext)
  const [openForm, setOpenForm] = useState<boolean>(false)

  const faqList = useMemo(() => {
    return <FaqList categoryId={categoryId} />
  }, [categoryId])

  return (
    <>
      <Card style={{ marginBottom: '10px', backgroundColor: 'var(--green)', color: 'var(--white)' }}>
        <h2>Nền tảng hỏi đáp bài tập</h2>
        <p style={{ margin: '10px 0', display: 'block' }}>
          Nền tảng kết nối cộng đồng hỗ trợ giải bài tập học sinh trong khối K12
        </p>
        <Button
          size='large'
          onClick={() => {
            if (!isAuthenticated) return message.warning('Vui lòng đăng nhập để đặt câu hỏi')
            setOpenForm(true)
          }}
        >
          <Space>
            ĐẶT CÂU HỎI NGAY
            <CaretRightOutlined />
          </Space>
        </Button>
      </Card>
      {faqList}
      {openForm && (
        <ModalForm
          onClose={() => {
            setOpenForm(false)
          }}
          onSuccess={() => {}}
          isModalOpen={openForm}
        />
      )}
    </>
  )
}
