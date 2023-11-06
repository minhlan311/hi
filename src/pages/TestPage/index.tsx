import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import css from './styles.module.scss'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
import Header from '@/components/layout/Header/Header'
import LoadingCustom from '@/components/LoadingCustom'
import PageResult from '@/components/PageResult'
import questionApi from '@/apis/question.api'
import RenderAnswer from './RenderAnswer'
import Score from './Score'
import successBg from '@/assets/images/examimg/hander-pana.png'
import TagCustom from '@/components/TagCustom/TagCustom'
import testBg from '@/assets/images/examimg/online-test.png'
import useResponsives from '@/hooks/useResponsives'
import { AiOutlineLeft, AiOutlineQuestionCircle, AiOutlineRight } from 'react-icons/ai'
import { Card, Col, Descriptions, Form, Row, Space, Steps } from 'antd'
import { Choice, QuestionState } from '@/interface/question'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { TbArrowBack } from 'react-icons/tb'
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
  const [finishTest, setFinishTest] = useState<boolean>(false)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [skill, setSkill] = useState('READING')

  const { sm, md, lg } = useResponsives()
  const { data: testData, isLoading } = useQuery({
    queryKey: ['examData', location],
    queryFn: () => {
      return examApi.getExamDetail(location.state.testId)
    },
  })

  const { data: eventData } = useQuery({
    queryKey: ['eventData'],
    queryFn: () => {
      return eventApi.getOneEvent(location.state.eventId)
    },
  })

  const event = eventData?.data
  const data = testData?.data

  const questions = useQuery({
    queryKey: ['questionData', skill, currentQuestion, data],
    queryFn: () => {
      return questionApi.findQuestion({
        filterQuery: {
          _id: data?.questions,
          skill: skill,
        },
      })
    },
  })

  // const testMutation = useMutation({
  //   mutationFn: (body) => examApi.examSubmit(body),
  // })

  const question = questions?.data?.data?.docs
  const [current, setCurrent] = useState(0)
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
  }, [testData, event, currentQuestion, current])

  const testTime = location.state.testTime + location.state.addTime

  const oldTime = event && localStorage.getItem(event._id as string)

  const [reset, setReset] = useState<boolean>(false)
  const [form] = Form.useForm()
  // useEffect(() => {
  //   setDataUpload({
  //     _id: data && data[0]?._id,
  //     type: 'QUIZZ',
  //     questions: questions,
  //   })
  // }, [questions])

  // const mutate = useMutation({
  //   mutationFn: (body: any) => examApi.examSubmit(body),
  //   onSuccess: (data) => {
  //     // queryClient.invalidateQueries({ queryKey: ['topicLearning'] })
  //     setDataExam(data?.data)
  //   },
  // })

  const onFinish = (val: any) => {
    console.log(val)
  }

  const QuestionItem = ({ type, questionData, questionLength, questionKey }: QuestionRender) => {
    if (questions.isLoading) return <LoadingCustom tip='Vui lòng chờ...' style={{ marginTop: '40vh' }}></LoadingCustom>
    if (questionData)
      return (
        <Space direction='vertical' className={'sp100'}>
          <Row justify='space-between'>
            <Col span={24} sm={5} md={5}>
              <h2>
                Câu: {questionKey + 1} <span style={{ fontSize: 14 }}>/{questionLength}</span>
              </h2>
            </Col>
            <Col span={24} sm={8} md={6}>
              <Space>
                <TagCustom content={type}></TagCustom>
                <TagCustom color='gold' content={questionData.point + ' Điểm'}></TagCustom>
                <ButtonCustom size='small' onClick={() => setReset(true)} icon={<TbArrowBack />}>
                  Làm lại
                </ButtonCustom>
              </Space>
            </Col>
          </Row>

          <p
            className={css.question}
            dangerouslySetInnerHTML={{ __html: questionData.question as unknown as string }}
          ></p>
          {questionData.hint && questionData.hint !== '<p></p>' && (
            <Space>
              <AiOutlineQuestionCircle />
              <div dangerouslySetInnerHTML={{ __html: questionData.hint }}></div>
            </Space>
          )}

          <Form form={form} onFinish={onFinish}>
            <RenderAnswer
              type={
                questionData.type as unknown as
                  | 'SINGLE CHOICE'
                  | 'MULTIPLE CHOICE'
                  | 'TRUE FALSE'
                  | 'SORT'
                  | 'DRAG DROP'
                  | 'LIKERT SCALE'
                  | 'FILL BLANK'
                  | 'MATCHING'
                  | 'NUMERICAL'
                  | 'WRITING'
              }
              choices={questionData.choices as unknown as Choice[]}
              reset={reset}
              setReset={setReset}
            />
          </Form>
        </Space>
      )
    else
      return (
        <EmptyCustom description='Không có câu hỏi nào. Vui lòng làm phần tiếp theo!' style={{ marginTop: '25vh' }} />
      )
  }

  const testSkill = [
    {
      id: 'READING',
      title: 'Đọc',
      description: `${current > 0 ? 'Đã' : 'Chưa'} hoàn thành`,
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
      description: `${current > 1 ? 'Đã' : 'Chưa'} hoàn thành`,
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
      description: `${current > 2 ? 'Đã' : 'Chưa'} hoàn thành`,
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
      description: `${current === 3 && question && currentQuestion === question?.length ? 'Đã' : 'Chưa'} hoàn thành`,
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

  // const onChange = (value: number) => {
  //   setSkill(testSkill[value].id)
  //   setCurrentQuestion(0)
  //   setCurrent(value)
  // }

  const check = question && currentQuestion + 1 < question?.length

  const handleFinish = () => {
    setCurrent(0)
    setCurrentQuestion(0)
    setSkill('')
    setStartTest(false)
    setFinishTest(true)
    if (event) localStorage.removeItem(event._id as string)
  }

  const handleReset = () => {
    setStartTest(true)
    setSkill(testSkill[0].id)
  }

  const handleNext = () => {
    if (check) {
      setCurrentQuestion((prev) => prev + 1)
      form.submit()
    } else if (current === testSkill.length - 1) {
      handleFinish()

      return
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
        <Header padding={md ? '20px 0' : '70px 0'}>
          <Row justify='space-between' gutter={24} align='middle' className={css.testMain}>
            {(startTest && (
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
                          initCountdown={oldTime !== '0' ? (oldTime as unknown as number) : 0}
                          start={startTest}
                          size={md ? 20 : 30}
                          localId={event._id}
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
                  <Card className={css.testBody}>{testSkill[current].content}</Card>
                </Col>
                <Col span={24} lg={6}>
                  {!md && (
                    <Space className={` sp100`} direction='vertical' size='large' align='center'>
                      <CountDownTimer
                        type={sm ? 'number' : 'progress'}
                        initTime={testTime}
                        initCountdown={oldTime !== '0' ? (oldTime as unknown as number) : 0}
                        start={startTest}
                        size={sm ? 20 : 30}
                        localId={event._id}
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
                          {current === testSkill.length - 1
                            ? 'Nộp bài'
                            : question && (question.length === 0 || currentQuestion === question.length - 1)
                            ? 'Kỹ năng tiếp theo'
                            : 'Câu tiếp theo'}
                        </ButtonCustom>
                      </Space>
                    </Space>
                  )}
                </Col>
              </>
            )) ||
              (!startTest && !finishTest && (
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
              )) || (
                <>
                  <Col span={24} md={12}>
                    <img src={successBg} alt='successBg' width={'100%'} />
                  </Col>
                  <Col span={24} md={12}>
                    <Space
                      direction='vertical'
                      size='large'
                      align={sm || md || lg ? 'center' : 'start'}
                      className={'sp100'}
                    >
                      <h1>{event?.name}</h1>
                      <Score />
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
