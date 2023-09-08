import type { MenuProps } from 'antd'

export type MenuItem = Required<MenuProps>['items'][number]

export interface MenuItemData {
  label: React.ReactNode | string
  key: React.Key
  icon?: React.ReactNode
  children?: MenuItem[]
  type?: string
}
