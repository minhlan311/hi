/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import useResponsives from '@/hooks/useResponsives'
import { Skill } from '@/interface/exam'
import React, { useState } from 'react'
import QuestionsRender from '../QuestionRender'
import './Reading.scss'

type Props = {
  data: Skill
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Reading({ data, nextSteps }: Props) {
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
          <div className={'dangerHTML'} dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </div>
        <div className='divider' onMouseDown={handleDividerClick}></div>
        <div
          className='right-panel'
          style={sm ? { height: `calc(100% - ${dividerPosition}px)` } : { width: `calc(100% - ${dividerPosition}px)` }}
        >
          <QuestionsRender
            prev={data.prevNum || 0}
            data={data?.questions?.length ? data.questions : []}
            skill={data.skill}
          />
        </div>
      </div>
    </div>
  )
}
