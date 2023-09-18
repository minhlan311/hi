import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import http from '@/utils/http'

const userApi = {
  getUserDetail(id: string) {
    return http.get<UserState>(ENDPOINT.USER_DETAIL_PATH + id)
  }
}

export default userApi
