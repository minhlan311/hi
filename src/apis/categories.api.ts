/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { CategoryState } from '@/interface/category'

const categoryApi = {
  getCategories(filterQuery?: any, options?: any, body?: any) {
    const option = {
      pagination: false,
      sort: { createdAt: -1 },
    }

    const payload = {
      filterQuery: filterQuery,
      options: options || option,
    }

    return http.post<SuccessResponse<CategoryState[]>>(ENDPOINT.FIND_CATEGORIES_PATH, payload || body)
  },
  getCategorieDetail(id: string) {
    return http.get<CategoryState>(ENDPOINT.CATEGORIES_PATH + id)
  },
}

export default categoryApi
