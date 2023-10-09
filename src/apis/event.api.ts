/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { EventState } from '@/interface/event'

import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
const eventApi = {
  getEvent(body: any) {
    return http.post<SuccessResponse<EventState[]>>(ENDPOINT.FIND_EVENT_PATH, body)
  },
  createEvent(body: any) {
    return http.post<EventState>(ENDPOINT.EVENT_PATH, body)
  },
  deleteEvent(id: any) {
    return http.delete<SuccessResponse<EventState>>(ENDPOINT.EVENT_PATH + id)
  },
  getOneEvent(id: any) {
    return http.get<EventState>(ENDPOINT.EVENT_PATH + id)
  },
  updateEvent(body: any) {
    return http.put<EventState>(ENDPOINT.EVENT_PATH + body.id, body)
  },
}

export default eventApi
