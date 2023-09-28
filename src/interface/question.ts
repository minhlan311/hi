export interface Choice {
  answer: string
  isCorrect: boolean
  isChosen: boolean
  _id: string
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
  type: string
  point: number
  difficulty: string
  answer?: string
  hint?: string
  explanation?: string
  createdAt: string
  updatedAt: string
  id: string
}
