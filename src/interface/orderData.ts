interface TypeOrder {
  type?: 'BESS SELLER' | 'REVISION' | 'NEW'
}

export interface CoursesState {
  _id: string
  name: string
  coverUrl?: string
  mentor: string
  type: TypeOrder[] | TypeOrder
  avgRating: number
  countRating: number
  countTime: number
  countCourses: number
  educationType: 'PRYMARY SCHOOL' | 'SECONDARY SCHOOL' | 'HIGH SCHOOL' | 'UNIVESITY'
  cost: number
  discount?: number
}
