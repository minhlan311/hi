import { ModelEnum } from '@/pages/MentorPage/Management/Cousers/constants/ultil'

export type Exam = {
  _id: string
  name: string
  plan: string
  countQuestions: number
  tested: number
  status: string
  type: ModelEnum
  educations: string[]
  subjectId: string
}

export type ListExam = Exam[]
