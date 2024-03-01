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
  const [listeningData, setListeningData] = useState<Skill[]>([])
  const [writingData, setWritingData] = useState<Skill[]>([])
  const [readingData, setReadingData] = useState<Skill[]>([])
  const [speakingData, setSpeakingData] = useState<Skill[]>([])
  const [submit, setSubmit] = useState<boolean>(false)
  const [result, setResult] = useState<ExamResultsState>()
  const { id } = useParams()

  const queryClient = useQueryClient()
  const examDetail = queryClient.getQueryData<{ data: ExamState }>(['examDetail'])

  const dataExam = examDetail?.data

  // const dataQuestion = dataExam?.skillData

  // useEffect(() => {
  //   const updatedData = dataQuestion?.map((item) => {
  //     switch (item.skill) {
  //       case 'LISTENING':
  //         return { ...item, questions: listeningData }
  //       case 'READING':
  //         return { ...item, questions: readingData }
  //       case 'WRITING':
  //         return { ...item, questions: writingData }
  //       case 'SPEAKING':
  //         return { ...item, questions: speakingData }
  //       default:
  //         return item
  //     }
  //   })
  //   console.log({ updatedData })
  // }, [listeningData, writingData, readingData, speakingData, dataExam])

  // useEffect(() => {
  //   setDataSubmitAll(dataExam)
  // }, [dataQuestion])

  // useEffect(() => {
  //   setDataSubmitAll({ ...dataSubmitAll, skillData: dataSubmit })
  // }, [dataSubmit])

  const mutateSubmit = useMutation({
    mutationFn: (body: any) => examApi.examSubmit(body),
    onSuccess: (data) => setResult(data?.data as any),
  })

  useEffect(() => {
    if (submit) {
      const payload = {
        _id: id,
        questions: overView,
        time,
      }

      console.log('submit', payload)
      mutateSubmit.mutate(payload)
    }
  }, [submit])

  useEffect(() => {
    if (dataExam) {
      processData(dataExam)
    }
  }, [dataExam])
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
      content: <Listening data={listeningData[0]} nextSteps={setCurrent} />,
    },
    {
      title: 'Reading',
      content: <Reading data={readingData[0]} nextSteps={setCurrent} />,
    },
    {
      title: 'Writing',
      content: <Writing data={writingData[0]} nextSteps={setCurrent} />,
    },
    {
      title: 'Speaking',
      content: <Speaking data={speakingData[0]} nextSteps={setCurrent} setSubmit={setSubmit} />,
    },
    {
      title: 'Last',
      content: <Result result={result as any} />,
    },
  ]

  function processData(data: ExamState) {
    const listening: any[] = []
    const writing: any[] = []
    const reading: any[] = []
    const speaking: any[] = []

    data.skillData?.forEach((item: any) => {
      switch (item.skill) {
        case 'LISTENING':
          listening.push(item)
          break
        case 'WRITING':
          writing.push(item)
          break
        case 'READING':
          reading.push(item)
          break
        case 'SPEAKING':
          speaking.push(item)
          break
        default:
        // Xử lý trường hợp không khớp
      }
    })

    setListeningData(listening as any)
    setWritingData(writing as any)
    setReadingData(reading as any)
    setSpeakingData(speaking as any)
  }

  return steps[current].content
}
