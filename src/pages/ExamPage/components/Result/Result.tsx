/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from 'antd'
import './Result.scss'
import { UndoOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  total: any
}

export default function Result({ nextSteps, total }: Props) {
  const handleNextSteps = () => {
    nextSteps(0)
  }

  console.log(total, 'totaltotal')

  const navigate = useNavigate()

  return (
    <div className='div-result-conatiner-w'>
      <h1>Kết quả của bạn</h1>
      <br />
      <Flex align='center' justify='center' gap={'middle'}>
        <h3>LISTENING : {total?.LISTENING}</h3>
        <h3>READING :{total?.READING}</h3>
        <h3>WRITING : {total?.WRITING}</h3>
        <h3>SPEAKING : {total?.SPEAKING}</h3>
      </Flex>
      <Flex
        style={{
          margin: '30px',
        }}
        justify='center'
        align='center'
        gap={'small'}
      >
        <Button type='dashed' className='default' onClick={() => handleNextSteps()}>
          làm lại
          <UndoOutlined />
        </Button>
        <Button type='primary' onClick={() => navigate('/')}>
          Quay về trang chủ
        </Button>
      </Flex>
    </div>
  )
}
