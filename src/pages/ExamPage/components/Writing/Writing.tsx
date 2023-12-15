/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '@/components/Logo/Logo'
import useResponsives from '@/hooks/useResponsives'
import { Button, Col, Flex, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import './Writing.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  data: any
}

export default function Writing({ nextSteps, data }: Props) {
  const { sm } = useResponsives()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    nextSteps(5)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='listen-div-fixed'>
      <Modal
        okText={'Yes'}
        cancelText='No'
        destroyOnClose
        title='Notification'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn hoàn thành kỹ năng này?</p>
      </Modal>
      <Flex className='div-in-part' justify='space-between' align='center'>
        <Flex gap={'large'}>
          <Logo size={sm ? 115 : undefined} />
          <Flex vertical gap={'small'}>
            <h3>Writing</h3>
            <p>Writing to the audio and answer questions below.</p>
          </Flex>
        </Flex>
        <Button type='default' className='default' onClick={showModal}>
          Go to Speaking
        </Button>
      </Flex>
      <div className='container-div-reading'>
        <Row gutter={16}>
          <Col span={12}>
            <div className='border-1-div' dangerouslySetInnerHTML={{ __html: data[0]?.description }}></div>
          </Col>
          <Col span={12}>
            <div className='border-2-div-w'>
              <TextArea
                style={{
                  minHeight: '100%',
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
