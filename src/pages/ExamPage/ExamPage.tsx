/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react'
import TestSound from './TestSound'
import Listening from './components/Listening/Listening'
import PreListening from './components/Listening/PreListening'
import Reading from './components/Reading/Reading'
import Writing from './components/Writing/Writing'
import Speaking from './components/Speaking/Speaking'
import Result from './components/Result/Result'
import { useMutation, useQuery } from '@tanstack/react-query'
import examApi from '@/apis/exam.api'
import { useParams } from 'react-router-dom'
import { AppContext } from '@/contexts/app.context'

export default function ExamPage() {
  const { setDuration } = useContext(AppContext)
  const [listeningData, setListeningData] = useState([])
  const [writingData, setWritingData] = useState([])
  const [readingData, setReadingData] = useState([])
  const [readingDataCallback, setReadingDataCallback] = useState([])
  const [speakingData, setSpeakingData] = useState([])
  const [dataSubmit, setDataSubmit] = useState<any>()
  const [dataSubmitAll, setDataSubmitAll] = useState<any>()
  const { id } = useParams()
  const [current, setCurrent] = useState(0)
  const [call, setCall] = useState<boolean>(false)
  const [total, setTotal] = useState<any>()

  const { data: dataQuestion } = useQuery({
    queryKey: ['questionList'],
    // queryFn: () => examApi.getExamDetail('6571f12e5c1845b627e9c898'),
    queryFn: () => examApi.getExamDetail(id!),
    enabled: !!id,
  })
  const dataExam = dataQuestion?.data?.skillData

  console.log(dataQuestion, 'dataQuestiondataQuestion')

  console.log(dataExam, 'dataExam')

  useEffect(() => {
    const updatedData = dataExam?.map((item) => {
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

  console.log(dataQuestion?.data?.duration, 'dataQuestion?.data?.đuratio')
  useEffect(() => {
    setDataSubmitAll(dataQuestion?.data)
    setDuration(dataQuestion?.data?.duration as number)
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
      content: <PreListening nextSteps={setCurrent} />,
    },
    {
      title: 'Listening',
      content: <Listening data={listeningData} nextSteps={setCurrent} callBackData={setListeningData} />,
    },
    {
      title: 'Reading',
      content: <Reading data={readingData} nextSteps={setCurrent} callBackData={setReadingDataCallback} />,
    },
    {
      title: 'Writing',
      content: <Writing data={writingData} nextSteps={setCurrent} />,
    },
    {
      title: 'Speaking',
      content: <Speaking data={speakingData} nextSteps={setCurrent} submit={setCall} />,
    },
    {
      title: 'Last',
      content: <Result nextSteps={setCurrent} total={total} />,
    },
  ]

  function processData(datas: any) {
    const listening: any[] = []
    const writing: any[] = []
    const reading: any[] = []
    const speaking: any[] = []

    datas?.forEach((item: any) => {
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

  return (
    <>
      <div> {steps[current].content}</div>
    </>
  )
}
