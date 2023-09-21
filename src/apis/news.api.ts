/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { ListNews } from '@/types/news.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const newsApi = {
  getNews(body: any) {
    return http.post<SuccessResponse<ListNews>>(ENDPOINT.NEWS, body)
  },
}

export default newsApi
