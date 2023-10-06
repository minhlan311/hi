import { MentorInfo } from '@/types/mentor.type'

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
  socials: {
    type: string
    url: string
  }[]
}
