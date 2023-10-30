import { QuestionType } from './question'

export interface Choice {
  _id?: string
  key?: string
  answer: string
  isCorrect: boolean
  isChosen: boolean
}

export interface TestState {
  _id: string
  question: string
  choices: Choice[]
  hint: string
  status: string
  type: QuestionType
  point: number
}
