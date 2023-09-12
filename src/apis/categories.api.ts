import http from '@/utils/http'
import { Category } from '@/types/category.type'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'

const categoryApi = {
  getCategories() {
    return http.post<SuccessResponse<Category[]>>(ENDPOINT.FIND_CATEGORIES_PATH, {
      filterQuery: {
        parentId: null
      },
      options: {
        pagination: true,
        sort: {
          position: 1
        }
      }
    })
  }
}

export default categoryApi
