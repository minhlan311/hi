export type DocumentForm = {
  courseId: string
  description: string
  files: {
    url: string
    type: string
    name: string
  }[]
  isDownloadable: boolean
  lessonId: string
  name: string
  type: string
}
export type Document = {
  avgAssessment: number
  cost: number
  courseId: string
  createdAt: string
  createdById: string
  description: string
  downloaded: number
  educations: never[]
  files: {
    url: string
    type: string
    name: string
  }[]
  id: string
  isDownloadable: boolean
  lessonId: string
  name: string
  plan: string
  type: string
  updatedAt: string
  updatedById: string
  viewed: number
  _destroy: boolean
  _id: string
}

export type ListDocument = Document[]
