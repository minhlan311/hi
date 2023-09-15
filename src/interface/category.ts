/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Parent {
  _id: string
  parentId: string
  createdById: string
  updatedById: string
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  description?: string
  coverUrl?: string
  icon?: string
  parent: Parent
  children: CategoryState[]
  countCourse: number
  id: string
}

export interface CategoryState {
  _id: string
  parentId: string
  createdById: string
  updatedById: string
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  description?: string
  coverUrl?: string
  icon?: string
  parent: Parent
  children: CategoryState[]
  countCourse: number
  id: string
}
