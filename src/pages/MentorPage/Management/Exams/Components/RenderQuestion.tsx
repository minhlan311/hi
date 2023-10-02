/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { QuestionState } from '@/interface/question'
import { Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import RenderItem from './RenderItem'
import { AppContext } from '@/contexts/app.context'
type Props = {
  data: QuestionState[] | undefined
  type: 'questionsSelect' | 'questionsBank'
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  checkAll?: boolean
}

const RenderQuestion = (props: Props) => {
  const { data, type, setQuestionUpdate, setOpen, checkAll } = props
  const { setQuestionList, questionList } = useContext(AppContext)
  const [selectData, handleSelectData] = useState<QuestionState[]>([])

  useEffect(() => {
    const dataActive = data?.filter((item) => item.status === 'ACTIVE')
    if (questionList) handleSelectData(questionList)
    if (checkAll && dataActive) handleSelectData(dataActive)
    if (!checkAll) handleSelectData([])
  }, [checkAll])

  useEffect(() => {
    setQuestionList(selectData)
    console.log(selectData)
  }, [selectData])

  const handleCardClick = (id: string, item: QuestionState) => {
    if (id)
      if (selectData.find((item) => item._id === id)) {
        stateAction(handleSelectData, id, item, 'remove')
      } else {
        stateAction(handleSelectData, id, item, 'add')
      }
  }

  return !data?.length || !data ? (
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
          selectData={selectData}
        ></RenderItem>
      ))}
    </Space>
  )
}

export default RenderQuestion
