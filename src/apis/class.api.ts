/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { Class } from '@/types/class.type'

import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
const classApi = {
  getClass(body: any) {
    return http.post<SuccessResponse<Class>>(ENDPOINT.FIND_CLASS_PATH, body)
  },
  createClass(body: any) {
    return http.post<SuccessResponse<Class>>(ENDPOINT.CLASS_PATH, body)
  },
  deleteClass(id: any) {
    return http.delete<SuccessResponse<Class>>(ENDPOINT.CLASS_PATH + id)
  },
  getOneClass(id: any) {
    return http.get<SuccessResponse<Class>>(ENDPOINT.CLASS_PATH + id)
  },
  updateClass(body: any) {
    return http.put<SuccessResponse<Class>>(ENDPOINT.CLASS_PATH + body.id, body)
  },
}

export default classApi
