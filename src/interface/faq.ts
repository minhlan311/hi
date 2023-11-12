/* eslint-disable @typescript-eslint/no-explicit-any */

import { CategoryState } from './category'
import { LikeState } from './like'
import { UserState } from './user'

export interface FaqSate {
  id: string
  files: string[]
  title: string
  content: string
  category: CategoryState
  answers?: AnswerState[]
  createdAt: string
  user: UserState
  _id: string
  createdById: string
  categoryId: string
  countLike: number
  countDislike: number
  likes: LikeState[]
  dislikes: LikeState[]
}

export interface AnswerState {
  content: string
  user: UserState
  files: string[]
  _id: string
  createdAt: string
  updatedAt: string
  countLike: number
  countDislike: number
  likes: LikeState[]
  dislikes: LikeState[]
}
