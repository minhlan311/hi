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
  point: number
}
