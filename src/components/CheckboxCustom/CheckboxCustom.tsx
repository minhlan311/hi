/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import css from './CheckboxCustom.module.scss'
import { Card, Checkbox, Space } from 'antd'
import { CheckboxState } from '@/interface/checkbox'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

type Props = {
  type?: 'card' | 'default'
  children?: React.ReactNode | string
  desc?: React.ReactNode | string
  value?: string
  disabled?: boolean
  items?: CheckboxState[]
  onChange?: () => void
  onClick?: () => void
  checkAll?: boolean
  defaultChecked?: boolean
  className?: string
}

const CheckboxCustom = (props: Props) => {
  const {
    type,
    children,
    desc,
    value,
    items,
    onChange,
    onClick,
    checkAll = false,
    defaultChecked = false,
    className
  } = props
  const [isCheck, setIsCheck] = useState(false || defaultChecked)

  if (items || (items && checkAll)) {
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
  if (type === 'card') {
    return (
      <Card className={`${css.checkboxCard} ${className}`} onClick={() => setIsCheck(!isCheck)}>
        <Space direction='vertical'>
          <Checkbox onChange={onChange} value={value} className={css.checkbox} checked={isCheck} onClick={onClick}>
            {children}
          </Checkbox>
          {desc && <p className={css.desc}>{desc}</p>}
        </Space>
      </Card>
    )
  } else
    return (
      <Space direction='vertical'>
        <Checkbox
          onChange={onChange}
          value={value}
          className={className}
          defaultChecked={defaultChecked}
          onClick={onClick}
        >
          {children}
        </Checkbox>
        <p className={css.desc}>{desc && desc}</p>
      </Space>
    )
}

export default CheckboxCustom
