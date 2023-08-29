import { Modal, Form, Steps, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import CourseInfo from './components/courseInfo'
import LessonsList from './components/lessonsList'
import TestList from './components/testList'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import { useDispatch, useSelector } from 'react-redux'
import {
    createCourseDetailSelector,
    createCoursesRequest,
    deleteCourseDetailSelector,
    getCourseDetailRequest,
    getCoursesRequest,
    updateCourseDetailSelector,
    updateCoursesRequest,
} from '../../../slices/course'

export const CreateCoursesModal = ({
    showModalUpload,
    setShowModalUpload,
    courseData,
    type,
    mentorId,
}) => {
    const createCourses = useSelector(createCourseDetailSelector)
    const updateCourses = useSelector(updateCourseDetailSelector)
    const deleteCourses = useSelector(deleteCourseDetailSelector)
    const dispatch = useDispatch()
    const user = getStorage(USER_INFO)

    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const [form] = Form.useForm()

    useEffect(() => {
        if (createCourses.status === 'success') {
            message.success('Tạo khóa học thành công!')
            setTimeout(() => {
                dispatch(getCourseDetailRequest(createCourses?.data?._id))
            }, 200)
        }
    }, [createCourses])

    const [data, setData] = useState({})

    useEffect(() => {
        if (type === 'update') {
            setData(courseData)
        } else if (createCourses?.data) {
            setData(createCourses?.data)
        } else if (type === 'create') {
            setData({})
        }
    }, [createCourses, courseData, type])

    useEffect(() => {
        if (updateCourses.status === 'success') {
            message.success('Cập nhật khóa học thành công!')
            const payload = {
                filterQuery: {
                    status: 'ACTIVE',
                    mentorId: mentorId ? mentorId : undefined,
                },
                options: {
                    pagination: false,
                    sort: {
                        position: 1,
                    },
                },
            }
            dispatch(getCoursesRequest(payload))
        }
    }, [updateCourses])

    useEffect(() => {
        if (deleteCourses.status === 'success') {
            const payload = {
                filterQuery: {
                    mentorId: user._id,
                },
                options: {
                    pagination: false,
                    sort: {
                        position: 1,
                    },
                },
            }
            dispatch(getCoursesRequest(payload))
        }
    }, [deleteCourses])

    useEffect(() => {
        if (data) {
            setTimeout(() => {
                form.setFieldsValue({
                    name: data.name,
                    coverMedia: data.coverMedia,
                    question: data.descriptions,
                    subjectId: data.subjectId,
                    mentorId: user._id,
                    educations: data.educations,
                    status: 'ACTIVE',
                    plan: data.plan,
                    cost: data.cost,
                    educationType: data.subject?.educationType,
                })
            }, 200)
        }
    }, [data, showModalUpload])

    const [current, setCurrent] = useState(0)

    const steps = [
        {
            title: 'Thông tin khóa học',
        },
        {
            title: 'Lộ trình học',
        },
        {
            title: 'Bài kiểm tra',
        },
    ]

    const getCurrentContent = () => {
        return (
            <Steps
                size="small"
                current={current}
                items={steps}
                style={{ marginBottom: 20 }}
            />
        )
    }

    const handleNext = async () => {
        try {
            const formValues = await form.validateFields()

            if (formValues) {
                switch (current) {
                    case 0:
                        if (type === 'update') {
                            const payload = {
                                id: courseData._id,
                                body: formValues,
                            }

                            dispatch(updateCoursesRequest(payload))
                        } else if (type === 'create') {
                            const couserPayload = {
                                name: formValues.name,
                                coverMedia:
                                    formValues?.coverMedia?.file?.response?.url,
                                descriptions: formValues.question,
                                subjectId: formValues.subjectId.value,
                                mentorId: user._id,
                                educations: formValues.educations,
                                status: 'ACTIVE',
                                plan: formValues.plan,
                            }

                            dispatch(createCoursesRequest(couserPayload))
                        }

                        break

                    case 1:
                        break

                    case 2:
                        break
                    default:
                        break
                }
            }

            setCurrent(current + 1)
        } catch (error) {
            console.error('Validation failed:', error)
        }
    }

    const handleCancel = () => {
        if (current > 0) {
            window.location.reload()
        }
        setShowModalUpload(false)
        setCurrent(0)
        form.resetFields()
    }

    const handleFinish = () => {
        setShowModalUpload(false)
        setCurrent(0)
        form.resetFields()
        window.location.reload()
    }

    return (
        <div>
            <Modal
                title={
                    current > 0
                        ? 'Thông tin cơ bản'
                        : type === 'update'
                        ? 'Cập nhật khóa học'
                        : 'Tạo mới khóa học'
                }
                destroyOnClose={true}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy bỏ
                    </Button>,
                    current === 0 ? (
                        <Button key="prev" onClick={handleNext} type="primary">
                            {type === 'update' ? 'Cập nhật' : 'Tạo khóa học'}
                        </Button>
                    ) : current < steps.length - 1 ? (
                        <Button key="next" type="primary" onClick={handleNext}>
                            Tiếp theo
                        </Button>
                    ) : (
                        <Button
                            key="finish"
                            type="primary"
                            onClick={handleFinish}
                        >
                            Hoàn thành
                        </Button>
                    ),
                ]}
                open={showModalUpload}
                width={isMobile ? '96%' : '79%'}
                style={{ zIndex: 1050 }}
            >
                {getCurrentContent()}
                {current === 0 && (
                    <CourseInfo
                        form={form}
                        data={data ? data : []}
                        current={current}
                    />
                )}
                {current === 1 && (
                    <LessonsList
                        coursesId={data?._id}
                        educations={data?.educations}
                    />
                )}
                {current === 2 && <TestList coursesData={data ? data : []} />}
            </Modal>
        </div>
    )
}
