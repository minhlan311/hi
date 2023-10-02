/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { QuestionState } from '@/interface/question'
import { Space } from 'antd'
import { useState } from 'react'
import RenderItem from './RenderItem'
type Props = {
  data: QuestionState[] | undefined
  type: 'questionsSelect' | 'questionsBank'
  setQuestionsSelectData: React.Dispatch<React.SetStateAction<QuestionState[]>>
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderQuestion = (props: Props) => {
  const { data, type, setQuestionsSelectData, setQuestionUpdate, setOpen } = props

  const [selectData, handleSelectData] = useState<QuestionState[]>([])

  const handleCardClick = (id: string, item: QuestionState) => {
    if (id)
      if (selectData.includes(id as unknown as any)) {
        // Xóa card khỏi danh sách lưu trữ
        handleSelectData(selectData.filter((id) => id._id !== item._id))
      } else {
        // Thêm card vào danh sách lưu trữ
        handleSelectData([...selectData, item])
      }
  }

  console.log(selectData)

  return !data?.length ? (
    <EmptyCustom
      description={
        type === 'questionsSelect' ? (
          <p>
            Không có câu hỏi nào. <p>Có thể tạo câu hỏi hoặc thêm câu hỏi tại ngân hàng câu hỏi.</p>
          </p>
        ) : (
          'Không có câu hỏi nào'
        )
      }
    ></EmptyCustom>
  ) : (
    <Space direction='vertical' className={'sp100'}>
      {data?.map((item) => (
        <RenderItem
          key={item._id}
          data={item}
          setOpen={setOpen}
          setQuestionUpdate={setQuestionUpdate}
          handleSave={handleCardClick}
          setQuestionsSelectData={setQuestionsSelectData}
        ></RenderItem>
      ))}
    </Space>
  )
}

export default RenderQuestion
