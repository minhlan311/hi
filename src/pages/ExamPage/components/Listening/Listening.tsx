/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { AppContext } from '@/contexts/app.context'
import { Skill } from '@/interface/exam'

import React, { useContext, useEffect, useRef, useState } from 'react'
import QuestionsRender from '../QuestionRender'

type Props = {
  data: Skill
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Listening({ data, nextSteps }: Props) {
  const { volume } = useContext(AppContext)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlayed, setIsAudioPlayed] = useState(false)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handleAudioEnded = () => {
    if (!isAudioPlayed && audioRef.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
          setIsAudioPlayed(true)
        }
      }, 2500)
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
        src={import.meta.env.VITE_FILE_ENDPOINT + '/' + data?.url}
        controls
        controlsList='nodownload noplaybackrate'
      >
        Your browser does not support the audio element.
      </audio>
      {data && <QuestionsRender data={data?.questions?.length ? data.questions : []} />}
    </div>
  )
}
