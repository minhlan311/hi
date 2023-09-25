/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { LessionForm, ListLession } from '@/types/lession.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const lessionApi = {
  createLession(body: LessionForm) {
    return http.post<SuccessResponse<ListLession>>(ENDPOINT.LESSONS_PATH, body)
  },
}

export default lessionApi
