/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { ClassState } from '@/interface/class'
import { CoursesState } from '@/interface/courses'
import { Class } from '@/types/class.type'
import { findUserEnroll } from '@/types/eroll.type'
import { SuccessResponse } from '@/types/utils.type'

import http from '@/utils/http'
const classApi = {
  getClass(body: any) {
    return http.post<SuccessResponse<ClassState[]>>(ENDPOINT.FIND_CLASS_PATH, body)
  },
  createClass(body: any) {
    return http.post<Class>(ENDPOINT.CLASS_PATH, body)
  },
  deleteClass(id: string) {
    return http.delete<SuccessResponse<Class>>(ENDPOINT.CLASS_PATH + id)
  },
  getOneClass(id: string) {
    return http.get<Class>(ENDPOINT.CLASS_PATH + id)
  },
  updateClass(body: any) {
    return http.put<Class>(ENDPOINT.CLASS_PATH + body.id, body)
  },
  arrangeClass(body: { classId: string; userId: string }) {
    return http.post<SuccessResponse<findUserEnroll>>(ENDPOINT.ARRANGE_PATH, body)
  },
  arrangeUpdateClass(body: { classId: string; userId: string }) {
    return http.post<SuccessResponse<findUserEnroll>>(ENDPOINT.ARRANGE_UPDATE_PATH, body)
  },
  openingClass(body: any) {
    return http.post<SuccessResponse<CoursesState[]>>(ENDPOINT.OPENING_PATH, body)
  },
}

export default classApi
