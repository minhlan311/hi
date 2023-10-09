/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { CategoryState } from '@/interface/category'

const cartApi = {
  getCartList(body?: any) {
    return http.post<SuccessResponse<CategoryState[]>>(ENDPOINT.CART_FIND, body)
  },
  deleteCourseCart(id: string) {
    return http.delete<any>(ENDPOINT.CART_DELETE_COURSE + id)
  },
  addtoCart(body: any) {
    return http.post<any>(ENDPOINT.CART_ADD, body)
  },
}

export default cartApi
