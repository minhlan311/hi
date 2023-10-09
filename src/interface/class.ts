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
  title: string
  description: string
  start: string
  end: string
  categoryId: string
  students: any[]
  status: string
  weekly: boolean
  plan: string
  cost?: any
  createdAt: string
  updatedAt: string
  category: CategoryState
  course?: any
  courseId?: string
  owner: UserState
  countStudents: number
  id: string
}
