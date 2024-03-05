import { shuffleArray, stateAction } from '@/common'
import DragAndDrop from '@/components/DragAndDrop'
import FormControls from '@/components/FormControls/FormControls'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { AppContext } from '@/contexts/app.context'
import { debounce } from '@/helpers/common'
import { Answer, Choice, QuestionState } from '@/interface/question'
import { Card, Col, Divider, Input, Row, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import PageTestDrag from './DragTest/PageTestDrag'
import './style.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  type:
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
  choices: Choice[]
  questionText?: string
  reset: boolean
  setReset: React.Dispatch<React.SetStateAction<boolean>>
  data: Answer | null
  questId: string
  questionData: QuestionState
}

const FillBlank = ({ data }: { data: QuestionState }) => {
  const [anwsFB, setAnwsFB] = useState<{ _id: string; anwser: string }[]>([])
  const [FBData, setFBData] = useState<{ _id: string; index: number; anwText: string }>()
  const { setOverView } = useContext(AppContext)

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
      let content = FBData.anwText
      anwsFB.forEach((item) => {
        content = content.replace('______', ` ${item.anwser} `)
      })

      if (FBData)
        debounce(
          stateAction(
            setOverView,
            data._id,
            {
              index: undefined,
              _id: data._id,
              anwser: undefined,
              correctAnswers: [content],
            },
            'update',
          ),
          500,
        )
    }
  }, [anwsFB, FBData])

  const load = () => {
    setFBData({
      _id: data._id,
      index: 0,
      anwText: data?.questionText ? data?.questionText : '',
    })
  }

  if (!FBData) load()

  return replaceArr(data?.questionText as string).map((i, id) => (
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
  ))
}

const LikertScale = ({
  anwsData,
  reset,
  rows,
  cols,
  type,
  questId,
}: {
  anwsData: string[]
  reset: boolean
  rows: any[]
  cols: any[]
  type: string
  questId: string
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([])
  const { setOverView } = useContext(AppContext)

  const handleElementClick = (item: string, isRow: boolean) => {
    if (selectedAnswers.length === 0 || isRow !== selectedAnswers[selectedAnswers.length - 1].isRow) {
      setSelectedAnswers([...selectedAnswers, { id: item, isRow }])
    } else {
      const updatedSelectedItems = [...selectedAnswers.slice(0, -1), { id: item, isRow }]
      setSelectedAnswers(updatedSelectedItems)
    }
  }

  useEffect(() => {
    if (reset) {
      setSelectedAnswers([])
      setCorrectAnswers([])
    }
  }, [reset])

  useEffect(() => {
    if (anwsData.length > 0) {
      setCorrectAnswers(anwsData)
    }
  }, [anwsData])

  const handleAnswerChange = (rowId: string, colId: string) => {
    if (anwsData.length > 0) {
      setCorrectAnswers(anwsData)
    } else {
      const newAnswers = [...correctAnswers]

      const questionIndex = newAnswers.indexOf(rowId)

      if (questionIndex !== -1) {
        newAnswers[questionIndex + 1] = colId
      } else {
        newAnswers.push(rowId, colId)
      }

      setCorrectAnswers(newAnswers)
    }
  }

  useEffect(() => {
    if (type === 'MATCHING' && selectedAnswers.length > 0) {
      setCorrectAnswers(
        selectedAnswers.map((item) => {
          return item.id
        }),
      )
    }
  }, [selectedAnswers])

  useEffect(() => {
    if (correctAnswers.length > 0) {
      stateAction(
        setOverView,
        questId,
        {
          index: undefined,
          _id: questId,
          anwser: undefined,
          correctAnswers: correctAnswers,
        },
        'update',
      )
    }
  }, [correctAnswers])

  const optionsList = cols.map((c) => {
    return { value: c.id, label: c.answer }
  })

  const rowsList = rows.map((c) => {
    return { value: c.id, label: c.answer }
  })

  const colCount = 24 % cols.length > 0 ? 24 % cols.length : cols.length

  const chunkArray = (arr: any[], chunkSize: number) => {
    const chunkedArr = []

    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize))
    }

    return chunkedArr
  }

  const groupedArr = chunkArray(correctAnswers, 2)

  const findGroupNumber = (value: any, groupedArray: any[]) => {
    for (let i = 0; i < groupedArray.length; i++) {
      if (groupedArray[i].includes(value)) {
        return i + 1
      }
    }
  }

  const corrArr = correctAnswers.filter((_, index) => index % 2 !== 0)

  return type === 'MATCHING' ? (
    <Row gutter={24}>
      <Col span={12}>
        {rowsList.map((row) => (
          <FormControls
            key={row.value}
            control='checkBox'
            type='card'
            value={row.value}
            label={row.label}
            callbackValue={(e) => handleElementClick(e as unknown as string, true)}
            contentChecked={findGroupNumber(row.value, groupedArr)}
          />
        ))}
      </Col>
      <Col span={12}>
        {optionsList.map((col) => (
          <FormControls
            key={col.value}
            control='checkBox'
            type='card'
            value={col.value}
            label={col.label}
            callbackValue={(e) => handleElementClick(e as unknown as string, false)}
            contentChecked={findGroupNumber(col.value, groupedArr)}
          />
        ))}
      </Col>
    </Row>
  ) : (
    <Card>
      <Space direction='vertical' className='sp100'>
        {rows.map((r: any, id: number) => (
          <Space direction='vertical' className='sp100' key={r.id}>
            <div key={r.id} dangerouslySetInnerHTML={{ __html: r.answer }}></div>
            <FormControls
              control='radio'
              type='card'
              options={optionsList}
              gutter={[12, 12]}
              md={colCount}
              value={corrArr.length > 0 ? corrArr[id] : null}
              callbackValue={(e) => {
                handleAnswerChange(r.id, e as unknown as string)
              }}
            />
            {rows.length - 1 > id && <Divider />}
          </Space>
        ))}
      </Space>
    </Card>
  )
}

const RenderAnswer = (props: Props) => {
  const { type, choices, reset, setReset, data, questId, questionText, questionData } = props
  const [dataCallback, setDataCallback] = useState<any[]>([])
  const [dndData, setDndData] = useState<any[]>(shuffleArray(choices))
  const { setOverView } = useContext(AppContext)
  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [reset])

  useEffect(() => {
    if (data && data.correctAnswers.length > 0) {
      const newData = shuffleArray(choices).sort(
        (a, b) => data.correctAnswers.indexOf(a.id) - data.correctAnswers.indexOf(b.id),
      )

      setDndData(newData)
    }
  }, [data])

  useEffect(() => {
    if (dataCallback.length > 0) {
      const answers = dataCallback.map((i) => i.id)

      stateAction(
        setOverView,
        questId,
        {
          index: undefined,
          _id: questId,
          anwser: undefined,
          correctAnswers: answers,
        },
        'update',
      )
    }
  }, [dataCallback])

  const optionsList = shuffleArray(choices).map((ots) => {
    return { value: ots.id, label: ots.answer }
  })

  if (type === 'WRITING')
    return (
      <TextAreaCustom
        name='correctAnswers'
        data={data ? data?.correctAnswers?.[0] : '<p></p>'}
        dataArr
        onChange={(e) =>
          stateAction(
            setOverView,
            questId,
            {
              index: undefined,
              _id: questId,
              anwser: undefined,
              correctAnswers: [e.target.value],
            },
            'update',
          )
        }
      />
    )
  if (type === 'DRAG DROP') return <PageTestDrag questionText={questionText} choices={choices} />
  if (type === 'FILL BLANK') return <FillBlank data={questionData} />
  if (type === 'NUMERICAL')
    return (
      <Input
        type='number'
        placeholder='Nhập giá trị'
        onChange={(e) =>
          stateAction(
            setOverView,
            questId,
            {
              index: undefined,
              _id: questId,
              anwser: undefined,
              correctAnswers: [e.target.value],
            },
            'update',
          )
        }
      />
    )
  if (type === 'SINGLE CHOICE')
    return (
      <FormControls
        name='correctAnswers'
        control='radio'
        type='card'
        options={optionsList}
        gutter={[12, 12]}
        value={data && data.correctAnswers[0]}
        callbackValue={(e) =>
          stateAction(
            setOverView,
            questId,
            {
              index: undefined,
              _id: questId,
              anwser: undefined,
              correctAnswers: [e],
            },
            'update',
          )
        }
      />
    )
  if (type === 'MULTIPLE CHOICE')
    return (
      <FormControls
        name='correctAnswers'
        control='checkBox'
        type='card'
        options={optionsList}
        gutter={[12, 12]}
        value={data ? data.correctAnswers : []}
        callbackValue={(e) =>
          stateAction(
            setOverView,
            questId,
            {
              index: undefined,
              _id: questId,
              anwser: undefined,
              correctAnswers: e,
            },
            'update',
          )
        }
      />
    )
  if (type === 'SORT')
    return (
      <DragAndDrop
        data={dndData}
        renderType='card'
        dndType='sort'
        labelKey='answer'
        direction='vertical'
        callbackData={setDataCallback}
      />
    )

  if (type === 'LIKERT SCALE' || type === 'MATCHING')
    return (
      <LikertScale
        anwsData={data ? data.correctAnswers : []}
        reset={reset}
        rows={choices[0]?.rows}
        cols={type === 'LIKERT SCALE' ? choices[0]?.cols : choices[0]?.cols}
        type={type}
        questId={questId}
      />
    )
}

export default RenderAnswer
