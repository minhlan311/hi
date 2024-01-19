/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { LessionState } from '@/interface/lession'

import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const lessionApi = {
  findLession(props: Props) {
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

    return http.post<SuccessResponse<LessionState[]>>(ENDPOINT.FIND_LESSONS_PATH, payload ? payload : data)
  },
  createLession(body: any) {
    return http.post<SuccessResponse<LessionState>>(ENDPOINT.LESSONS_PATH, body)
  },
  deleteLession(id: string) {
    return http.delete<SuccessResponse<LessionState>>(ENDPOINT.LESSONS_PATH + id)
  },
  updateLession(body: any) {
    return http.put<SuccessResponse<LessionState>>(ENDPOINT.LESSONS_PATH + body.id, body)
  },
}

export default lessionApi
