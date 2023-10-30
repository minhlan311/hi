import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { Choice } from '@/interface/tests'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Form, FormInstance, InputRef, Popconfirm, Space, Table, message } from 'antd'
import React, { useContext, useEffect, useId, useRef, useState } from 'react'
import { AiOutlineDelete, AiOutlineMenu } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  age: string
  address: string
}

interface EditableRowProps {
  index: number
  'data-row-key': string
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number
  'data-row-key': string
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableRowDragDrop = ({ children, index, ...props }: RowProps) => {
  const [form] = Form.useForm()
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  }

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
          {React.Children.map(children, (child) => {
            if ((child as React.ReactElement).key === 'sort') {
              return React.cloneElement(child as React.ReactElement, {
                children: (
                  <AiOutlineMenu
                    ref={setActivatorNodeRef}
                    style={{ touchAction: 'none', cursor: 'move' }}
                    {...listeners}
                  />
                ),
              })
            }

            return child
          })}
        </tr>
      </EditableContext.Provider>
    </Form>
  )
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
      // <Form.Item
      //   style={{ margin: 0 }}
      //   name={dataIndex}
      //   rules={[
      //     {
      //       required: true,
      //       message: 'Vui lòng nhập đáp án',
      //     },
      //   ]}
      // >
      //   <Input.TextArea ref={inputRef} onPressEnter={save} onBlur={save} placeholder='Nhập đáp án' />
      // </Form.Item>
      <TextAreaCustom
        ref={inputRef}
        onReady={(editor: any) => {
          editor.focus()
        }}
        onBlur={save}
        name={dataIndex}
        data={record}
        required
      />
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

  const initColumns = [
    {
      title: 'Đáp án',
      render: (_: any, record: Choice) => {
        return <div dangerouslySetInnerHTML={{ __html: record.answer }}></div>
      },
      dataIndex: 'answer',
      editable: true,
      key: 'answer',
    },
    // {
    //   title: 'Hình ảnh / Âm thanh',
    //   align: 'center',
    //   key: 'upload',

    //   render: (_: any, record: Choice) => {
    //     return (
    //       <Space>
    //         <UploadCustom accessType='image/*' name='image'>
    //           <ButtonCustom icon={<BiImageAdd />} type='text' size='small' />
    //         </UploadCustom>
    //         <UploadCustom accessType='audio/*' name='audio'>
    //           <ButtonCustom icon={<IoMusicalNoteOutline />} type='text' size='small' />
    //         </UploadCustom>
    //       </Space>
    //     )
    //   },
    // },
    {
      title: 'Hành động',
      align: 'center',
      width: '110px',
      key: 'action',
      render: (_: any, record: Choice) =>
        dataSource.length >= 1 && (
          <Popconfirm title='Xóa đáp án?' onConfirm={() => handleDelete(record.key as string)}>
            <ButtonCustom icon={<AiOutlineDelete />} type='text' size='small' style={{ color: 'var(--red)' }} />
          </Popconfirm>
        ),
    },
  ]

  const [defaultColumns, setDefaultColumns] = useState<any[]>([])
  useEffect(() => {
    setDefaultColumns(initColumns)

    if (selectionType === 'SORT') {
      const newOj = {
        key: 'sort',
        width: '45px',
      }
      setDefaultColumns((prev) => [newOj, ...prev])
    }

    if (selectionType === 'FILL BLANK') {
      const newOj = {
        title: 'Ô trống',
        key: 'sst',
        align: 'center',
        width: '50px',
      }

      setDefaultColumns((prev) => [newOj, ...prev])
    }
  }, [selectionType])

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id)
        const overIndex = previous.findIndex((i) => i.key === over?.id)

        return arrayMove(previous, activeIndex, overIndex)
      })
    }
  }

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
      row: selectionType === 'SORT' ? EditableRowDragDrop : EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns?.map((col) => {
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

  return (
    <Space direction='vertical' className='sp100'>
      {(selectionType === 'SORT' && (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource.map((i) => i.key) as unknown as any[]}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              rowKey='key'
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
              pagination={false}
            />
          </SortableContext>
        </DndContext>
      )) ||
        (selectionType === 'MATCHING' && (
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            rowKey='key'
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
            pagination={false}
          />
        )) || (
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
            pagination={false}
            rowSelection={
              selectionType === 'FILL BLANK'
                ? undefined
                : {
                    type: selectionType === 'SINGLE CHOICE' ? 'radio' : 'checkbox',
                    onChange: handleSelect,
                    selectedRowKeys: selectKey,
                  }
            }
          />
        )}
      <ButtonCustom onClick={handleAdd} type='dashed' icon={<MdPlaylistAdd />} className='sp100'>
        Thêm đáp án
      </ButtonCustom>
    </Space>
  )
}

export default TableAddonQues
