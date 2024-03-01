/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { Skill } from '@/interface/exam'
import TextArea from 'antd/es/input/TextArea'
import { useContext, useState } from 'react'

type Props = {
  data: Skill
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Writing({ data, nextSteps }: Props) {
  const { setOverView } = useContext(AppContext)
  const { sm } = useResponsives()
  const [dividerPosition, setDividerPosition] = useState()
  const [dataSubmit, setDataSubmit] = useState<string>('')

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
        skillName='Writing'
        nextSkillName='Speaking'
        desc='Viết trả lời vào các câu hỏi bên dưới.'
        nextSteps={(e) => {
          stateAction(
            setOverView,
            data?.questions?.[0]._id as string,
            {
              index: 1,
              _id: data?.questions?.[0]._id,
              anwser: dataSubmit,
              correctAnswers: dataSubmit,
            },
            'update',
          )
          nextSteps(e)
        }}
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
          <div
            className={'dangerHTML'}
            dangerouslySetInnerHTML={{
              __html: data?.questions?.length ? (data?.questions?.[0].question as any) : undefined,
            }}
          ></div>
        </div>
        <div className='divider' onMouseDown={handleDividerClick}></div>
        <div
          className='right-panel'
          style={sm ? { height: `calc(100% - ${dividerPosition}px)` } : { width: `calc(100% - ${dividerPosition}px)` }}
        >
          <TextArea
            style={{
              minHeight: '100%',
              width: '100%',
            }}
            onChange={(e) => setDataSubmit(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
