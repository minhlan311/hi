/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { EnrollsState } from '@/interface/courses'
import { SuccessResponse } from '@/types/utils.type'

import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}

const enrollsApi = {
  findEnroll(props: Props) {
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

    return http.post<SuccessResponse<EnrollsState[]>>(ENDPOINT.FIND_ENROLL_PATH, payload ? payload : data)
  },
  createEnroll(body: EnrollsState) {
    return http.post<SuccessResponse<EnrollsState>>(ENDPOINT.ENROLL_PATH, body)
  },

  usersEnroll(body: EnrollsState) {
    return http.post(ENDPOINT.ENROLL_PATH_USER, body)
  },
}

export default enrollsApi
