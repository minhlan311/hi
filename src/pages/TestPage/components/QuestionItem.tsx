/* eslint-disable @typescript-eslint/no-explicit-any */
import { localAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import useResponsives from '@/hooks/useResponsives'
import { Answer, Choice, QuestionState } from '@/interface/question'
import { Flex, Space } from 'antd'
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
  dataValue: Answer[]
}

const QuestionItem = (props: Props) => {
  const { xl, xxl } = useResponsives()

  const { type, questionData, questionLength, questionKey, testId, loading, selectId, dataValue } = props
  const [reset, setReset] = useState<boolean>(false)

  if (loading) return <LoadingCustom tip='Vui lòng chờ...' style={{ marginTop: '40vh' }}></LoadingCustom>
  const dataSubmit = dataValue.find((q) => q._id === selectId)

  if (questionData)
    return (
      <Space direction='vertical' className={'sp100'} style={{ minHeight: '78vh' }}>
        <Flex justify='space-between' vertical={!xl || !xxl}>
          <h2>
            Câu: {questionKey + 1} <span style={{ fontSize: 14 }}>/{questionLength}</span>
          </h2>

          <Space>
            <TagCustom content={type}></TagCustom>
            <TagCustom color='gold' content={questionData.point + ' Điểm'}></TagCustom>
            <ButtonCustom
              size='small'
              onClick={() => {
                setReset(true)
                localAction(testId + 'data', questionData._id, 'remove', '_id')
              }}
              icon={<TbArrowBack />}
            >
              Làm lại
            </ButtonCustom>
          </Space>
        </Flex>

        <p
          className={`${css.question} dangerHTML`}
          dangerouslySetInnerHTML={{ __html: questionData.question as unknown as string }}
        ></p>
        {questionData.hint && questionData.hint !== '<p></p>' && (
          <Space>
            <AiOutlineQuestionCircle />
            <div dangerouslySetInnerHTML={{ __html: questionData.hint }}></div>
          </Space>
        )}

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
          choices={questionData.choices as unknown as Choice[]}
          reset={reset}
          setReset={setReset}
          data={dataSubmit && dataSubmit._id === selectId ? dataSubmit : null}
          questId={questionData._id}
          questionText={questionData?.questionText}
          questionData={questionData}
        />
      </Space>
    )
  else
    return (
      <EmptyCustom description='Không có câu hỏi nào. Vui lòng làm phần tiếp theo!' style={{ marginTop: '25vh' }} />
    )
}

export default QuestionItem
