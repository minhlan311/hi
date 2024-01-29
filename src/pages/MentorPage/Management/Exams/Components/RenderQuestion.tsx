import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { QuestionState } from '@/interface/question'
import { Space } from 'antd'
import RenderItem from './RenderItem'
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  data?: QuestionState[] | undefined
  type: 'questionsSelected' | 'questionsBank'
  setQuestionUpdate?: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderQuestion = (props: Props) => {
  const { data, type, setQuestionUpdate, setOpen } = props

  return !data?.length || !data ? (
    <div style={{ marginTop: 100 }}>
      <EmptyCustom
        description={
          type === 'questionsSelected' ? (
            <Space direction='vertical'>
              <p>Không có câu hỏi nào. </p>
              <p>Có thể tạo câu hỏi hoặc thêm câu hỏi tại ngân hàng câu hỏi.</p>
            </Space>
          ) : (
            'Không có câu hỏi nào'
          )
        }
      ></EmptyCustom>
    </div>
  ) : (
    <Space direction='vertical' className='sp100'>
      {data.map((item) => (
        <RenderItem
          type={type}
          key={item._id}
          data={item}
          setOpen={setOpen}
          setQuestionUpdate={setQuestionUpdate}
        ></RenderItem>
      ))}
    </Space>
  )
}

export default RenderQuestion
