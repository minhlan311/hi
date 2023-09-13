import React, { memo } from 'react'
import { Breadcrumb } from 'antd'

import './styles.scss'

const BreadCrumb = (props) => {
  const { breadcrumbData } = props
  return (
    <div className='breadcrumb-container'>
      <Breadcrumb>
        {breadcrumbData.map((item) => {
          return (
            <Breadcrumb.Item key={item.id} style={item.style} onClick={item.action}>
              {item.title}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </div>
  )
}

export default memo(BreadCrumb)
