export interface CoursesState {
  _id: string
  name: string
  coverUrl?: string
  mentor: string
  type: 'BESS SELLER' | 'REVISION' | 'NEW'
  avgRating: number
  countRating: number
  countTime: number
  countCourses: number
  educationType: 'PRYMARY SCHOOL' | 'SECONDARY SCHOOL' | 'HIGH SCHOOL' | 'UNIVESITY'
  cost: number
  discount?: number
  video?: string
}
