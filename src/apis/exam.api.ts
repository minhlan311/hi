/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const examApi = {
  createExam(data: any) {
    return http.post<SuccessResponse<UserState[]>>(ENDPOINT.EXAM_PATH, data)
  },
  findExam(props: Props) {
    const {
      filterQuery = {},
      options = {
        pagination: false,
        sort: { createdAt: -1 }
      },
      payload
    } = props

    const data = {
      filterQuery: filterQuery,
      options: options
    }
    return http.post<SuccessResponse<any[]>>(ENDPOINT.FIND_EXAM_PATH, payload ? payload : data)
  },
  getExamDetail(id: string) {
    return http.get<SuccessResponse<UserState[]>>(ENDPOINT.FIND_EXAM_PATH + id)
  },
  putExamDetail(id: string, data: any) {
    return http.put<SuccessResponse<UserState[]>>(ENDPOINT.FIND_EXAM_PATH + id, data)
  },
  deleteExamDetail(id: string) {
    return http.delete<SuccessResponse<UserState[]>>(ENDPOINT.FIND_EXAM_PATH + id)
  }
}

export default examApi
