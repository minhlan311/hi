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
  role: string[]
  refreshToken: string
  updatedById: string
}
