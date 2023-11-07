/* eslint-disable @typescript-eslint/no-explicit-any */
import classApi from '@/apis/class.api'
import openNotification from '@/components/Notification'
import { AppContext } from '@/contexts/app.context'
import { debounce, formatDate } from '@/helpers/common'
import { Class } from '@/types/class.type'
import { MyPageTableOptions } from '@/types/page.type'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, DatePicker, Form, Input, Popconfirm, Row, Space, Table, Tooltip } from 'antd'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import './CLassCourse.scss'
import ClassCourseCreate from './ClassCourseCreate'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import { FORM_TYPE } from '@/constants'

export default function CLassCourse() {
  const { profile } = useContext(AppContext)
  const [onOpen, setOnOpen] = useState(false)
  const [idClass, setIdClass] = useState('')
  const [reset, setReset] = useState(false)
  const [search, setSearch] = useState('')
  const [date, setDate] = useState<string[] | null>([])
  const [typeForm, setTypeForm] = useState<string | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [form] = Form.useForm()

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
    if (reset) {
      setSearch(''), setPage(1)
      setDate(null)
      form.resetFields()
    }
  }, [reset])

  const { data, isLoading } = useQuery({
    queryKey: ['dataClass', search, page, date],
    queryFn: () =>
      classApi.getClass({
        filterQuery: {
          mentorId: profile?._id,
          search: search || undefined,
          startDate: date ? date[0] : undefined,
          endDate: date ? date[1] : undefined,
        },
        options: {
          limit: 10,
          page: page,
          sort: { createdAt: -1 },
        },
      }),
    enabled: profile?._id ? true : false,
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
      title: 'Lớp học',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: Class) => (
        <TextWithTooltip rows={1} children={record?.title as string}></TextWithTooltip>
      ),
    },
    {
      title: 'Khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (_: any, record: Class) => (
        <TextWithTooltip rows={1} children={record?.courseId?.name as string}></TextWithTooltip>
      ),
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_: any, record: Class) => (
        <TextWithTooltip rows={1} children={formatDate(record?.startDate as string)}></TextWithTooltip>
      ),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'startDate',
      render: (_: any, record: Class) => (
        <TextWithTooltip rows={1} children={formatDate(record?.endDate as string)}></TextWithTooltip>
      ),
    },
    {
      title: 'Số lượng học viên đối đa',
      dataIndex: 'limitStudent',
      key: 'limitStudent',
      render: (_: any, record: Class) => (
        <TextWithTooltip rows={1} children={record?.limitStudent as string}></TextWithTooltip>
      ),
    },

    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'x',
      width: '20%',
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
    setReset(false)
  }

  const debouncedHandleEditorChange = debounce(handleEditorChange, 500)

  const onOk = (dates: any) => {
    setReset(false)

    if (dates) {
      setDate(dates)
    } else {
      setDate(null)
    }
  }

  const onPageChange = (page: number) => {
    setPage(page)
    setReset(false)
  }

  return (
    <div>
      <Form form={form} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} xl={12} xxl={10}>
            <Form.Item label='Tìm kiếm ' name={'search'}>
              <Input onChange={debouncedHandleEditorChange} placeholder='Tìm kiếm' className='input-class' />
            </Form.Item>
          </Col>
          <Col xs={24} xl={12} xxl={10}>
            <Form.Item label='Tìm kiếm theo khoảng thời gian' name={'time'}>
              <RangePicker format='DD/MM/YYYY' onChange={onOk} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={24} xxl={4}>
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
          scroll={{ x: 700, y: 500 }} // Đặt chiều cao cuộn ở đây (300px)
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
