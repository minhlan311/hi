import { Button, Flex } from 'antd'
import './Result.scss'
import { UndoOutlined } from '@ant-design/icons'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Result({ nextSteps }: Props) {
  const handleNextSteps = () => {
    nextSteps(0)
  }

  return (
    <div className='div-result-conatiner-w'>
      <h3>Bạn đã trả lời đúng _/10 câu hỏi</h3>
      <Flex
        style={{
          margin: '30px',
        }}
        justify='center'
        align='center'
        gap={'small'}
      >
        <Button type='dashed' className='dashed' onClick={() => handleNextSteps()}>
          làm lại
          <UndoOutlined />
        </Button>
        <Button type='primary'>Quay về trang chủ</Button>
      </Flex>
    </div>
  )
}
