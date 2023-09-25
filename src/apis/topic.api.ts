/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { Topic } from '@/types/course.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const topicApi = {
  getAllTopic(body: any) {
    return http.post<SuccessResponse<Topic>>(ENDPOINT.FIND_TOPIC_PATH, body)
  },
  deleteTopic(id: string) {
    return http.delete<SuccessResponse<Topic>>(ENDPOINT.TOPIC_PATH + id)
  },
  updateTopic(body: Topic) {
    return http.put<SuccessResponse<Topic>>(ENDPOINT.TOPIC_PATH + body.id, body)
  },
}

export default topicApi
