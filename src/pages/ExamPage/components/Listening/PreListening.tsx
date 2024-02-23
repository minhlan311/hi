import { AppContext } from '@/contexts/app.context'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Flex, Space } from 'antd'
import React, { useContext } from 'react'
import './PreListening.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  cateName: string
}

export default function PreListening({ nextSteps, cateName }: Props) {
  const { setStart } = useContext(AppContext)

  const handleNextStep = () => {
    setStart(true)
    nextSteps(2)
  }

  return (
    <div className='container-prelisten'>
      <Space direction='vertical' size='large' className='sp100'>
        <Space direction='vertical' size='large' className='sp100'>
          <div>
            <h2>{cateName} - Listening</h2>
            <p>
              Thời gian: <b>30</b> phút
            </p>
          </div>

          <div>
            <h3>HƯỚNG DẪN DÀNH CHO THÍ SINH</h3>
            <ul className='p-sound-ul'>
              <li>Trả lời tất cả các câu hỏi.</li>
              <li>Bạn có thể thay đổi câu trả lời của mình bất cứ lúc nào trong quá trình làm bài thi.</li>
            </ul>
          </div>
          <div>
            <h3>THÔNG TIN DÀNH CHO THÍ SINH</h3>
            <ul className='p-sound-ul'>
              <li>Có 40 câu hỏi trong bài kiểm tra này.</li>
              <li>Mỗi câu hỏi mang một dấu hiệu.</li>
              <li>Có bốn phần của bài kiểm tra.</li>
              <li>Bạn sẽ nghe mỗi phần một lần.</li>
              <li>
                Đối với mỗi phần của bài thi sẽ có thời gian để bạn xem qua các câu hỏi và thời gian để bạn kiểm tra câu
                trả lời của bạn.
              </li>
            </ul>
          </div>

          <Flex justify='center' vertical align='center' gap={12} style={{ marginTop: '8%' }}>
            <Space>
              <WarningOutlined />
              <p>
                Không nhấp vào <strong>Bắt đầu kiểm tra</strong>, khi bấm sẽ bắt đầu tính thời gian.
              </p>
            </Space>

            <Button type='primary' onClick={() => handleNextStep()}>
              Bắt đầu kiểm tra
            </Button>
          </Flex>
        </Space>
      </Space>
    </div>
  )
}
