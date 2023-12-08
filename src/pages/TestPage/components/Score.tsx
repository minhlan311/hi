/* eslint-disable @typescript-eslint/no-explicit-any */
import useResponsives from '@/hooks/useResponsives'
import { ExamResultsState } from '@/interface/exam'
import { Progress, Row, Space, Table } from 'antd'
import { BsCheckCircle, BsPencil } from 'react-icons/bs'
import { FaAssistiveListeningSystems } from 'react-icons/fa'
import { PiTimer } from 'react-icons/pi'
import { RiSpeakLine } from 'react-icons/ri'
import { VscBook } from 'react-icons/vsc'
import css from '../styles.module.scss'

type Props = {
  data: ExamResultsState[]
  testQuestion: number
  time: number
}

const Score = ({ data, testQuestion, time }: Props) => {
  const columns = [
    {
      title: (
        <div className={css.colTable}>
          <VscBook size={30} />
          Đọc
        </div>
      ),
      dataIndex: 'READING',
      key: 'reading',
      render: (_: any, data: any) =>
        data.map((item: any) => item.skill === 'READING' && <h3 style={{ textAlign: 'center' }}>{item.score}</h3>),
    },
    {
      title: (
        <div className={css.colTable}>
          <FaAssistiveListeningSystems size={25} />
          Nghe
        </div>
      ),
      dataIndex: 'LISTENING',
      key: 'listening',
      render: (_: any, data: any) =>
        data.map((item: any) => item.skill === 'LISTENING' && <h3 style={{ textAlign: 'center' }}>{item.score}</h3>),
    },
    {
      title: (
        <div className={css.colTable}>
          <BsPencil size={23} />
          Viết
        </div>
      ),
      dataIndex: 'WRITING',
      key: 'writing',
      render: (_: any, data: any) =>
        data.map((item: any) => item.skill === 'WRITING' && <h3 style={{ textAlign: 'center' }}>{item.score}</h3>),
    },
    {
      title: (
        <div className={css.colTable}>
          <RiSpeakLine size={30} />
          Nói
        </div>
      ),
      dataIndex: 'SPEAKING',
      key: 'speaking',
      render: (_: any, data: any) =>
        data.map((item: any) => item.skill === 'SPEAKING' && <h3 style={{ textAlign: 'center' }}>{item.score}</h3>),
    },
  ]

  const { md } = useResponsives()
  const durations = data?.[0]?.time

  const minutes = Math.floor(durations)
  const seconds = Math.round((durations - minutes) * 60)
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

  const filteredColumns = columns.filter((column) => data?.[0]?.score?.some((item) => item.skill === column.dataIndex))

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
            <h4>{`${data?.[0]?.totalCorrectAnswer}/${testQuestion}`}</h4>
          </Space>
        ) : (
          <Progress
            type='circle'
            percent={(data?.[0]?.totalCorrectAnswer / testQuestion) * 100}
            format={() => (
              <Space direction='vertical'>
                <Space direction='vertical' className={css.done}>
                  <BsCheckCircle />
                  <p className={css.title}>Đúng</p>
                </Space>
                <h4>{`${data?.[0]?.totalCorrectAnswer}/${testQuestion}`}</h4>
              </Space>
            )}
          ></Progress>
        )}
        <Space direction='vertical' align='center'>
          <Progress
            type='circle'
            percent={100}
            format={() => <h2>{data?.[0]?.point}</h2>}
            status={data?.[0]?.status === 'FAIL' ? 'exception' : 'success'}
          ></Progress>
          <h2 className={`${css.title} ${data?.[0]?.status === 'FAIL' ? css.fail : css.done}`}>{data?.[0]?.status}!</h2>
        </Space>
        {md ? (
          <Space direction='vertical' align='center'>
            <PiTimer size={28} />
            <p className={css.title}>Thời gian</p>
            <h4>{formattedTime}</h4>
          </Space>
        ) : (
          <Progress
            type='circle'
            percent={(data?.[0]?.time / time) * 100}
            format={() => (
              <Space direction='vertical'>
                <PiTimer size={28} />
                <p className={css.title}>Thời gian</p>
                <h4>{formattedTime}</h4>
              </Space>
            )}
          ></Progress>
        )}
      </Row>
      {data?.[0]?.score && (
        <Table columns={filteredColumns} dataSource={[data?.[0]?.score]} bordered pagination={false}></Table>
      )}
    </Space>
  )
}

export default Score
