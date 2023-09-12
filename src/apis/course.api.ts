import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { TCourse } from '@/types/course.type'

const courseApi = {
  getCourses(categoryId?: string) {
    return http.post<SuccessResponse<TCourse[]>>(ENDPOINT.FIND_COURSES_PATH, {
      filterQuery: {
        categoryId: categoryId
      },
      options: {
        limit: 6,
        page: 1
      }
    })
  }
}

export default courseApi
