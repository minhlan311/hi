import React from 'react'
import css from './Header.module.scss'
import { Link } from 'react-router-dom'

const Header = (props) => {
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
    backgroundTitle,
    type,
    style,
    size,
    theme,
    styleChild
  } = props

  return (
    <div
      className={`${css.header}`}
      style={{
        padding: padding,
        background: background || `${theme === 'dark' && ' var(--gray)'}`,
        color: theme === 'dark' ? 'var(--white)' : undefined,
        margin: margin,
        ...style
      }}
    >
      <div
        className={`${type !== 'fullsize' && 'uc-container'} ${
          (size === 'xl' && 'uc-container-2') || (size === 'sm' && 'uc-container-3')
        }`}
        style={styleChild}
      >
        <div
          className='d-col-c'
          style={{
            background: backgroundTitle,
            textAlign: 'center'
          }}
        >
          {desc && (
            <div className={css.desc} style={{ fontSize: descSize, width: descWidth }}>
              {desc}
            </div>
          )}
          {title && (
            <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
              <div style={{ maxWidth: 788 }}> {title}</div>
            </div>
          )}
        </div>
        {titleGoBack && (
          <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
            {titleGoBack}
          </div>
        )}
        <div className={css.titleSecond}>
          {titleTextLink && (
            <span>
              {boxLink && '「'}
              {<Link to={`${titleHref || '/'}`}>{titleTextLink}</Link>}
              {boxLink && '」'}
            </span>
          )}
          {titleTextSecond && <span>{titleTextSecond}</span>}{' '}
        </div>

        {children}
      </div>
    </div>
  )
}

export default Header
