/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Diploma {
  image: string
  schoolName: string
}

export interface MentorInfo {
  _id: string
  _destroy: boolean
  educationType: string
  certificates: string[]
  prizes: any[]
  specializes: any[]
  levels: any[]
  imageBefore: string
  imageAfter: string
  userId: string
  diploma: Diploma[]
  createdAt: string
  updatedAt: string
  id: string
}

export interface Owner {
  _id: string
  _destroy: boolean
  fullName: string
  avatarUrl: string
  coverUrl: string
  email: string
  password: string
  birthday: string
  phoneNumber: string
  referralCode: string
  accountStatus: string
  emailStatus: string
  phoneStatus: string
  isMentor: boolean
  role: string[]
  mentorStatus: string
  createdAt: string
  updatedAt: string
  refreshToken: string
  updatedById: string
  group?: any
  mentorInfo: MentorInfo
  id: string
}

export interface ExamState {
  _id: string
  createdById: string
  updatedById: string
  categoryId: string
  name: string
  plan: string | number
  status: string
  type: string
  cost?: any
  slug: string
  owner: Owner
  countQuestions: number
  countSelectedResponseQuestions: number[]
  countConstructedResponseQuestions: number[]
  countUsersTested: number
  countUsersDoned: number
  countUsersIncompleted: number
  id: string
  createdAt: string
  updatedAt: string
}
