import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { Choice } from '@/interface/question'
import { Card, Checkbox, Col, Input, Radio, Row } from 'antd'
import css from './styles.module.scss'

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
  if (type === 'WRITING') return <TextAreaCustom name='answer' />
  if (type === 'NUMERICAL') return <Input type='number' placeholder='Nhập giá trị' />
  if (type === 'SINGLE CHOICE')
    return (
      <Radio.Group className={css.answerMain}>
        <Row gutter={[24, 24]}>
          {choices.map((choi) => (
            <Col span={24} md={12} key={choi._id}>
              <Radio value={choi._id}>
                <Card size='small'>
                  <div dangerouslySetInnerHTML={{ __html: choi.answer }}></div>
                </Card>
              </Radio>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    )
  if (type === 'MULTIPLE CHOICE')
    return (
      <Checkbox.Group className={css.answerMain}>
        <Row gutter={[24, 24]}>
          {choices.map((choi) => (
            <Col span={24} md={12} key={choi._id}>
              <Checkbox>
                <div dangerouslySetInnerHTML={{ __html: choi.answer }}></div>
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    )
}

export default RenderAnswer
