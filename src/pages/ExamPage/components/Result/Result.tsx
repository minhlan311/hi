/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import LoadingCustom from '@/components/LoadingCustom'
import { ExamResultsState } from '@/interface/exam'
import { UndoOutlined } from '@ant-design/icons'
import { Col, Flex, Progress, Row, Space } from 'antd'
import loadingBg from '../../../../assets/images/examimg/loading.png'
import './Result.scss'

type Props = {
  result: ExamResultsState
  time: number
}

export default function Result({ result, time }: Props) {
  const handleNextSteps = () => {
    window.location.reload()
  }

  const durations = time - result?.time

  const minutes = Math.floor(durations)
  const seconds = Math.round((durations - minutes) * 60)
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes} phút ${seconds < 10 ? `0${seconds}` : seconds} giây`

  return (
    <div style={{ height: '100%' }}>
      <Flex align='center' justify='center' vertical gap={48} style={{ height: '100%' }}>
        {!result ? (
          <Row justify='center' gutter={[0, 50]}>
            <Col span={24} md={12}>
              <img src={loadingBg} alt='loading' width={'50%'} style={{ display: 'block', margin: '0 auto' }} />
            </Col>
            <Col span={24}>
              <LoadingCustom loading={true} tip='Đang tính toán điểm của bạn! Vui lòng chờ...'>
                <p style={{ height: 100 }}></p>
              </LoadingCustom>
            </Col>
          </Row>
        ) : (
          <>
            <h1>Kết quả của bạn</h1>

            <Space direction='vertical' size='large'>
              <Flex align='center' justify='center' vertical gap={24}>
                <Progress
                  type='circle'
                  percent={100}
                  size={120}
                  format={() => <b style={{ fontSize: 50 }}>{result.point}</b>}
                />

                <Row gutter={[24, 24]}>
                  {result.score.map((i) => (
                    <Col span={24} md={6} key={i.skill}>
                      <Flex align='center' gap={8}>
                        {i.skill}: <b style={{ fontSize: 16 }}>{i.score}</b>
                      </Flex>
                    </Col>
                  ))}
                </Row>
              </Flex>
              <p>
                Thời gian làm bài: <b>{formattedTime}</b>
              </p>
            </Space>
            <Flex justify='center' align='center' gap={'small'}>
              <ButtonCustom icon={<UndoOutlined />} onClick={() => handleNextSteps()}>
                làm lại
              </ButtonCustom>
              <ButtonCustom type='primary' href='/'>
                Quay về trang chủ
              </ButtonCustom>
            </Flex>
          </>
        )}
      </Flex>
    </div>
  )
}
