/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { ExamState } from '@/interface/exam'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const questionApi = {
  createQuestion(data: any) {
    return http.post<ExamState>(ENDPOINT.QUESTION_PATH, data)
  },

  importQuestion(data: any) {
    return http.post<ExamState>(ENDPOINT.IMPORT_QUESTION_PATH, data)
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

    return http.post<SuccessResponse<ExamState[]>>(ENDPOINT.FIND_QUESTION_PATH, payload ? payload : data)
  },

  getQuestionDetail(id: string) {
    return http.get<ExamState>(ENDPOINT.QUESTION_PATH + id)
  },

  putQuestion(data: any) {
    return http.put<ExamState>(ENDPOINT.QUESTION_PATH + data.id, data)
  },

  deleteQuestion(id: string) {
    return http.delete<ExamState>(ENDPOINT.QUESTION_PATH + id)
  },
}

export default questionApi
