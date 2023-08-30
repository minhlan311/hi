import React from 'react'
import Footer from '../../components/layout/Footer'
import Navigation from '../../components/layout/Navigation'
import './styles.scss'
import Banner from './Banner/index'
import SubjectList from './SubjectListing'
import { useMediaQuery } from 'react-responsive'
const Subjects = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    return (
        <>
            <Navigation />
            <div
                className={`${
                    isMobile || isTablet ? 'uc-container-m' : 'uc-container'
                } subject-page`}
                style={{ marginTop: 80 }}
            >
                <Banner />
                <SubjectList />
            </div>
            <Footer />
        </>
    )
}

export default Subjects
