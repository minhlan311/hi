/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import { Question } from '@/types/question.type'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  SendOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Radio } from 'antd'
import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import './ExamCourse.scss'

interface DataUpload {
  _id: string
  questions: Question[]
  type: string
}

interface Props {
  data: {
    _id: string
    questions?: Question[]
  }[]
  name: string
}

export default function ExamCourse({ data, name }: Props) {
  const [questions, setQuestion] = useState<Question[]>([])
  const [dataUpload, setDataUpload] = useState<DataUpload | undefined | []>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const currentQuestion = questions[currentPage]
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [startQuiz, setStartQuiz] = useState(false)
  const [seconds, setSeconds] = useState<number>(0)
  const [dataExam, setDataExam] = useState<any>()

  const { data: dataQuestion } = useQuery({
    queryKey: ['questionList', data],
    queryFn: () => examApi.getExamDetail(data[0]?._id),
    enabled: data ? true : false,
  })

  useEffect(() => {
    setDataExam(dataQuestion)
  }, [dataQuestion])

  useEffect(() => {
    let timer: NodeJS.Timeout

    // Nếu bài kiểm tra đã bắt đầu và chưa nộp bài
    if (startQuiz && !hasSubmitted) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    // Hủy interval khi component unmount hoặc khi bài kiểm tra kết thúc
    return () => clearInterval(timer)
  }, [startQuiz, hasSubmitted])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // const queryClient = useQueryClient()

  const renderPieChart = () => {
    const dataQuestion = [
      { name: 'Đáp án chọn đúng', value: correctAnswersCount },
      { name: 'Đáp án chọn sai', value: questions.length - (correctAnswersCount ?? 0) },
    ]
    const COLORS = ['#008a00', '#D72831']

    return (
      <PieChart disable width={230} height={230}>
        <Pie data={dataQuestion} cx='50%' cy='50%' labelLine={false} outerRadius={80} fill='#8884d8' dataKey='value'>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    )
  }

  const getAnswerColor = (choice: any) => {
    if (hasSubmitted) {
      if (choice.isChosen) {
        if (choice.isCorrect) {
          return 'green'
        }

        return 'red'
      } else {
        if (choice.isCorrect) {
          return 'lightgreen'
        }

        return 'black'
      }
    } else {
      return 'black'
    }
  }

  console.log(currentQuestion, 'currentQuestion')

  useEffect(() => {
    if (dataExam?.data && dataExam?.data?.questionsDetail) {
      const extractedData =
        dataExam?.data?.questionsDetail ??
        dataExam?.data?.questionsDetail?.map((item: any) => ({
          _id: item?._id,
          name: item?.question,
          choices: item?.choices,
        }))
      setQuestion(extractedData)
      setHasSubmitted(false)
      setDataUpload([])
      setCurrentPage(0)
      setShowDetails(false)
      setStartQuiz(false)
      setSeconds(0)
    }
  }, [data, dataExam])

  console.log(questions, '==========')

  useEffect(() => {
    setDataUpload({
      _id: data && data[0]?._id,
      type: 'QUIZZ',
      questions: questions,
    })
  }, [questions])

  console.log(dataUpload, 'dataUploaddataUpload')

  const handleRadioChange = (questionIndex: any, choiceIndex: any) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex]?.choices?.forEach((choice, idx) => {
      choice.isChosen = idx === choiceIndex
    })
    setQuestion(newQuestions)
  }

  const mutate = useMutation({
    mutationFn: (body: any) => examApi.examSubmit(body),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['topicLearning'] })
      setDataExam(data?.data)
    },
  })

  // const allQuestionsAnswered = () => {
  //   return questions.every((question) => question?.choices?.some((choice) => choice.isChosen))
  // }

  const handleSubmit = () => {
    // if (!allQuestionsAnswered()) {
    //   openNotification({
    //     message: 'Thông báo',
    //     status: 'warning',
    //     description: 'Vui lòng chọn đáp án cho tất cả các câu hỏi trước khi hoàn thành bài kiểm tra!',
    //   })

    //   return
    // }

    const correctCount = countCorrectAnswers()
    setCorrectAnswersCount(correctCount)

    mutate.mutate(dataUpload)
    setHasSubmitted(true)
  }

  const resetQuiz = () => {
    setHasSubmitted(false)
    setCurrentPage(0)
    setShowDetails(false)
    setStartQuiz(false)
    setSeconds(0)
    const resettedQuestions = questions.map((q) => ({
      ...q,
      choices: q.choices.map((choice) => ({
        ...choice,
        isChosen: false,
      })),
    }))

    setQuestion(resettedQuestions)
    setCorrectAnswersCount(null)
  }

  const countCorrectAnswers = (): number => {
    return questions.filter((question) => question?.choices?.some((choice) => choice.isChosen && choice.isCorrect))
      .length
  }

  return (
    <>
      {!startQuiz ? (
        <div className='start-quiz-container'>
          <h2 className='quiz-start'>Quiz - {name}</h2>
          <p className='quiz-p'>Tổng số câu hỏi: {dataExam?.data?.questionsDetail?.length}</p>
          <Button
            style={{
              minWidth: '100px',
              minHeight: '50px',
              fontWeight: '600',
              fontSize: '16px',
            }}
            type='primary'
            onClick={() => setStartQuiz(true)}
          >
            Bắt đầu
          </Button>
        </div>
      ) : (
        <>
          {!hasSubmitted && (
            <>
              <div className='div-questionclass'>
                <div
                  style={{
                    marginBottom: '30px',
                  }}
                ></div>

                {currentQuestion && (
                  <div>
                    <div className='flex-time-title'>
                      <h3>Câu hỏi số {currentPage + 1} : </h3>
                      <h4 className='textAlign-end'>
                        <ClockCircleOutlined /> : {formatTime(seconds)}
                      </h4>
                    </div>
                    <div className='div-start-question'>
                      <h3
                        style={{ marginLeft: '10px' }}
                        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                      />
                    </div>

                    <Radio.Group
                      onChange={(e: any) => handleRadioChange(currentPage, e.target.value)}
                      value={currentQuestion?.choices?.findIndex((choice: any) => choice.isChosen)}
                    >
                      {currentQuestion &&
                        currentQuestion?.choices?.map((choice: any, choiceIndex: number) => (
                          <div
                            className='div-answer'
                            key={choiceIndex}
                            onClick={() => handleRadioChange(currentPage, choiceIndex)}
                          >
                            <Radio value={choiceIndex} style={{ pointerEvents: 'none' }}>
                              <div
                                dangerouslySetInnerHTML={{ __html: choice.answer }}
                                style={{ color: getAnswerColor(choice) }}
                              ></div>
                            </Radio>
                          </div>
                        ))}
                    </Radio.Group>
                  </div>
                )}

                <div className='button-space-question'>
                  <div>
                    <Button
                      type='dashed'
                      className='dashed'
                      disabled={currentPage <= 0}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <LeftCircleOutlined /> Câu trước
                    </Button>
                  </div>
                  <div>
                    {currentPage >= questions.length - 1 ? (
                      <Button onClick={handleSubmit} style={{ width: '120px' }} type='primary'>
                        Hoàn thành <SendOutlined />
                      </Button>
                    ) : (
                      <Button
                        type='dashed'
                        className='dashed'
                        disabled={currentPage >= questions.length - 1}
                        onClick={() => {
                          setCurrentPage(currentPage + 1)
                        }}
                      >
                        <RightCircleOutlined /> Câu tiếp theo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {hasSubmitted && (
            <>
              <div className='div-questionclass'>
                <div>
                  <h2>Kết quả:</h2>
                  {renderPieChart()}
                  <p className='result-text'>
                    Bạn đã trả lời đúng {correctAnswersCount} / {questions.length} câu hỏi.
                  </p>
                  <h3>Thời gian làm bài : {formatTime(seconds)}</h3>
                  <Button
                    onClick={() => setShowDetails(!showDetails)}
                    style={{ marginTop: '20px', width: '150px' }}
                    type='dashed'
                    className='dashed'
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    onClick={resetQuiz}
                    style={{ marginTop: '20px', width: '100px', marginLeft: '20px' }}
                    type='primary'
                  >
                    <UndoOutlined /> Làm lại
                  </Button>
                </div>
                {showDetails &&
                  questions &&
                  questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                      <h4
                        style={{
                          margin: '20px 0',
                        }}
                      >
                        Câu hỏi số {questionIndex + 1}:{' '}
                      </h4>
                      <div
                        style={{
                          fontWeight: '700',
                          fontSize: '16px',
                        }}
                        dangerouslySetInnerHTML={{ __html: question.name }}
                      />

                      {question?.choices?.map((choice: any, choiceIndex: number) => {
                        let bgColor = 'white' // màu nền mặc định
                        let textColor = 'black' // màu chữ mặc định
                        let icon = null // biểu tượng mặc định

                        if (choice.isChosen) {
                          textColor = 'red' // màu chữ cho đáp án đã chọn
                          icon = <CloseCircleOutlined style={{ marginLeft: '5px' }} />

                          if (choice.isCorrect) {
                            textColor = 'green' // màu chữ cho đáp án đúng
                            icon = <CheckCircleOutlined style={{ marginLeft: '5px' }} />
                          }
                        }

                        if (choice.isCorrect) {
                          textColor = 'green' // màu chữ cho đáp án đúng
                        }

                        return (
                          <>
                            <div className='div-answerR' key={choiceIndex}>
                              <Radio
                                disabled
                                checked={choice.isChosen}
                                value={choiceIndex}
                                style={{
                                  backgroundColor: bgColor,
                                  color: textColor,
                                  padding: '5px',
                                  margin: '5px 0',
                                  minWidth: '50px',
                                }}
                              >
                                <div className='flex-radios'>
                                  <div>
                                    <span dangerouslySetInnerHTML={{ __html: choice.answer }} />
                                  </div>
                                  <div>{icon}</div>
                                </div>
                              </Radio>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
