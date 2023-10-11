import { CategoryState } from './category'
import { UserState } from './user'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EventObject {
  id?: string
  calendarId?: string
  title?: string
  body?: string
  isAllday?: boolean
  start?: Date | string | number | any
  end?: Date | string | number | any
  goingDuration?: number
  comingDuration?: number
  location?: string
  attendees?: string[]
  category?: 'milestone' | 'task' | 'allday' | 'time'
  recurrenceRule?: string
  state?: 'Busy' | 'Free'
  isVisible?: boolean
  isPending?: boolean
  isFocused?: boolean
  isReadOnly?: boolean
  isPrivate?: boolean
  color?: string
  backgroundColor?: string
  dragBackgroundColor?: string
  borderColor?: string
  customStyle?: React.CSSProperties
  raw?: any
}

export interface ClassState {
  _id: string
  createdById: string
  updatedById: string
  _destroy: boolean
  title: string
  description: string
  courseId: string
  students: string[]
  status: string
  plan: string
  startDate: string
  endDate: string
  startAt: string
  endAt: string
  schedules: number[]
  isRepeat: boolean
  createdAt: string
  updatedAt: string
  id: string
  owner: UserState
  categoryId: string
  category: CategoryState
  cost?: number
}
