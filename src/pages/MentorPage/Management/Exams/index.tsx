import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import openNotification from '@/components/Notification'
import TagCustom from '@/components/TagCustom/TagCustom'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { ExamState } from '@/interface/exam'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Popconfirm, Row, Space, Table, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { BsListUl } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import DrawerExam from './Drawer/DrawerExam'

/* eslint-disable @typescript-eslint/no-explicit-any */
const MentorExams = () => {
  const [examId, setExamId] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<{ docs: ExamState[]; limit: number; page: number; totalDocs: number }>()
  const [loading, setLoading] = useState<boolean>(true)

  const [page, setPage] = useState<number>(1)
  const navitage = useNavigate()

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
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: '10%',
      render: (type: string) => {
        return (
          <TagCustom
            intColor={['geekblue', '#faad14']}
            intArrType={['TEST', 'QUIZ']}
            intAlternativeType={['BÀI TEST', 'BÀI QUIZ']}
            content={type}
          ></TagCustom>
        )
      },
    },
    {
      title: 'Kĩ năng',
      dataIndex: 'skillName',
      key: 'skillName',
      align: 'center',
      width: '17%',
      render: (skillName: string) => {
        return (
          <TagCustom
            intColor={['#7555F2', '#F5C046', '#ee723f', '#44c4ab']}
            intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
            intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
            content={skillName}
          ></TagCustom>
        )
      },
    },
    {
      title: 'Số câu hỏi',
      align: 'center',
      key: 'countQuestions',
      width: '10%',
      render: (_: any, record: any) => {
        return (
          <Link to={`/mentor/exams/${record._id}/questions`}>
            {record.type === 'TEST' ? record.countQuestionsBySkill : record.countQuestions}
          </Link>
        )
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
      render: (status: string) => {
        return (
          <TagCustom
            intColor={['green', 'volcano']}
            intArrType={['ACTIVE', 'INACTIVE']}
            content={status.toUpperCase()}
          ></TagCustom>
        )
      },
    },
    {
      title: 'Hành động',
      key: '_id',
      align: 'center',
      render: (_: any, record: any) => (
        <Space size='middle'>
          {record.type === 'QUIZ' && (
            <Tooltip title='Danh sách câu hỏi'>
              <Link to={`/mentor/exams/${record._id}/questions`}>
                <BsListUl className='list-question-icon' />
              </Link>
            </Tooltip>
          )}
          <Tooltip title='Chỉnh sửa bộ đề'>
            <BiEdit
              className='edit-icon'
              onClick={() => {
                if (record.type === 'TEST') {
                  navitage('/mentor/exams/updateTest', { state: { testId: record._id } })
                } else {
                  setExamId(record._id)
                  setOpen(true)
                }
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
          <ButtonCustom type='primary' onClick={() => setOpen(true)} tooltip={sm ? 'Thêm bộ đề mới' : undefined}>
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
        limit={10}
        page={page}
      />
      <Table
        columns={columns}
        dataSource={data?.docs}
        loading={loading}
        bordered
        scroll={{
          x: 1024,
        }}
        pagination={{
          current: data?.page,
          pageSize: data?.limit,
          total: data?.totalDocs,
          onChange: (p) => setPage(p),
          position: ['bottomCenter'],
        }}
      />
      <DrawerExam
        size={!sm ? '50%' : undefined}
        open={open}
        setOpen={setOpen}
        setLoading={setLoading}
        examId={examId}
        setExamId={setExamId}
      />
    </div>
  )
}

export default MentorExams
