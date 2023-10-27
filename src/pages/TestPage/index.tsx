import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import css from './styles.module.scss'
import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
import Header from '@/components/layout/Header/Header'
import LoadingCustom from '@/components/LoadingCustom'
import PageResult from '@/components/PageResult'
import questionApi from '@/apis/question.api'
import TagCustom from '@/components/TagCustom/TagCustom'
import testBg from '@/assets/images/examimg/online-test.png'
import useResponsives from '@/hooks/useResponsives'
import { Card, Col, Descriptions, Row, Space, Steps } from 'antd'
import { QuestionState } from '@/interface/question'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface QuestionRender {
  type: string
  questionData: QuestionState
  questionLength: number
  questionKey: number
}

const TestPage = () => {
  const location = useLocation()

  const [startTest, setStartTest] = useState<boolean>(false)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [skill, setSkill] = useState('READING')

  const { xl, sm, md, lg } = useResponsives()
  const { data: testData, isLoading } = useQuery({
    queryKey: ['examData', location],
    queryFn: () => {
      return examApi.getExamDetail(location.state.testId)
    },
  })

  const { data: eventData } = useQuery({
    queryKey: ['eventData', testData],
    queryFn: () => {
      return eventApi.getOneEvent(location.state.eventId)
    },
  })

  const event = eventData?.data
  const data = testData?.data
  const questions = useQuery({
    queryKey: ['questionData', skill, currentQuestion],
    queryFn: () => {
      return questionApi.findQuestion({
        filterQuery: {
          _id: data?.questions,
          skill: skill,
        },
        // options: {
        //   limit: 1,
        //   page: currentQuestion,
        // },
      })
    },
  })

  const question = questions?.data?.data?.docs

  useEffect(() => {
    if (testData?.data) {
      if (xl)
        window.scrollTo({
          top: 120,
          behavior: 'smooth',
        })
    }
  }, [testData, event])

  const testTime = location.state.testTime + location.state.addTime

  const oldTime = event && localStorage.getItem(event._id as string)
  const [current, setCurrent] = useState(0)

  const QuestionItem = ({ type, questionData, questionLength, questionKey }: QuestionRender) => {
    if (questions.isLoading) return <LoadingCustom tip='Vui lòng chờ...' style={{ marginTop: '40vh' }}></LoadingCustom>
    if (questionData)
      return (
        <div>
          <div className={css.titleQues}>
            <h2>
              Câu: {questionKey + 1} <span style={{ fontSize: 14 }}>/{questionLength}</span>
            </h2>
            <Space>
              <TagCustom content={type}></TagCustom>
              <TagCustom color='gold' content={questionData.point + ' Điểm'}></TagCustom>
            </Space>
          </div>
          <p
            className={css.question}
            dangerouslySetInnerHTML={{ __html: questionData.question as unknown as string }}
          ></p>
        </div>
      )
  }

  const testSkill = [
    {
      id: 'READING',
      title: 'Đọc',
      description: 'Chưa hoàn thành',
      content: (
        <QuestionItem
          type='READING'
          questionData={question?.[currentQuestion] as unknown as QuestionState}
          questionLength={question?.length as unknown as number}
          questionKey={currentQuestion}
        />
      ),
    },
    {
      id: 'LISTENING',
      title: 'Nghe',
      description: 'Chưa hoàn thành',
      content: (
        <QuestionItem
          type='LISTENING'
          questionData={question?.[currentQuestion] as unknown as QuestionState}
          questionLength={question?.length as unknown as number}
          questionKey={currentQuestion}
        />
      ),
      disabled: false,
    },
    {
      id: 'WRITING',
      title: 'Viết',
      description: 'Chưa hoàn thành',
      content: (
        <QuestionItem
          type='WRITING'
          questionData={question?.[currentQuestion] as unknown as QuestionState}
          questionLength={question?.length as unknown as number}
          questionKey={currentQuestion}
        />
      ),
      disabled: false,
    },
    {
      id: 'SPEAKING',
      title: 'Nói',
      description: 'Chưa hoàn thành',
      content: (
        <QuestionItem
          type='SPEAKING'
          questionData={question?.[currentQuestion] as unknown as QuestionState}
          questionLength={question?.length as unknown as number}
          questionKey={currentQuestion}
        />
      ),
      disabled: false,
    },
  ]

  const onChange = (value: number) => {
    setSkill(testSkill[value].id)
    setCurrentQuestion(0)
    setCurrent(value)
  }

  const check = question && currentQuestion + 1 < question?.length

  const handleNext = () => {
    if (check) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setCurrent((prev) => {
        setSkill(testSkill[prev + 1].id)

        return prev + 1
      })
      setCurrentQuestion(0)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1)
  }

  if (data && event)
    return (
      <LoadingCustom style={{ height: '50vh' }} tip='Vui lòng chờ...' loading={isLoading}>
        <Header padding={'70px 0'}>
          <Row justify='space-between' gutter={24} align='middle'>
            {startTest ? (
              <>
                <Col span={24} md={18}>
                  <Card className={css.testBody}>{testSkill[current].content}</Card>
                </Col>
                <Col span={24} md={6}>
                  <Space className={'sp100'} direction='vertical' size='large' align='center'>
                    <CountDownTimer
                      type='progress'
                      initTime={testTime}
                      initCountdown={oldTime !== '0' ? (oldTime as unknown as number) : 0}
                      start={startTest}
                      size={30}
                      localId={event._id}
                    ></CountDownTimer>
                    <Space direction='vertical'>
                      <b>Kỹ năng:</b>
                      <Steps current={current} onChange={onChange} direction='vertical' items={testSkill} />
                    </Space>

                    <Space>
                      <ButtonCustom onClick={handlePrev} disabled={currentQuestion === 0}>
                        Câu trước
                      </ButtonCustom>
                      <ButtonCustom type='primary' onClick={handleNext}>
                        {question && currentQuestion === question.length ? 'Kỹ năng tiếp theo' : 'Câu tiếp theo'}
                      </ButtonCustom>
                    </Space>
                  </Space>
                </Col>
              </>
            ) : (
              <>
                <Col span={24} md={12}>
                  <img src={testBg} alt='testBg' width={'100%'} />
                </Col>
                <Col span={24} md={8}>
                  <Space direction='vertical' size='large' align={sm || md || lg ? 'center' : 'start'}>
                    <h1>{event?.name}</h1>
                    {oldTime && oldTime !== '0' && <TagCustom content='Chưa hoàn thành' color='red'></TagCustom>}
                    <div>
                      <Descriptions size='small'>
                        <Descriptions.Item label='Số câu hỏi'>
                          <b>{data.countQuestions}</b>
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions column={sm || md || lg ? 1 : 2}>
                        <Descriptions.Item label='Thời gian làm bài'>
                          <b>{location.state.testTime} phút</b>
                        </Descriptions.Item>
                        <Descriptions.Item label='Thời gian cộng thêm'>
                          <b>{location.state.addTime} phút</b>
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions size='small'>
                        <Descriptions.Item label='Chú thích'>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                event?.description && event?.description !== '<p></p>'
                                  ? event?.description
                                  : 'Không có chú thích.',
                            }}
                          ></div>
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <ButtonCustom size='large' type='primary' onClick={() => setStartTest(true)}>
                      Bắt đầu thi
                    </ButtonCustom>
                  </Space>
                </Col>
              </>
            )}
          </Row>
        </Header>
      </LoadingCustom>
    )
  else return <PageResult code={404} desc='Không có bài thi nào' />
}

export default TestPage
