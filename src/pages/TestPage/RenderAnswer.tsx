import FormControls from '@/components/FormControls/FormControls'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { Choice } from '@/interface/question'
import { Input } from 'antd'

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

const RenderAnswer = (props: Props) => {
  const { type, choices } = props
  const optionsList = choices.map((ots) => {
    return { value: ots._id, label: ots.answer }
  })

  if (type === 'WRITING') return <TextAreaCustom name='answer' />
  if (type === 'NUMERICAL') return <Input type='number' placeholder='Nhập giá trị' />
  if (type === 'SINGLE CHOICE')
    return <FormControls control='radio' type='card' options={optionsList} gutter={[12, 12]} />
  if (type === 'MULTIPLE CHOICE')
    return <FormControls control='checkBox' type='card' options={optionsList} gutter={[12, 12]} />
}

export default RenderAnswer
