/* eslint-disable @typescript-eslint/no-explicit-any */
import { shuffleArray } from '@/common'
import DragAndDrop from '@/components/DragAndDrop'
import FormControls from '@/components/FormControls/FormControls'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { Choice } from '@/interface/question'
import { Card, Col, Divider, Form, Input, Row, Space } from 'antd'
import { useEffect, useState } from 'react'

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
  reset: boolean
  setReset: React.Dispatch<React.SetStateAction<boolean>>
}

const LikertScale = ({ rows, cols, type }: { rows: any[]; cols: any[]; type: string }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([])

  const handleElementClick = (item: string, isRow: boolean) => {
    if (selectedAnswers.length === 0 || isRow !== selectedAnswers[selectedAnswers.length - 1].isRow) {
      setSelectedAnswers([...selectedAnswers, { id: item, isRow }])
    } else {
      const updatedSelectedItems = [...selectedAnswers.slice(0, -1), { id: item, isRow }]
      setSelectedAnswers(updatedSelectedItems)
    }
  }

  useEffect(() => {
    if (selectedAnswers.length > 0) {
      setCorrectAnswers(
        selectedAnswers.map((item) => {
          return item.id
        }),
      )
    }
  }, [selectedAnswers])

  const optionsList = cols.map((c) => {
    return { value: c.id, label: c.answer }
  })

  const rowsList = rows.map((c) => {
    return { value: c.id, label: c.answer }
  })

  const colCount = 24 % cols.length > 0 ? 24 % cols.length : cols.length

  return type === 'MATCHING' ? (
    <Row gutter={24}>
      <Col span={12}>
        {rowsList.map((row) => (
          <FormControls
            control='checkBox'
            type='card'
            value={row.value}
            label={row.label}
            callbackValue={(e) => handleElementClick(e as unknown as string, true)}
            disabled={correctAnswers.includes(row.value)}
          />
        ))}
      </Col>
      <Col span={12}>
        {optionsList.map((col) => (
          <FormControls
            control='checkBox'
            type='card'
            value={col.value}
            label={col.label}
            callbackValue={(e) => handleElementClick(e as unknown as string, false)}
            disabled={correctAnswers.includes(col.value)}
          />
        ))}
      </Col>
    </Row>
  ) : (
    <Card>
      <Space direction='vertical' className='sp100'>
        {rows.map((r: any, id: number) => (
          <Space direction='vertical' className='sp100'>
            <div key={r.id} dangerouslySetInnerHTML={{ __html: r.answer }}></div>
            <FormControls control='radio' type='card' options={optionsList} gutter={[12, 12]} md={colCount} />
            {rows.length - 1 > id && <Divider />}
          </Space>
        ))}
      </Space>
    </Card>
  )
}

const RenderAnswer = (props: Props) => {
  const { type, choices, reset, setReset } = props

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  }, [reset])
  const [choiceList, setChoiceList] = useState(choices)
  const optionsList = choices.map((ots) => {
    return { value: ots._id, label: ots.answer }
  })

  if (type === 'WRITING') return <TextAreaCustom name='answer' />
  if (type === 'NUMERICAL')
    return (
      <Form.Item name='answer'>
        <Input type='number' placeholder='Nhập giá trị' />
      </Form.Item>
    )
  if (type === 'SINGLE CHOICE')
    return (
      <Form.Item name='correctAnswers'>
        <FormControls control='radio' type='card' options={shuffleArray(optionsList)} gutter={[12, 12]} />
      </Form.Item>
    )
  if (type === 'MULTIPLE CHOICE')
    return (
      <Form.Item name='correctAnswers'>
        <FormControls control='checkBox' type='card' options={shuffleArray(optionsList)} gutter={[12, 12]} />
      </Form.Item>
    )
  if (type === 'SORT')
    return (
      <DragAndDrop
        data={shuffleArray(choiceList)}
        setData={setChoiceList}
        renderType='card'
        dndType='sort'
        labelKey='answer'
        direction='vertical'
      />
    )

  if (type === 'LIKERT SCALE' || type === 'MATCHING')
    return <LikertScale rows={shuffleArray(choices[0]?.rows)} cols={shuffleArray(choices[0]?.cols)} type={type} />
}

export default RenderAnswer
