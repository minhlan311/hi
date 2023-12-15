/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '@/components/Logo/Logo'
import useResponsives from '@/hooks/useResponsives'
import { Button, Col, Flex, Modal, Row } from 'antd'
import { useState } from 'react'
import './Speaking.scss'
import SpeechToText from '@/components/SpeechToText/SpeechToText'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  data: any
  submit: any
}

export default function Speaking({ nextSteps, data, submit }: Props) {
  console.log(data, 'dataSSSSSSSSSSSSS')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    submit(true)
    nextSteps(6)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { sm } = useResponsives()

  // const handleNextStep = () => {
  //   nextSteps(3)
  // }

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
        <p>Bạn có muốn nộp bài kiểm tra?</p>
      </Modal>
      <Flex className='div-in-part' justify='space-between' align='center'>
        <Flex gap={'large'}>
          <Logo size={sm ? 115 : undefined} />
          <Flex vertical gap={'small'}>
            <h3>Speaking </h3>
            <p>Speaking to the audio and answer questions below.</p>
          </Flex>
        </Flex>
        <Button type='default' className='default' onClick={showModal}>
          Submit
        </Button>
      </Flex>

      <div className='border-2-div'>
        <Row gutter={16}>
          <Col span={24}>
            <div dangerouslySetInnerHTML={{ __html: data[0]?.description }}></div>
          </Col>
          <SpeechToText />
        </Row>
      </div>
    </div>
  )
}
