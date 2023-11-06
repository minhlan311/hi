import { Dayjs } from 'dayjs'
import { ClassState } from './class'
import { UserState } from './user'
import { TestState } from './tests'

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
  createdById: string
  updatedById: string
  name: string
  description: string
  classId: string
  testId: string
  start: string
  end: string
  status: string
  type: string
  students: string[]
  mentorId: string
  createdAt: string
  updatedAt: string
  classData: ClassState
  studentList: UserState
  testData: TestState
  id: string
}

export interface Property {
  name: string
  hasAudio: boolean
  hasVideo: boolean
  outputMode: string
  recordingLayout: string
  resolution: string
  frameRate: number
  shmSize: number
}

export interface RecordState {
  size: number
  duration: number
  id: string
  sessionId: string
  createdAt: number
  url: string
  status: string
  properties: Property
}
