/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'

import http from '@/utils/http'

const vnpayApi = {
  pay(body: { value: number }) {
    return http.post(ENDPOINT.PAY_PATH, body)
  },
  callback(body: { value: any }) {
    return http.post(ENDPOINT.CALLBACK_PATH, body)
  },

  //
}

export default vnpayApi
