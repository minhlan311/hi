/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import http from '@/utils/http'

const configApi = {
  getConfig() {
    return http.get<any>(ENDPOINT.CONFIG_PATH)
  },
}

export default configApi
