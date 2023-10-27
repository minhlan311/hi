/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Choice {
  answer: string
  isCorrect: boolean
  isChosen: boolean
  _id: string
}
export interface QuestionType {
  type:
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

export interface QuestionState {
  _id: string
  createdById: string
  updatedById: string
  _destroy: boolean
  categoryId: string
  question: string
  choices: Choice[]
  status: string
  type: QuestionType
  point: number
  difficulty: string
  answer?: string
  hint?: string
  explanation?: any
  createdAt: string
  updatedAt: string
  id: string
}
