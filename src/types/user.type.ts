import { Class } from './class.type'

export type UserInfo = {
  _id: string
  _destroy: boolean
  fullName: string
  avatarUrl: string
  coverUrl: string
  email: string
  phoneNumber: string
  referralCode: string
  accountStatus: string
  emailStatus: string
  phoneStatus: string
  isMentor: boolean
  role: string[]
  createdAt: string
  updatedAt: string
  refreshToken: string
  classData?: Class[]
}
