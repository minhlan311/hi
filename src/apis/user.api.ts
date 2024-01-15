/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import { MentorInfo } from '@/types/mentor.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
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
    return http.put<MentorInfo>(ENDPOINT.UPDATE_USER_INFO + body._id, body)
  },
  getMentorDetail(id: string) {
    return http.get<MentorInfo>(ENDPOINT.MENTOR_DETAIL + id)
  },

  createMentor(body: MentorInfo) {
    return http.post<MentorInfo>(ENDPOINT.MENTOR, body)
  },
  updateMentor(body: MentorInfo) {
    return http.put<MentorInfo>(ENDPOINT.MENTOR + body._id, body)
  },
}

export default userApi
