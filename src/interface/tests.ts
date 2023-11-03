export interface Choice {
  id?: string
  _id?: string
  key?: string
  answer: string
  isCorrect: boolean
  isChosen: boolean
  rows?: Choice[]
  cols?: Choice[]
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
