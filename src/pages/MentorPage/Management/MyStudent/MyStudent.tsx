/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import openNotification from '@/components/Notification'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import { AppContext } from '@/contexts/app.context'
import { findUserEnroll } from '@/types/eroll.type'
import { MyPageTableOptions } from '@/types/page.type'
import { TypeForm } from '@/types/utils.type'
import { EditOutlined, ReconciliationOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Select, Space, Table, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'

export default function MyStudent() {
  const [current, setCurrent] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [courseId, setCourseId] = useState<string>()
  const [studentId, setStudentId] = useState<string>()
  const [classId, setClassId] = useState<string>()
  const [type, setType] = useState<TypeForm>()

  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['dataUserEnroll', current],
    queryFn: () =>
      courseApi.getUserErolls({
        filterQuery: {
          mentorId: profile._id,
        },
        options: {
          page: current,
          limit: 10,
        },
      }),
    keepPreviousData: true,
  })

  const { data: loadingClass } = useQuery({
    queryKey: ['dataClass', courseId, studentId],
    queryFn: () =>
      classApi.getClass({
        filterQuery: {
          mentorId: profile?._id,
          courseId: courseId,
        },
        options: {
          sort: { createdAt: -1 },
        },
      }),
    enabled: profile?._id && courseId ? true : false,
  })

  const onChange = (page: any) => {
    setCurrent(page.current)
  }

  useEffect(() => {
    setClassId('')
  }, [courseId, studentId])

  const subjectOptions = loadingClass?.data?.docs?.map((item: any) => ({
    label: item?.title,
    value: item?._id,
  }))

  const handleClass = (course: string, id: string, type: TypeForm) => {
    setCourseId(course)
    setStudentId(id)
    setIsModalOpen(true)
    setType(type)
  }

  const mutate = useMutation({
    mutationFn: (body: { classId: string; userId: string }) => {
      return classApi.arrangeClass(body)
    },
    onSuccess: () => {
      openNotification({
        status: 'success',
        description: 'Xếp lớp thành công!',
        message: 'thông báo',
      })
      queryClient.invalidateQueries({ queryKey: ['dataUserEnroll'] })
      setClassId('')
    },
    onError: (data: any) => {
      setClassId('')
      openNotification({
        status: 'error',
        description: data?.response?.data?.message,
        message: 'thông báo',
      })
    },
  })

  const mutateUpdate = useMutation({
    mutationFn: (body: { courseId: string; classId: string; userId: string }) => {
      return classApi.arrangeUpdateClass(body)
    },
    onSuccess: () => {
      openNotification({
        status: 'success',
        description: 'Xếp lớp thành công!',
        message: 'thông báo',
      })
      queryClient.invalidateQueries({ queryKey: ['dataUserEnroll'] })
    },
    onError: (data: any) => {
      openNotification({
        status: 'error',
        description: data?.response?.data?.message,
        message: 'thông báo',
      })
    },
  })

  const handleOk = () => {
    {
      type === TypeForm.CREATE
        ? mutate.mutate({
            classId: classId as string,
            userId: studentId as string,
          })
        : mutateUpdate.mutate({
            courseId: courseId as string,
            classId: classId as string,
            userId: studentId as string,
          })
    }

    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const tableColumns: MyPageTableOptions<any> = [
    {
      title: 'Học viên',
      dataIndex: 'limitStudent',
      key: 'limitStudent',
      render: (_: any, record: findUserEnroll) => (
        <TextWithTooltip rows={1} children={record?.user?.fullName as string}></TextWithTooltip>
      ),
    },

    {
      title: 'Khóa học đã mua',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (_: any, record: findUserEnroll) => (
        <TextWithTooltip rows={1} children={record?.course?.name as string}></TextWithTooltip>
      ),
    },
    {
      title: 'Lớp học',
      key: 'courseName',
      render: (_: any, record: findUserEnroll) => record.course.class?.[0].title,
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'x',
      width: '20%',
      align: 'center' as const,
      render: (_: string, record: findUserEnroll) => {
        const filterClassName = record?.user?.classData?.filter((item) => item?.courseId === record?.course?._id)

        return (
          <>
            {filterClassName && filterClassName.length ? (
              <Tooltip placement='top' title='Đổi lịch học'>
                <Button
                  type='dashed'
                  className='default'
                  onClick={() => handleClass(record?.course?._id as string, record?.user?._id, TypeForm.UPDATE)}
                >
                  <EditOutlined />
                </Button>
              </Tooltip>
            ) : (
              <div>
                <Space size='middle'>
                  <Tooltip placement='top' title='Xếp lớp '>
                    <Button
                      type='default'
                      className={'default'}
                      onClick={() => handleClass(record?.course?._id as string, record?.user?._id, TypeForm.CREATE)}
                    >
                      <ReconciliationOutlined className='icon-button' />
                    </Button>
                  </Tooltip>
                </Space>
              </div>
            )}
          </>
        )
      },
    },
  ]

  return (
    <div>
      <div className='div-table'>
        <Modal
          title={type === TypeForm.CREATE ? 'Xếp lớp học' : 'Đổi lớp học'}
          open={isModalOpen}
          onOk={handleOk}
          okText='Xếp lớp'
          cancelText='Hủy bỏ'
          onCancel={handleCancel}
        >
          <Select
            style={{ minWidth: '150px' }}
            value={classId}
            onChange={setClassId}
            options={subjectOptions}
            placeholder='Danh sách lớp học...'
          />
        </Modal>
        <Table
          scroll={{ x: 700, y: 500 }} // Đặt chiều cao cuộn ở đây (300px)
          rowKey={'key'}
          dataSource={data?.data?.docs as any}
          pagination={{
            current: current,
            pageSize: 10,
            total: data?.data?.totalDocs,
            position: ['bottomCenter'],
          }}
          onChange={onChange}
          loading={isLoading || mutate.isLoading}
          columns={tableColumns}
        />
      </div>
    </div>
  )
}
