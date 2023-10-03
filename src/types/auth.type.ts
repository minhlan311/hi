export type AuthResponse = {
  _id: string
  _destroy: boolean
  fullName: string
  avatarUrl: string
  coverImgUrl: string
  email: string
  phoneNumber: string
  referralCode: string
  social: never[]
  accountStatus: string
  emailStatus: string
  devices: {
    id: string
    browser: string
    os: string
  }[]
  createdAt: string
  updatedAt: string
  refreshToken: string
  groupId: string
  updatedById: string
  accessToken: string
}

export type ChangePassword = {
  oldPassword: string
  password: string
  confirmPassword: string
  id: string
}
// export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>
