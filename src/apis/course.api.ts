/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { TCourse } from '@/types/course.type'
type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const courseApi = {
  getCourses(props: Props) {
    const {
      filterQuery = { categoryId: '64ffe02e746fe5413cf8d1d5' },
      options = {
        pagination: false,
        sort: { createdAt: -1 }
      },
      payload
    } = props

    const data = {
      filterQuery: filterQuery,
      options: options
    }
    return http.post<SuccessResponse<TCourse[]>>(ENDPOINT.FIND_COURSES_PATH, payload ? payload : data)
  },
  deleteCourses(ids: string) {
    return http.delete<SuccessResponse<TCourse>>(ENDPOINT.COURSES_PATH + `${ids}`)
  },
  getOneCourse(ids: string) {
    return http.get<TCourse>(ENDPOINT.COURSES_PATH + `${ids}`)
  }
}

export default courseApi
