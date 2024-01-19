import { Link } from 'react-router-dom'
import css from './Header.module.scss'
type Props = {
  children: React.ReactNode
  title?: string | React.ReactNode
  titleGoBack?: string
  titleSize?: number
  titleStyle?: React.CSSProperties
  titleTextSecond?: string
  titleTextLink?: string
  titleHref?: string
  boxLink?: boolean
  desc?: string | React.ReactNode
  descSize?: number
  descWidth?: string | number
  padding?: string | number
  margin?: string | number
  background?: string
  type?: 'fullsize'
  style?: React.CSSProperties
  size?: 'sm' | 'xl'
  theme?: 'dark' | 'light'
  backgroundTitle?: string
  styleChild?: React.CSSProperties
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
    backgroundTitle,
    type,
    style,
    size,
    theme,
    styleChild,
  } = props

  return (
    <div
      className={css.header}
      style={{
        ...style,
        padding: padding,
        background: background || `${theme === 'dark' && ' var(--gray)'}`,
        color: theme === 'dark' ? 'var(--white)' : undefined,
        margin: margin,
      }}
    >
      <div
        className={`${type !== 'fullsize' && 'uc-container'} ${
          (size === 'xl' && 'uc-container-2') || (size === 'sm' && 'uc-container-3')
        }`}
        style={styleChild}
      >
        <div
          style={{
            background: backgroundTitle,
          }}
          className={css.typo}
        >
          {desc && (
            <div className={css.desc} style={{ fontSize: descSize, width: descWidth }}>
              {desc}
            </div>
          )}
          {title && (
            <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
              <div>{title}</div>
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
          {titleTextSecond && <span>{titleTextSecond}</span>}
        </div>

        {children}
      </div>
    </div>
  )
}

export default Header
