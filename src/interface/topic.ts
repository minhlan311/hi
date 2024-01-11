import { CoursesState } from './courses'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Lesson {
  type: string
  _id: string
  position: number
  parentId: string
  createdById: string
  updatedById: string
  _destroy: boolean
  name: string
  descriptions: string
  status: string
  createdAt: string
  updatedAt: string
  test: any[]
  countQuestions: number
  length: number
  id: string
}

export interface TopicState {
  _id: string
  position: number
  parentId: string
  createdById: string
  updatedById: string
  name: string
  descriptions: string
  status: string
  createdAt: string
  updatedAt: string
  lessons: Lesson[]
  course: CoursesState
  countLessons: number
  id: string
}
