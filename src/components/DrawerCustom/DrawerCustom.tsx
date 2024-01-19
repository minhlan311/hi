import { CloseOutlined } from '@ant-design/icons'
import { Drawer, Space } from 'antd'
import React from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import css from './DrawerCustom.module.scss'
type Props = {
  children: React.ReactNode
  title?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  open: boolean
  okText?: string
  cancelText?: string
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  onFinish: () => void
  width?: string | number
}

const DrawerCustom = (props: Props) => {
  const { children, title, placement, onClose, onFinish, open, width, okText = 'Ok', cancelText = 'Hủy' } = props

  return (
    <Drawer
      className={css.drawer}
      title={title}
      placement={placement}
      closable={false}
      onClose={() => onClose(!open)}
      open={open}
      width={width}
      extra={
        title ? (
          <Space>
            <ButtonCustom
              onClick={() => {
                onClose(!open)
              }}
            >
              {cancelText}
            </ButtonCustom>
            <ButtonCustom
              type='primary'
              onClick={() => {
                onFinish()
              }}
            >
              {okText}
            </ButtonCustom>
          </Space>
        ) : undefined
      }
    >
      <ButtonCustom
        shape='circle'
        icon={<CloseOutlined />}
        className={`${css.buttonClose} ${!open && css.buttonHidden}`}
        onClick={() => {
          onClose(!open)
          onFinish()
        }}
        style={{ padding: 12 }}
      ></ButtonCustom>

      {children}
    </Drawer>
  )
}

export default DrawerCustom
