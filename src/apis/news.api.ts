/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { ListNews, News } from '@/types/news.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const newsApi = {
  getNews(body: any) {
    return http.post<SuccessResponse<ListNews>>(ENDPOINT.NEWS, body)
  },
  getOneNews(id: string) {
    return http.get<News>(ENDPOINT.GET_ONE_NEWS + id)
  },
}

export default newsApi
