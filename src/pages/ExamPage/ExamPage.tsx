/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import { ExamState, Skill } from '@/interface/exam'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Listening from './components/Listening/Listening'
import PreListening from './components/Listening/PreListening'
import Reading from './components/Reading/Reading'
import Result from './components/Result/Result'
import Speaking from './components/Speaking/Speaking'
import TestSound from './components/TestSound/TestSound'
import Writing from './components/Writing/Writing'

export default function ExamPage() {
  const [listeningData, setListeningData] = useState<Skill[]>([])
  const [writingData, setWritingData] = useState<Skill[]>([])
  const [readingData, setReadingData] = useState<Skill[]>([])
  const [speakingData, setSpeakingData] = useState<Skill[]>([])
  const [listeningDataCallback, setListeningDataCallback] = useState([])
  const [readingDataCallback, setReadingDataCallback] = useState([])
  const [dataSubmit, setDataSubmit] = useState<any>()
  const [dataSubmitAll, setDataSubmitAll] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [call, setCall] = useState<boolean>(false)
  const [total, setTotal] = useState<any>()
  const { id } = useParams()
  console.log(listeningDataCallback)

  const queryClient = useQueryClient()
  const examDetail = queryClient.getQueryData<{ data: ExamState }>(['examDetail'])

  const dataExam = examDetail?.data

  const dataQuestion = dataExam?.skillData

  useEffect(() => {
    const updatedData = dataQuestion?.map((item) => {
      switch (item.skill) {
        case 'LISTENING':
          return { ...item, questions: listeningData }
        case 'READING':
          return { ...item, questions: readingDataCallback }
        case 'WRITING':
          return { ...item, questions: writingData }
        case 'SPEAKING':
          return { ...item, questions: speakingData }
        default:
          return item
      }
    })
    setDataSubmit(updatedData)
  }, [listeningData, writingData, readingDataCallback, speakingData, dataExam])

  useEffect(() => {
    setDataSubmitAll(dataExam)
  }, [dataQuestion])

  useEffect(() => {
    setDataSubmitAll({ ...dataSubmitAll, skillData: dataSubmit })
  }, [dataSubmit])

  const mutateSubmit = useMutation({
    mutationFn: (body: any) => examApi.examSubmit(body),
    onSuccess: (data) => setTotal(data?.data),
  })

  useEffect(() => {
    if (call) {
      mutateSubmit.mutate({ ...dataSubmitAll, _id: id })
    }
  }, [call])

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
      content: <Listening data={listeningData[0]} nextSteps={setCurrent} callBackData={setListeningDataCallback} />,
    },
    {
      title: 'Reading',
      content: <Reading data={readingData[0]} nextSteps={setCurrent} callBackData={setReadingDataCallback} />,
    },
    {
      title: 'Writing',
      content: <Writing data={writingData[0]} nextSteps={setCurrent} />,
    },
    {
      title: 'Speaking',
      content: <Speaking data={speakingData[0]} nextSteps={setCurrent} submit={setCall} />,
    },
    {
      title: 'Last',
      content: <Result total={total} />,
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
