import { ENDPOINT } from '@/constants/endpoint'
import { AuthResponse } from '@/types/auth.type'
import http from '@/utils/http'

type Register = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  birthDay: string
}
type RegisterMentor = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  birthDay: string
  certificates: string[]
  userId: string
}

const authApi = {
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
  }
}

export default authApi
