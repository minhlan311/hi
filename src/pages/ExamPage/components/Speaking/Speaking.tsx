/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { AppContext } from '@/contexts/app.context'
import { Skill } from '@/interface/exam'
import { Modal, Space } from 'antd'
import { useContext, useState } from 'react'
import QuestionsRender from '../QuestionRender'
import './Speaking.scss'

type Props = {
  data: Skill
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Speaking({ data, nextSteps, setSubmit }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setStart } = useContext(AppContext)

  const handleOk = () => {
    setStart(false)
    setTimeout(() => {
      setSubmit(true)
      nextSteps(6)
      setIsModalOpen(false)
    }, 300)
  }

  return (
    <div className='reading'>
      <Modal
        okText='Nộp bài'
        cancelText='Hủy'
        destroyOnClose
        title='Thông báo'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Bạn có muốn nộp bài kiểm tra?</p>
      </Modal>

      <NavigationTest
        skillName='Writing'
        desc='Nhấn vào biểu tượng micro và trả lời câu hỏi bên dưới.'
        nextSteps={nextSteps}
        step={7}
        buttonSubmit={<ButtonCustom onClick={() => setIsModalOpen(true)}>Submit</ButtonCustom>}
      />

      <Space direction='vertical' className='sp100'>
        <div className={'dangerHTML'} dangerouslySetInnerHTML={{ __html: data?.description }}></div>

        <QuestionsRender
          prev={data.prevNum || 0}
          data={data?.questions?.length ? data.questions : []}
          skill={data.skill}
        />
      </Space>
    </div>
  )
}
