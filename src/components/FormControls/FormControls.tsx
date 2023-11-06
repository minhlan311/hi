/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import { Card, Checkbox, Col, Radio, Row, Space } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { CheckboxOptionType } from 'antd/lib'
import { Gutter } from 'antd/lib/grid/row'
import React, { useState } from 'react'
import css from './FormControls.module.scss'

type Props = {
  control: 'radio' | 'checkBox'
  options?: CheckboxOptionType[]
  type?: 'card' | 'string'
  children?: React.ReactNode | string
  disabled?: boolean
  checkAll?: boolean
  defaultChecked?: boolean
  className?: string
  gutter?: Gutter | [Gutter, Gutter]
  md?: number
  label?: string
  value?: string
  callBackId?: React.Dispatch<React.SetStateAction<string[]>>
}

const FormControls = (props: Props) => {
  const {
    control,
    type,
    options,
    checkAll = false,
    defaultChecked = false,
    className,
    gutter,
    md,
    label,
    value,
    disabled,
    callBackId,
  } = props
  const [isCheck, setIsCheck] = useState(false || defaultChecked)
  const [values, setValues] = useState<any>(control === 'radio' ? '' : [])

  if (checkAll) {
    const plainOptions = ['Apple', 'Pear', 'Orange']

    const [checkedList, setCheckedList] = useState<any[]>([])

    const checkAllItem = plainOptions.length === checkedList.length
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length

    const onChangeAll = (list: CheckboxValueType[]) => {
      setCheckedList(list)
    }

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
      setCheckedList(e.target.checked ? plainOptions : [])
    }

    return (
      <Space>
        {checkAll && (
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAllItem}>
            Check all
          </Checkbox>
        )}
        <Checkbox.Group
          onChange={onChangeAll}
          className={css.sp100}
          options={plainOptions}
          value={checkedList}
        ></Checkbox.Group>
      </Space>
    )
  }

  if (options && options?.length > 0) {
    if (type === 'card') {
      return (
        <div className={'checkCustom'}>
          {control === 'checkBox' ? (
            <Checkbox.Group className={css.answerMain}>
              <Row gutter={gutter}>
                {options.map((ots) => (
                  <Col span={24} md={md || 12} key={ots.value as string}>
                    <Checkbox
                      onChange={(e) => stateAction(setValues, ots.value as string, e.target.value, 'add')}
                      className={css.checkbox}
                      value={ots.value as string}
                    >
                      <Card
                        className={`${css.checkboxCard} ${
                          values.find((val: string) => val === ots.value) ? css.checked : undefined
                        } ${className}`}
                        onClick={() => setIsCheck(!isCheck)}
                        size='small'
                      >
                        <div dangerouslySetInnerHTML={{ __html: ots.label as string }}></div>
                      </Card>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          ) : (
            <Radio.Group className={css.answerMain}>
              <Row gutter={gutter}>
                {options.map((ots) => (
                  <Col span={24} md={md || 12} key={ots.value as string}>
                    <Radio
                      onChange={(e) => setValues(e.target.value)}
                      className={css.checkbox}
                      value={ots.value as string}
                    >
                      <Card
                        className={`${css.checkboxCard} ${values === ots.value ? css.checked : undefined} ${className}`}
                        onClick={() => setIsCheck(!isCheck)}
                        size='small'
                      >
                        <div dangerouslySetInnerHTML={{ __html: ots.label as string }}></div>
                      </Card>
                    </Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          )}
        </div>
      )
    }
  } else {
    if (type === 'card') {
      return (
        <div className={'checkCustom'}>
          {control === 'checkBox' ? (
            <div className={css.answerMain}>
              <Checkbox
                className={css.checkbox}
                value={value}
                disabled={disabled}
                onChange={(e) => callBackId && callBackId(e.target.value)}
              >
                <Card
                  className={`${css.checkboxCard} ${disabled ? css.disabled : undefined} ${className}`}
                  onClick={() => setIsCheck(!isCheck)}
                  size='small'
                >
                  <div dangerouslySetInnerHTML={{ __html: label as string }}></div>
                </Card>
              </Checkbox>
            </div>
          ) : (
            <div className={css.answerMain}>
              <div className={css.answerMain}>
                <Radio
                  className={css.checkbox}
                  value={value as string}
                  disabled={disabled}
                  onChange={(e) => callBackId && callBackId(e.target.value)}
                >
                  <Card
                    className={`${css.checkboxCard} ${disabled ? css.disabled : undefined} ${className}`}
                    onClick={() => setIsCheck(!isCheck)}
                    size='small'
                  >
                    <div dangerouslySetInnerHTML={{ __html: label as string }}></div>
                  </Card>
                </Radio>
              </div>
            </div>
          )}
        </div>
      )
    }
  }
}

export default FormControls
