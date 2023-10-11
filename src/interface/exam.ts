/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserState } from './user'

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
  owner: UserState
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
