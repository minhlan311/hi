export type TCourse = {
  _id: string
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
