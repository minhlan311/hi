import { UserState } from './user'

export interface DetailedAssessment {
  name: string
  evaluate: number
  _id: string
}

export interface AssessmentState {
  _id: string
  createdById: string
  updatedById: string
  _destroy: boolean
  targetId: string
  targetModel: string
  userData: UserState
  description: string
  totalAssessments: number
  detailedAssessments: DetailedAssessment[]
  totalAssessmentsAverages: number
  totalDetailedAverages: DetailedAssessment[]
  createdAt: string
  updatedAt: string
}
