/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import http from '@/utils/http'
import { MentorForm } from '@/pages/Auth/Register/constants'
import { SuccessResponse } from '@/types/utils.type'
type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const userApi = {
  getUserDetail(id: string) {
    return http.get<UserState>(ENDPOINT.USER_DETAIL_PATH + id)
  },
  findUser(props: Props) {
    const {
      filterQuery,
      options = {
        pagination: false,
        sort: { createdAt: -1 },
      },
      payload,
    } = props

    const data = {
      filterQuery: filterQuery,
      options: options,
    }

    return http.post<SuccessResponse<UserState[]>>(ENDPOINT.FIND_USER_PATH, payload ? payload : data)
  },
  updateUser(body: UserState) {
    return http.put<MentorForm>(ENDPOINT.UPDATE_USER_INFO + body._id, body)
  },
  updateMentorForm(body: MentorForm) {
    return http.put<MentorForm>(ENDPOINT.UPDATE_USER_INFO, body)
  },
}

export default userApi
