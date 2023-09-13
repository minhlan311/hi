/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { Category } from '@/types/category.type'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'

const categoryApi = {
  getCategories(filterQuery?: any) {
    return http.post<SuccessResponse<Category[]>>(ENDPOINT.FIND_CATEGORIES_PATH, {
      filterQuery: filterQuery,
      options: {
        pagination: false,
        sort: { createdAt: -1 }
      }
    })
  }
}

export default categoryApi
