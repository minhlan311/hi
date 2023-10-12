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
const examApi = {
  createExam(data: any) {
    return http.post<ExamState>(ENDPOINT.EXAM_PATH, data)
  },
  findExam(props: Props) {
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

    return http.post<SuccessResponse<ExamState[]>>(ENDPOINT.FIND_EXAM_PATH, payload ? payload : data)
  },

  getExamDetail(id: string) {
    return http.get<ExamState>(ENDPOINT.EXAM_PATH + id)
  },

  putExam(data: any) {
    return http.put<ExamState>(ENDPOINT.EXAM_PATH + data.id, data)
  },

  deleteExam(id: string) {
    return http.delete<ExamState>(ENDPOINT.EXAM_PATH + id)
  },
}

export default examApi
