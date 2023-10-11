import { Button, Tooltip } from 'antd'
import React from 'react'
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
  tooltip?: string
  danger?: boolean
  linkTarget?: '_self' | '_blank' | '_parent' | '_top'
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
    fontWeight = 400,
    htmlType,
    form,
    children,
    background,
    color,
    tooltip,
    danger,
    linkTarget,
  } = props

  return href ? (
    <Tooltip title={tooltip}>
      {linkTarget ? (
        <Button
          size={size}
          type={type}
          shape={shape}
          disabled={disabled}
          onClick={() => {
            onClick
            window.open(href, linkTarget)
          }}
          className={`${className} ${htmlType === 'submit' ? css.submitButton : null}`}
          style={{ color: color, background: background, fontWeight: fontWeight, ...style }}
          form={form}
          htmlType={htmlType}
          danger={danger}
        >
          <div className={'custom-butt-icon'}>
            {icon} {children}
          </div>
        </Button>
      ) : (
        <Link to={`${href}`}>
          <Button
            size={size}
            type={type}
            shape={shape}
            disabled={disabled}
            onClick={onClick}
            className={`${className} ${htmlType === 'submit' ? css.submitButton : null}`}
            style={{ color: color, background: background, fontWeight: fontWeight, ...style }}
            form={form}
            htmlType={htmlType}
            danger={danger}
          >
            <div className={'custom-butt-icon'}>
              {icon} {children}
            </div>
          </Button>
        </Link>
      )}
    </Tooltip>
  ) : (
    <Tooltip title={tooltip}>
      <Button
        size={size}
        type={type}
        shape={shape}
        disabled={disabled}
        onClick={onClick}
        className={`${className} ${htmlType === 'submit' ? css.submitButton : null}`}
        style={{ fontWeight: fontWeight, ...style }}
        form={form}
        htmlType={htmlType}
        danger={danger}
      >
        <div className={'custom-butt-icon'}>
          {icon} {children}
        </div>
      </Button>
    </Tooltip>
  )
}

export default ButtonCustom
