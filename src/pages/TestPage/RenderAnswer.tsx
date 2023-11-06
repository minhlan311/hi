/* eslint-disable @typescript-eslint/no-explicit-any */
import { shuffleArray, stateAction } from '@/common'
import DragAndDrop from '@/components/DragAndDrop'
import FormControls from '@/components/FormControls/FormControls'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { Choice } from '@/interface/question'
import { Card, Col, Divider, Input, Row, Space } from 'antd'
import { useState } from 'react'

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
}

const LikertScale = ({ rows, cols, type }: { rows: any[]; cols: any[]; type: string }) => {
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
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
            callBackId={(e) => stateAction(setCorrectAnswers, row.value, e, 'add')}
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
            callBackId={(e) => stateAction(setCorrectAnswers, col.value, e, 'add')}
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
  const { type, choices } = props
  const [choiceList, setChoiceList] = useState(choices)
  const optionsList = choices.map((ots) => {
    return { value: ots._id, label: ots.answer }
  })

  if (type === 'WRITING') return <TextAreaCustom name='answer' />
  if (type === 'NUMERICAL') return <Input type='number' placeholder='Nhập giá trị' />
  if (type === 'SINGLE CHOICE')
    return <FormControls control='radio' type='card' options={optionsList} gutter={[12, 12]} />
  if (type === 'MULTIPLE CHOICE')
    return <FormControls control='checkBox' type='card' options={optionsList} gutter={[12, 12]} />
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
