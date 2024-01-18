/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { TopicState } from '@/interface/topic'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const topicApi = {
  findTopic(props: Props) {
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

    return http.post<SuccessResponse<TopicState[]>>(ENDPOINT.FIND_TOPIC_PATH, payload ? payload : data)
  },

  createTopic(body: TopicState) {
    return http.post<SuccessResponse<TopicState>>(ENDPOINT.TOPIC_PATH, body)
  },

  deleteTopic(id: string) {
    return http.delete<SuccessResponse<TopicState>>(ENDPOINT.TOPIC_PATH + id)
  },
  updateTopic(body: TopicState) {
    return http.put<SuccessResponse<TopicState>>(ENDPOINT.TOPIC_PATH + body.id, body)
  },
}

export default topicApi
