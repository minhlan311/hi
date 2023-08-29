import React, { memo, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTERS_URL } from '../../constants/routerUrl'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import TestDetail from './TestDetail'
import QuizDetail from './QuizDetail'
import ExamListing from './ExamListing'
import './styles.scss'
import Banner from './Banner'

const ExamplePage = (props) => {
    const history = useHistory()
    const renderPageDetail = useMemo(() => {
        if (
            props.match.params.id &&
            history.location.pathname.includes(ROUTERS_URL.TESTS)
        ) {
            return <TestDetail />
        }
        if (
            props.match.params.id &&
            history.location.pathname.includes(ROUTERS_URL.QUIZZES)
        ) {
            return <QuizDetail id={props.match.params.id} />
        }
    }, [props.match.params.id, history])

    const renderBanner = useMemo(() => {
        if (props.match.params.id) {
            return <></>
        } else {
            return <Banner />
        }
    }, [props.match.params.id])

    return (
        <div className="mtz-exam-container">
            <Navigation />

            {renderBanner}
            <div className="title-exam">Thi thử online miễn phí</div>
            <ExamListing {...props} />
            {renderPageDetail}
            <Footer />
        </div>
    )
}

export default memo(ExamplePage)
