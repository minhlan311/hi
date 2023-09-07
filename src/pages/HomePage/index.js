/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { getStorage } from '../../services/storage'
import { USER_INFO } from '../../constants/storageKeys'
import Footer from '../../components/layout/Footer'
import Banner from './Banner'
import Navigation from '../../components/layout/Navigation'
import Cooperate from '../../components/layout/Cooperate'
import AskingQuestion from './AskingQuestion'
import StudyDocuments from './StudyDocument'
import UniversitySubjects from './UniversitySubjects'
import Announcement from './Announcement'
import Exam from './Exam'
import './styles.scss'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getEducationDetailRequest } from '../../slices/education'
import Intro from './Intro'
import TopCourses from './TopCourses'
import VideoContent from './VideoContent/VideoContent'
import News from './News/News'
import CourseCalender from './CourseCalender/CourseCalender'
import { findSubjectRequest } from '../../slices/subjects'
import Mission from './Mission'
import LanguageSystem from './LanguageSystem/LanguageSystem'
import Gift from './Gift/Gift'

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
        dispatch(findSubjectRequest())
    }, [])

    return (
        <div className="mtz-homepage">
            <Navigation />
            <Banner />
            <Intro />
            <Cooperate />
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
