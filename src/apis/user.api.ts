import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import http from '@/utils/http'
import { MentorForm } from '@/pages/Auth/Register/constants'

const userApi = {
  getUserDetail(id: string) {
    return http.get<UserState>(ENDPOINT.USER_DETAIL_PATH + id)
  },
  updateUser(body: UserState) {
    return http.put<MentorForm>(ENDPOINT.UPDATE_USER_INFO + body._id, body)
  },
  updateMentorForm(body: MentorForm) {
    return http.post<MentorForm>(ENDPOINT.MENTOR, body)
  },
}

export default userApi
