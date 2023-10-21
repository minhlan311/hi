import { Dayjs } from 'dayjs'
import { ClassState } from './class'

export interface EventSchedule {
  id?: string
  calendarId?: string
  title?: string
  body?: string
  start?: Dayjs
  end?: Dayjs
  type?: 'CLASS' | 'TEST' | string
  goingDuration?: number
  comingDuration?: number
  isAllDay?: boolean
  category?: string
  dueDateClass?: string
  location?: string
  attendees?: string[]
  recurrenceRule?: string
  isPending?: boolean
  isFocused?: boolean
  isVisible?: boolean
  isReadOnly?: boolean
  isPrivate?: boolean
  color?: string
  bgColor?: string
  dragBgColor?: string
  borderColor?: string
  customStyle?: string
  raw?: {
    [propName: string]: string | number | boolean | object | null
  }
  state?: string
}
export interface EventState {
  _id: string
  name: string
  description: string
  title: string
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
