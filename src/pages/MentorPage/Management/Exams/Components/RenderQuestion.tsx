import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { QuestionState } from '@/interface/question'
import { Col, Row, Space } from 'antd'
import RenderItem from './RenderItem'
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  data?: QuestionState[] | undefined
  type: 'questionsSelected' | 'questionsBank'
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setQuestionsSelect?: React.Dispatch<React.SetStateAction<string[]>>
  questionsSelect: string[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderQuestion = (props: Props) => {
  const { data, type, setQuestionUpdate, setQuestionsSelect, questionsSelect, setOpen } = props

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
    <Row gutter={24}>
      {data.map((item) => (
        <Col xxl={12} span={24} key={item._id}>
          <Space direction='vertical' className={'sp100'}>
            <RenderItem
              type={type}
              key={item._id}
              data={item}
              setOpen={setOpen}
              setQuestionUpdate={setQuestionUpdate}
              setQuestionsSelect={setQuestionsSelect && setQuestionsSelect}
              questionsSelect={questionsSelect}
            ></RenderItem>
          </Space>
        </Col>
      ))}
    </Row>
  )
}

export default RenderQuestion
