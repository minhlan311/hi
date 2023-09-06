import React, { useCallback, useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import './CourseCalender.scss'
import { ReactComponent as EngSVG } from '../../../assets/icons/eng_flag.svg'
import { ReactComponent as GermanySVG } from '../../../assets/icons/germany_flag.svg'
import { ReactComponent as JapanSVG } from '../../../assets/icons/japan_flag.svg'
import { ReactComponent as KoreaSVG } from '../../../assets/icons/korea_flag.svg'
import { ReactComponent as ChinaSVG } from '../../../assets/icons/china_flag.svg'
import { useDispatch, useSelector } from 'react-redux'
import { subjectsSelector } from '../../../slices/subjects'
import { coursesSelector, getCoursesRequest } from '../../../slices/course'
import ListCourse from './components/ListCourse'
export default function CourseCalender() {
    const dataSubject = useSelector(subjectsSelector)
    const dataCourse = useSelector(coursesSelector)
    const dispatch = useDispatch()
    const ArraySubject = dataSubject?.data
    const [active, setActive] = useState('Tiếng Anh')

    useEffect(() => {
        dispatch(
            getCoursesRequest({
                filterQuery: {
                    subjectId: '64f035c3392ec34d6a972406',
                },
                options: {
                    sort: { downloaded: '-1', viewed: 1 },
                    limit: 10,
                    page: 1,
                },
            })
        )
    }, [])

    const handleActive = useCallback((item, id) => {
        setActive(item)
        dispatch(
            getCoursesRequest({
                filterQuery: {
                    subjectId: id,
                },
                options: {
                    sort: { downloaded: '-1', viewed: 1 },
                    limit: 10,
                    page: 1,
                },
            })
        )
    }, [])

    return (
        <div className="courseCalender-container">
            <div className="container-1200px">
                <p className="text-xs">ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
                <h3>Lịch khai giảng khóa học online</h3>
                <div className="groupButton">
                    {ArraySubject.map((item) => (
                        <Button
                            disabled={
                                dataCourse.status === 'loading' ? true : false
                            }
                            className={
                                active === item.name ? 'buttonActive' : 'button'
                            }
                            onClick={() => {
                                handleActive(item.name, item.id)
                            }}
                        >
                            {item.name === 'Tiếng Anh' ? (
                                <EngSVG />
                            ) : item.name === 'Tiếng Nhật' ? (
                                <JapanSVG />
                            ) : item.name === 'Tiếng Đức' ? (
                                <GermanySVG />
                            ) : item.name === 'Tiếng Hàn' ? (
                                <KoreaSVG />
                            ) : (
                                <ChinaSVG />
                            )}
                            {item.name}
                        </Button>
                    ))}
                </div>
                <ListCourse />
            </div>
        </div>
    )
}
