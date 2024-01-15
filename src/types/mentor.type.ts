export type Register = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  birthday: string
}
export type RegisterMentor = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  birthDay: string
  certificates: string[]
  userId: string
}

export type MentorInfo = {
  _id: string
  _destroy: boolean
  educationType: string
  certificates: {
    url: string
    name: string
  }[]
  prizes: never[]
  specializes: never[]
  levels: never[]
  userId: string
  createdAt: string
  updatedAt: string
  cccd: string
  diploma: {
    url: string
    name: string
  }[]
  imageAfter: string
  imageBefore: string
  updatedById: string
  showCentificate: string[]
}
