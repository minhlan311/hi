/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Class {
  _id?: string
  startDate?: string
  endDate?: string
  courseId?: string
  schedules?: string[]
  startAt?: string
  endAt?: string
  course?: {
    name?: string
  }
}
export interface ClassList {
  _id: string
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
