export interface Class {
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
}
