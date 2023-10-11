/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'

import http from '@/utils/http'

const enrollsApi = {
  getEnroll(body: any) {
    return http.post(ENDPOINT.ENROLL_PATH_FIND, body)
  },
  createEnroll(body: { targetId: string; targetModel: string; userIds: string[]; type: string }) {
    return http.post(ENDPOINT.ENROLL_PATH, body)
  },
  usersEnroll(body: any) {
    return http.post(ENDPOINT.ENROLL_PATH_USER, body)
  },
}

export default enrollsApi
