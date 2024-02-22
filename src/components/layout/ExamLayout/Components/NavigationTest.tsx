import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import Logo from '@/components/Logo/Logo'
import useResponsives from '@/hooks/useResponsives'
import { Card, Flex, Modal, Space } from 'antd'
import { useState } from 'react'

type Props = {
  skillName: string
  nextSkillName?: string
  desc: string
  step: number
  buttonSubmit?: React.ReactNode
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

const NavigationTest = (props: Props) => {
  const { sm } = useResponsives()
  const { skillName, nextSkillName, desc, step = 0, buttonSubmit, nextSteps } = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    nextSteps(step)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <Card size='small'>
      <Flex justify='space-between' align='center'>
        <Space size='large'>
          <Logo size={sm ? 115 : undefined} />
          <div>
            <h3>{skillName}</h3>
            <p>{desc}</p>
          </div>
        </Space>
        {buttonSubmit ? (
          buttonSubmit
        ) : (
          <ButtonCustom onClick={showModal}>{sm ? nextSkillName : 'Go to ' + nextSkillName}</ButtonCustom>
        )}
      </Flex>
      <Modal
        okText='Tiếp tục'
        cancelText='Hủy'
        destroyOnClose
        title='Thông báo'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn hoàn thành kỹ {skillName}?</p>
      </Modal>
    </Card>
  )
}

export default NavigationTest
