import { Dropdown as Drop, Space, theme } from 'antd'
import React from 'react'
import type { MenuProps } from 'antd'
import css from './DropdownCustom.module.scss'
import { Link } from 'react-router-dom'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

type Props = {
  children: React.ReactNode
  items?: MenuProps['items']
  title?: string | React.ReactNode
  buttonText?: string
  buttonHref?: string
  buttonType?: 'primary' | 'dashed' | 'link' | 'text' | 'default'
  placement?: 'bottom' | 'bottomLeft' | 'bottomRight'
  trigger?: 'click' | 'hover' | 'contextMenu'
  menuChildren?: React.ReactNode
  arrow?: boolean
}

export interface MenuChild {
  childLabel: string | React.ReactNode
  href: string
}

export interface Children {
  label: string | React.ReactNode
  menuChild: MenuChild[]
}

export interface Menu {
  label: string | React.ReactNode
  children?: Children[]
  href?: string
  placement?: 'bottomRight'
}
const { useToken } = theme
const DropdownCustom = (props: Props) => {
  const {
    children,
    items,
    title,
    buttonText,
    buttonHref,
    buttonType,
    placement,
    trigger = 'hover',
    menuChildren,
    arrow = false
  } = props
  const { token } = useToken()
  const menuStyle: React.CSSProperties = {
    // minWidth: 270,
    // minHeight: '90vh'
  }
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary
  }
  return (
    <Drop
      menu={{ items }}
      placement={placement}
      trigger={[trigger]}
      arrow={arrow}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {menu && React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          {(buttonText || title) && (
            <div className={css.dropdownMenu}>
              <Space direction='vertical'>
                {title && <h2 className={css.title}>{title}</h2>}
                {buttonText && buttonHref ? (
                  <Link to={`${buttonHref}`}>
                    <ButtonCustom type={buttonType} className={css.button}>
                      {buttonText}
                    </ButtonCustom>
                  </Link>
                ) : (
                  <ButtonCustom type={buttonType} className={css.button}>
                    {buttonText}
                  </ButtonCustom>
                )}
              </Space>
            </div>
          )}

          {menuChildren && <div className={css.dropdownMenu}>{menuChildren}</div>}
        </div>
      )}
    >
      {children}
    </Drop>
  )
}

export default DropdownCustom
