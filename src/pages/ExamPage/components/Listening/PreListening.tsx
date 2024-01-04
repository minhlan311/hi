import React from 'react'
import './PreListening.scss'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function PreListening({ nextSteps }: Props) {
  const handleNextStep = () => {
    nextSteps(2)
  }

  return (
    <div className='container-prelisten'>
      <h2>IELTS Listening</h2>
      <p className='p-sound'>Thời gian: Khoảng 30 phút</p>
      <h3>HƯỚNG DẪN DÀNH CHO THÍ SINH</h3>
      <ul className='p-sound-ul'>
        <li className='p-sound'>Trả lời tất cả các câu hỏi.</li>
        <li className='p-sound'>
          Bạn có thể thay đổi câu trả lời của mình bất cứ lúc nào trong quá trình làm bài thi.
        </li>
      </ul>
      <h3>THÔNG TIN DÀNH CHO THÍ SINH</h3>
      <ul className='p-sound-ul'>
        <li>Có 40 câu hỏi trong bài kiểm tra này.</li>
        <li>Mỗi câu hỏi mang một dấu hiệu.</li>
        <li>Có bốn phần của bài kiểm tra.</li>
        <li>Bạn sẽ nghe mỗi phần một lần.</li>
        <li>
          Đối với mỗi phần của bài thi sẽ có thời gian để bạn xem qua các câu hỏi và thời gian để bạn kiểm tra câu trả
          lời của bạn.
        </li>
      </ul>
      <Flex
        justify='center'
        align='center'
        gap={'small'}
        style={{
          margin: '20px 0 10px 0',
        }}
      >
        <WarningOutlined />
        <p className='p-sound'>
          Không nhấp vào <strong>Bắt đầu kiểm tra</strong> cho đến khi bạn được yêu cầu làm như vậy.
        </p>
      </Flex>
      <Flex justify='center' align='center'>
        <Button type='primary' onClick={() => handleNextStep()}>
          Bắt đầu kiểm tra
        </Button>
      </Flex>
    </div>
  )
}
