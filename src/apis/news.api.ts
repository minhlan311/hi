/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { News } from '@/types/news.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const newsApi = {
  findNew(body: any) {
    return http.post<SuccessResponse<News[]>>(ENDPOINT.NEWS, body)
  },
  getDetail(id: string) {
    return http.get<News>(ENDPOINT.GET_ONE_NEWS + id)
  },
  getDetailSlug(slug: string) {
    return http.get<News>(ENDPOINT.GET_ONE_NEWS + 'detail/' + slug)
  },
}

export default newsApi
