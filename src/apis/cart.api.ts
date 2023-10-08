/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { CategoryState } from '@/interface/category'

const cartApi = {
  getCartList(filterQuery?: any, options?: any, body?: any) {
    const option = {
      pagination: true,
      sort: { createdAt: -1 },
    }

    const payload = {
      filterQuery: filterQuery,
      options: options || option,
    }

    return http.post<SuccessResponse<CategoryState[]>>(ENDPOINT.CART_FIND, payload || body)
  },
  deleteCourseCart(body: any) {
    console.log(body, '====')

    return http.post<any>(ENDPOINT.CART, body)
  },
  addtoCart(body: any) {
    return http.post<any>(ENDPOINT.CART_ADD, body)
  },
}

export default cartApi
