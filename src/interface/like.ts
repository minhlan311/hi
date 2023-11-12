/* eslint-disable @typescript-eslint/no-explicit-any */

export interface LikeState {
  targetId: string
  targetType: TargetModelEnum
  userId: string
  type: TypeEnum
  _id?: string
  id?: string
}
export enum TargetModelEnum {
  TOPIC = 'TOPIC',
  COURSE = 'COURSE',
  TEST = 'TEST',
  QUIZ = 'QUIZ',
  DOCUMENT = 'DOCUMENT',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  FAQ = 'FAQ'
}
export enum TypeEnum {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE'
}
