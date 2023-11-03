/* eslint-disable @typescript-eslint/no-explicit-any */
import questionApi from '@/apis/question.api'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import './Create.scss'

const CreateQuestion = () => {
  const [initialText, setInitialText] = useState<any>('')
  const [questionText, setQuestionText] = useState<any>('')
  const [fullText, setFullText] = useState<any>('')
  const [answers, setAnswers] = useState<any>([])
  const textareaRef = useRef<any>(null)

  const mutate = useMutation({
    mutationFn: (body: any) => questionApi.createQuestion(body),
  })

  // const mutateTest = useMutation({
  //   mutationFn: (body) => questionApi.createQuestion(body),
  // })

  const handleDoubleClick = () => {
    const textarea = textareaRef.current
    const selectedText = textarea?.value?.substring(textarea?.selectionStart, textarea?.selectionEnd)

    if (selectedText) {
      const newText = textarea.value.replace(selectedText, '______')
      setQuestionText(newText)
      setAnswers([...answers, { answer: selectedText }])
    }
  }

  const handleReset = () => {
    setQuestionText(initialText)
    setAnswers([])
    setFullText(initialText)
  }

  const handleAnswerChange = (index: any, value: any) => {
    const newAnswers = [...answers]
    newAnswers[index].answer = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    console.log('Question Text:', questionText)
    console.log('All Answers:', answers)
    console.log('fullText', fullText)
    mutate.mutate({
      categoryId: '64ffe02e746fe5413cf8d1d5',
      choices: answers,
      difficulty: 'EASY',
      explanation: 'adkjdhwak,ựahdn',
      point: 3,
      question: fullText,
      skill: 'READING',
      status: 'ACTIVE',
      type: 'DRAG DROP',
      questionText: questionText,
    })
  }

  return (
    <div className='textarea'>
      <label>
        Nhập văn bản ban đầu:
        <textarea
          style={{
            width: '500px',
            height: '200px',
          }}
          value={initialText}
          onChange={(e) => {
            setInitialText(e.target.value)
            setQuestionText(e.target.value) // Cập nhật cả questionText
            setFullText(e.target.value)
          }}
        />
      </label>
      <br />
      <br />
      <label>
        Chỉnh sửa câu hỏi:
        <textarea
          style={{
            width: '500px',
            height: '200px',
          }}
          ref={textareaRef}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          onDoubleClick={handleDoubleClick}
        />
      </label>
      {answers.map((answerObj: any, index: any) => (
        <div key={index}>
          <input
            value={answerObj?.answer}
            placeholder={`Answer ${index + 1}`}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <br />
      <button onClick={handleReset}>Reset</button>
      {/* <button onClick={handleTest}>Thêm câu hỏi vào bài test</button> */}
    </div>
  )
}

export default CreateQuestion
