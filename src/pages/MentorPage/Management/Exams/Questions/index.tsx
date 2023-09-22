import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import TagCustom from '@/components/TagCustom/TagCustom'
import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Space } from 'antd'
import { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import css from './styles.module.scss'
import DrawerQuestion from '../Drawer/DrawerQuestion'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'

const MentorQuestions = () => {
  const location = useLocation()
  const examSlug = location.pathname.split('/')[3]
  const { data: exam } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => {
      return examApi.getExamDetail(examSlug)
    },
  })
  const examDetail = exam?.data
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [resetFilter, setResetFilter] = useState<boolean>(false)

  const resetData = () => {
    setResetFilter(true)
    setTimeout(() => {
      setResetFilter(false)
    }, 200)
  }

  const [questions, setQuestions] = useState([
    {
      _id: '1',
      question: 'What is the capital of France?',
      choices: [
        { answer: 'London', isCorrect: false, isChosen: false },
        { answer: 'Berlin', isCorrect: false, isChosen: false },
        { answer: 'Paris', isCorrect: true, isChosen: false },
        { answer: 'Madrid', isCorrect: false, isChosen: false },
      ],
      hint: 'Think of the Eiffel Tower.',
      status: 'active',
      type: 'SINGLE CHOICE',
      point: 5,
    },
    {
      _id: '2',
      question: 'Which of these animals is a mammal?',
      choices: [
        { answer: 'Eagle', isCorrect: false, isChosen: false },
        { answer: 'Shark', isCorrect: false, isChosen: false },
        { answer: 'Dolphin', isCorrect: true, isChosen: false },
        { answer: 'Octopus', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'SINGLE CHOICE',
      point: 10,
    },
    {
      _id: '3',
      question: 'True or False: The Earth is flat.',
      choices: [
        { answer: 'True', isCorrect: false, isChosen: false },
        { answer: 'False', isCorrect: true, isChosen: false },
      ],
      status: 'active',
      type: 'TRUE FALSE',
      point: 5,
    },
    {
      _id: '4',
      question: 'Sort these colors in alphabetical order.',
      choices: [
        { answer: 'Blue', isCorrect: true, isChosen: false },
        { answer: 'Green', isCorrect: true, isChosen: false },
        { answer: 'Red', isCorrect: true, isChosen: false },
      ],
      status: 'active',
      type: 'SORT',
      point: 5,
    },
    {
      _id: '5',
      question: 'Drag and drop the correct answer into the blank space.',
      choices: [
        { answer: 'Apple', isCorrect: true, isChosen: false },
        { answer: 'Banana', isCorrect: false, isChosen: false },
        { answer: 'Cherry', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'DRAG_DROP',
      point: 5,
    },
    {
      _id: '6',
      question: 'Rate your satisfaction with our service from 1 to 5.',
      choices: [
        { answer: '1', isCorrect: false, isChosen: false },
        { answer: '2', isCorrect: false, isChosen: false },
        { answer: '3', isCorrect: false, isChosen: false },
        { answer: '4', isCorrect: false, isChosen: false },
        { answer: '5', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'LIKERT SCALE',
      point: 10,
    },
    {
      _id: '7',
      question: 'Fill in the blank: The ____ is blue.',
      choices: [],
      answer: 'blue',
      hint: "It's a color.",
      status: 'active',
      type: 'FILL BLANK',
      point: 10,
    },
    {
      _id: '8',
      question: 'Match the following countries with their capitals.',
      choices: [
        { answer: 'USA - Washington, D.C.', isCorrect: true, isChosen: false },
        { answer: 'France - Paris', isCorrect: true, isChosen: false },
        { answer: 'Germany - Berlin', isCorrect: true, isChosen: false },
      ],
      status: 'active',
      type: 'MATCHING',
      point: 10,
    },
    {
      _id: '9',
      question: 'What is 2 + 2?',
      answer: '4',
      choices: [],
      hint: "It's a simple math question.",
      status: 'active',
      type: 'NUMERICAL',
      point: 10,
    },
    {
      _id: '10',
      question: 'Write a short paragraph about your favorite book.',
      choices: [],
      answer: '',
      status: 'active',
      type: 'WRITING',
      point: 10,
    },
    {
      _id: '11',
      question: 'What is the capital of Japan?',
      choices: [
        { answer: 'Beijing', isCorrect: false, isChosen: false },
        { answer: 'Seoul', isCorrect: false, isChosen: false },
        { answer: 'Tokyo', isCorrect: true, isChosen: false },
        { answer: 'Bangkok', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'SINGLE CHOICE',
      point: 5,
    },
    {
      _id: '12',
      question: 'Which planet is known as the Red Planet?',
      choices: [
        { answer: 'Mars', isCorrect: true, isChosen: false },
        { answer: 'Venus', isCorrect: false, isChosen: false },
        { answer: 'Jupiter', isCorrect: false, isChosen: false },
        { answer: 'Saturn', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'SINGLE CHOICE',
      point: 10,
    },
    {
      _id: '13',
      question: 'True or False: Water boils at 100 degrees Celsius.',
      choices: [
        { answer: 'True', isCorrect: true, isChosen: false },
        { answer: 'False', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'TRUE FALSE',
      point: 10,
    },
    {
      _id: '14',
      question: 'Sort these animals by their size, from smallest to largest.',
      choices: [
        { answer: 'Ant', isCorrect: true, isChosen: false },
        { answer: 'Elephant', isCorrect: true, isChosen: false },
        { answer: 'Giraffe', isCorrect: true, isChosen: false },
      ],
      status: 'active',
      type: 'SORT',
      point: 10,
    },
    {
      _id: '15',
      question: 'Drag and drop the correct word into the sentence.',
      choices: [
        { answer: 'Fast', isCorrect: true, isChosen: false },
        { answer: 'Slow', isCorrect: false, isChosen: false },
        { answer: 'Loud', isCorrect: false, isChosen: false },
      ],
      status: 'active',
      type: 'DRAG_DROP',
      point: 5,
    },
  ])

  return (
    <Space direction='vertical' className={`${css.quesList} sp100`}>
      <FilterAction
        type='question'
        apiFind={'ádd'}
        callBackData={setQuestions}
        addOnButton={
          <ButtonCustom type='primary' onClick={() => setOpen(true)}>
            Thêm câu hỏi
          </ButtonCustom>
        }
      />

      {questions.length > 0 ? (
        questions.map((item, id) => (
          <Card size='small' key={item._id}>
            <Space direction='vertical' className={'sp100'}>
              <Row justify='space-between'>
                <Col span={24} md={19}>
                  <Space>
                    <h3>Câu {id + 1}: </h3>
                    <TagCustom content={item.type} />
                    <TagCustom color='gold' content={`${item.point} Điểm`} />
                  </Space>
                </Col>
                <Col>
                  <Space size='small'>
                    <ButtonCustom
                      shape='circle'
                      type='text'
                      icon={<AiOutlineEdit className={'ic'} />}
                      size='small'
                    ></ButtonCustom>
                    <ButtonCustom
                      shape='circle'
                      type='text'
                      icon={<AiOutlineDelete className={'ic'} style={{ color: 'var(--red)' }} />}
                      size='small'
                    ></ButtonCustom>
                  </Space>
                </Col>
              </Row>

              <h4>{item.question}</h4>
              <Card size='small' className={css.anws}>
                <Space className={'sp100'}>
                  {item.choices.map((anw) => {
                    if (anw.isCorrect) return <p className={css.isAnswer}>{anw.answer}</p>
                  })}
                  {item.choices.map((anw) => {
                    if (!anw.isCorrect) return <p>{anw.answer}</p>
                  })}
                  {item.answer && item.answer}
                </Space>
              </Card>
              {item.hint && (
                <Space className={`${css.hint} sp100`} align='center'>
                  <AiOutlineQuestionCircle />
                  <p>{item.hint}</p>
                </Space>
              )}
            </Space>
          </Card>
        ))
      ) : (
        <EmptyCustom description='Không có câu hỏi nào'></EmptyCustom>
      )}
      <DrawerQuestion
        open={open}
        setOpen={setOpen}
        resetData={resetData}
        setLoading={setLoading}
        // questionData={questions}
      />
    </Space>
  )
}

export default MentorQuestions
