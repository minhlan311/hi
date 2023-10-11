import { Form, Row } from 'antd'
import React from 'react'
import css from './FormItemCustom.module.scss'
export interface RowState {
  offset: number
  span: number
}
type Props = {
  name?: string
  settingForm?: any
  label?: string | React.ReactNode
  lableSize?: string | number
  lableRight?: string | React.ReactNode
  lableRightSize?: string | number
  children: React.ReactNode
  style?: React.CSSProperties
  wrapperCol?: RowState[]
}

const FormItemCustom = (props: Props) => {
  const { name, settingForm, label, lableSize, lableRight, lableRightSize, children, style, wrapperCol } = props
  return (
    <Form.Item
      name={name}
      label={!lableRight ? label : null}
      style={{ ...style, marginBottom: 5 }}
      wrapperCol={wrapperCol}
      {...settingForm}
    >
      {lableRight && (
        <Row justify='space-between' className={css.label}>
          <h4 style={{ fontSize: lableSize }}>{label}</h4>
          <div style={{ fontSize: lableRightSize }}>{lableRight}</div>
        </Row>
      )}
      {children}
    </Form.Item>
  )
}

export default FormItemCustom
