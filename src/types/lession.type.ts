export type LessionForm = {
  descriptions?: string
  length?: null | number
  media?: string
  name?: string
  parentId: string
}

export type Lession = {
  createdAt: string
  createdById: string
  descriptions: string
  id: string
  length: null
  media: string
  name: string
  parentId: string
  position: number
  status: string
  updatedAt: string
  updatedById: string
  _destroy: boolean
  _id: string
}
export type ListLession = Lession[]
