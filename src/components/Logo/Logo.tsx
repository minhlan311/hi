import logoDark from '../../assets/logo/logo.svg'
import logoSortDark from '../../assets/logo/logo-sort.svg'
import logoLight from '../../assets/logo/logo-sort-light.svg'
import logoSortLight from '../../assets/logo/logo-sort-light.svg'
import { Link } from 'react-router-dom'
type Props = {
  type?: 'dark' | 'sort-dark' | 'light' | 'sort-light'
  size?: number
  style?: React.CSSProperties
  className?: string
  href?: string
}

const Logo = (props: Props) => {
  const { type = 'dark', size, style, className, href = '/' } = props

  return (
    <Link to={href}>
      <div className={className}>
        <img
          src={
            (type === 'light' && logoLight) ||
            (type === 'sort-light' && logoSortLight) ||
            (type === 'sort-dark' && logoSortDark) ||
            logoDark
          }
          alt={type}
          width={size}
          style={style}
        />
      </div>
    </Link>
  )
}

export default Logo
