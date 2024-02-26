import { UserState } from '@/interface/user'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import css from './Layout.module.scss'
import MessengerButton from './MessengerButton'
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
      <MessengerButton />
    </div>
  )
}

export default Layout
