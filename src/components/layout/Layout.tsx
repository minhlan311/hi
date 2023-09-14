import { UserState } from '@/interface/user'
import Footer from './Footer'
import css from './Layout.module.scss'

import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
type Props = {
  children?: React.ReactNode
  title?: string
  user?: UserState
}

const Layout = (props: Props) => {
  const { title, user, children } = props

  if (title) {
    document.title = title + ' | Ucam'
  }

  return (
    <div>
      <Navigation user={user} />
      <div className={css.children}>
        {children}
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout
