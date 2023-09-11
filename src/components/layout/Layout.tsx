import Footer from './Footer'
import css from './Layout.module.scss'
import { UserState } from '~/interface/user'

import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
type Props = {
  children?: React.ReactNode
  title?: string
  user?: UserState | null
}

const Layout = (props: Props) => {
  const { title, user, children } = props

  if (title) {
    document.title = title + ' | Udemy'
  }

  const footerData = [
    {
      id: '1',
      name: '法人向けサービスのお問い合わせ',
      href: 'corporate-service-inquiry'
    },
    {
      id: '2',
      name: 'Udemyで教える',
      href: '/teach-on-udemy'
    },
    {
      id: '3',
      name: '会社情報',
      href: '/company-information'
    },
    {
      id: '4',
      name: '採用情報',
      href: '/career-information'
    },
    {
      id: '5',
      name: '出資者',
      href: '/investors'
    },
    {
      id: '6',
      name: '規約',
      href: '/terms-and-conditions'
    },
    {
      id: '7',
      name: 'クッキー設定',
      href: '/cookie-settings'
    },
    {
      id: '8',
      name: 'ヘルプとサポート',
      href: '/help-and-support'
    },
    {
      id: '9',
      name: 'サイトマップ',
      href: '/sitemap'
    },
    {
      id: '10',
      name: 'アクセシビリティに関する声明',
      href: '/accessibility-statement'
    },
    {
      id: '11',
      name: '特定商取引に関する表記',
      href: '/specific-trade-law'
    }
  ]
  return (
    <div>
      <Navigation user={user || undefined} />
      <div className={css.children}>
        {children}
        <Outlet />
      </div>

      <Footer data={footerData} />
    </div>
  )
}

export default Layout
