import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
import questionApi from '@/apis/question.api'
import successBg from '@/assets/images/examimg/hander-pana.png'
import testBg from '@/assets/images/examimg/online-test.png'
import { localAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PageResult from '@/components/PageResult'
import TagCustom from '@/components/TagCustom/TagCustom'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { ExamResultsState } from '@/interface/exam'
import { QuestionState } from '@/interface/question'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Col, Descriptions, Form, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import loadingBg from '../../assets/images/examimg/loading.png'
import QuestionItem from './components/QuestionItem'
import Score from './components/Score'
import css from './styles.module.scss'
import { BiCheckDouble } from 'react-icons/bi'
/* eslint-disable @typescript-eslint/no-explicit-any */

const TestPage = () => {
  const location = useLocation()
  const [form] = Form.useForm()
  const [startTest, setStartTest] = useState<boolean>(false)
  const [handleScore, setHandleScore] = useState<boolean>(false)
  const [finishTest, setFinishTest] = useState<boolean>(false)
  const [selectId, setSelectId] = useState<string>('')
  const [current, setCurrent] = useState(0)
  const [time, setTime] = useState<number>(0)
  const [isLoad, setIsLoad] = useState(false)

  const { sm, md, lg } = useResponsives()
  const { data: testData, isLoading } = useQuery({
    queryKey: ['examData', location],
    queryFn: () => {
      return examApi.getExamDetail(location.state.testId)
    },
    enabled: Boolean(location.state.testId),
  })

  const { data: eventData } = useQuery({
    queryKey: ['eventData'],
    queryFn: () => {
      return eventApi.getOneEvent(location.state.eventId)
    },
    enabled: Boolean(location.state.eventId),
  })

  const event = eventData?.data
  const test = testData?.data

  const questions = useQuery({
    queryKey: ['questionData', test],
    queryFn: () => {
      return questionApi.findQuestion({
        filterQuery: {
          _id: test?.questions,
          skill: test?.skillName[current],
        },
      })
    },
    enabled: Boolean(test?._id),
  })

  const question = questions?.data?.data?.docs

  useEffect(() => {
    if (test) {
      if (!md)
        window.scrollTo({
          top: 120,
          behavior: 'smooth',
        })
      else
        window.scrollTo({
          top: 80,
          behavior: 'smooth',
        })
    }

    if (question && current >= 0) setSelectId(question[current]?._id)
  }, [test, event, current, question])

  const [resultsData, setResultsData] = useState<ExamResultsState[]>()

  const testMutation = useMutation({
    mutationFn: (body) => examApi.examSubmit(body),
    onSuccess: (data) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Đã gửi câu trả lời!',
      })

      if (test) {
        localStorage.removeItem(`${test._id}data`)
        localStorage.removeItem(`${test._id}`)
      }

      setStartTest(false)
      const newData = [data.data]

      setResultsData(newData as unknown as ExamResultsState[])
    },
  })

  useEffect(() => {
    if (handleScore && !startTest && !finishTest) {
      setTimeout(() => {
        setFinishTest(true)
        setHandleScore(false)
      }, 250)
    }
  }, [resultsData])

  const testTime = location.state.testTime + location.state.addTime

  const oldTime = testData?.data._id && localAction(testData?.data._id)

  // data upload api
  const [answers, setAnswers] = useState<any>([])
  useEffect(() => {
    if (testData || isLoad) {
      const savedAnswers = localAction(testData?.data._id + 'data')

      if (savedAnswers !== null) {
        setAnswers(savedAnswers)
      }
    }
  }, [testData, finishTest, isLoad])

  const handleFinish = () => {
    setHandleScore(true)
    localAction(testData?.data._id as string, null, 'delete')
  }

  useEffect(() => {
    if (handleScore && !finishTest && time) {
      setTimeout(() => {
        const payload = {
          _id: testData?.data._id,
          questions: answers,
          time: testTime - time,
        }
        testMutation.mutate(payload as unknown as any)
      }, 150)
    }
  }, [handleScore, time])

  const handleReset = () => {
    setFinishTest(false)
    setCurrent(0)
    setTime(0)
  }

  const handleNext = () => {
    form.submit()

    if (question && current < question.length - 1) {
      setIsLoad(true)
      setTimeout(() => {
        setCurrent((prev) => prev + 1)
        setIsLoad(false)
      }, 250)
    } else {
      setTimeout(() => {
        handleFinish()
      }, 250)
    }
  }

  const handlePrev = () => {
    setIsLoad(true)
    if (current > 0)
      setTimeout(() => {
        setCurrent((prev) => prev - 1)
        setIsLoad(false)
      }, 250)
  }

  const startTime = moment(eventData?.data.start)

  const endTime = moment(eventData?.data.end)
  const duration = moment.duration(endTime.diff(startTime))
  const totalMinutes = duration.asMinutes()

  if (test)
    return (
      <LoadingCustom style={{ height: '50vh' }} tip='Vui lòng chờ...' loading={isLoading}>
        <Header padding={md ? '20px 0' : '70px 0'}>
          <Row justify='space-between' align={startTest ? 'top' : 'middle'} className={css.testMain} gutter={24}>
            {!startTest && !finishTest && !handleScore && (
              <>
                <Col span={24} md={12}>
                  <img src={testBg} alt='testBg' width={'100%'} />
                </Col>
                <Col span={24} md={8}>
                  <Space direction='vertical' size='large' align={sm || md || lg ? 'center' : 'start'}>
                    <h1>{event ? event?.name : test.name}</h1>
                    {oldTime > 0 ? <TagCustom content='Chưa hoàn thành' color='red'></TagCustom> : undefined}
                    <div>
                      <Descriptions size='small' column={1}>
                        <Descriptions.Item label='Số câu hỏi'>
                          <b>{test.countQuestions}</b>
                        </Descriptions.Item>
                        <Descriptions.Item label='Kỹ năng' className={css.sp100}>
                          <TagCustom
                            intColor={['#7555F2', '#F5C046', '#ee723f', '#44c4ab']}
                            intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
                            intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
                            content={test.skillName}
                          ></TagCustom>
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

            {startTest && !finishTest && (
              <>
                <Col span={24} md={20} lg={18}>
                  {md && (
                    <Row justify='space-between' align='bottom' className={css.testNav}>
                      <Col>
                        <ButtonCustom
                          onClick={handlePrev}
                          icon={<AiOutlineLeft />}
                          tooltip='Câu trước'
                          disabled={current <= 0 || isLoad}
                        ></ButtonCustom>
                      </Col>
                      <Col>
                        <CountDownTimer
                          type={md ? 'number' : 'progress'}
                          initTime={testTime}
                          initCountdown={oldTime !== 0 ? (oldTime as unknown as number) : 0}
                          start={startTest && !handleScore}
                          size={md ? 20 : 30}
                          localId={test._id}
                          callbackTimeEnd={setTime}
                          onListenEvent={handleFinish}
                        ></CountDownTimer>
                      </Col>
                      <Col>
                        <ButtonCustom
                          type='primary'
                          onClick={handleNext}
                          icon={question && current < question.length - 1 ? <AiOutlineRight /> : <BiCheckDouble />}
                          tooltip={question && current < question.length - 1 ? 'Câu tiếp theo' : 'Nộp bài'}
                          disabled={isLoad}
                        ></ButtonCustom>
                      </Col>
                    </Row>
                  )}
                  <Card className={css.testBody}>
                    <LoadingCustom loading={isLoad} tip='Vui lòng chờ...'>
                      <QuestionItem
                        type={question?.[current]?.type as unknown as string}
                        questionData={question?.[current] as unknown as QuestionState}
                        questionLength={question?.length as unknown as number}
                        questionKey={current}
                        dataValue={answers}
                        testId={testData ? testData.data._id : ''}
                        loading={questions.isLoading}
                        selectId={selectId}
                        form={form}
                      />
                    </LoadingCustom>
                  </Card>
                </Col>
                <Col span={24} md={4} lg={5} className={'sticky'} style={{ top: 100 }}>
                  {!md && (
                    <Space className={`sp100`} direction='vertical' size='large' align='center'>
                      <CountDownTimer
                        type={sm ? 'number' : 'text'}
                        initTime={testTime}
                        initCountdown={oldTime !== 0 ? (oldTime as unknown as number) : 0}
                        start={startTest && !handleScore}
                        size={20}
                        localId={test._id}
                        callbackTimeEnd={setTime}
                        onListenEvent={handleFinish}
                      ></CountDownTimer>
                      <h2 style={{ textAlign: 'center' }}>{event ? event.name : test.name}</h2>
                      <div>
                        Kỹ năng:{' '}
                        <TagCustom
                          intColor={['#7555F2', '#F5C046', '#ee723f', '#44c4ab']}
                          intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
                          intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
                          content={test.skillName}
                        ></TagCustom>
                      </div>
                      <Space>
                        <ButtonCustom onClick={handlePrev} disabled={current <= 0 || isLoad}>
                          Câu trước
                        </ButtonCustom>

                        <ButtonCustom type='primary' onClick={handleNext} disabled={isLoad}>
                          {question && current < question.length - 1 ? 'Câu tiếp theo' : 'Nộp bài'}
                        </ButtonCustom>
                      </Space>
                    </Space>
                  )}
                </Col>
              </>
            )}
            {handleScore && !finishTest && (
              <Col span={24}>
                <Row justify='center'>
                  <Col span={24} md={12}>
                    <img src={loadingBg} alt='loading' width={'85%'} style={{ display: 'block', margin: '0 auto' }} />
                  </Col>
                  <Col span={24}>
                    <LoadingCustom loading={handleScore} tip='Đang tính toán điểm của bạn! Vui lòng chờ...'>
                      <p style={{ height: 70 }}></p>
                    </LoadingCustom>
                  </Col>
                </Row>
              </Col>
            )}

            {!startTest && finishTest && (
              <>
                <Col span={24} md={12}>
                  <img src={successBg} alt='successBg' width={'100%'} />
                </Col>
                <Col span={24} xxl={9} xl={9} lg={11} md={11}>
                  <Space
                    direction='vertical'
                    size='large'
                    align={sm || md || lg ? 'center' : 'start'}
                    className={`sp100 ${css.scoreMain}`}
                  >
                    <h1>{event ? event.name : test.name}</h1>

                    <Score
                      data={resultsData as unknown as ExamResultsState[]}
                      testQuestion={testData.data.countQuestions}
                      time={totalMinutes}
                    />
                    <Space>
                      <ButtonCustom onClick={handleReset}>Làm lại</ButtonCustom>
                      <ButtonCustom type='primary' href='/'>
                        Trở về trang chủ
                      </ButtonCustom>
                    </Space>
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
