/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { ListSubject } from '@/types/subject.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const subject = {
  filterQuery: {},
  options: {
    pagination: false,
    sort: {
      position: 1,
    },
  },
}

const subjectApi = {
  getNews(body = subject) {
    return http.post<SuccessResponse<ListSubject>>(ENDPOINT.SUBJECT_PATH, body)
  },
}

export default subjectApi
