import { UserState } from '@/interface/user'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Class {
  createdById: string
  createdBy: any
  _id?: string
  title?: string
  description?: string
  startDate?: string
  endDate?: string
  courseData?: {
    name: string
    _id?: string
  }
  schedules?: string[]
  startAt?: string
  endAt?: string
  courseId?: string
  limitStudent: number
  countStudents: number
  categoryId: string
  students: string[]
  studentList: UserState[]
}
export interface ClassList {
  _id: string
  title?: string
  description?: string
  startDate: string
  endDate: string
  courseId: string
  schedules: string[]
  startAt: string
  endAt: string
  course?: {
    name: string
  }
  docs?: any[]
}
