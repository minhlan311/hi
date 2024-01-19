export interface LessionState {
  type: 'VIDEO' | 'TEST' | 'LIVE' | 'DOCUMENT'
  _id: string
  position: number
  parentId: string
  createdById: string
  updatedById: string
  name: string
  media: string
  descriptions: string
  length: number
  status: string
  createdAt: string
  updatedAt: string
  countQuestions: number
  countDocuments: number
  id: string
}
