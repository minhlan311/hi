import { get } from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './styles.scss'

const GlobalLoading = () => {
    const totalRequestStart = useSelector((state) =>
        get(state, 'loading.totalRequestStart', 0)
    )
    const totalRequestFinish = useSelector((state) =>
        get(state, 'loading.totalRequestFinish', 0)
    )

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(totalRequestStart > totalRequestFinish)
    }, [totalRequestStart, totalRequestFinish])

    return (
        <div
            id="loadingWrapper"
            className={`${!loading ? 'hide-loading' : ''}`}
        >
            <div className="loading-icon">
                <div className="loading-outer"></div>
                <div className="loading-inner"></div>
            </div>
        </div>
    )
}

export default memo(GlobalLoading)
