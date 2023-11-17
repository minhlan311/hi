import { Button, Col, Flex, Modal, Row } from 'antd'
import { useState } from 'react'
import './Writing.scss'
import { useQuery } from '@tanstack/react-query'
import examApi from '@/apis/exam.api'
import Logo from '@/components/Logo/Logo'
import useResponsives from '@/hooks/useResponsives'
import TextArea from 'antd/es/input/TextArea'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Writing({ nextSteps }: Props) {
  const { sm } = useResponsives()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: dataQuestion } = useQuery({
    queryKey: ['questionList'],
    queryFn: () => examApi.getExamDetail('6541e1106580b32bd7dd8f14'),
  })

  const dataListQuestion = dataQuestion?.data.questionsDetail

  console.log(dataListQuestion, 'dataQuestiondataQuestion')

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
        <p>Do you want to finish this skill?</p>
      </Modal>
      <Flex className='div-in-part' justify='space-between' align='center'>
        <Flex gap={'large'}>
          <Logo size={sm ? 115 : undefined} />
          <Flex vertical gap={'small'}>
            <h3>Writing</h3>
            <p>Writing to the audio and answer questions below.</p>
          </Flex>
        </Flex>
        <Button type='dashed' className='dashed' onClick={showModal}>
          Go to Writing
        </Button>
      </Flex>
      <div className='container-div-reading'>
        <Row gutter={16}>
          <Col span={12}>
            <div className='border-1-div'>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
                aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
                cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
                laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
                eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
                ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
                perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
                voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit?
                Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet
                suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui
                sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
                aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
                cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
                laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
                eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
                ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
                perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
                voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit?
                Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet
                suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui
                sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
                aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
                cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
                laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
                eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
                ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum dolor sit amet
                consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet
                suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui
                sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
                aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
                cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
                laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
                eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
                ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
                perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
                voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit?
                Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet
                suscipit? Assumenda earum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione
                dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
                eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
                ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
                perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
                voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit?
                Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet
                suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui
                sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
                aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
                cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
                laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
                eveniet nemo cumque est!
              </p>
            </div>
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
