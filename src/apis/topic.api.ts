/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { Topic } from '@/types/course.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const topicApi = {
  getAllTopic(body: any) {
    return http.post<SuccessResponse<Topic>>(ENDPOINT.FIND_TOPIC_PATH, body)
  },
}

export default topicApi
