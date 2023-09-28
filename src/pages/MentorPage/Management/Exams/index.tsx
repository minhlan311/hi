import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { ExamState } from '@/interface/exam'
import { Popconfirm, Row, Space, Table, Tag, Tooltip } from 'antd'
import { useState, useEffect, useContext } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { BsListUl } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DrawerExam from './Drawer/DrawerExam'
import openNotification from '@/components/Notification'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '@/contexts/app.context'

/* eslint-disable @typescript-eslint/no-explicit-any */
const MentorExams = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<{ docs: ExamState[] }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [examData, setExamData] = useState<ExamState>()
  const { status, mutate, error } = useMutation({ mutationFn: (id: string) => examApi.deleteExam(id) })
  const { profile } = useContext(AppContext)

  const handleDelete = (id: string) => {
    mutate(id)
  }

  const [resetFilter, setResetFilter] = useState<boolean>(false)

  const resetData = () => {
    setResetFilter(true)
    setTimeout(() => {
      setResetFilter(false)
    }, 200)
  }

  useEffect(() => {
    if (status === 'success') {
      openNotification({ status: status, message: 'Xóa bộ đề thành công' })
      resetData()
    }

    if (status === 'error' && error) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [status, error])

  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      key: 'stt',
      width: '3%',
      render: (_?: string, __?: string, index?: number) => {
        if (index === 0) return 1
        if (index) return index + 1
      },
    },
    {
      title: 'Tên bộ đề',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (_: any, record: any) => <Link to={record.slug}>{record.name}</Link>,
    },
    {
      title: 'Phí',
      dataIndex: 'plan',
      key: '_id',
      align: 'center',
      width: '10%',
      render: (plan: string) => {
        if (plan === 'PREMIUM') {
          const color = '#faad14'

          return (
            <Tag color={color} key={plan}>
              {'Mất phí'.toUpperCase()}
            </Tag>
          )
        } else {
          const color = 'green'

          return (
            <Tag color={color} key={plan}>
              {'Miễn phí'.toUpperCase()}
            </Tag>
          )
        }
      },
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: '10%',
      render: (type: string) => {
        if (type === 'TEST') {
          const color = 'geekblue'

          return (
            <Tag color={color} key={type}>
              {'Bài Test'.toUpperCase()}
            </Tag>
          )
        } else {
          const color = '#faad14'

          return (
            <Tag color={color} key={type}>
              {'Bài Quiz'.toUpperCase()}
            </Tag>
          )
        }
      },
    },
    {
      title: 'Số câu hỏi',
      align: 'center',
      dataIndex: 'countQuestions',
      key: 'countQuestions',
      width: '10%',
      render: (_: any, record: any) => {
        return <Link to={`/mentor/exams/${record._id}/questions`}>{record.countQuestions}</Link>
      },
    },
    {
      title: 'DS làm bài',
      align: 'center',
      dataIndex: 'tested',
      key: 'tested',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (_: any, { status }: { status: string }) => {
        if (status === 'ACTIVE') {
          const color = 'green'

          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          )
        } else {
          const color = 'volcano'

          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          )
        }
      },
    },
    {
      title: 'Hành động',
      key: '_id',
      align: 'center',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Tooltip title='Danh sách câu hỏi'>
            <Link to={`/mentor/exams/${record.slug}/questions`}>
              <BsListUl className='list-question-icon' />
            </Link>
          </Tooltip>
          <Tooltip title='Chỉnh sửa bộ đề'>
            <BiEdit
              className='edit-icon'
              onClick={() => {
                setExamData(record)
                setOpen(true)
              }}
            />
          </Tooltip>
          <Tooltip title='Xóa bộ đề'>
            <Popconfirm
              placement='right'
              title='Bạn có muốn xóa bộ đề này?'
              onConfirm={() => handleDelete(record._id)}
              okText='Xóa'
              cancelText='Hủy'
            >
              <MdDeleteOutline style={{ color: 'var(--red)' }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const onPressCreate = () => {
    setOpen(true)
  }

  return (
    <div>
      <FilterAction
        addOnButton={
          <ButtonCustom type='primary' onClick={onPressCreate}>
            <Row align='middle'>
              <BiPlus size={22} />
              Thêm bộ đề mới
            </Row>
          </ButtonCustom>
        }
        apiFind={examApi.findExam}
        type='test'
        callBackData={setData}
        setLoading={setLoading}
        resetFilter={resetFilter}
        filterQuery={{ createdById: profile._id }}
      />
      <Table columns={columns} dataSource={data?.docs} loading={loading} bordered />
      <DrawerExam open={open} setOpen={setOpen} resetData={resetData} setLoading={setLoading} examData={examData} />
    </div>
  )
}

export default MentorExams
