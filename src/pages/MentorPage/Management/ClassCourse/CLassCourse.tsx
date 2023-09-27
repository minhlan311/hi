/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Input, Popconfirm, Row, Space, Table, Tooltip, DatePicker, Form } from 'antd'
import { DeleteOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons'
import { useState, useContext, useEffect, ChangeEvent } from 'react'
import './CLassCourse.scss'
import { debounce, formatDate, formatHour } from '@/helpers/common'
import { MyPageTableOptions } from '@/types/page.type'
import { Class } from '@/types/class.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classApi from '@/apis/class.api'
import { AppContext } from '@/contexts/app.context'
import ClassCourseCreate from './ClassCourseCreate'
import openNotification from '@/components/Notification'
import { DatePickerProps } from 'antd/lib'
import { RangePickerProps } from 'antd/es/date-picker'
import { FORM_TYPE } from '@/constants'

export default function CLassCourse() {
  const { profile } = useContext(AppContext)
  const [onOpen, setOnOpen] = useState(false)
  const [time, setTime] = useState<{ startDate: string; endDate: string } | undefined>(undefined)
  const [idClass, setIdClass] = useState('')
  const [reset, setReset] = useState(false)
  const [search, setSearch] = useState('')
  const [typeForm, setTypeForm] = useState<string | undefined>(undefined)

  const [form] = Form.useForm()

  const [filter, setFilter] = useState({
    filterQuery: {
      createdById: profile?._id,
    },
    options: {
      limit: 10,
      page: 1,
    },
  })

  useEffect(() => {
    setFilter({
      filterQuery: {
        createdById: profile?._id,
      },
      options: {
        limit: 10,
        page: 1,
      },
    })
    form.setFieldValue('time', '')
    form.setFieldValue('search', '')
  }, [reset])

  const mutationDelete = useMutation({
    mutationFn: (id: string) => classApi.deleteClass(id),
    onSuccess: () => {
      openNotification({
        message: 'Thông báo',
        description: `Xóa lớp học thành công !`,
        status: 'success',
      })
      queryClient.invalidateQueries({ queryKey: ['dataClass'] })
    },
    onError: () => {
      openNotification({
        message: 'Thông báo',
        description: 'Có lỗi xảy ra!',
        status: 'error',
      })
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      filterQuery: {
        ...prevFilter.filterQuery,
        search: search,
      },
    }))
    queryClient.invalidateQueries({ queryKey: ['dataClass'] })
  }, [search])

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      filterQuery: {
        ...prevFilter.filterQuery,
        startDate: time?.startDate || undefined,
        endDate: time?.endDate || undefined,
      },
    }))
    queryClient.invalidateQueries({ queryKey: ['dataClass'] })
  }, [time])

  const { data, isLoading } = useQuery({
    queryKey: ['dataClass', filter],
    queryFn: () =>
      classApi.getClass({
        ...filter,
      }),
  })

  const setUpdate = (id: string) => {
    setIdClass(id)
    setOnOpen(true)
    setTypeForm(FORM_TYPE.UPDATE)
  }

  const setCreate = () => {
    setOnOpen(true)
    setTypeForm(FORM_TYPE.CREATE)
  }

  const { RangePicker } = DatePicker

  const tableColumns: MyPageTableOptions<any> = [
    {
      title: 'Khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (_: any, record: Class) => <span>{record?.course?.name}</span>,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_: any, record: Class) => <span>{formatDate(record?.startDate as string)}</span>,
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'startDate',
      render: (_: any, record: Class) => <span>{formatDate(record.endDate as string)}</span>,
    },

    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'endDate',
      key: 'startAt',
      render: (_: any, record: Class) => <span>{formatHour(record.startAt as string)}</span>,
    },

    {
      title: 'Thời gian kết thúc',
      dataIndex: 'schedules',
      key: 'schedules',
      render: (_: any, record: Class) => <span>{formatHour(record.endAt as string)}</span>,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'x',
      width: '10%',
      align: 'center' as const,
      render: (_: string, record: Class) => (
        <div>
          <Space size='middle'>
            <Tooltip placement='top' title='Chỉnh sửa lớp học'>
              <Button type='dashed' className={'dashed'} onClick={() => setUpdate(record._id as string)}>
                <EditOutlined className='icon-button' />
              </Button>
            </Tooltip>

            <Popconfirm
              placement='right'
              title={'Xác nhận xoá lớp học này?'}
              okText='Có'
              cancelText='Không'
              onConfirm={() => mutationDelete.mutate(record._id as string)}
            >
              <Tooltip placement='top' title='Xóa lớp học'>
                <Button type='dashed' className={'dashed'}>
                  <DeleteOutlined className='icon-button-delete' />
                </Button>
              </Tooltip>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ]

  const handleEditorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value)
  }

  const debouncedHandleEditorChange = debounce(handleEditorChange, 500)

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value'] | any) => {
    setTime({
      startDate: value && value[0] ? value[0] : undefined,
      endDate: value && value[1] ? value[1] : undefined,
    })
  }

  const onPageChange = (page: number, limit?: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      options: {
        ...prevFilter.options,
        page: page!,
        limit: limit!,
      },
    }))
  }

  console.log(data?.data, 'data?.data?.docs')

  return (
    <div>
      <Form form={form} layout='vertical'>
        <Row gutter={32}>
          <Col span={10}>
            <Form.Item label='Tìm kiếm ' name={'search'}>
              <Input
                onChange={debouncedHandleEditorChange}
                placeholder='Tìm kiếm'
                style={{
                  marginTop: '10px',
                  width: '400px',
                }}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label='Tìm kiếm theo khoảng thời gian' name={'time'}>
              <RangePicker
                format='YYYY-MM-DD'
                style={{
                  marginTop: '10px',
                }}
                onChange={onOk}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <div className='class-course'>
              <Button
                type='dashed'
                className='dashed'
                onClick={() => {
                  setReset(!reset)
                }}
              >
                <DeleteOutlined /> Xóa bộ lọc
              </Button>
              <Button type='primary' onClick={() => setCreate()}>
                <PlusCircleOutlined />
                Thêm mới
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <div className='div-table'>
        <Table
          dataSource={data?.data?.docs as any}
          pagination={{
            current: data?.data?.page,
            pageSize: data?.data?.limit,
            total: data?.data?.totalDocs,
            onChange: onPageChange,
          }}
          loading={isLoading}
          columns={tableColumns}
        />
      </div>
      <ClassCourseCreate typeForm={typeForm} onOpen={onOpen} onClose={setOnOpen} idClass={idClass} />
    </div>
  )
}
