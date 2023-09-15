import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import { AuthResponse } from '@/types/auth.type'
import { Register } from '@/types/mentor.type'
import { RegisterMentor } from '@/types/mentor.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const examApi = {
  registerAccount(body: Register) {
    return http.post<AuthResponse>(ENDPOINT.REGISTER, body)
  },
  registerMentor(body: RegisterMentor) {
    return http.post<AuthResponse>(ENDPOINT.MENTOR, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(ENDPOINT.LOGIN, body)
  },
  logout() {
    return http.post(ENDPOINT.LOGOUT)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forgot(data: any) {
    return http.post<SuccessResponse<UserState[]>>(ENDPOINT.LOGIN, data)
  }
}

export default examApi
