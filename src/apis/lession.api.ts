/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { LessionForm, ListLession, Lession } from '@/types/lession.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const lessionApi = {
  createLession(body: LessionForm) {
    return http.post<SuccessResponse<ListLession>>(ENDPOINT.LESSONS_PATH, body)
  },
  deleteLession(id: string) {
    return http.delete<SuccessResponse<ListLession>>(ENDPOINT.LESSONS_PATH + id)
  },
  updateLession(body: Lession) {
    return http.put<SuccessResponse<ListLession>>(ENDPOINT.LESSONS_PATH + body.id, body)
  },
}

export default lessionApi
