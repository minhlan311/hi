/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from '@/apis/user.api'
import { Attendance } from '@/interface/event'
import { UserState } from '@/interface/user'
import { useQuery } from '@tanstack/react-query'
import { Modal, Progress, Table } from 'antd'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  attendanceList: { name: string; data: Attendance[] } | null
}

const AttendanceDetail = (props: Props) => {
  const { isOpen, setOpen, attendanceList } = props
  const [page, setPage] = useState<number>(1)

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: () => {
      return userApi.findUser({
        filterQuery: { _id: attendanceList?.data.map((item) => item.userId) },
        options: { pagination: false, limit: 10, page: page },
      })
    },
    enabled: Boolean(attendanceList?.data),
  })

  const userList = userData?.data?.docs

  const columns = [
    {
      title: 'STT',
      key: 'STT',
      align: 'center',
      width: '5%',
      render: (_: any, _a: any, index: number) => index + 1,
    },
    {
      title: 'Họ tên',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },

    {
      title: 'Lộ trình học',
      key: 'note',
      render: (record: UserState) => (
        <Progress
          percent={
            (record.progression.done.length / (record.progression.remains.length + record.progression.doing.length)) *
            100
          }
          format={(percent) => percent + '%'}
        />
      ),
    },
  ]

  return (
    <Modal open={isOpen} onCancel={() => setOpen(!isOpen)} title={attendanceList?.name} width={'80vw'}>
      <Table
        bordered
        scroll={{
          x: 1024,
        }}
        dataSource={userList}
        columns={columns as any}
        pagination={{
          current: userData?.data?.page,
          pageSize: userData?.data?.limit,
          total: userData?.data?.totalDocs,
          onChange: (p) => setPage(p),
        }}
      />
    </Modal>
  )
}

export default AttendanceDetail
