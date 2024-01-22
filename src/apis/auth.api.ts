import { ENDPOINT } from '@/constants/endpoint'
import { AuthState } from '@/interface/auth'
import { UserState } from '@/interface/user'
import { AuthResponse, ChangePassword } from '@/types/auth.type'
import { Register, RegisterMentor } from '@/types/mentor.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const authApi = {
  registerAccount(body: Register) {
    return http.post<AuthResponse>(ENDPOINT.REGISTER, body)
  },
  registerMentor(body: RegisterMentor) {
    return http.post<AuthResponse>(ENDPOINT.MENTOR_PATH, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthState>(ENDPOINT.LOGIN, body)
  },
  logout() {
    return http.post(ENDPOINT.LOGOUT)
  },
  changePassword(body: ChangePassword) {
    return http.put(ENDPOINT.CHANGE_PASSWORD + body.id, body)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forgot(username: string) {
    return http.put<SuccessResponse<UserState[]>>(ENDPOINT.FORGOT_PASSWORD + username)
  },
}

export default authApi
