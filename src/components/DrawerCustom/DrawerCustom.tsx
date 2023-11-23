import React from 'react'
import { Drawer, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import css from './DrawerCustom.module.scss'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
type Props = {
  children: React.ReactNode
  title?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  open: boolean
  onClose: () => void
  width?: string | number
}

const DrawerCustom = (props: Props) => {
  const { children, title, placement, onClose, open, width } = props

  return (
    <Drawer
      className={css.drawer}
      title={title}
      placement={placement}
      closable={false}
      onClose={onClose}
      open={open}
      width={width}
      extra={
        title ? (
          <Space>
            <ButtonCustom type='primary' onClick={onClose}>
              OK
            </ButtonCustom>
          </Space>
        ) : undefined
      }
    >
      {
        <ButtonCustom
          shape='circle'
          icon={<CloseOutlined />}
          className={`${css.buttonClose} ${!open && css.buttonHidden}`}
          onClick={onClose}
          style={{ padding: 12 }}
        ></ButtonCustom>
      }
      {children}
    </Drawer>
  )
}

export default DrawerCustom
