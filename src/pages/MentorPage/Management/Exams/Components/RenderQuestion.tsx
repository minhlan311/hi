import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import RenderItem from './RenderItem'
import { AppContext } from '@/contexts/app.context'
import { QuestionState } from '@/interface/question'
import { Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  data?: QuestionState[] | undefined
  type: 'questionsSelect' | 'questionsBank'
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  checkAll?: boolean
}

const RenderQuestion = (props: Props) => {
  const { data, type, setQuestionUpdate, setOpen, checkAll } = props
  const { setQuestionList } = useContext(AppContext)
  const [dataActive, handleDataActive] = useState<string[]>([])

  useEffect(() => {
    if (type === 'questionsBank' && data?.length) {
      const dataActive = data.filter((item) => item.status === 'ACTIVE')
      const questionsSelectId = dataActive?.map((item) => item._id)
      handleDataActive(questionsSelectId)
    }
  }, [data])

  useEffect(() => {
    if (checkAll && dataActive) setQuestionList(dataActive)
  }, [checkAll])

  return !data?.length || !data ? (
    <div style={{ marginTop: 100 }}>
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
    </div>
  ) : (
    <Space direction='vertical' className={'sp100'}>
      {data?.map((item) => (
        <RenderItem key={item._id} data={item} setOpen={setOpen} setQuestionUpdate={setQuestionUpdate}></RenderItem>
      ))}
    </Space>
  )
}

export default RenderQuestion
