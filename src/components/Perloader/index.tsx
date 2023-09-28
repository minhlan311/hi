import { Progress, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import Logo from '../Logo/Logo'
import css from './styles.module.scss'
type Props = {
  children: React.ReactNode
}

const Perloader = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)
  const [addLoad, setaddLoad] = useState(false)
  const [percentage, setPercentage] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setaddLoad(true)
    }, 1300)

    const interval = setInterval(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1)
      } else {
        window.addEventListener('load', () => {
          setLoading(false)
        })
        setTimeout(() => {
          setLoading(false)
          clearInterval(interval)
        }, 250)
      }
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, [percentage])
  const conicColors = { '0%': 'var(--red)', '5%': '#ffe58f', '7%': '#ffe58f', '95%': 'var(--green)' }

  if (loading)
    return (
      <div className={`${!loading ? css.preloadFinish : undefined} ${css.preloader}`}>
        <Progress percent={percentage} showInfo={false} size={['100%', 3]} strokeColor={conicColors} />
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
