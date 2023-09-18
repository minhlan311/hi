/* eslint-disable @typescript-eslint/no-explicit-any */

export type DataFormMentor = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  birthDay: string
  certificates: string[]
  userId: string
  educationType: string
}

export type MentorForm = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  birthDay: string
  certificate?: any
  imageBefore?: any
  imageAfter?: any
  cccd?: number
  educationType?: string
  dilopma?: any
  otherDilopma?: any
  schoolName?: string
}
