/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress, Row, Space, Table } from 'antd'
import { BsCheckCircle, BsPencil } from 'react-icons/bs'
import { FaAssistiveListeningSystems } from 'react-icons/fa'
import { PiTimer } from 'react-icons/pi'
import { RiSpeakLine } from 'react-icons/ri'
import { VscBook } from 'react-icons/vsc'
import css from '../styles.module.scss'
import useResponsives from '@/hooks/useResponsives'

const Score = () => {
  const columns = [
    {
      title: 'Lần thi',
      key: 'index',
      render: (_: any, _a: any, index: number) => <p style={{ textAlign: 'center' }}>{index + 1}</p>,
      width: '12%',
    },
    {
      title: (
        <div className={css.colTable}>
          <VscBook size={30} />
          Đọc
        </div>
      ),
      dataIndex: 'reading',
      key: 'reading',
      render: (_: any, data: any) => <h3 style={{ textAlign: 'center' }}>{data.reading}</h3>,
    },
    {
      title: (
        <div className={css.colTable}>
          <FaAssistiveListeningSystems size={25} />
          Nghe
        </div>
      ),
      dataIndex: 'listening',
      key: 'listening',
      render: (_: any, data: any) => <h3 style={{ textAlign: 'center' }}>{data.listening}</h3>,
    },
    {
      title: (
        <div className={css.colTable}>
          <BsPencil size={23} />
          Viết
        </div>
      ),
      dataIndex: 'writing',
      key: 'writing',
      render: (_: any, data: any) => <h3 style={{ textAlign: 'center' }}>{data.writing}</h3>,
    },
    {
      title: (
        <div className={css.colTable}>
          <RiSpeakLine size={30} />
          Nói
        </div>
      ),
      dataIndex: 'speaking',
      key: 'speaking',
      render: (_: any, data: any) => <h3 style={{ textAlign: 'center' }}>{data.speaking}</h3>,
    },
  ]

  const data = [{ reading: 9, listening: 8, writing: 8.5, speaking: 9.5 }]
  const { md } = useResponsives()

  return (
    <Space align='center' size='large' direction='vertical' className={`sp100 ${css.score}`}>
      <h2>Điểm của bạn</h2>

      <Row justify='space-between' align='middle'>
        {md ? (
          <Space direction='vertical' align='center'>
            <Space direction='vertical' className={css.done} align='center'>
              <BsCheckCircle />
              <p className={css.title}>Câu đúng</p>
            </Space>
            <h4>45/50</h4>
          </Space>
        ) : (
          <Progress
            type='circle'
            percent={(45 / 50) * 100}
            format={() => (
              <Space direction='vertical'>
                <Space direction='vertical' className={css.done}>
                  <BsCheckCircle />
                  <p className={css.title}>Đúng</p>
                </Space>
                <h4>45/50</h4>
              </Space>
            )}
          ></Progress>
        )}
        <Space direction='vertical' align='center'>
          <Progress type='circle' percent={100} format={() => <h2>8.5</h2>}></Progress>
          <h2 className={`${css.title} ${css.done}`}>DONE!</h2>
        </Space>
        {md ? (
          <Space direction='vertical' align='center'>
            <PiTimer size={28} />
            <p className={css.title}>Thời gian</p>
            <h4>35:38</h4>
          </Space>
        ) : (
          <Progress
            type='circle'
            percent={(45 / 60) * 100}
            format={() => (
              <Space direction='vertical'>
                <PiTimer size={28} />
                <p className={css.title}>Thời gian</p>
                <h4>35:38</h4>
              </Space>
            )}
          ></Progress>
        )}
      </Row>

      <Table columns={columns} dataSource={data} bordered pagination={false}></Table>
    </Space>
  )
}

export default Score
