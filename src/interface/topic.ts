/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Topic {
  id: string
  topicName: string
  href: string
  _id?: string
  studentsEnrolled: string
  lessons?: any
}

export interface TopicList {
  name?: string
  lessons?: any
  id: string
  _id?: string
  category: string
  topics: Topic[]
}
