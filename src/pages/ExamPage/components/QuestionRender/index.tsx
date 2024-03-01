/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import { AppContext } from '@/contexts/app.context'
import { debounce } from '@/helpers/common'
import { QuestionState, TypeQuestion } from '@/interface/question'
import { Card, Divider, Flex, Input, InputNumber, Radio, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import style from './styles.module.scss'

const FillBlank = ({
  handleChange,
  data,
  start,
  index,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
}) => {
  const [anwsFB, setAnwsFB] = useState<{ _id: string; anwser: string }[]>([])
  const [FBData, setFBData] = useState<{ _id: string; index: number; anwText: string }>()

  const replaceArr = (text: string) => {
    const parts = text.split('______')

    const newTextParts = []

    for (let i = 0; i < parts.length - 1; i++) {
      newTextParts.push(parts[i], '______')
    }

    newTextParts.push(parts[parts.length - 1])

    return newTextParts
  }

  useEffect(() => {
    if (FBData) {
      const anwserArray = anwsFB.map((item) => item.anwser)
      const combinedAnwser = anwserArray.join(', ')
      let content = FBData.anwText
      anwsFB.forEach(function (item) {
        content = content.replace('______', item.anwser)
      })
      console.log(content)

      if (FBData) debounce(handleChange(FBData, FBData?.index, combinedAnwser, 21), 500)
    }
  }, [anwsFB, FBData])

  const load = () => {
    setFBData({
      _id: data._id,
      index: index,
      anwText: data?.questionText ? data?.questionText : '',
    })
  }

  if (!FBData) load()

  return (
    <div>
      <b
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${
            data?.question ? data?.question : 'Fill in the missing words in the blanks'
          }</span>`,
        }}
        style={{ display: 'block', marginBottom: 6 }}
      ></b>
      <span>
        {replaceArr(data?.questionText as string).map((i, id) => (
          <p key={id}>
            {i === '______' ? (
              <Input
                onChange={(e) => stateAction(setAnwsFB, `${id}`, { _id: `${id}`, anwser: e.target.value }, 'update')}
                style={{ width: 'auto', margin: '0 8px' }}
              ></Input>
            ) : (
              i
            )}
          </p>
        ))}
      </span>
    </div>
  )
}

const SingleChoice = ({
  handleChange,
  data,
  start,
  index,
  options,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
  options: string[]
}) => {
  return (
    <div onLoad={() => handleChange(data, index, options[index], '')} className={style.typePack}>
      <b
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${data?.question}</span>`,
        }}
        style={{ display: 'block', marginBottom: 6 }}
      ></b>

      <Radio.Group className={`sp100`}>
        <Space direction='vertical' className={`sp100`}>
          {data?.choices.map((choice, i) => (
            <Radio
              key={i}
              value={choice}
              className={style.radio}
              onChange={(e) => {
                handleChange(data, index, options[index], [e.target.value.id])
              }}
            >
              <Flex align='center' className={`sp100`}>
                <span className={style.answer}>{options[i]}</span>
                <Radio value={choice} onChange={(e) => handleChange(data, index, options[index], [e.target.value.id])}>
                  <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                </Radio>
              </Flex>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

const TrueFalse = ({
  handleChange,
  data,
  start,
  index,
  options,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
  options: string[]
}) => {
  return (
    <Flex justify='space-between' gap={24}>
      <p
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${data?.question}</span>`,
        }}
        style={{ marginTop: 5 }}
      ></p>
      <Radio.Group optionType='button' buttonStyle='outline' size='small'>
        <Space>
          {data?.choices.map((choice, i) => (
            <Radio key={i} value={choice} onChange={(e) => handleChange(data, index, options[i], [e.target.value._id])}>
              <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  )
}

const Writing = ({
  handleChange,
  data,
  start,
  index,
  type,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
  type: TypeQuestion
}) => {
  return (
    <Space direction='vertical' className={'sp100'} onLoad={() => handleChange(data, index, '', '')}>
      <p
        className={'dangerHTML'}
        dangerouslySetInnerHTML={{
          __html: `<div><span>${start + index}. </span><span>${data?.question}</span></div>`,
        }}
      ></p>
      {type === 'NUMERICAL' ? (
        <InputNumber min={0} />
      ) : (
        <Input.TextArea rows={5} onChange={(e) => handleChange(data, index, e.target.value, [e.target.value])} />
      )}
    </Space>
  )
}

const QuestionsRender = ({ data, prev }: { data: QuestionState[]; prev: number }) => {
  const { setOverView } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)

  const [questionsByType, setQestionsByType] = useState<{ type: TypeQuestion; data: QuestionState[] }[]>([
    { type: 'SINGLE CHOICE', data: [] },
    { type: 'MULTIPLE CHOICE', data: [] },
    { type: 'TRUE FALSE', data: [] },
    { type: 'SORT', data: [] },
    { type: 'DRAG DROP', data: [] },
    { type: 'LIKERT SCALE', data: [] },
    { type: 'FILL BLANK', data: [] },
    { type: 'MATCHING', data: [] },
    { type: 'NUMERICAL', data: [] },
    { type: 'WRITING', data: [] },
  ])

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((q) => {
        const typeIndex = questionsByType.findIndex((item) => item.type === q.type)

        if (typeIndex !== -1) {
          questionsByType[typeIndex].data.push(q)
          setQestionsByType(questionsByType)
        }
      })

      setLoading(false)
    }
  }, [data])

  const handleChange = (item: any, index: number, anwser: any, correctAnswers: any | any[]) => {
    stateAction(
      setOverView,
      item._id,
      {
        index: index,
        _id: item._id,
        anwser,
        correctAnswers,
      },
      'update',
    )
  }

  const nonEmptyQuestions = questionsByType.filter((item) => item.data.length > 0)

  // Render danh sách câu hỏi
  const renderQuestions = () => {
    let currentQuestionNumber = prev
    let currentType: any = null

    return nonEmptyQuestions.map((item) => {
      if (item.data.length > 0) {
        if (item.type !== currentType) {
          currentType = item.type

          const startQuestionNumber = currentQuestionNumber
          currentQuestionNumber += item.data.length

          return (
            <div style={{ marginTop: 20 }}>
              <h2 style={{ marginBottom: 10 }}>{`Questions ${startQuestionNumber} - ${currentQuestionNumber - 1}`}</h2>
              {renderQuestionNumbers(startQuestionNumber, currentQuestionNumber, item)}
            </div>
          )
        }
      }

      return null
    })
  }

  // Hàm render số thứ tự của câu hỏi
  const renderQuestionNumbers = (
    start: number,
    end: number,
    question: { type: TypeQuestion; data: QuestionState[] },
  ) => {
    const questionNumbers: any[] = []

    const options = ['A', 'B', 'C', 'D']

    if (question) {
      question.data.forEach((data, i) => {
        questionNumbers.push(
          (question?.type === 'SINGLE CHOICE' && (
            <SingleChoice handleChange={handleChange} data={data} start={start} index={i} options={options} />
          )) ||
            (question?.type === 'TRUE FALSE' && (
              <TrueFalse handleChange={handleChange} data={data} start={start} index={i} options={options} />
            )) ||
            ((question.type === 'WRITING' || question.type === 'NUMERICAL') && (
              <Writing handleChange={handleChange} data={data} start={start} index={i} type={question.type} />
            )) ||
            (question.type === 'FILL BLANK' && (
              <FillBlank handleChange={handleChange} data={data} start={start} index={i} />
            )) || (
              <div>
                <Divider />
                <i style={{ color: 'var(--red) ' }}>
                  Question type "<b>{question.type}</b>" has not been updated, please contact the administrator
                </i>
              </div>
            ),
        )
      })
    }

    return (
      <Space direction='vertical' className={'sp100'}>
        {(question.type === 'SINGLE CHOICE' && (
          <i>
            Choose the correct letter, <b>A</b>, <b>B</b>, <b>С</b> or <b>D</b>
          </i>
        )) ||
          (question.type === 'TRUE FALSE' && (
            <p>
              <p>
                In boxes{' '}
                <p>
                  {start} - {end - 1}
                </p>{' '}
                on your answer sheet write:
              </p>
              <p>
                <Flex gap={25}>
                  <h3>
                    <i>TRUE</i>
                  </h3>
                  It agrees with the information in the text
                </Flex>
                <Flex gap={20}>
                  <h3>
                    <i>FALSE</i>
                  </h3>
                  It disagrees with it or contradicts it
                </Flex>
              </p>
            </p>
          ))}

        <Space direction='vertical' className={`${question.type === 'TRUE FALSE' ? style.trueFalseMain : ''} sp100`}>
          {questionNumbers}
        </Space>
      </Space>
    )
  }

  if (!loading)
    return (
      <Card size='small' className={style.main}>
        {renderQuestions()}
      </Card>
    )
}

export default QuestionsRender
