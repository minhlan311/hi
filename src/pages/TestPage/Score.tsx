/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress, Space, Table } from 'antd'
import { BsCheckCircle, BsPencil } from 'react-icons/bs'
import { FaAssistiveListeningSystems } from 'react-icons/fa'
import { PiTimer } from 'react-icons/pi'
import { RiSpeakLine } from 'react-icons/ri'
import { VscBook } from 'react-icons/vsc'

const Score = () => {
  const columns = [
    {
      title: 'Lần thi',
      key: 'index',
      // align: 'center',
      render: (_: any, _a: any, index: number) => index + 1,
    },
    {
      title: (
        <Space direction='vertical'>
          <VscBook size={30} />
          Đọc
        </Space>
      ),
      dataIndex: 'reading',
      key: 'reading',
      // align: 'center',
    },
    {
      title: (
        <Space direction='vertical'>
          <FaAssistiveListeningSystems size={25} />
          Nghe
        </Space>
      ),
      dataIndex: 'listening',
      key: 'listening',
      // align: 'center',
    },
    {
      title: (
        <Space direction='vertical'>
          <BsPencil size={23} />
          Viết
        </Space>
      ),
      dataIndex: 'writing',
      key: 'writing',
      // align: 'center',
    },
    {
      title: (
        <Space direction='vertical'>
          <RiSpeakLine size={30} />
          Nói
        </Space>
      ),
      dataIndex: 'speaking',
      key: 'speaking',
      // align: 'center',
    },
  ]

  const data = [{ reading: 5, listening: 5, writing: 5, speaking: 5 }]

  return (
    <Space align='center' size='large' direction='vertical' className='sp100'>
      <h2>Điểm của bạn</h2>
      <Space>
        <Progress
          type='circle'
          percent={(45 / 50) * 100}
          format={() => (
            <Space direction='vertical'>
              <BsCheckCircle />
              <p>Đúng</p>
              <h3>45/50</h3>
            </Space>
          )}
        ></Progress>
        <Space direction='vertical'>
          <Progress type='circle' percent={100} format={() => <h2>8.5</h2>}></Progress>
          <h2>DONE!</h2>
        </Space>
        <Progress
          type='circle'
          percent={100}
          format={() => (
            <Space direction='vertical'>
              <PiTimer />
              <p>Thời gian</p>
              <h3>35:38</h3>
            </Space>
          )}
        ></Progress>
      </Space>
      <Table columns={columns} dataSource={data} bordered pagination={false}></Table>
    </Space>
  )
}

export default Score
