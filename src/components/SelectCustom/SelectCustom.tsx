/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import { Flex, Select, Space } from 'antd'
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
  value?: any | any[]
  onChange?: (e: any) => void
  options?: OptionType[]
  allowClear?: boolean
  loading?: boolean
  selectAll?: boolean
  selectAllLabel?: string
  suffixIcon?: boolean
  showType?: boolean
  callBackDataSearch?: React.Dispatch<React.SetStateAction<any>>
  callBackSelected?: React.Dispatch<React.SetStateAction<any>>
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
    value,
    defaultValue,
    onChange,
    options,
    allowClear,
    loading,
    selectAll,
    selectAllLabel = 'Select All',
    suffixIcon,
    showType,
    labelKey = 'name',
    callBackDataSearch,
    callBackSelected,
  } = props

  const { Option } = Select
  const [selectedValues, setSelectedValues] = useState<string[] | number[]>(value || [])
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
        icon:
          (searchKey === 'user' && <Avatar avtUrl={ops.avatarUrl} userData={ops} />) ||
          (showType && `[${ops.type}]`) ||
          ops.icon,
      }))
      callBackDataSearch && callBackDataSearch(data.data.docs)

      return setCallBOptions(optionFind)
    }
  }, [status, data])

  useEffect(() => {
    if (selectAllVal) {
      setSelectedValues(options ? options.map((option) => option.value) : callBOption?.map((option) => option.value))
    } else {
      setSelectedValues([])
    }
  }, [selectAllVal])

  const handleChange = (e: any) => {
    if (mode === 'multiple') {
      const selectData = e.map((v: any) => v.value)
      callBackSelected && callBackSelected(selectData)
    }

    onChange && onChange(e?.value)
    setSelectedValues(e.value)
  }

  useEffect(() => {
    callBackSelected && callBackSelected(selectedValues)
  }, [selectedValues])

  useEffect(() => {
    if (defaultValue) setSelectedValues(defaultValue as unknown as any)
    if (value && value?.length > 0) setSelectedValues(value as unknown as any)
  }, [defaultValue, value])

  return type === 'search' ? (
    <Select
      showSearch={type === 'search'}
      placeholder={placeholder}
      style={style}
      className={className}
      value={selectedValues}
      defaultValue={defaultValue}
      onChange={handleChange}
      allowClear={allowClear}
      mode={mode}
      size={size}
      disabled={disabled}
      maxTagCount='responsive'
      labelInValue
      filterOption={false}
      onClear={() => selectedValues?.length > 0 && setSelectedValues([])}
      onSelect={(e: any) => e.key === 'all' && setSelectAll(!selectAllVal)}
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
        <Option label={selectAllLabel} key='all'>
          {selectAllLabel}
        </Option>
      )}
      {callBOption.map((item) => (
        <Option
          value={item.value}
          label={
            <Flex align='center' gap={5}>
              {searchKey !== 'user' ? <p>{item.icon}</p> : null}
              <p className='dangerHTMLOneLine'>{item.label}</p>
            </Flex>
          }
          key={item.value}
          disabled={item.disabled}
        >
          <Flex align='center' gap={5}>
            {item.icon && <div style={{ display: 'flex' }}>{item.icon}</div>}
            <p className='dangerHTMLOneLine'>{item.label}</p>
          </Flex>
        </Option>
      ))}
    </Select>
  ) : (
    <Select
      placeholder={placeholder}
      style={style}
      className={className}
      value={selectedValues}
      defaultValue={defaultValue}
      onChange={handleChange}
      allowClear={allowClear}
      mode={mode}
      size={size}
      disabled={disabled}
      maxTagCount='responsive'
      labelInValue
      filterOption={false}
      optionLabelProp='label'
      suffixIcon={suffixIcon}
      onClear={() => selectedValues?.length > 0 && setSelectedValues([])}
    >
      {selectAll && <Option label={selectAllLabel}>{selectAllLabel}</Option>}
      {options &&
        options.map((item) => (
          <Option
            value={item.value}
            label={
              <Space>
                {item.icon && <div style={{ display: 'flex' }}>{item.icon}</div>}
                <p className='dangerHTMLOneLine'>{item.label}</p>
              </Space>
            }
            key={item.value}
            disabled={item.disabled}
          >
            <Space>
              {item.icon && item.icon}
              <p className='dangerHTMLOneLine'>{item.label}</p>
            </Space>
          </Option>
        ))}
    </Select>
  )
}

export default SelectCustom
