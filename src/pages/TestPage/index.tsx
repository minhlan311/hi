import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import css from './styles.module.scss'
import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
import Header from '@/components/layout/Header/Header'
import loadingBg from '../../assets/images/examimg/loading.png'
import LoadingCustom from '@/components/LoadingCustom'
import moment from 'moment-timezone'
import openNotification from '@/components/Notification'
import PageResult from '@/components/PageResult'
import questionApi from '@/apis/question.api'
import QuestionItem from './components/QuestionItem'
import Score from './components/Score'
import successBg from '@/assets/images/examimg/hander-pana.png'
import TagCustom from '@/components/TagCustom/TagCustom'
import testBg from '@/assets/images/examimg/online-test.png'
import useResponsives from '@/hooks/useResponsives'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Card, Col, Descriptions, Form, Row, Space, Steps } from 'antd'
import { ExamResultsState, SkillType } from '@/interface/exam'
import { localAction } from '@/common'
import { QuestionState } from '@/interface/question'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
/* eslint-disable @typescript-eslint/no-explicit-any */

const TestPage = () => {
  const location = useLocation()
  const [form] = Form.useForm()
  const [startTest, setStartTest] = useState<boolean>(false)
  const [finishTest, setFinishTest] = useState<boolean>(false)
  const [selectId, setSelectId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [current, setCurrent] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [skill, setSkill] = useState<SkillType>()

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
  const data = testData?.data

  const questions = useQuery({
    queryKey: ['questionData', skill, data],
    queryFn: () => {
      return questionApi.findQuestion({
        filterQuery: {
          _id: data?.questions,
          skill: data?.skillName[current],
        },
      })
    },
    enabled: Boolean(data?._id),
  })

  const question = questions?.data?.data?.docs

  useEffect(() => {
    if (testData?.data) {
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

    if (question && currentQuestion >= 0) setSelectId(question[currentQuestion]?._id)
  }, [testData, event, currentQuestion, current, question])

  const testMutation = useMutation({
    mutationFn: (body) => examApi.examSubmit(body),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Đã gửi câu trả lời!',
      })
      localStorage.removeItem(`${testData?.data._id}data`)
    },
  })

  const results = useQuery({
    queryKey: ['resultDetail', testMutation, testData],
    queryFn: () => examApi.findResults({ filterQuery: { testId: testData?.data._id } }),

    enabled: testMutation.isSuccess,
  })
  useEffect(() => {
    if (results.isSuccess) setLoading(false)
  }, [results])
  const resultsData = results?.data?.data.docs

  const testTime = location.state.testTime + location.state.addTime

  const oldTime = event && (localAction(event._id) as unknown as number)

  // data upload api
  const [answers, setAnswers] = useState<any>([])
  useEffect(() => {
    if (testData) {
      const savedAnswers = localAction(testData?.data._id + 'data')

      if (savedAnswers !== null) {
        setAnswers(savedAnswers)
      }
    }
  }, [testData, finishTest])
  const [isLoad, setIsLoad] = useState(false)

  const testSkill = data?.skillName?.map((item) => {
    return {
      id: item,
      title:
        (item === 'READING' && 'Đọc') ||
        (item === 'LISTENING' && 'Nghe') ||
        (item === 'WRITING' && 'Viết') ||
        (item === 'SPEAKING' && 'Nói'),
      description: `${current > 0 ? 'Đã' : 'Chưa'} hoàn thành`,
      content: (
        <LoadingCustom loading={isLoad} tip='Vui lòng chờ...'>
          <QuestionItem
            type={item}
            questionData={question?.[currentQuestion] as unknown as QuestionState}
            questionLength={question?.length as unknown as number}
            questionKey={currentQuestion}
            dataValue={answers}
            testId={testData ? testData.data._id : ''}
            loading={questions.isLoading}
            selectId={selectId}
            form={form}
          />
        </LoadingCustom>
      ),
    }
  })

  const [time, setTime] = useState<number>(0)

  const handleFinish = () => {
    setCurrent(0)
    setCurrentQuestion(0)
    setSkill(undefined)
    setFinishTest(true)

    if (event) localStorage.removeItem(event._id as string)
  }

  useEffect(() => {
    if (finishTest && time > 0) {
      const payload = {
        _id: testData?.data._id,
        questions: answers,
        time: testTime - time,
      }

      testMutation.mutate(payload as unknown as any)

      setAnswers([])
    }
  }, [finishTest, time])

  const handleReset = () => {
    setStartTest(false)
    setFinishTest(false)
    setTime(0)
    setSkill(testSkill && testSkill[0].id)
  }

  const check = question && currentQuestion + 1 < question?.length

  const handleNext = () => {
    if (testSkill) {
      if (check) {
        form.submit()
        setIsLoad(true)
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1)
          setIsLoad(false)
        }, 250)
      } else if (current === testSkill.length - 1) {
        handleFinish()

        return
      } else {
        setCurrent((prev) => {
          setSkill(testSkill[prev + 1].id)
          form.submit()

          return prev + 1
        })
        setCurrentQuestion(0)
      }
    }
  }

  const handlePrev = () => {
    form.resetFields()
    setIsLoad(true)
    if (currentQuestion > 0)
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1)
        setIsLoad(false)
      }, 250)
  }

  const startTime = moment(eventData?.data.start)
  console.log({ current, testSkill, currentQuestion, question })

  const endTime = moment(eventData?.data.end)
  const duration = moment.duration(endTime.diff(startTime))
  const totalMinutes = duration.asMinutes()
  if (data)
    return (
      <LoadingCustom style={{ height: '50vh' }} tip='Vui lòng chờ...' loading={isLoading}>
        <Header padding={md ? '20px 0' : '70px 0'}>
          <Row justify='space-between' gutter={24} align='middle' className={css.testMain}>
            {!startTest && !finishTest && (
              <>
                <Col span={24} md={12}>
                  <img src={testBg} alt='testBg' width={'100%'} />
                </Col>
                <Col span={24} md={8}>
                  <Space direction='vertical' size='large' align={sm || md || lg ? 'center' : 'start'}>
                    <h1>{event ? event?.name : data.name}</h1>
                    {oldTime && oldTime !== 0 && <TagCustom content='Chưa hoàn thành' color='red'></TagCustom>}
                    <div>
                      <Descriptions size='small' column={1}>
                        <Descriptions.Item label='Số câu hỏi'>
                          <b>{data.countQuestions}</b>
                        </Descriptions.Item>
                        <Descriptions.Item label='Kỹ năng' className={css.sp100}>
                          <TagCustom
                            intColor={['#7555F2', '#F5C046', '#ee723f', '#44c4ab']}
                            intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
                            intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
                            content={data.skillName}
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
            {startTest && time === 0 && testSkill && (
              <>
                <Col span={24} lg={18}>
                  {md && (
                    <Row justify='space-between' align='bottom' className={css.testNav}>
                      <Col>
                        {current === testSkill.length - 1 ? (
                          <ButtonCustom
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            icon={<AiOutlineLeft />}
                            tooltip='Câu trước'
                          ></ButtonCustom>
                        ) : (
                          <ButtonCustom
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            icon={<AiOutlineLeft />}
                            tooltip='Câu trước'
                          ></ButtonCustom>
                        )}
                      </Col>
                      <Col>
                        <CountDownTimer
                          type={md ? 'number' : 'progress'}
                          initTime={testTime}
                          initCountdown={oldTime !== 0 ? (oldTime as unknown as number) : 0}
                          start={!finishTest}
                          size={md ? 20 : 30}
                          localId={event ? event?._id : data._id}
                          callbackTimeEnd={setTime}
                        ></CountDownTimer>
                      </Col>
                      <Col>
                        <ButtonCustom
                          type='primary'
                          onClick={handleNext}
                          icon={current === testSkill.length - 1 ? <></> : <AiOutlineRight />}
                          tooltip={
                            current === testSkill.length - 1
                              ? undefined
                              : question?.length && currentQuestion === question?.length - 1
                              ? 'Kỹ năng tiếp theo'
                              : 'Câu tiếp theo'
                          }
                        >
                          {current === testSkill.length - 1 && 'Nộp bài'}
                        </ButtonCustom>
                      </Col>
                    </Row>
                  )}
                  <Card className={css.testBody}>{testSkill[current]?.content}</Card>
                </Col>
                <Col span={24} lg={6}>
                  {!md && (
                    <Space className={`sp100`} direction='vertical' size='large' align='center'>
                      <CountDownTimer
                        type={sm ? 'number' : 'progress'}
                        initTime={testTime}
                        initCountdown={oldTime !== 0 ? (oldTime as unknown as number) : 0}
                        start={!finishTest}
                        size={sm ? 20 : 30}
                        localId={event ? event?._id : data._id}
                        callbackTimeEnd={setTime}
                      ></CountDownTimer>

                      <Steps
                        current={current}
                        //  onChange={onChange}
                        direction='vertical'
                        items={testSkill}
                      />

                      <Space>
                        <ButtonCustom onClick={handlePrev} disabled={currentQuestion === 0}>
                          Câu trước
                        </ButtonCustom>

                        <ButtonCustom type='primary' onClick={handleNext}>
                          {question && question?.length - 1 > currentQuestion
                            ? 'Câu tiếp theo'
                            : testSkill.length - 1 > current
                            ? 'Kỹ năng tiếp theo'
                            : 'Nộp bài'}
                        </ButtonCustom>
                      </Space>
                    </Space>
                  )}
                </Col>
              </>
            )}

            {finishTest && !loading && (
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
                    <h1>{event?.name}</h1>

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
            {testMutation.isSuccess && results.isLoading && (
              <Col span={24}>
                <Row justify='center'>
                  <Col span={24} md={12}>
                    <img src={loadingBg} alt='loading' width={'85%'} style={{ display: 'block', margin: '0 auto' }} />
                  </Col>
                  <Col span={24}>
                    <LoadingCustom loading={loading} tip='Đang tính toán điểm của bạn! Vui lòng chờ...'>
                      <p style={{ height: 70 }}></p>
                    </LoadingCustom>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Header>
      </LoadingCustom>
    )
  else return <PageResult code={404} desc='Không có bài thi nào' />
}

export default TestPage
