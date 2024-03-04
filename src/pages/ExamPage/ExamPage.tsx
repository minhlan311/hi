/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import { AppContext } from '@/contexts/app.context'
import { ExamResultsState, ExamState, Skill } from '@/interface/exam'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Listening from './components/Listening/Listening'
import PreListening from './components/Listening/PreListening'
import Reading from './components/Reading/Reading'
import Result from './components/Result/Result'
import Speaking from './components/Speaking/Speaking'
import TestSound from './components/TestSound/TestSound'
import Writing from './components/Writing/Writing'

export default function ExamPage() {
  const { overView, time } = useContext(AppContext)

  const [current, setCurrent] = useState(0)
  const [listeningData, setListeningData] = useState<Skill>()
  const [writingData, setWritingData] = useState<Skill>()
  const [readingData, setReadingData] = useState<Skill>()
  const [speakingData, setSpeakingData] = useState<Skill>()
  const [submit, setSubmit] = useState<boolean>(false)
  const [result, setResult] = useState<ExamResultsState>()
  const { id } = useParams()

  const queryClient = useQueryClient()
  const examDetail = queryClient.getQueryData<{ data: ExamState }>(['examDetail'])

  const dataExam = examDetail?.data

  const mutateSubmit = useMutation({
    mutationFn: (body: any) => examApi.examSubmit(body),
    onSuccess: (data) => setResult(data?.data as any),
  })

  useEffect(() => {
    if (submit) {
      overView.forEach((item) => {
        delete item.anwser
        delete item.index
      })
      const payload = {
        _id: id,
        questions: overView,
        time,
      }
      setResult(undefined)
      mutateSubmit.mutate(payload)
    }
  }, [submit])

  const steps = [
    {
      title: 'First',
      content: <TestSound nextSteps={setCurrent} />,
    },
    {
      title: 'Second',
      content: <PreListening nextSteps={setCurrent} cateName={dataExam?.category.name as string} />,
    },
    {
      title: 'Listening',
      content: <Listening data={listeningData!} nextSteps={setCurrent} />,
    },
    {
      title: 'Reading',
      content: <Reading data={readingData!} nextSteps={setCurrent} />,
    },
    {
      title: 'Writing',
      content: <Writing data={writingData!} nextSteps={setCurrent} />,
    },
    {
      title: 'Speaking',
      content: <Speaking data={speakingData!} nextSteps={setCurrent} setSubmit={setSubmit} />,
    },
    {
      title: 'Last',
      content: <Result result={result as any} time={dataExam?.duration || 0} />,
    },
  ]

  useEffect(() => {
    if (dataExam) {
      let prevNum = 1
      const listening = dataExam.skillData.find((skill) => skill.skill === 'LISTENING')
      const reading = dataExam.skillData.find((skill) => skill.skill === 'READING')
      const writing = dataExam.skillData.find((skill) => skill.skill === 'WRITING')
      const speaking = dataExam.skillData.find((skill) => skill.skill === 'SPEAKING')

      if (listening) {
        setListeningData({
          ...listening,
          countQuestions: listening?.questions?.length || 0,
          prevNum: 1,
        })
        prevNum += listening?.questions?.length || 0
      }

      if (reading) {
        setReadingData({
          ...reading,
          countQuestions: reading?.questions?.length || 0,
          prevNum,
        })
        prevNum += reading?.questions?.length || 0
      }

      if (writing) {
        setWritingData({
          ...writing,
          countQuestions: writing?.questions?.length || 0,
          prevNum,
        })
        prevNum += writing?.questions?.length || 0
      }

      if (speaking) {
        setSpeakingData({
          ...speaking,
          countQuestions: speaking?.questions?.length || 0,
          prevNum,
        })
      }
    }
  }, [dataExam])

  return steps[current].content
}
