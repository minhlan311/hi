import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTERS_URL } from '../../../constants/routerUrl'

import './styles.scss'
import TestList from '../TestList'

const ExampleListing = (props) => {
    const history = useHistory()
    const renderPageTitle = useMemo(() => {
        let label = ''

        if (history.location.pathname.includes(ROUTERS_URL.TESTS)) {
            label = 'Bộ đề Test'
        }
        if (history.location.pathname.includes(ROUTERS_URL.QUIZZES)) {
            label = 'Bộ đề Quiz'
        }
        return label
    }, [history])

    if (props?.match?.params?.id) {
        return null
    }
    return (
        <>
            {history.location.pathname.includes(ROUTERS_URL.TESTS) ? (
                <TestList label={renderPageTitle} testType="TEST" />
            ) : (
                <TestList label={renderPageTitle} testType="QUIZ" />
            )}
        </>
    )
}

export default ExampleListing
