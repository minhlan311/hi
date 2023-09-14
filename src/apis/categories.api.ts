/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { CategoryState } from '@/interface/category'

const categoryApi = {
  getCategories(filterQuery?: any) {
    return http.post<SuccessResponse<CategoryState[]>>(ENDPOINT.FIND_CATEGORIES_PATH, {
      filterQuery: filterQuery,
      options: {
        pagination: false,
        sort: { createdAt: -1 }
      }
    })
  }
}

export default categoryApi
