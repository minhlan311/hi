import { Popconfirm } from 'antd'
import React from 'react'

type Props = {
  onConfirm: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void | undefined
  children: JSX.Element
  desc?: string
  title?: string
  okText?: string
  cancelText?: string
}

export default function PopConfirmAntd({
  onConfirm,
  children,
  desc,
  title = 'Thông báo',
  okText = 'Đồng ý',
  cancelText = 'Hủy'
}: Props) {
  return (
    <Popconfirm
      destroyTooltipOnHide
      arrow
      title={title}
      description={desc}
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  )
}
