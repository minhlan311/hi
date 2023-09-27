/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { Form, FormInstance, Input, InputRef, Popconfirm, Space, Table, message } from 'antd'

import React, { useContext, useEffect, useId, useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { MdPlaylistAdd } from 'react-icons/md'
import { IoMusicalNoteOutline } from 'react-icons/io5'
import { Choice } from '@/interface/test'

type Props = {
  selectionType:
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
  callBackData: React.Dispatch<React.SetStateAction<Choice[]>>
  data: Choice[] | any
  isClose: boolean
}

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  age: string
  address: string
}

interface EditableRowProps {
  index: number
}

const EditableRow = ({ index, ...props }: EditableRowProps) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
      message.success('Đã lưu thay đổi')
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập đáp án',
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} placeholder='Nhập đáp án' />
      </Form.Item>
    ) : (
      <div className='editable-cell-value-wrap' style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableAddonQues = (props: Props) => {
  const { selectionType, callBackData, data, isClose } = props
  const id = useId()
  const randomId = id + Math.floor(Math.random() * 1000000).toString()
  const [dataSource, setDataSource] = useState<Choice[]>([
    {
      key: randomId,
      answer: 'Nhập đáp án',
      isCorrect: false,
      isChosen: false,
    },
  ])

  const convertCallBack = (array: Choice[]): Choice[] => {
    const newArray = array.map((item) => {
      const newItem: Choice = { ...item }
      newItem.key = newItem._id
      delete newItem._id

      return newItem
    })

    return newArray
  }

  useEffect(() => {
    if (data) {
      const newData = convertCallBack(data)
      setDataSource(newData)
    }
  }, [data])

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  }

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Đáp án',
      dataIndex: 'answer',
      width: '65%',
      editable: true,
    },
    {
      title: 'Hình ảnh / Âm thanh',
      align: 'center',
      render: (_, record: Choice) => {
        return (
          <Space>
            <UploadCustom accessType='image/*' name='image'>
              <ButtonCustom icon={<BiImageAdd />} type='text' size='small' />
            </UploadCustom>
            <UploadCustom accessType='audio/*' name='audio'>
              <ButtonCustom icon={<IoMusicalNoteOutline />} type='text' size='small' />
            </UploadCustom>
          </Space>
        )
      },
    },
    {
      title: 'Hành dộng',
      align: 'center',
      render: (_, record: Choice) =>
        dataSource.length >= 1 && (
          <Popconfirm title='Xóa đáp án?' onConfirm={() => handleDelete(record.key as string)}>
            <ButtonCustom icon={<AiOutlineDelete />} type='text' size='small' style={{ color: 'var(--red)' }} />
          </Popconfirm>
        ),
    },
  ]

  const handleAdd = () => {
    const newData: Choice = {
      key: randomId,
      answer: 'Nhập đáp án',
      isCorrect: false,
      isChosen: false,
    }
    setDataSource([...dataSource, newData])
  }

  const handleSave = (row: Choice) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record: Choice) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  const handleSelect = (newSelectedRowKeys: any) => {
    console.log(newSelectedRowKeys)

    const newData = dataSource.map((item: Choice) => {
      if (newSelectedRowKeys.includes(item.key)) {
        return {
          ...item,
          isCorrect: true,
        }
      }

      return {
        ...item,
        isCorrect: false,
      }
    })

    callBackData(newData)

    const key = newData.filter((item) => item.isCorrect).map((item) => item.key)
    setSelectKey(key)
  }

  const [selectKey, setSelectKey] = useState<any[]>()

  useEffect(() => {
    if (dataSource.length > 0) {
      const key = dataSource.filter((item) => item.isCorrect).map((item) => item.key)
      setSelectKey(key)
      callBackData(dataSource)
    }
  }, [dataSource])

  useEffect(() => {
    if (isClose)
      setDataSource([
        {
          key: randomId,
          answer: 'Nhập đáp án',
          isCorrect: false,
          isChosen: false,
        },
      ])
  }, [isClose])

  // const sortData = {
  //   id:
  // }

  return (
    <Space direction='vertical' className='sp100'>
      {selectionType === 'SORT' ? (
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          pagination={false}
        />
      ) : (
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          pagination={false}
          rowSelection={{
            type:
              selectionType === 'MULTIPLE CHOICE'
                ? 'checkbox'
                : selectionType === 'SINGLE CHOICE'
                ? 'radio'
                : undefined,
            onChange: handleSelect,
            selectedRowKeys: selectKey,
          }}
        />
      )}
      <ButtonCustom onClick={handleAdd} type='dashed' icon={<MdPlaylistAdd />} className='sp100'>
        Thêm đáp án
      </ButtonCustom>
    </Space>
  )
}

export default TableAddonQues
