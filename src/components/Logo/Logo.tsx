import logoDark from '../../assets/icons/svgs/logo-udemy.svg'
import logoLight from '../../assets/icons/svgs/logo-udemy-inverted.svg'
import logoBussiness from '../../assets/icons/svgs/logo-ub.svg'
import { Link } from 'react-router-dom'
type Props = {
  type: 'dark' | 'light' | 'business'
  size?: number
  style?: any
}

const Logo = (props: Props) => {
  const { type, size, style } = props

  return (
    <Link to='/'>
      <img
        src={(type === 'business' && logoBussiness) || (type === 'light' && logoLight) || logoDark}
        alt={type}
        width={size}
        style={style}
      />
    </Link>
  )
}

export default Logo
