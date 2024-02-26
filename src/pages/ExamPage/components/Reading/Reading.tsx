/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import useResponsives from '@/hooks/useResponsives'
import { Skill } from '@/interface/exam'
import { Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
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
  data: Skill
  callBackData: any
}

export default function Reading({ nextSteps, data, callBackData }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    callBackData(questions)
  }, [questions])

  useEffect(() => {
    if (data && data.questions) {
      setQuestions(data.questions)
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

  const { sm } = useResponsives()
  const [dividerPosition, setDividerPosition] = useState()

  const handleDividerDrag = (e: any) => {
    setDividerPosition(sm ? e.clientY : e.clientX)
  }

  const handleDividerRelease = () => {
    document.removeEventListener('mousemove', handleDividerDrag)
    document.removeEventListener('mouseup', handleDividerRelease)
  }

  const handleDividerClick = () => {
    document.addEventListener('mousemove', handleDividerDrag)
    document.addEventListener('mouseup', handleDividerRelease)
  }

  return (
    <div className='reading'>
      <NavigationTest
        skillName='Reading'
        nextSkillName='Writing'
        desc='Đọc nội dung và trả lời các câu hỏi bên dưới.'
        nextSteps={nextSteps}
        step={4}
      />

      <div className='split-screen'>
        <div
          className='left-panel'
          style={
            sm
              ? { height: dividerPosition ? `${dividerPosition}px` : '50%' }
              : { width: dividerPosition ? `${dividerPosition}px` : '50%' }
          }
        >
          <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </div>
        <div className='divider' onMouseDown={handleDividerClick}></div>
        <div
          className='right-panel'
          style={sm ? { height: `calc(100% - ${dividerPosition}px)` } : { width: `calc(100% - ${dividerPosition}px)` }}
        >
          <div>
            {questions.map((item, index) => (
              <Space direction='vertical' key={item._id}>
                <b>Câu số {index + 1}</b>
                <div dangerouslySetInnerHTML={{ __html: item?.question }}></div>
                <Radio.Group
                  value={item.choices.findIndex((choice) => choice.isChosen)}
                  onChange={(e) => {
                    handleCheckboxChange(item._id, e.target.value)
                  }}
                >
                  {item.choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex}>
                      <Radio value={choiceIndex}>
                        <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </Space>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
