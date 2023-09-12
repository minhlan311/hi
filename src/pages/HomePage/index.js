/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../../components/layout/Footer'
import Mentor from '../../components/layout/Mentor'
import Navigation from '../../components/layout/Navigation'
import { getCategoriesRequest } from '../../slices/category'
import Banner from './Banner'
import CourseCalender from './CourseCalender/CourseCalender'
import Gift from './Gift/Gift'
import Intro from './Intro'
import LanguageSystem from './LanguageSystem/LanguageSystem'
import Mission from './Mission'
import News from './News/News'
import TopCourses from './TopCourses'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'

const HomePage = () => {
    // const userInfo = useMemo(() => getStorage(USER_INFO), [])
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (!userInfo?.accessToken) {
    //         history.push('/login')
    //     }
    // }, [userInfo])
    // const educationId = getStorage('educationId')
    useEffect(() => {
        dispatch(
            getCategoriesRequest({
                filterQuery: {
                    parentId: '64ffde9c746fe5413cf8d1af',
                },
                options: {
                    pagination: false,
                    sort: {
                        position: 1,
                    },
                },
            })
        )
    }, [])

    return (
        <div className="mtz-homepage">
            <Navigation />
            <Banner />
            <Intro />
            <Mentor />
            <TopCourses />
            <Mission />
            <VideoContent />
            <LanguageSystem />
            <Gift />
            <CourseCalender />
            <News />
            <Footer />
        </div>
    )
}

HomePage.propTypes = {}

export default memo(HomePage)
