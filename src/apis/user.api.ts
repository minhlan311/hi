import { ENDPOINT } from '@/constants/endpoint'
import { UserInfo } from '@/types/user.type'
import http from '@/utils/http'
import { MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'

const userApi = {
  getInfoUser(id: string) {
    return http.get<UserInfo>(ENDPOINT.GET_USER_INFO + `${id}`)
  },
  updateProfileUser(body: TMentorForm) {
    return http.put<UserInfo>(ENDPOINT.UPDATE_USER_INFO, body)
  }
}

export default userApi
