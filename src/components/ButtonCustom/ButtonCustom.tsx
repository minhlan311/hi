import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import css from './ButtonCustom.module.scss'
type Props = {
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text'
  icon?: React.ReactNode
  href?: string
  size?: 'small' | 'middle' | 'large' | undefined
  shape?: 'default' | 'circle' | 'round'
  disabled?: boolean
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  fontWeight?: string | number
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  form?: string
  children?: React.ReactNode
  background?: string
  color?: string
}

const ButtonCustom = (props: Props) => {
  const {
    type,
    icon,
    href,
    size,
    shape,
    disabled,
    onClick,
    className,
    style,
    fontWeight = 700,
    htmlType,
    form,
    children,
    background,
    color
  } = props
  return href ? (
    <Link to={`${href}`}>
      <Button
        icon={icon}
        size={size}
        type={type}
        shape={shape}
        disabled={disabled}
        onClick={onClick}
        className={`${className} ${htmlType === 'submit' ? css.submitButton : null}`}
        style={{ color: color, background: background, fontWeight: fontWeight, ...style }}
        form={form}
        htmlType={htmlType}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <Button
      icon={icon}
      size={size}
      type={type}
      shape={shape}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${htmlType === 'submit' ? css.submitButton : null}`}
      style={{ fontWeight: fontWeight, ...style }}
      form={form}
      htmlType={htmlType}
    >
      {children}
    </Button>
  )
}

export default ButtonCustom
