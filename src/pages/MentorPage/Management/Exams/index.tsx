import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { Popconfirm, Row, Space, Table, Tag, Tooltip } from 'antd'
import { useState } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { BsListUl } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import { Link } from 'react-router-dom'

/* eslint-disable @typescript-eslint/no-explicit-any */
const MentorExams = () => {
  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      key: 'stt',
      width: '3%',
      render: (index: number) => {
        ++index
        return index
      },
      showSorterTooltip: false
    },
    {
      title: 'Tên bài thi thử',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (_: any, record: any) => <Link to='name-table'>{record.name}</Link>
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
      }
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
      }
    },
    {
      title: 'DS câu hỏi',
      align: 'center',
      dataIndex: 'countQuestions',
      key: 'countQuestions',
      width: '10%',
      render: (_: any, record: any) => {
        return <Link to={`/mentor/exams/${record._id}/questions`}>{record.countQuestions}</Link>
      }
    },
    {
      title: 'DS làm bài',
      align: 'center',
      dataIndex: 'tested',
      key: 'tested'
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
      }
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
              // onClick={() => editTest(record)}
            />
          </Tooltip>
          <Tooltip title='Xóa bộ đề'>
            <Popconfirm
              placement='right'
              title={'Bạn có muốn xóa bộ đề này?'}
              // onConfirm={(event) => deleteTestById(event, record)}
              okText='Xóa'
              cancelText='Hủy'
            >
              <FiDelete style={{ color: 'red' }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ]
  // const onPressCreate = () => {
  //   setTestId(undefined)
  //   setOpenExamDrawer(true)
  // }
  const [data, setData] = useState<any[]>([])
  console.log(data)

  return (
    <div>
      <FilterAction
        addOnButton={
          <ButtonCustom
            type='primary'
            //  onClick={onPressCreate}
          >
            <Row align='middle'>
              <BiPlus size={22} />
              Thêm bộ đề mới
            </Row>
          </ButtonCustom>
        }
        apiFind={courseApi.getCourses}
        callBackData={setData}
      />
      <Table columns={columns} dataSource={[]} bordered />
    </div>
  )
}

export default MentorExams
