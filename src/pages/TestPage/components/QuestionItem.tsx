/* eslint-disable @typescript-eslint/no-explicit-any */
import { localAction, shuffleArray } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import { Answer, Choice, QuestionState } from '@/interface/question'
import { Col, Form, Row, Space } from 'antd'
import { FormInstance } from 'antd/lib'
import { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { TbArrowBack } from 'react-icons/tb'
import css from '../styles.module.scss'
import RenderAnswer from './RenderAnswer'

type Props = {
  type: string
  questionData: QuestionState
  questionLength: number
  questionKey: number
  testId: string
  loading: boolean
  selectId: string
  form: FormInstance
  dataValue: Answer[]
}

const QuestionItem = (props: Props) => {
  const { type, questionData, questionLength, questionKey, testId, loading, selectId, form, dataValue } = props
  const [reset, setReset] = useState<boolean>(false)

  const onFinish = (val: any) => {
    if (val?.correctAnswers.length > 0) {
      const payload = {
        _id: questionData._id,
        correctAnswers: typeof val.correctAnswers === 'string' ? [val.correctAnswers] : val.correctAnswers,
      }

      localAction(testId + 'data', payload, 'update', '_id')
    }
  }

  if (loading) return <LoadingCustom tip='Vui lòng chờ...' style={{ marginTop: '40vh' }}></LoadingCustom>
  const index = dataValue.findIndex((q) => q._id === selectId)

  if (questionData)
    return (
      <Space direction='vertical' className={'sp100'} style={{ minHeight: '78vh' }}>
        <Row justify='space-between'>
          <Col span={24} sm={5}>
            <h2>
              Câu: {questionKey + 1} <span style={{ fontSize: 14 }}>/{questionLength}</span>
            </h2>
          </Col>
          <Col span={24} xxl={6} xl={6} lg={8} md={8} sm={8}>
            <Space>
              <TagCustom content={type}></TagCustom>
              <TagCustom color='gold' content={questionData.point + ' Điểm'}></TagCustom>
              <ButtonCustom
                size='small'
                onClick={() => {
                  setReset(true)
                  localAction(testId + 'data', null, 'remove', '_id')
                }}
                icon={<TbArrowBack />}
              >
                Làm lại
              </ButtonCustom>
            </Space>
          </Col>
        </Row>

        <p
          className={css.question}
          dangerouslySetInnerHTML={{ __html: questionData.question as unknown as string }}
        ></p>
        {questionData.hint && questionData.hint !== '<p></p>' && (
          <Space>
            <AiOutlineQuestionCircle />
            <div dangerouslySetInnerHTML={{ __html: questionData.hint }}></div>
          </Space>
        )}

        <Form form={form} onFinish={onFinish}>
          <RenderAnswer
            type={
              questionData.type as unknown as
                | 'SINGLE CHOICE'
                | 'MULTIPLE CHOICE'
                | 'TRUE FALSE'
                | 'SORT'
                | 'DRAG DROP'
                | 'LIKERT SCALE'
                | 'FILL BLANK'
                | 'MATCHING'
                | 'NUMERICAL'
                | 'WRITING'
            }
            choices={shuffleArray(questionData.choices as unknown as Choice[])}
            reset={reset}
            setReset={setReset}
            data={index >= 0 ? dataValue?.[index] : null}
            questId={questionData._id}
            form={form}
            questionText={questionData?.questionText}
            testId={testId}
          />
        </Form>
      </Space>
    )
  else
    return (
      <EmptyCustom description='Không có câu hỏi nào. Vui lòng làm phần tiếp theo!' style={{ marginTop: '25vh' }} />
    )
}

export default QuestionItem
