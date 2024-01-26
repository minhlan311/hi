import { CategoryState } from './category'
import { CoursesState } from './courses'
import { EventState } from './event'
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

export interface CourseId {
  _id: string
  name: string
  countStudents: number
  countTopics: number
  countTests: number
  mentor?: any
  category?: any
  avgAssessment: number
  id: string
}

export interface ClassState {
  _id: string
  createdById: string
  updatedById: string
  _destroy: boolean
  title: string
  type: 'ONLINE' | 'OFFLINE'
  limitStudent: number
  startDate: string
  endDate: string
  courseId: string
  students: string[]
  createdAt: string
  updatedAt: string
  owner: UserState
  category?: CategoryState
  id: string
  createdBy: any
  description?: string
  courseData?: CoursesState
  schedules?: string[]
  countStudents: number
  categoryId: string
  studentList: UserState[]
  mentorId: string
  event: EventState
}
