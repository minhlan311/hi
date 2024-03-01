/* eslint-disable @typescript-eslint/no-explicit-any */

import { CategoryState } from './category'
import { QuestionState } from './question'
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
  url?: any | any[]
  questions?: QuestionState[]
  countQuestions: number | any
  prevNum?: number
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
  questions: QuestionState[]
  countQuestions: number
  countQuestionsBySkill: Skill[]
  countSelectedResponseQuestions: number[]
  countConstructedResponseQuestions: number[]
  countUsersTested: number
  usersDoned: any[]
  usersIncompleted: any[]
  id: string
  createdAt: string
  updatedAt: string
  questionsDetail?: QuestionState[]
  type: 'QUIZ' | 'TEST'
  categoryIdDetail: string
  skill: string[]
  skillName: any[]
  skillData: Skill[]
  coverUrl?: string
  duration?: number
  category: CategoryState
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

export interface QuestionSubmit {
  _id: string
  correctAnswers: any | any[]
}

export interface SubmitResults {
  _id: string
  questions: QuestionSubmit[]
  time: number
}
