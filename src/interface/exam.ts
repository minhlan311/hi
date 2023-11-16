/* eslint-disable @typescript-eslint/no-explicit-any */

import { Question } from '@/types/question.type'
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
export interface Skill {
  skillName: 'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING'
  description: string
  url?: string[]
}
export interface ExamState {
  _id: string
  createdById: string
  updatedById: string
  categoryId: string
  name: string
  description: string
  status: string
  cost?: any
  slug: string
  owner: UserState
  questions: string[]
  countQuestions: number
  countSelectedResponseQuestions: number[]
  countConstructedResponseQuestions: number[]
  countUsersTested: number
  usersDoned: any[]
  usersIncompleted: any[]
  id: string
  createdAt: string
  updatedAt: string
  questionsDetail?: Question[]
  type: 'QUIZ' | 'TEST'
  plan: 'FREE' | 'PREMIUM'
  skill: Skill[]
}

export interface InCorrectAnswer {
  _id: string
  incorrectAnswers: string[]
  point: number
}

export interface ExamResultsState {
  _id: string
  testId: string
  userId: string
  point: number
  submitDate: string
  totalCorrectAnswer: number
  inCorrectAnswer: InCorrectAnswer[]
  time: number
  score: any[]
  status: string
  createdAt: string
  updatedAt: string
}
