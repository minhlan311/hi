/* eslint-disable @typescript-eslint/no-explicit-any */
import { Class } from '@/types/class.type'
import { UserState } from './user'
import { CategoryState } from './category'

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
}
