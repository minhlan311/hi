import React from 'react'
import { Drawer as Draw } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import css from './Drawer.module.scss'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
type Props = {
  children: React.ReactNode
  title?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  open: boolean
  onClose: () => void
}

const Drawer = (props: Props) => {
  const { children, title, placement, onClose, open } = props

  return (
    <Draw className={css.drawer} title={title} placement={placement} closable={false} onClose={onClose} open={open}>
      {
        <ButtonCustom
          shape='circle'
          icon={<CloseOutlined />}
          className={`${css.buttonClose} ${!open && css.buttonHidden}`}
          onClick={onClose}
        ></ButtonCustom>
      }
      {children}
    </Draw>
  )
}

export default Drawer
