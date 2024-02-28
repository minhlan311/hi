/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import useResponsives from '@/hooks/useResponsives'
import { Skill } from '@/interface/exam'
import React, { useEffect, useState } from 'react'
import QuestionsRender from '../QuestionRender'
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
        questionsLength={data?.questions?.length as number}
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
          <div className={'dangerHTML'} dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </div>
        <div className='divider' onMouseDown={handleDividerClick}></div>
        <div
          className='right-panel'
          style={sm ? { height: `calc(100% - ${dividerPosition}px)` } : { width: `calc(100% - ${dividerPosition}px)` }}
        >
          <QuestionsRender
            data={data?.questions?.length ? data.questions : []}
            callbackSubmit={(e) => console.log(e)}
          />
        </div>
      </div>
    </div>
  )
}
