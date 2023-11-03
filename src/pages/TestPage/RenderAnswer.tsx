/* eslint-disable @typescript-eslint/no-explicit-any */
import DragAndDrop from '@/components/DragAndDrop'
import FormControls from '@/components/FormControls/FormControls'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { Choice } from '@/interface/question'
import { Card, Divider, Input, Space } from 'antd'
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

const LikertScale = ({ rows, cols }: { rows: any[]; cols: any[] }) => {
  const optionsList = cols.map((c) => {
    return { value: c.id, label: c.answer }
  })
  const colCount = 24 % cols.length > 0 ? 24 % cols.length : cols.length

  return (
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
        data={choiceList}
        setData={setChoiceList}
        renderType='card'
        dndType='sort'
        labelKey='answer'
        direction='vertical'
      />
    )
  if (type === 'LIKERT SCALE') return <LikertScale rows={choices[0]?.rows} cols={choices[0]?.cols} />
}

export default RenderAnswer
