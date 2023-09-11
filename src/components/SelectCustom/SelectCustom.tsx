import { Select, Space, Spin } from 'antd'
import React, { useState } from 'react'

interface OptionType {
  value: string
  label: string | React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}
type Props = {
  type?: 'default' | 'search'
  placeholder?: string
  mode?: 'multiple' | 'tags'
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  size?: 'large' | 'middle' | 'small'
  defaultValue?: string | string[]
  onChange?: () => void
  options: OptionType[]
  allowClear?: boolean
  loading?: boolean
  selectAll?: boolean
  selectAllLabel?: string
  suffixIcon?: boolean
}

const SelectCustom = (props: Props) => {
  const {
    type,
    placeholder,
    mode,
    disabled,
    style,
    className,
    size,
    defaultValue,
    onChange,
    options,
    allowClear,
    loading,
    selectAll,
    selectAllLabel = 'Select All',
    suffixIcon
  } = props
  const { Option } = Select
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [selectAllVal, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    if (selectAllVal) {
      setSelectedValues([])
    } else {
      setSelectedValues(options.map((option) => option.value))
    }
    setSelectAll(!selectAllVal)
  }

  return (
    <Select
      showSearch={type === 'search'}
      placeholder={placeholder}
      style={style}
      className={className}
      value={selectedValues.length > 0 ? selectedValues : undefined}
      defaultValue={defaultValue}
      onChange={onChange}
      allowClear={allowClear}
      mode={mode}
      size={size}
      disabled={disabled}
      maxTagCount='responsive'
      notFoundContent={loading ? <Spin size='small' /> : null}
      optionLabelProp='label'
      suffixIcon={suffixIcon}
    >
      {selectAll && (
        <Option key='all' label={selectAllLabel}>
          <div onClick={handleSelectAll}>{selectAllLabel}</div>
        </Option>
      )}
      {options.map((item) => (
        <Option
          value={item.value}
          label={
            <Space>
              {item.icon && <div style={{ display: 'flex' }}>{item.icon}</div>}
              {item.label}
            </Space>
          }
          key={item.value}
          disabled={item.disabled}
        >
          <Space>
            {item.icon && item.icon}
            {item.label}
          </Space>
        </Option>
      ))}
    </Select>
  )
}

export default SelectCustom
