/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { ExamResultsState } from '@/interface/exam'
import { UndoOutlined } from '@ant-design/icons'
import { Flex, Space } from 'antd'
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
      </Flex>
    </div>
  )
}
