/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { QuestionState } from '@/interface/question'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const questionApi = {
  createQuestion(data: any) {
    return http.post<QuestionState>(ENDPOINT.QUESTION_PATH, data)
  },

  importQuestion(data: any) {
    return http.post<QuestionState>(ENDPOINT.IMPORT_QUESTION_PATH, data)
  },

  findQuestion(props: Props) {
    const {
      filterQuery = {},
      options = {
        pagination: false,
        sort: { createdAt: -1 },
      },
      payload,
    } = props

    const data = {
      filterQuery: filterQuery,
      options: options,
    }

    return http.post<SuccessResponse<QuestionState[]>>(ENDPOINT.FIND_QUESTION_PATH, payload ? payload : data)
  },

  getQuestionDetail(id: string) {
    return http.get<QuestionState>(ENDPOINT.QUESTION_PATH + id)
  },

  putQuestion(data: any) {
    return http.put<QuestionState>(ENDPOINT.QUESTION_PATH + data.id, data)
  },

  deleteQuestion(id: string) {
    return http.delete<QuestionState>(ENDPOINT.QUESTION_PATH + id)
  },
}

export default questionApi
