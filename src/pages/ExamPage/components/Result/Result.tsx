/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { AppContext } from '@/contexts/app.context'
import { UndoOutlined } from '@ant-design/icons'
import { Flex, Space } from 'antd'
import { useContext, useEffect } from 'react'
import './Result.scss'

type Props = {
  total: any
}

export default function Result({ total }: Props) {
  const { setStart } = useContext(AppContext)

  const handleNextSteps = () => {
    window.location.reload()
  }

  useEffect(() => {
    setStart(false)
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <Flex align='center' justify='center' vertical gap={48} style={{ height: '100%' }}>
        <h1>Kết quả của bạn</h1>

        <Space direction='vertical' size='large'>
          <Flex align='center' justify='center' gap={24}>
            <h3>LISTENING : {total?.LISTENING}</h3>
            <h3>READING :{total?.READING}</h3>
            <h3>WRITING : {total?.WRITING}</h3>
            <h3>SPEAKING : {total?.SPEAKING}</h3>
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
