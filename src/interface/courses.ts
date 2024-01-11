/* eslint-disable @typescript-eslint/no-explicit-any */
import { Class } from '@/types/class.type'
import { CategoryState } from './category'
import { UserState } from './user'

export interface CoursesState {
  _id: string
  createdById: string
  updatedById: string
  name: string
  descriptions: string
  categoryId: string
  mentorId: string
  status: string
  plan: string
  createdAt: string
  updatedAt: string
  coverMedia?: string
  coverVideo: string
  class: Class[]
  countStudents?: number
  countTopics: number
  countTests: number
  mentor: UserState
  assessment?: any[]
  countAssessment: number
  category: CategoryState
  avgAssessment?: any
  id?: string
  cost: number
  owner: UserState
  typeCourse: any
}

export interface EnrollsState {
  _id: string
  createdById: string
  updatedById: string
  targetModel: string
  targetId: string
  userId: string
  type: string
  status: string
  createdAt: string
  updatedAt: string
  user: UserState
  activation?: any
  progression?: ProgressionState
  course: CoursesState
  document?: any
  test?: any
  id: string
}
export interface ProgressionState {
  _id: string
  _destroy: boolean
  targetModel: string
  targetModelId: string
  userId: string
  done: any[]
  doing: string
  remains: any[]
  createdAt: string
  updatedAt: string
  id: string
}
