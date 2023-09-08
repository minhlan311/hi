import React from 'react'
import { Menu, Space } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import css from './MenuCustom.module.scss'
import { MenuItemData } from '~/interface/menuItemData'

type Props = {
  items: MenuItemData[]
  header?: React.ReactNode
  defaultOpenKeys?: string
  activeKey?: boolean
  action?: 'callBackItem' | 'render'
  mode?: 'vertical' | 'horizontal' | 'inline'
  theme?: 'dark' | 'light'
  multiple?: boolean
  triggerSubMenuAction?: 'hover' | 'click'
  size?: 'small' | 'default' | 'large' | number
}
const MenuCustom = (props: Props) => {
  const {
    items,
    header,
    defaultOpenKeys,
    activeKey,
    // action,
    mode,
    theme,
    multiple = false,
    triggerSubMenuAction,
    size = 'default'
  } = props
  const location = useLocation()

  const keyActive = items?.find((item) => location.pathname.includes(`${item?.key}`))
  return (
    <Space direction='vertical' className='sp100'>
      {header && header}
      <Menu
        selectedKeys={activeKey ? [`${keyActive?.key}`] : undefined}
        defaultOpenKeys={activeKey ? [`${keyActive?.key}`] : [`${defaultOpenKeys}`]}
        mode={mode}
        theme={theme}
        multiple={multiple}
        className={css.menu}
        triggerSubMenuAction={triggerSubMenuAction}
      >
        {items?.map((item) => (
          <Menu.Item
            key={`${item?.key}`}
            className={css.menuItem}
            style={{
              lineHeight:
                `${(size === 'small' && 32) || (size === 'default' && 38) || (size === 'large' && 50)}px` || size,
              height: (size === 'small' && 32) || (size === 'default' && 38) || (size === 'large' && 50) || size
            }}
          >
            <Link to={`${item?.key}`}>
              <div dangerouslySetInnerHTML={{ __html: `${item?.label}` }}></div>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Space>
  )
}

export default MenuCustom
