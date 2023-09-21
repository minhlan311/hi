/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MentorInfo {
  _id: string
  _destroy: boolean
  educationType: string
  certificates: string[]
  prizes: any[]
  specializes: any[]
  levels: any[]
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Owner {
  _id: string
  fullName: string
  group?: any
  mentorInfo: MentorInfo
}

export interface ExamState {
  _id: string
  position: number
  createdById: string
  updatedById: string
  subjectId: string
  name: string
  plan: string
  status: string
  type: string
  cost?: any
  slug: string
  questions: any[]
  countQuestions: number
  tested: number
  owner: Owner
  _destroy: boolean
  createdAt: string
  updatedAt: string
  isLocked: boolean
}
