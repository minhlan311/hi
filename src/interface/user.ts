import { Class } from '@/types/class.type'
import { MentorInfo } from '@/types/mentor.type'
import { AssessmentState } from './assessment'

export interface UserState {
  _id: string
  fullName: string
  avatarUrl?: string
  coverUrl?: string
  email: string
  phoneNumber: string
  referralCode: string
  accountStatus: string
  emailStatus: string
  phoneStatus: string
  isMentor: boolean
  mentorStatus?: string
  role: string[]
  refreshToken: string
  updatedById: string
  cccd?: string
  educationType?: string
  birthday: string
  mentorInfo: MentorInfo
  classData: Class[]
  socials: {
    type: string
    url: string
  }[]
  createdAt: Date
  descriptions?: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  videoInfoUrl?: string
  countAssessment?: number
  assessment?: AssessmentState
  countCourses?: number
  countStudents: number
}
