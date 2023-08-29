import { Spin } from 'antd'
import React, { memo } from 'react'
import { STATUS_REQUEST } from '../../../constants'

const SpinComponent = (props) => {
    const { status, children } = props

    if (status === STATUS_REQUEST.LOADING) {
        return <Spin size="">{children}</Spin>
    }
    return <>{children}</>
}

export default memo(SpinComponent)
