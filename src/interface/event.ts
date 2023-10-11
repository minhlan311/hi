import { ClassState } from './class'

export interface EventState {
  _id: string
  classId: string
  start: string
  end: string
  status: string
  createdAt: string
  updatedAt: string
  classData: ClassState
  id: string
}
