/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import { AppContext } from '@/contexts/app.context'
import { MyPageTableOptions } from '@/types/page.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Space, Table, Tooltip } from 'antd'
import { ReconciliationOutlined, EditOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import classApi from '@/apis/class.api'
import openNotification from '@/components/Notification'
import { findUserEnroll } from '@/types/eroll.type'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'

export default function MyStudent() {
  const [current, setCurrent] = useState<number>(1)
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

  const onChange = (page: any) => {
    setCurrent(page.current)
  }

  const mutate = useMutation({
    mutationFn: (body: { courseId: string; userId: string }) => {
      return classApi.arrangeClass(body)
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

  const tableColumns: MyPageTableOptions<any> = [
    {
      title: 'Học viên',
      dataIndex: 'limitStudent',
      key: 'limitStudent',
      render: (_: any, record: findUserEnroll) => (
        <TextWithTooltip rows={1} children={record?.user?.fullName as string}></TextWithTooltip>
      ),
    },
    // {
    //   title: 'Email',
    //   dataIndex: 'limitStudent',
    //   key: 'limitStudent',
    //   render: (_: any, record: findUserEnroll) => (
    //     <TextWithTooltip rows={1} children={record?.user?.email as string}></TextWithTooltip>
    //   ),
    // },
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
      dataIndex: 'courseName',
      key: 'courseName',
      render: (_: any, record: findUserEnroll) => {
        const filterClassName = record?.user?.classData?.filter((item) => item?.courseId === record?.course?._id)

        return (
          <>
            <span>{filterClassName?.map((item) => item?.title)}</span>
          </>
        )
      },

      //
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
                <Button type='dashed' className='dashed'>
                  <EditOutlined />
                </Button>
              </Tooltip>
            ) : (
              <div>
                <Space size='middle'>
                  <Tooltip placement='top' title='Xếp lớp tự động'>
                    <Button
                      type='dashed'
                      className={'dashed'}
                      onClick={() =>
                        mutate.mutate({
                          courseId: record?.course?._id,
                          userId: record?.user?._id,
                        } as any)
                      }
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
        <Table
          scroll={{ x: 500, y: 300 }} // Đặt chiều cao cuộn ở đây (300px)
          rowKey={'key'}
          dataSource={data?.data?.docs as any}
          pagination={{
            current: current,
            pageSize: 10,
            total: data?.data?.totalDocs,
          }}
          onChange={onChange}
          loading={isLoading || mutate.isLoading}
          columns={tableColumns}
        />
      </div>
    </div>
  )
}
