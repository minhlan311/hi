/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionTypeEnum, StatusEnum } from '@/pages/MentorPage/Management/Cousers/constants/ultil'

export interface IChoice {
  answer: string
  isCorrect: boolean
  isChosen: boolean
}

export type Question = {
  _id: string
  question: string
  point: number
  choices: IChoice[]
  hint: string
  testId: string
  lessonId: string
  explanation: string
  type: QuestionTypeEnum
  name?: any
  status: StatusEnum
}

export type ListQuestion = Question[]
