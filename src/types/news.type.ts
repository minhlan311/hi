/* eslint-disable @typescript-eslint/no-explicit-any */
export type News = {
  categoryId: string
  coverUrl: string
  createdAt: string
  createdById: string
  id: string
  title: string
  updatedAt: string
  updatedById: string
  _id: string
  description: any
  content?: any
}
export type ListNews = {
  categoryId: string
  coverUrl: string
  createdAt: string
  createdById: string
  id: string
  title: string
  updatedAt: string
  updatedById: string
  _id: string
  description: string
}[]
