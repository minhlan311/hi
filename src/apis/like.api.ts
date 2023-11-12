/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { LikeState } from '@/interface/like'

const LikeApi = {
  getFaqs(filterQuery?: any, options?: any, body?: any) {
    const option = {
      pagination: false,
      sort: { createdAt: -1 }
    }

    const payload = {
      filterQuery: filterQuery,
      options: options || option
    }

    return http.post<SuccessResponse<LikeState[]>>(ENDPOINT.FAQ_FIND_PATH, payload || body)
  },
  createLike(body: LikeState) {
    return http.post<SuccessResponse<LikeState>>(ENDPOINT.LIKE_PATH, body)
  },
  updateLike(body: LikeState) {
    return http.put<SuccessResponse<LikeState>>(ENDPOINT.LIKE_PATH + body.id, body)
  },

  deleteLike(id: string) {
    return http.delete<SuccessResponse<LikeState>>(ENDPOINT.LIKE_PATH + id)
  }
}

export default LikeApi
