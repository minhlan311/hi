/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { UserState } from '@/interface/user'
import { Space, Table, Tooltip, Typography } from 'antd'
import { BsBoxArrowInDown } from 'react-icons/bs'
import { FiEdit, FiEye } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import moment from 'moment-timezone'
type Props = { user: UserState }

const MentorPedagogies = (props: Props) => {
  const { user } = props
  const { Text } = Typography
  const pedagogies: any[] = []
  const columns = [
    {
      key: 'name',
      title: 'Tiêu đề',
      dataIndex: 'name',
      width: '25%',
      render: (record: any) => <Text>{record?.name}</Text>
    },
    {
      key: 'cost',
      title: 'Điểm',
      dataIndex: 'cost',
      render: (text: string) => (text ? <Text type='success'>{text}</Text> : <Text>0</Text>)
    },

    {
      key: 'subjectId',
      title: 'Môn học',
      dataIndex: 'subjectId',
      render: (subjectId: string) => subjectId
    },
    {
      key: 'owner',
      title: 'Người hỏi',
      dataIndex: ['owner', 'fullName']
    },
    {
      key: 'plan',
      title: 'Hình thức',
      dataIndex: 'plan',
      render: (text: string) =>
        text === 'PREMIUM' ? <Text type='danger'>Có phí</Text> : <Text type='success'>Miễn phí</Text>
    },
    {
      key: 'status',
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text: string) =>
        text === 'LOCK' ? <Text type='danger'>Đã trả lời</Text> : <Text type='success'>Chưa trả lời</Text>
    },
    {
      key: 'createdAt',
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (record: any) => <Text>{moment(record.createdAt).format('DD/MM/YYYY')}</Text>
    },
    {
      key: 'mentor',
      title: 'Hành động',
      dataIndex: 'mentor',
      align: 'center',
      render: (record: any) => (
        <Space>
          {record.status === 'PENDING' ? (
            <Tooltip title='Nhận trả lời'>
              <ButtonCustom
                type='primary'
                // onClick={() => getPedagogiesionByMentor(record, 'LOCK')}
                disabled={record.status === 'LOCK'}
                icon={<BsBoxArrowInDown />}
              ></ButtonCustom>
            </Tooltip>
          ) : (
            <>
              {record.ownerId === user._id && (
                <Tooltip title='Hủy nhận'>
                  <ButtonCustom
                    type='primary'
                    // onClick={() => getPedagogiesionByMentor(record, 'PENDING')}
                    icon={<IoMdClose />}
                  ></ButtonCustom>
                </Tooltip>
              )}
            </>
          )}

          {record.status === 'LOCK' && record.ownerId === user._id && (
            <Tooltip title='Trả lời câu hỏi'>
              <ButtonCustom
                type='primary'
                // onClick={() => handleOpenModal(record, 'reply')}
                icon={<FiEdit />}
              ></ButtonCustom>
            </Tooltip>
          )}

          <Tooltip title='Xem chi tiết'>
            <ButtonCustom
              type='primary'
              // onClick={() => handleOpenModal(record, 'detail')}
              icon={<FiEye />}
            ></ButtonCustom>
          </Tooltip>
        </Space>
      )
    }
  ]
  return (
    <Table
      // loading={loadingTable}
      bordered
      columns={columns as unknown as any}
      dataSource={pedagogies}
      scroll={{
        x: 1024
      }}
    />
  )
}

export default MentorPedagogies
