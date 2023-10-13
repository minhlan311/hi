import { ClassState } from './class'

export interface EventState {
  _id: string
  name: string
  description: string
  classId: string
  testId: string
  start: string
  end: string
  status: string
  students: string[]
  createdAt: string
  updatedAt: string
  classData: ClassState
  id: string
}
