import React from 'react'
import Footer from '../../components/layout/Footer'
import Navigation from '../../components/layout/Navigation'
import Course from './Course'
import Document from './Document'
import ProfileInfo from './Profileinfo'
import { useMediaQuery } from 'react-responsive'

export default function Profile() {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    return (
        <>
            {' '}
            <Navigation />
            <div
                className={`${
                    isMobile || isTablet ? 'uc-container-m' : 'uc-container'
                } mtz-profilepage`}
                style={{ marginTop: 80 }}
            >
                <ProfileInfo />

                <Course />

                <Document />
            </div>
            <Footer />
        </>
    )
}
