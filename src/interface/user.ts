/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserState {
  _id: string
  _destroy: boolean
  fullName: string
  avatarUrl: string
  coverImgUrl: string
  email: string
  phoneNumber: string
  referralCode: string
  social: any[]
  accountStatus: string
  emailStatus: string
  phoneStatus: string
  isMentor: boolean
  role: string[]
  subjects: any[]
  fcmToken: string
  walletId: string
  createdAt: string
  updatedAt: string
  refreshToken: string
  updatedById: string
  class: string[]
  mentorStatus: string
  accessToken: string
}
