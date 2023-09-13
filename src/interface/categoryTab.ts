import { CoursesState } from './coursesData'

export interface CategoryState {
  id: string
  name?: string
  title: string
  href: string
  desc: string
  buttonText: string
  active: boolean
  courses: CoursesState[]
}
