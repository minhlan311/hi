/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import { Col, Row, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar'
import EmptyCustom from '../EmptyCustom/EmptyCustom'
import LoadingCustom from '../LoadingCustom'

interface OptionType {
  value: any
  label: string | React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}
type Props = {
  type?: 'default' | 'search'
  searchKey?: 'user' | string
  apiFind?: any
  filterQuery?: any
  placeholder?: string
  labelKey?: string
  mode?: 'multiple' | 'tags'
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  size?: 'large' | 'middle' | 'small'
  defaultValue?: string | string[]
  onChange?: (e: any) => void
  options?: OptionType[]
  allowClear?: boolean
  loading?: boolean
  selectAll?: boolean
  selectAllLabel?: string
  suffixIcon?: boolean
  callBackDataSearch?: React.Dispatch<React.SetStateAction<any>>
}

const SelectCustom = (props: Props) => {
  const {
    type,
    apiFind,
    searchKey,
    placeholder,
    filterQuery,
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
    suffixIcon,
    labelKey = 'name',
    callBackDataSearch,
  } = props
  const { Option } = Select
  const [selectedValues, setSelectedValues] = useState<string[] | number[]>([])
  const [selectAllVal, setSelectAll] = useState(false)
  const [searchText, setSearchText] = useState<string>()
  const [callBOption, setCallBOptions] = useState<OptionType[]>([])
  const filterData = { filterQuery: { ...filterQuery, search: searchText } }
  const {
    data: data,
    isLoading,
    status,
  } = useQuery({
    queryKey: [searchKey, filterData],
    queryFn: () => {
      return apiFind(filterData)
    },
  })

  useEffect(() => {
    if (status === 'success' && data) {
      const optionFind: OptionType[] = data.data.docs.map((ops: any) => ({
        value: ops._id,
        label: searchKey === 'user' ? ops.fullName : ops?.[labelKey],
        icon: searchKey === 'user' ? <Avatar avtUrl={ops.avatarUrl} userData={ops} /> : ops.icon,
      }))
      callBackDataSearch && callBackDataSearch(data.data.docs)

      return setCallBOptions(optionFind)
    }
  }, [status, data])

  const handleSelectAll = () => {
    if (selectAllVal) {
      setSelectedValues([])
    } else {
      setSelectedValues(options ? options.map((option) => option.value) : callBOption?.map((option) => option.value))
    }

    setSelectAll(!selectAllVal)
  }

  return type === 'search' ? (
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
      notFoundContent={
        isLoading || loading ? (
          <div style={{ padding: '100px 0' }}>
            <LoadingCustom size='small' tip='Loading...'></LoadingCustom>
          </div>
        ) : (
          <EmptyCustom margin={15} />
        )
      }
      onSearch={debounce((text: string) => setSearchText(text), 500)}
      optionLabelProp='label'
      suffixIcon={suffixIcon}
    >
      {selectAll && callBOption.length > 0 && (
        <Option key='all' label={selectAllLabel}>
          <div onClick={handleSelectAll}>{selectAllLabel}</div>
        </Option>
      )}
      {callBOption.map((item) => (
        <Option
          value={item.value}
          label={
            <Row align='middle' gutter={10}>
              {searchKey !== 'user' ? <Col>{item.icon}</Col> : null}
              <Col>{item.label}</Col>
            </Row>
          }
          key={item.value}
          disabled={item.disabled}
        >
          <Row align='middle' gutter={10}>
            <Col>{item.icon && <div style={{ display: 'flex', width: 40, height: 40 }}>{item.icon}</div>}</Col>
            <Col>{item.label}</Col>
          </Row>
        </Option>
      ))}
    </Select>
  ) : (
    <Select
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
      optionLabelProp='label'
      suffixIcon={suffixIcon}
    >
      {selectAll && (
        <Option key='all' label={selectAllLabel}>
          <div onClick={handleSelectAll}>{selectAllLabel}</div>
        </Option>
      )}
      {options &&
        options.map((item) => (
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
