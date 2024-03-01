import React, { useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import './style.scss'

type Props = {
  children: React.ReactNode
  maxHeight?: number | string
}

export default function WrapMore({ children, maxHeight = '80vh' }: Props) {
  const [expanded, setExpanded] = useState(false)

  const contentStyle: React.CSSProperties = {
    overflow: 'hidden',
    maxHeight: expanded ? 'none' : maxHeight,
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='sp100'>
      <div style={contentStyle}>{children}</div>
      <div className='show-more'>
        {!expanded && <div className='blur'></div>}
        <ButtonCustom onClick={toggleExpand} type='link' className='link' align='center' style={{ width: '100%' }}>
          {expanded ? 'Ẩn bớt' : 'Xem thêm'}
        </ButtonCustom>
      </div>
    </div>
  )
}
