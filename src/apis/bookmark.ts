/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}

const bookmarkApi = {
  getBookmark(props: Props) {
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

    return http.post<any>(ENDPOINT.FIND_BOOKMARK_PATH, payload ? payload : data)
  },
  addBookmark(body: { lessonId: string; time: string; note: string }) {
    return http.post<any>(ENDPOINT.ADD_BOOKMARK_PATH, body)
  },
  deleteBookmark(id: string) {
    return http.delete<any>(ENDPOINT.DELETE_BOOKMARK_PATH + id)
  },
}

export default bookmarkApi
