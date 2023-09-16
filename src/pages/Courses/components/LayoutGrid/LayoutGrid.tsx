/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import style from './LayoutGrid.module.scss'
import { CheckOutlined } from '@ant-design/icons'

export const LayoutGrid = React.forwardRef((item: any, ref: any) => {
  return (
    <div ref={ref} className={style.gridContainer}>
      {item.item?.map((item: any, index: number) => (
        <div key={index} className={style.gridItem}>
          <div>
            <CheckOutlined />
          </div>
          <div>{item}</div>
        </div>
      ))}
    </div>
  )
})
