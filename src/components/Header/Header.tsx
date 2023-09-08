import React from 'react'
import css from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import { LeftOutlined } from '@ant-design/icons'
type Props = {
  children: React.ReactNode
  title?: string
  titleGoBack?: string
  titleSize?: number
  titleStyle?: React.CSSProperties
  titleTextSecond?: string
  titleTextLink?: string
  titleHref?: string
  boxLink?: boolean
  desc?: string
  descSize?: number
  descWidth?: string | number
  padding?: string | number
  margin?: string | number
  background?: string
  type?: 'fullsize'
  style?: React.CSSProperties
  size?: 'sm' | 'xl'
  theme?: 'dark' | 'light'
}

const Header = (props: Props) => {
  const {
    children,
    title,
    titleGoBack,
    titleSize,
    titleStyle,
    titleTextSecond,
    titleTextLink,
    titleHref,
    boxLink = true,
    desc,
    descSize,
    descWidth,
    padding,
    margin,
    background,
    type,
    style,
    size,
    theme
  } = props
  const navigate = useNavigate()
  return (
    <div
      className={`${css.header} ${type === 'fullsize' && css.bgHeader}`}
      style={{
        padding: padding,
        background: background || `${theme === 'dark' && ' var(--gray)'}`,
        color: theme === 'dark' ? 'var(--white)' : undefined,
        margin: margin,
        ...style
      }}
    >
      <div className={`container ${(size === 'xl' && 'container2') || (size === 'sm' && 'container3')}`}>
        {title && (
          <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
            {title}
          </div>
        )}
        {titleGoBack && (
          <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
            <ButtonCustom
              icon={<LeftOutlined style={{ fontSize: 25 }} />}
              type='text'
              onClick={() => navigate(-1)}
            ></ButtonCustom>
            {titleGoBack}
          </div>
        )}
        <p className={css.titleSecond}>
          {titleTextLink && (
            <span>
              {boxLink && '「'}
              {<Link to={`${titleHref || '/'}`}>{titleTextLink}</Link>}
              {boxLink && '」'}
            </span>
          )}
          {titleTextSecond && <span>{titleTextSecond}</span>}{' '}
        </p>
        {desc && (
          <div className={css.desc} style={{ fontSize: descSize, width: descWidth }}>
            {desc}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Header
