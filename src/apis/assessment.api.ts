/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { AssessmentState } from '@/interface/assessment'
import { SuccessResponse } from '@/types/utils.type'

import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const assessmentApi = {
  createAssessment(data: any) {
    return http.post<AssessmentState>(ENDPOINT.ASSESSMENTS_PATH, data)
  },

  findAssessment(props: Props) {
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

    return http.post<SuccessResponse<AssessmentState[]>>(ENDPOINT.FIND_ASSESSMENTS_PATH, payload ? payload : data)
  },

  getAssessmentDetail(id: string) {
    return http.get<AssessmentState>(ENDPOINT.ASSESSMENTS_PATH + id)
  },

  putAssessment(data: any) {
    return http.put<AssessmentState>(ENDPOINT.ASSESSMENTS_PATH + data.id, data)
  },
}

export default assessmentApi
