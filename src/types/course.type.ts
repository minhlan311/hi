/* eslint-disable @typescript-eslint/no-explicit-any */
export type TCourse = {
  data: any
  _id?: string
  createdById: string
  updatedById: string
  _destroy: boolean
  name: string
  coverMedia: string
  descriptions: string
  categoryId: string
  mentorId: string
  status: string
  plan: string
  schedules: number[]
  startDate: string
  cost: number
  startAt: string
  endAt: string
  createdAt: string
  updatedAt: string
  topics: never[]
  countTopics: number
  tests: never[]
  countAssessment: number
  countTests: number
  document?: never[]
  class?: [
    {
      courseId: string
      createdAt: string
      createdById: string
      endAt: string
      endDate: string
      id: string
      schedules: number[]
      startAt: string
      startDate: string
      updatedAt: string
      updatedById: string
      _destroy: boolean
      _id: string
    },
  ]
  mentor?: {
    ccountStatus: string
    avatarUrl: string
    coverUrl: string
    createdAt: string
    email: string
    emailStatus: string
    fullName: string
    group: null
    id: string
    isMentor: boolean
    password: string
    phoneNumber: string
    phoneStatus: string
    referralCode: string
    role: string[]
    updatedAt: string
    _destroy: boolean
    _id: string
  }
  category: {
    _id: string
    parentId: string
    createdById: string
    updatedById: string
    _destroy: boolean
    name: string
    createdAt: string
    updatedAt: string
    slug: string
    id: string
    mentor: {
      _id: string
      fullName: string
      avatarUrl: string
      group: null
    }
    countComments?: number
    owner?: null
    isLocked?: boolean
  }
}

export type CourseForm = {
  id?: string
  categoryId: string
  coverMedia: string
  descriptions: string
  mentorId: string
  name: string
  plan: string
  cost?: number
}

export type Topic = {
  createdAt: string
  createdById: string
  descriptions: string
  id: string
  name: string
  parentId: string
  position: number
  status: string
  updatedAt: string
  updatedById: string
  _destroy: boolean
  _id: string
}
