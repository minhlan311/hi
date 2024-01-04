/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from '@/components/Logo/Logo'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { Button, Flex, Modal, Radio } from 'antd'
import './Listening.scss'

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
    questions: Question[]
  }[]
  callBackData: any
}

export default function Listening({ nextSteps, data, callBackData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const { volume } = useContext(AppContext)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlayed, setIsAudioPlayed] = useState(false)
  const { sm } = useResponsives()

  useEffect(() => {
    if (data && data.length > 0 && data[0].questions) {
      setQuestions(data[0].questions)
    }
  }, [data])

  useEffect(() => {
    callBackData(questions)
  }, [questions])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

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
    nextSteps(3)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleAudioEnded = () => {
    if (!isAudioPlayed && audioRef.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
          setIsAudioPlayed(true)
        }
      }, 5000)
    }
  }

  return (
    <div className='listen-div-fixed'>
      <Modal
        okText={'Yes'}
        cancelText='No'
        destroyOnClose
        title='Thông báo'
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
            <h3>Listening</h3>
            <p>Hãy nghe đoạn âm thanh và trả lời các câu hỏi bên dưới.</p>
          </Flex>
        </Flex>
        <Button type='default' className='default' onClick={showModal}>
          Go to Reading
        </Button>
      </Flex>

      <audio
        autoPlay
        hidden
        onEnded={handleAudioEnded}
        ref={audioRef}
        src='https://ielts-computer-api.smartcom.vn/api/files/fGruXpxj-zE5z89z9118zsection1zpart1.mp3'
        controls
        controlsList='nodownload noplaybackrate'
      >
        Your browser does not support the audio element.
      </audio>

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
    </div>
  )
}
