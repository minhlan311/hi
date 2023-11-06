/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'

type Props = {
  questionTextForm: React.Dispatch<React.SetStateAction<string>>
  choose: React.Dispatch<React.SetStateAction<any[]>>
}

const CreateQuestion: React.FC<Props> = ({ questionTextForm, choose }) => {
  const [form] = Form.useForm()
  const [questionText, setQuestionText] = useState<string>('')
  const [answers, setAnswers] = useState<Array<{ answer: string }>>([])

  useEffect(() => {
    questionTextForm(questionText)
  }, [questionText, questionTextForm])

  useEffect(() => {
    choose(answers)
  }, [answers, choose])

  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number }>({ start: 0, end: 0 })

  const handleDoubleClick = () => {
    const selectedText = questionText.substring(selectionRange.start, selectionRange.end)

    if (selectedText) {
      const newText = questionText.replace(selectedText, '______')
      setQuestionText(newText)
      setAnswers([...answers, { answer: selectedText }])
    }
  }

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelectionRange({ start: target.selectionStart, end: target.selectionEnd })
  }

  const handleInitialTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value)
  }

  const handleReset = () => {
    form.resetFields(['questions'])
    setQuestionText('')
    setAnswers([])
  }

  return (
    <>
      <Form.Item name='questions' label='Nhập văn bản ban đầu'>
        <Input.TextArea rows={4} onChange={handleInitialTextChange} />
      </Form.Item>

      <Form.Item label='Chỉnh sửa câu hỏi'>
        <Input.TextArea rows={4} value={questionText} onSelect={handleSelect} onDoubleClick={handleDoubleClick} />
      </Form.Item>

      {answers.map((answerObj, index) => (
        <Form.Item key={index}>
          <Input
            value={answerObj.answer}
            placeholder={`Answer ${index + 1}`}
            onChange={(e) =>
              setAnswers(answers.map((ans, idx) => (idx === index ? { ...ans, answer: e.target.value } : ans)))
            }
          />
        </Form.Item>
      ))}

      <Form.Item>
        <Button htmlType='button' onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset
        </Button>
      </Form.Item>
    </>
  )
}

export default CreateQuestion
