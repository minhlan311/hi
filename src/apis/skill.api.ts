import http from '@/utils/http'
import { ENDPOINT } from '@/constants/endpoint'
import { Skill } from '@/interface/exam'
import { SuccessResponse } from '@/types/utils.type'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const skillApi = {
  getSkillDetail(id: string) {
    return http.get<Skill>(ENDPOINT.SKILL_PATH + id)
  },
  createSkill(data: any) {
    return http.post<Skill>(ENDPOINT.SKILL_PATH, data)
  },
  findSkill(props: Props) {
    const {
      filterQuery = {},
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

    return http.post<SuccessResponse<Skill[]>>(ENDPOINT.FIND_SKILL_PATH, payload ? payload : data)
  },

  putSkill(data: any) {
    return http.put<Skill>(ENDPOINT.SKILL_PATH + data.id, data)
  },

  deleteSkill(id: string) {
    return http.delete<Skill>(ENDPOINT.SKILL_PATH + id)
  },
}

export default skillApi
