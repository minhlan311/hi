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

export type SkillType = 'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING' | string
export interface Skill {
  _id: string
  id: string
  createdById?: string
  categoryId: string
  testId?: string
  skill: SkillType
  title: string
  description: string
  url?: string[]
  questions?: string[]
  countQuestions: number | any
}
export interface ExamState {
  _id: string
  createdById: string
  updatedById: string
  categoryId: string
  name: string
  description: string
  status: string
  slug: string
  owner: UserState
  questions: string[]
  countQuestions: number
  countQuestionsBySkill: number
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
  categoryIdDetail: string
  skill: string[]
  skillName: any[]
  skillData: Skill[]
  coverUrl?: string
  duration?: number
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
