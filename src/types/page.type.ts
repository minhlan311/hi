import { ColumnsType } from 'antd/es/table'

export interface PageData<T> {
  page: number
  limit: number
  totalDocs: number
  docs: T[]
}

export type MyPageTableOptions<S> = ColumnsType<S>
