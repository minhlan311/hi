import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import style from './WrapMore.module.scss'
// import Header from '@/components/Header/Header'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

type Props = {
  children: React.ReactNode
  padding?: string | number
  titleStyle?: CSSProperties
  title: string
  titleSize?: number
  wrapper: 'nonBorder' | 'border'
  maxWidth?: string
  maxHeight?: string
}

export default function WrapMore({
  children,
  // padding = '20px 20px',
  // titleStyle,
  // title,
  // titleSize,
  wrapper,
  maxWidth,
  maxHeight
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const [buttonRef, setButtonRef] = useState(false)
  const refCon = useRef<HTMLDivElement>(null)
  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (refCon.current) {
      const height = refCon.current.clientHeight
      console.log(height)
      if (height > 200) {
        setButtonRef(false)
      } else {
        setButtonRef(true)
      }
    }
  }, [])

  return (
    <div
      style={{
        maxWidth: maxWidth
      }}
      className={wrapper === 'border' ? `${style.wrapper}` : `${style.wrapperNoneBorder}`}
    >
      {/* <Header
        titleSize={titleSize}
        margin={`${!buttonRef ? `0 0 50px 0` : '0'}`}
        background='none'
        type='fullsize'
        padding={padding}
        title={title}
        titleStyle={titleStyle}
      > */}
      <div className={style.App}>
        <div
          style={{
            maxHeight: maxHeight
          }}
          className={`${style.expandableContent} ${expanded ? `${style.expanded}` : ''}`}
        >
          <div ref={refCon}>{children}</div>
        </div>
        <div hidden={buttonRef} className={`${!expanded ? `${style.blur}` : `${style.blurShow}`}`}>
          <div className={style.flexButton}>
            <div>
              <span className={style.expandButton} onClick={toggleExpand}>
                {expanded ? '表示件数を減らす' : 'もっと見る'}
              </span>
            </div>
            {!expanded ? <DownOutlined className={style.icons} /> : <UpOutlined className={style.icons} />}
          </div>
        </div>
      </div>
      {/* </Header> */}
    </div>
  )
}
