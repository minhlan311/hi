import { Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import Logo from '../Logo/Logo'
import css from './styles.module.scss'
type Props = {
  children: React.ReactNode
}

const Perloader = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)
  const [addLoad, setaddLoad] = useState(false)
  useEffect(() => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      setTimeout(() => {
        setaddLoad(true)
      }, 1300)
    })
  }, [])

  if (loading)
    return (
      <div className={`${!loading && css.preloadFinish} ${css.preloader}`}>
        <Space className={css.logo}>
          <Logo style={{ margin: addLoad ? 0 : undefined }} />
          {addLoad && <Spin delay={200} />}
        </Space>
      </div>
    )
  else if (!loading) {
    return children
  }
}

export default Perloader
