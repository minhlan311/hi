/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import useResponsives from '@/hooks/useResponsives'
import { Skill } from '@/interface/exam'
import { useState } from 'react'
import QuestionsRender from '../QuestionRender'

type Props = {
  data: Skill
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Writing({ data, nextSteps }: Props) {
  const { sm } = useResponsives()
  const [dividerPosition, setDividerPosition] = useState(0)

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

  // Todo

  return (
    <div className='reading'>
      <NavigationTest
        skillName='Writing'
        nextSkillName='Speaking'
        desc='Viết trả lời vào các câu hỏi bên dưới.'
        nextSteps={nextSteps}
        step={5}
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
