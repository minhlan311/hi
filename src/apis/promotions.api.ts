/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { PromotionState } from '@/interface/promotions'
import http from '@/utils/http'

const promotionApi = {
  getPromotion() {
    return http.get<PromotionState>(ENDPOINT.PROMOTION_PATH)
  },
  createPromotion(body: any) {
    return http.post<PromotionState>(ENDPOINT.PROMOTION_PATH, body)
  },
  deletePromotion(id: string) {
    return http.delete<PromotionState>(ENDPOINT.PROMOTION_PATH + id)
  },
  updatePromotion(body: any) {
    return http.put<PromotionState>(ENDPOINT.PROMOTION_PATH + body.id, body)
  },
}

export default promotionApi
