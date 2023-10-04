import React, { useEffect, useRef, useState } from 'react'
import style from './WrapMoreDetail.module.scss'
import Header from '@/components/layout/Header/Header'
import { Button } from 'antd'

type Props = {
  children: React.ReactNode
}

export default function WrapMoreDetail({ children }: Props) {
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
    <div className={style.inCol11}>
      <Header margin={`${!buttonRef ? `0 0 50px 0` : '0'}`} background='none' type='fullsize'>
        <div className={style.App}>
          <div className={`${style.expandableContent} ${expanded ? `${style.expanded}` : ''}`}>
            <div ref={refCon}>{children}</div>
          </div>
          <div hidden={buttonRef} className={`${!expanded ? `${style.blur}` : `${style.blurShow}`}`}>
            <div className={style.flexButton}>
              <Button
                className={style.expandButton}
                onClick={toggleExpand}
                style={{ fontSize: '14px', fontWeight: '700', color: '#000' }}
              >
                {expanded ? '表示件数を減らす' : 'もっと見る'}
              </Button>
            </div>
          </div>
        </div>
      </Header>
    </div>
  )
}
