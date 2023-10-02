import { Affix } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  type: 'down-hidden' | 'up-hidden' | 'fixed' | 'fixed-bottom'
  animationTime?: number
  hiddenTransform?: number
  hiddenOffsetTop?: number
  offsetTop?: number
  offsetBottom?: number
  zIndex?: number
  style?: React.CSSProperties
}

const AffixCustom = (props: Props) => {
  const {
    children,
    type,
    animationTime = 30,
    hiddenTransform = 50,
    hiddenOffsetTop = 100,
    offsetTop,
    offsetBottom,
    zIndex,
    style,
  } = props
  const [hidden, setHidden] = useState<boolean>(false)

  useEffect(() => {
    if (type === 'down-hidden' || type === 'up-hidden') {
      let prevScrollPosition = window.scrollY

      const handleScroll = () => {
        const currentScrollPosition = window.scrollY
        const check = currentScrollPosition >= hiddenOffsetTop && currentScrollPosition > prevScrollPosition
        setHidden((type === 'down-hidden' && check) || (type === 'up-hidden' && !check))
        prevScrollPosition = currentScrollPosition
      }

      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [type])

  return type === 'fixed-bottom' ? (
    <div style={{ ...style, position: 'fixed', bottom: 0, zIndex: zIndex }}>{children}</div>
  ) : (
    <Affix offsetTop={offsetTop} offsetBottom={offsetBottom}>
      <div
        style={{
          transition: `${animationTime / 100}s`,
          transform: (hidden && `translateY(-${hiddenTransform}px)`) || 'none',
        }}
      >
        {children}
      </div>
    </Affix>
  )
}

export default AffixCustom
