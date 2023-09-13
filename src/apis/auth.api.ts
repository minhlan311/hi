import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
interface Auth {
  account: string
  password: string
}
const authApi = {
  login(data: Auth) {
    return http.post<SuccessResponse<UserState[]>>(ENDPOINT.LOGIN, data)
  },

  forgot(data: Auth) {
    return http.post<SuccessResponse<UserState[]>>(ENDPOINT.LOGIN, data)
  }
}

export default authApi
