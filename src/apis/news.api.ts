/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { News } from '@/types/news.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}

const newsApi = {
  findNew(props: Props) {
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

    return http.post<SuccessResponse<News[]>>(ENDPOINT.FIND_NEWS, payload ? payload : data)
  },
  getDetail(id: string) {
    return http.get<News>(ENDPOINT.NEWS_PATH + id)
  },
  getDetailSlug(slug: string) {
    return http.get<News>(ENDPOINT.NEWS_PATH + 'detail/' + slug)
  },
}

export default newsApi
