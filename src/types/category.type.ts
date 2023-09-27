/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Category {
  _id: string
  name: string
  slug: string
  parentId: string
  child: any
  children: Category[]
  description: string
}
