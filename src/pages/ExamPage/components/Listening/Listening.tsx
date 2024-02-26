/* eslint-disable @typescript-eslint/no-explicit-any */
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { AppContext } from '@/contexts/app.context'
import { Skill } from '@/interface/exam'
import { QuestionState, TypeQuestion } from '@/interface/question'
import { Card, List, Radio, Space } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  data: Skill
  callBackData: any
}

const QuestionsRender = ({
  data,
}: {
  data: QuestionState[]
  callbackSubmit: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [questionsByType, setQestionsByType] = useState<{ type: TypeQuestion; data: QuestionState[] }[]>([
    { type: 'SINGLE CHOICE', data: [] },
    { type: 'MULTIPLE CHOICE', data: [] },
    { type: 'TRUE FALSE', data: [] },
    { type: 'SORT', data: [] },
    { type: 'DRAG DROP', data: [] },
    { type: 'LIKERT SCALE', data: [] },
    { type: 'FILL BLANK', data: [] },
    { type: 'MATCHING', data: [] },
    { type: 'NUMERICAL', data: [] },
    { type: 'WRITING', data: [] },
  ])

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((q) => {
        const typeIndex = questionsByType.findIndex((item) => item.type === q.type)

        if (typeIndex !== -1) {
          questionsByType[typeIndex].data.push(q)
          setQestionsByType(questionsByType)
        }
      })

      setLoading(false)
    }
  }, [data])
  if (!loading)
    return (
      <Card size='small' style={{ height: '100%', overflow: 'auto' }}>
        {questionsByType.map((item) => {
          if (item.data.length > 0)
            return (
              <Space direction='vertical' size='large' className='sp100' key={item.type}>
                <h2>Questions 1 - {item.data.length}</h2>
                {(item.type === 'SINGLE CHOICE' && 'Choose the correct letter, A, B, С or D.') || 'a'}
                <List
                  dataSource={item.data}
                  renderItem={(item, index) => (
                    <List.Item key={item._id}>
                      <b
                        dangerouslySetInnerHTML={{
                          __html: `<div><span>${index + 1}. </span><span>${item?.question}</span></div>`,
                        }}
                      ></b>

                      <Radio.Group value={item.choices.findIndex((choice) => choice.isChosen)}>
                        {item.choices.map((choice, choiceIndex) => (
                          <div className='div-answer' key={choiceIndex}>
                            <Radio value={choiceIndex}>
                              <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                            </Radio>
                          </div>
                        ))}
                      </Radio.Group>
                    </List.Item>
                  )}
                ></List>
              </Space>
            )
        })}
      </Card>
    )
}

export default function Listening({ nextSteps, data }: Props) {
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
      {data && (
        <QuestionsRender data={data?.questions?.length ? data.questions : []} callbackSubmit={(e) => console.log(e)} />
      )}
    </div>
  )
}
