export interface Topic {
  id: string
  topicName: string
  href: string
  studentsEnrolled: string
}

export interface TopicList {
  id: string
  category: string
  topics: Topic[]
}
