/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import LoadingCustom from '@/components/LoadingCustom'
import { ExamResultsState } from '@/interface/exam'
import { UndoOutlined } from '@ant-design/icons'
import { Col, Flex, Row, Space } from 'antd'
import loadingBg from '../../../../assets/images/examimg/loading.png'
import './Result.scss'

type Props = {
  result: ExamResultsState
}

export default function Result({ result }: Props) {
  const handleNextSteps = () => {
    window.location.reload()
  }

  console.log(result)

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
              <Flex align='center' justify='center' gap={24}>
                {/* <h3>LISTENING : {result?.LISTENING}</h3>
              <h3>READING :{result?.READING}</h3>
              <h3>WRITING : {result?.WRITING}</h3>
              <h3>SPEAKING : {result?.SPEAKING}</h3> */}
                1
              </Flex>
              <p>
                Thời gian làm bài: <b>123</b> phút
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
