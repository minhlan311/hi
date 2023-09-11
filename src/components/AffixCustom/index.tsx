import { Affix } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  type: 'down-hidden' | 'up-hidden'
  animationTime?: number
  hiddenTransform?: number
  hiddenOffsetTop?: number
  offsetTop?: number
  offsetBottom?: number
}

const AffixCustom = (props: Props) => {
  const {
    children,
    type,
    animationTime = 30,
    hiddenTransform = 50,
    hiddenOffsetTop = 100,
    offsetTop,
    offsetBottom
  } = props
  const [hidden, setHidden] = useState<boolean>(false)
  useEffect(() => {
    let prevScrollPosition = window.scrollY
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY
      const check = currentScrollPosition >= hiddenOffsetTop && currentScrollPosition > prevScrollPosition

      setHidden((type === 'down-hidden' && check) || (type === 'up-hidden' && !check))
      prevScrollPosition = currentScrollPosition
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <Affix offsetTop={offsetTop} offsetBottom={offsetBottom}>
      <div
        style={{
          transition: `${animationTime / 100}s`,
          transform: (hidden && `translateY(-${hiddenTransform}px)`) || 'none'
        }}
      >
        {children}
      </div>
    </Affix>
  )
}

export default AffixCustom
