/* eslint-disable @typescript-eslint/no-explicit-any */

export type DataFormMentor = {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  phoneNumber?: string
  certificates?: string[]
  userId?: string
  educationType?: string
  birthday?: string
}

export type MentorForm = {
  _id?: string
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
  phoneNumber?: string
  birthday?: string
  certificates?: any
  imageBefore?: any
  imageAfter?: any
  cccd?: number
  educationType?: string
  diploma?: any
  otherDiploma?: any
  schoolName?: string
  coverUrl?: string
  avatarUrl?: string
  userId?: string
}
