/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { AppContext } from '@/contexts/app.context'
import { Skill } from '@/interface/exam'
import { Card, List, Radio, Space } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'

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
  data: Skill[]
  callBackData: any
}

export default function Listening({ nextSteps, data, callBackData }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const { volume } = useContext(AppContext)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlayed, setIsAudioPlayed] = useState(false)

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
    <div className='reading'>
      <NavigationTest
        skillName='Listening'
        nextSkillName='Reading'
        desc='Hãy nghe đoạn âm thanh và trả lời các câu hỏi bên dưới.'
        nextSteps={nextSteps}
        step={3}
      />

      <audio
        autoPlay
        hidden
        onEnded={handleAudioEnded}
        ref={audioRef}
        src={import.meta.env.VITE_FILE_ENDPOINT + '/' + data[0]?.url}
        controls
        controlsList='nodownload noplaybackrate'
      >
        Your browser does not support the audio element.
      </audio>

      <Card size='small' style={{ height: '100%' }}>
        <List
          dataSource={questions}
          renderItem={(item, index) => (
            <List.Item key={item._id}>
              <Space direction='vertical'>
                <b>Câu số {index + 1}</b>
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
              </Space>
            </List.Item>
          )}
        ></List>
      </Card>
    </div>
  )
}
