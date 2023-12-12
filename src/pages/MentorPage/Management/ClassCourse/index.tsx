import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import classApi from '@/apis/class.api'
import ClassCreate from './components/ClassCreate'
import eventApi from '@/apis/event.api'
import FilterAction from '@/components/FilterAction'
import moment from 'moment-timezone'
import openNotification from '@/components/Notification'
import { AppContext } from '@/contexts/app.context'
import { BiPlus } from 'react-icons/bi'
import { Class } from '@/types/class.type'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { MyPageTableOptions } from '@/types/page.type'
import { Popconfirm, Space, Table } from 'antd'
import { TbListDetails } from 'react-icons/tb'
import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './ClassManage.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ClassManage() {
  const { profile } = useContext(AppContext)
  const [onOpen, setOnOpen] = useState<boolean>(false)
  const [idClass, setIdClass] = useState<string>('')
  const [pages, setPages] = useState<number>(1)

  const mutationDelete = useMutation({
    mutationFn: (id: string) => classApi.deleteClass(id),
    onSuccess: () => {
      openNotification({
        message: 'Thông báo',
        description: `Xóa lớp học thành công!`,
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

  const [classData, setClassData] = useState<{ docs: Class[]; page: number; totalDocs: number; limit: number }>()
  const [loading, setLoading] = useState<boolean>(true)

  const setUpdate = (id: string) => {
    setIdClass(id)
    setOnOpen(true)
  }

  const setCreate = () => {
    setOnOpen(true)
  }

  useEffect(() => {
    if (!onOpen) {
      setIdClass('')
    }
  }, [onOpen])

  const { data: eventsData } = useQuery({
    queryKey: ['eventsData'],
    queryFn: () => {
      return eventApi.getEvent({
        filterQuery: { classId: classData?.docs.map((item) => item._id) },

        options: { pagination: false },
      })
    },
    enabled: Boolean(classData?.totalDocs),
  })

  const tableColumns: MyPageTableOptions<any> = [
    {
      title: 'Lớp học',
      key: 'title',
      width: '25%',
      render: (_: any, record: Class) => record.title,
    },
    {
      title: 'Khóa học',
      key: 'courseName',
      width: '25%',
      render: (_: any, record: Class) => <p>{record.courseData?.name}</p>,
    },
    {
      title: 'Thời gian',
      key: 'startDate',
      align: 'center',
      render: (_, record: Class) =>
        `${moment(record.startDate).format('DD/MM/YYYY')} - ${moment(record.endDate).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Sĩ số',
      dataIndex: 'countStudents',
      key: 'countStudents',
      align: 'center',
    },
    {
      title: 'Giới hạn',
      dataIndex: 'limitStudent',
      key: 'limitStudent',
      align: 'center',
    },

    {
      title: 'Số buổi đã học',
      dataIndex: 'limitStudent',
      key: 'limitStudent',
      align: 'center',
      render: (_: any, record: Class) =>
        eventsData?.data.docs?.filter((item) => record._id === item.classId && item.attendance.length > 0).length,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (_: string, record: Class) => (
        <Space>
          <ButtonCustom
            icon={<TbListDetails size={16} />}
            tooltip='Xem chi tiết'
            type='text'
            href={record._id}
            style={{ height: 30 }}
          ></ButtonCustom>
          <ButtonCustom
            onClick={() => setUpdate(record._id as string)}
            icon={<EditOutlined />}
            tooltip='Chỉnh sửa lớp học'
            type='text'
          ></ButtonCustom>

          <Popconfirm
            placement='right'
            title={'Xác nhận xoá lớp học này?'}
            okText='Có'
            cancelText='Không'
            onConfirm={() => mutationDelete.mutate(record._id as string)}
          >
            <ButtonCustom icon={<DeleteOutlined />} tooltip='Xóa lớp học' type='text' danger></ButtonCustom>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const onPageChange = (page: number) => {
    setPages(page)
  }

  return (
    <div>
      <FilterAction
        apiFind={classApi.getClass}
        keyFilter='classList'
        type='class'
        callBackData={setClassData}
        checkQuery={Boolean(profile?._id)}
        setLoading={setLoading}
        filterQuery={{
          mentorId: profile?._id,
        }}
        page={pages}
        limit={10}
        addOnButton={
          <ButtonCustom type='primary' onClick={() => setCreate()} icon={<BiPlus size={22} />}>
            Thêm mới
          </ButtonCustom>
        }
      />

      <Table
        bordered
        scroll={{
          x: 1024,
        }}
        dataSource={classData?.docs}
        pagination={{
          current: classData?.page,
          pageSize: classData?.limit,
          total: classData?.totalDocs,
          onChange: onPageChange,
        }}
        loading={loading}
        columns={tableColumns}
      />

      <ClassCreate onOpen={onOpen} onClose={setOnOpen} idClass={idClass} />
    </div>
  )
}
