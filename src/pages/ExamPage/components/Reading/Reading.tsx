/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import Logo from '@/components/Logo/Logo'
import useResponsives from '@/hooks/useResponsives'
import { Button, Col, Flex, Modal, Radio, Row } from 'antd'
import './Reading.scss'

type Choice = {
  answer: string
  isChosen: boolean
}

type Question = {
  _id: string
  question: string
  choices: Choice[]
}

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  data: {
    description: string
    questions: Question[]
  }[]
  callBackData: any
}

export default function Reading({ nextSteps, data, callBackData }: Props) {
  const { sm } = useResponsives()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    callBackData(questions)
  }, [questions])

  useEffect(() => {
    if (data && data.length > 0 && data[0].questions) {
      setQuestions(data[0].questions)
    }
  }, [data])

  const handleCheckboxChange = (questionId: string, choiceIndex: number) => {
    const updatedQuestions = questions.map((question) => {
      if (question._id === questionId) {
        return {
          ...question,
          choices: question.choices.map((choice, index) => ({
            ...choice,
            isChosen: index === choiceIndex,
          })),
        }
      }
      return question
    })

    setQuestions(updatedQuestions)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    nextSteps(4)
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
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn hoàn thành kỹ năng này?</p>
      </Modal>
      <Flex className='div-in-part' justify='space-between' align='center'>
        <Flex gap={'large'}>
          <Logo size={sm ? 115 : undefined} />
          <Flex vertical gap={'small'}>
            <h3>Reading</h3>
            <p>Reading to the audio and answer questions below.</p>
          </Flex>
        </Flex>
        <Button type='default' className='default' onClick={showModal}>
          Go to Writing
        </Button>
      </Flex>
      <div className='container-div-reading'>
        <Row gutter={16}>
          <Col span={12}>
            <div className='border-1-div' dangerouslySetInnerHTML={{ __html: data[0]?.description }}></div>
          </Col>
          <Col span={12}>
            <div className='border-2-div'>
              {questions.map((item, index) => (
                <div key={item._id}>
                  <p
                    style={{
                      marginTop: '20px',
                      fontWeight: '700',
                    }}
                  >
                    Câu số {index + 1}
                  </p>
                  <div className='html-ques-choice' dangerouslySetInnerHTML={{ __html: item?.question }}></div>
                  <Radio.Group
                    value={item.choices.findIndex((choice) => choice.isChosen)}
                    onChange={(e) => {
                      console.log('Current value:', item.choices)
                      handleCheckboxChange(item._id, e.target.value)
                    }}
                  >
                    {item.choices.map((choice, choiceIndex) => (
                      <div className='div-answer' key={choiceIndex}>
                        <Radio value={choiceIndex}>
                          <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
