export interface SuccessResponse<Data> {
  docs?: Data
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: null
  nextPage: null
}
export interface ErrorResponse {
  statusCode: number | string
  message: string
  error: string
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export enum TargetModelEnum {
  TOPIC = 'TOPIC',
  COURSE = 'COURSE',
  TEST = 'TEST',
  QUIZ = 'QUIZ',
  DOCUMENT = 'DOCUMENT',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
}
