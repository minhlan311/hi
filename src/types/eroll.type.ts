import { CoursesState } from '@/interface/courses'
import { UserInfo } from './user.type'

export type findUserEnroll = {
  _id: string
  createdById: string
  updatedById: string
  targetModel: string
  targetId: string
  userId: string
  type: string
  status: string
  progressionId: string
  createdAt: string
  updatedAt: string
  user: UserInfo
  activation: null
  progression: {
    _id: string
    _destroy: boolean
    targetModel: string
    targetModelId: string
    userId: string
    done: never[]
    doing: string
    remains: never[]
    createdAt: string
    updatedAt: string
    id: string
  }
  course: CoursesState
  document: null
  test: null
  id: string
}
