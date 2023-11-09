/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { FaqSate } from '@/interface/faq'

const FaqApi = {
  getFaqs(filterQuery?: any, options?: any, body?: any) {
    const option = {
      pagination: false,
      sort: { createdAt: -1 }
    }

    const payload = {
      filterQuery: filterQuery,
      options: options || option
    }

    return http.post<SuccessResponse<FaqSate[]>>(ENDPOINT.FAQ_FIND_PATH, payload || body)
  },
  createFaq(body: FaqSate) {
    return http.post<SuccessResponse<FaqSate>>(ENDPOINT.FAQ_PATH, body)
  },
  getQaDetail(id: string) {
    return http.get<FaqSate>(ENDPOINT.FAQ_PATH + id)
  },
  updateFaq(body: FaqSate) {
    return http.put<SuccessResponse<FaqSate>>(ENDPOINT.FAQ_PATH + body.id, body)
  },

  deleteFaq(id: string) {
    return http.delete<SuccessResponse<FaqSate>>(ENDPOINT.FAQ_PATH + id)
  },

  updateAnswer(body: FaqSate) {
    return http.put<SuccessResponse<FaqSate>>(ENDPOINT.FAQ_PATH_ANSWER + body.id, body)
  },

  deleteAnswer(body: { answerId: string; id: string }) {
    return http.post<SuccessResponse<FaqSate>>(ENDPOINT.FAQ_PATH_ANSWER + body.id, body)
  }
}

export default FaqApi
