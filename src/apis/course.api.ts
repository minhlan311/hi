/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { CoursesState } from '@/interface/courses'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}

const courseApi = {
  getCourses(props: Props) {
    const {
      filterQuery = {},
      options = {
        pagination: false,
        sort: { createdAt: -1 },
      },
      payload,
    } = props

    const data = {
      filterQuery: filterQuery,
      options: options,
    }

    return http.post<SuccessResponse<CoursesState[]>>(ENDPOINT.FIND_COURSES_PATH, payload ? payload : data)
  },
  createCourses(body: any) {
    return http.post<SuccessResponse<CoursesState>>(ENDPOINT.COURSES_PATH, body)
  },
  updateCourses(body: any) {
    return http.put<SuccessResponse<CoursesState>>(ENDPOINT.COURSES_PATH + body.id, body)
  },
  deleteCourses(id: string) {
    return http.delete<SuccessResponse<CoursesState>>(ENDPOINT.COURSES_PATH + `${id}`)
  },
  courseDetail(id: string) {
    return http.get<CoursesState>(ENDPOINT.COURSES_PATH + `${id}`)
  },
  getUserErolls(body: any) {
    return http.post<SuccessResponse<CoursesState>>(ENDPOINT.ENROLL_PATH_USER, body)
  },
}

export default courseApi
