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
      filterQuery = { search: '' },
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
  }
}

export default courseApi
