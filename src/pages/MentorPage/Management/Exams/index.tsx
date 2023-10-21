import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import openNotification from '@/components/Notification'
import { AppContext } from '@/contexts/app.context'
import { ExamState } from '@/interface/exam'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Popconfirm, Row, Space, Table, Tag, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { BsListUl } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DrawerExam from './Drawer/DrawerExam'
import useResponsives from '@/hooks/useResponsives'

/* eslint-disable @typescript-eslint/no-explicit-any */
const MentorExams = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<{ docs: ExamState[] }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [examData, setExamData] = useState<ExamState>()
  const queryClient = useQueryClient()
  const { status, mutate, error } = useMutation({
    mutationFn: (id: string) => examApi.deleteExam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examFilter'] })
    },
  })
  const { profile } = useContext(AppContext)

  const handleDelete = (id: string) => {
    mutate(id)
  }

  useEffect(() => {
    if (status === 'success') {
      openNotification({ status: status, message: 'Xóa bộ đề thành công' })
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
      render: (_: any, record: any) => <Link to={record._id}>{record.name}</Link>,
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
      title: 'Số người làm',
      align: 'center',
      dataIndex: 'countUsersTested',
      key: 'countUsersTested',
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
            <Link to={`/mentor/exams/${record._id}/questions`}>
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

  // const [items, setItems] = useState([
  //   {
  //     id: 'root',
  //     name: 'root',
  //     children: [
  //       { id: '1', name: '1' },
  //       { id: '2', name: '2' },
  //       { id: '3', name: '3' },
  //     ],
  //   },
  //   {
  //     id: 'col1',
  //     name: 'col1',
  //     children: [
  //       { id: '4', name: '4' },
  //       { id: '5', name: '5' },
  //     ],
  //   },
  //   {
  //     id: 'col2',
  //     name: 'col2',
  //     children: [
  //       { id: '6', name: '6' },
  //       { id: '7', name: '7' },
  //       { id: '8', name: '8' },
  //     ],
  //   },
  //   { id: 'col3', name: 'col3', children: [] },
  // ])
  const { sm } = useResponsives()

  return (
    <div>
      {/* <DragAndDrop
        data={items}
        setData={setItems}
        renderType='card'
        dndType='sort-dnd'
        labelKey='name'
        columnLabelKey='name'
        direction='vertical'
      /> */}
      <FilterAction
        addOnButton={
          <ButtonCustom type='primary' onClick={onPressCreate} tooltip={sm ? 'Thêm bộ đề mới' : undefined}>
            <Row align='middle'>
              <BiPlus size={22} />
              {!sm && 'Thêm bộ đề mới'}
            </Row>
          </ButtonCustom>
        }
        apiFind={examApi.findExam}
        keyFilter='examFilter'
        type='test'
        callBackData={setData}
        setLoading={setLoading}
        filterQuery={{ createdById: profile._id }}
      />
      <Table
        columns={columns}
        dataSource={data?.docs}
        loading={loading}
        bordered
        scroll={{
          x: 1024,
        }}
      />
      <DrawerExam
        size={!sm ? '50%' : undefined}
        open={open}
        setOpen={setOpen}
        setLoading={setLoading}
        examData={examData}
      />
    </div>
  )
}

export default MentorExams
