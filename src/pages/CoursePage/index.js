/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Button, Row, Tooltip, Typography } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import { LeftOutlined, UploadOutlined } from '@ant-design/icons'

import Banner from './Banner'
import CourseListing from './CourseListing'
import CourseDetail from './CourseDetail'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'

import './styles.scss'
import { getStorage, removeStorage } from '../../services/storage'
import { SUBJECT_INFO, COURSE_INFO } from '../../constants/storageKeys'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography
const CoursePage = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const history = useHistory()
    const location = useLocation()
    const [courseId, setCourseId] = useState('')

    const subjectId = getStorage(SUBJECT_INFO)?.id
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onGoBack = () => {
        removeStorage(COURSE_INFO)
        removeStorage(SUBJECT_INFO)
        setCourseId('')
        history.push('/courses')
    }

    useEffect(() => {
        if (location?.state?.courseId) {
            setCourseId(location.state.courseId)
        }
        if (location?.state?.subjectId) {
            removeStorage(COURSE_INFO)
            setCourseId('')
        }
    }, [location?.state])

    useEffect(() => {
        if (!location?.state?.courseId && !courseId) {
            setCourseId(getStorage(COURSE_INFO))
        }
    }, [courseId, location?.state?.courseId])
    const [showModalUpload, setShowModalUpload] = useState(false)
    const renderPage = useMemo(() => {
        if (courseId) {
            return (
                <>
                    <div className="mtz-courses-box-title">
                        <Row className="mtz-courses-header mb-15">
                            <div className="prf-d-title ">
                                <Text
                                    className="header-link h3-title"
                                    onClick={onGoBack}
                                >
                                    <LeftOutlined style={{ fontSize: 24 }} />
                                    Tất cả khoá học
                                </Text>
                            </div>
                        </Row>
                        <Row className="mtz-tabs mt-15 mb-15">
                            <CourseDetail courseId={courseId} />
                        </Row>
                    </div>
                </>
            )
        } else if (subjectId) {
            return (
                <>
                    <div className="mtz-courses-box-title">
                        <Row className="mtz-courses-header d-space-flex mb-15">
                            <Text className="h3-title ">
                                Danh sách khóa học
                            </Text>
                        </Row>
                        <Row className="mtz-tabs mt-15 mb-15">
                            <CourseListing subjectId={subjectId} />
                        </Row>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="mtz-courses-box-title">
                        <Row className="mtz-courses-header d-space-flex mb-15">
                            <Text className="h3-title ">
                                Danh sách khóa học
                            </Text>
                        </Row>
                        <Row className="mtz-tabs mt-15 mb-15">
                            <CourseListing subjectId={subjectId} />
                        </Row>
                    </div>
                </>
            )
        }
    }, [courseId, onGoBack, subjectId])
    return (
        <>
            <Navigation />
            <div
                className={`${
                    isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
                } mtz-course-page`}
                style={{ marginTop: 80 }}
            >
                <Banner />

                {renderPage}
            </div>{' '}
            <Footer />
        </>
    )
}
CoursePage.propTypes = {}
export default memo(CoursePage)
