import css from './TabsCustom.module.scss'
import { Tabs } from 'antd'
import type { TabsProps as TabType } from 'antd'
import TabProps from '@/interface/tabs'
type TabsItemProps = {
  data: TabProps[]
  defaultActiveKey?: string
  borderBottom?: boolean | null
  labelWeight?: 'bold'
  setting?: TabType
  align?: 'start' | 'end' | 'center'
  onChange?: (e: string) => void
  hideAdd?: boolean
}

const TabsCustom = (props: TabsItemProps) => {
  const {
    data,
    defaultActiveKey,
    borderBottom = true,
    labelWeight,
    setting,
    align = 'start',
    onChange,
    hideAdd = true,
  } = props

  const getItem = (dataArr: TabProps[]) => {
    return dataArr.map((item) => {
      return {
        key: item.id,
        label: item.name,
        children: item.children,
      }
    })
  }

  const items: TabType['items'] = getItem(data)

  return (
    <Tabs
      hideAdd={hideAdd}
      onChange={onChange}
      className={`${!borderBottom && css.unBorderBottom} ${css.borderBottom} ${labelWeight && css.labelWeight} ${
        (align === 'start' && '') || (align === 'end' && css.end) || (align === 'center' && css.center)
      }`}
      defaultActiveKey={defaultActiveKey || data?.[0]?.id}
      items={items}
      {...setting}
    />
  )
}

export default TabsCustom
