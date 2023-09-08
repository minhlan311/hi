import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteCourseDetailSelector,
    deleteCoursesRequest,
    joinCourseRequest,
    joinCourseSelector,
} from '../../../slices/course'

import {
    Collapse,
    Rate,
    Tabs,
    Modal,
    Input,
    Form,
    Button,
    Divider,
    Card,
    message,
    Popover,
    Dropdown,
    Result,
    Badge,
} from 'antd'
import './styles.scss'
import { Link, useHistory } from 'react-router-dom'

import settings from '../../../settings'
import { USER_INFO, COURSE_INFO } from '../../../constants/storageKeys'
import { getStorage, setStorage } from '../../../services/storage'
import {
    getCourseDetailRequest,
    courseDetailSelector,
} from '../../../slices/course'
import documentsImg from '../../../assets/images/documents-page/documents-img3.svg'
import Comments from './Comments'
import Documents from './Documents'
import LearningPaths from './LearningPaths'
import { useMediaQuery } from 'react-responsive'
import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    OrderedListOutlined,
} from '@ant-design/icons'

import axiosInstance from '../../../utils/axios'
import { EXAMS_DETAIL_PATH, JOIN_COURSE_PATH } from '../../../constants/paths'
import Payments from '../../../components/payments'
import ShowProfile from '../../../components/layout/ShowProfile'
import { CreateCoursesModal } from '../CreateCoursesModal'
import {
    deleteTopicsRequest,
    getTopicsRequest,
    topicsSelector,
} from '../../../slices/topics'
import {
    deleteLessonsRequest,
    getLessonsRequest,
    lessonsSelector,
} from '../../../slices/lessons'
import {
    assessmentSelector,
    createAssessmentRequest,
    createAssessmentSelector,
    getAssessmentRequest,
    resetAssessmentState,
} from '../../../slices/assessment'
const CourseDetailPage = ({ courseId }) => {
    const dispatch = useDispatch()
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const course = useSelector(courseDetailSelector)
    const deleteCourse = useSelector(deleteCourseDetailSelector)
    const assessments = useSelector(assessmentSelector)
    const createAssessment = useSelector(createAssessmentSelector)
    const user = getStorage(USER_INFO)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalCodeOpen, setIsModalCodeOpen] = useState(false)
    const joinCourse = useSelector(joinCourseSelector)
    const topics = useSelector(topicsSelector)
    const lessons = useSelector(lessonsSelector)

    const [percent, setPercent] = useState('')
    const [type, setType] = useState('')

    const [data, setData] = useState('')

    const history = useHistory()
    const [error, setError] = useState('')
    useEffect(() => {
        if (joinCourse.status === 'success') {
            message.success('Tham gia khóa học thành công!')
            setIsModalCodeOpen(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }, [joinCourse])

    useEffect(() => {
        if (course?.data?._id && course?.data?.countTopics > 0) {
            const payload = {
                filterQuery: {
                    parentId: course?.data?._id,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getTopicsRequest(payload))
        }
    }, [course])

    useEffect(() => {
        if (topics?.data?._id && topics?.data?.countLessons > 0) {
            const payload = {
                filterQuery: {
                    parentId: topics?.data?._id,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getLessonsRequest(payload))
        }
    }, [course])

    useEffect(() => {
        if (courseId) {
            dispatch(getCourseDetailRequest(courseId))
            setStorage({
                key: COURSE_INFO,
                val: courseId,
            })
        }
    }, [courseId, dispatch])

    useEffect(() => {
        if (course.status === 'success') {
            setData(course.data)
        }
    }, [course])

    useEffect(() => {
        const done = data?.progressions?.done
        if (done) {
            const donePercent = new Intl.NumberFormat('en-IN', {
                maximumSignificantDigits: 1,
            }).format((done.length / data?.countTopics) * 100)
            setPercent(donePercent + '%')
        }
    }, [data?.countTopics, data?.progressions?.done])

    const handelFinish = (value) => {
        axiosInstance
            .post(settings.API_URL + JOIN_COURSE_PATH, {
                targetId: data?._id,
                type: 'STUDENT',
                targetModel: 'COURSE',
                activationCode: value.code,
                userIds: [user?._id],
            })
            .then((r) => {
                window.location.reload()
            })
            .catch((e) => {
                const messageError = 'Mã code không đúng! Vui lòng nhập lại.'
                setError(messageError)
                message.error(messageError)
            })
    }
    const formatNumber = (number) => {
        if (!number) return
        if (number === '100%' || number === '0%') return number
        if (number.includes('%') && typeof number === 'string') {
            let n = number.split('%')[0]
            if (Number(n) === n && n % 1 === 0) {
                return number
            } else {
                return parseFloat(number).toFixed(2) + '%'
            }
        }
    }
    const handelJoinCourse = (e) => {
        e.preventDefault()
        if (data?.isLocked) {
            showModal()
        } else {
            Modal.confirm({
                title: 'Thông báo',
                content: 'Bạn có chắc chắn muốn tham gia khóa học này?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onCancel: () => {},
                onOk: () => {
                    dispatch(
                        joinCourseRequest({
                            targetId: data?._id,
                            type: 'STUDENT',
                            targetModel: 'COURSE',
                            userIds: [user?._id],
                        })
                    )
                },
            })
        }
    }
    const showModal = () => {
        setIsModalOpen(true)
    }

    const onCancel = () => {
        setIsModalCodeOpen(false)
        setIsModalOpen(false)
    }

    const handleCheckTest = (e, id) => {
        e.preventDefault()

        axiosInstance
            .get(`${settings.API_URL}/${EXAMS_DETAIL_PATH}/${id}`)
            .then((res) => {
                if (res?.data?.isLocked) {
                    Modal.success({
                        title: 'Thông báo',
                        content: 'Bạn đã hoàn thành bài kiểm tra này!',
                        okText: 'Đóng',
                    })
                } else {
                    history.push(`/tests/${id}`)
                }
            })
    }
    const [deleCourse, setDeleCourse] = useState(false)

    useEffect(() => {
        if (deleteCourse.status === 'success' && deleCourse) {
            message.success('Xóa khóa học thành công!')

            setTimeout(() => {
                window.location.href = '/mentor/courses'
            }, 1000)
        }
    }, [deleteCourse])
    const [showModalUpload, setShowModalUpload] = useState(false)
    const CourseHeader = () => {
        const items = [
            {
                key: '1',
                label: (
                    <div
                        onClick={() => {
                            setShowModalUpload(true)
                            setType('update')
                        }}
                    >
                        <EditOutlined className="mr-5" /> Chỉnh sửa
                    </div>
                ),
            },

            {
                key: '2',
                label: (
                    <div
                        onClick={() => {
                            setType('delete')
                            if (course?.data?._id) {
                                Modal.confirm({
                                    title: 'Xóa khóa học',
                                    content:
                                        'Bạn có chắc chắn muốn xóa khóa học này?',
                                    okText: 'Xóa',
                                    cancelText: 'Hủy',
                                    onCancel: () => {},
                                    onOk: () => {
                                        dispatch(
                                            deleteCoursesRequest(
                                                course?.data?._id
                                            )
                                        )
                                        if (course?.data?.countTopics > 0)
                                            topics?.data?.map((tp) =>
                                                dispatch(
                                                    deleteTopicsRequest(tp._id)
                                                )
                                            )
                                        if (topics?.data?.countLessons > 0)
                                            lessons?.data?.map((ls) =>
                                                dispatch(
                                                    deleteLessonsRequest(ls._id)
                                                )
                                            )
                                        setDeleCourse(true)
                                    },
                                })
                            }
                        }}
                    >
                        <DeleteOutlined className="mr-5" /> Xóa
                    </div>
                ),

                danger: true,
            },
        ]
        return (
            <>
                <Card
                    style={{ backgroundColor: '#f8fbff', padding: '0 2%' }}
                    className="edu-infor"
                    title={course?.data?.name}
                    size="small"
                    extra={
                        data?.mentor?._id === user?._id ? (
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                            >
                                <Button
                                    icon={<EllipsisOutlined />}
                                    type="text"
                                    size="small"
                                    className="note-more-butt"
                                />
                            </Dropdown>
                        ) : null
                    }
                >
                    <div>
                        Môn học:{' '}
                        <Link to="#">
                            <b>{data?.subject?.name}</b>
                        </Link>
                    </div>

                    <div>
                        Giảng viên:{' '}
                        <Link to="#">
                            {data?.mentor ? (
                                <Popover
                                    content={
                                        <ShowProfile id={data?.mentor?._id} />
                                    }
                                >
                                    <b>{data?.mentor?.fullName}</b>
                                </Popover>
                            ) : (
                                <b>MentorZ</b>
                            )}
                        </Link>
                    </div>
                    {data?.time ? (
                        <div>
                            Thời gian học:{' '}
                            <Link to="#">
                                <b>{data?.time}</b>
                            </Link>
                        </div>
                    ) : null}

                    <p>
                        Số chuyên đề:{' '}
                        <Link to="#">
                            <b>{data?.countTopics}</b>
                        </Link>
                    </p>
                    {data?.progressions ? (
                        <>
                            <div className="d-space-c">
                                <p>Tiến trình hoàn thành</p>
                                <Link style={{ marginBottom: '10px' }}>
                                    <b>{formatNumber(percent)}</b>
                                </Link>
                            </div>

                            <div className="line">
                                <div
                                    className="line-complete"
                                    style={{
                                        width: percent,
                                    }}
                                ></div>
                                <br />
                            </div>
                            {percent !== '100%' ? (
                                <div className="mt-10">
                                    Còn{' '}
                                    <b>
                                        {data?.progressions?.remains?.length +
                                            1}
                                    </b>{' '}
                                    chuyên đề nữa là kết thúc! Cố lên nào!
                                </div>
                            ) : (
                                'Chúc mừng bạn đã hoàn thành khoá học'
                            )}
                        </>
                    ) : data.countTopics > 0 ? (
                        data?.topics?.[0]?.countLessons > 0 ? (
                            <div>
                                {data.progressions ? null : (
                                    <Button
                                        style={{ marginRight: 10 }}
                                        onClick={(e) => handelJoinCourse(e)}
                                        type="primary"
                                    >
                                        <b>Tham gia </b>
                                    </Button>
                                )}
                                khoá học ngay hôm nay để nhận được nhiều ưu đãi
                                từ{' '}
                                <Link to="#">
                                    <b>MentorZ</b>
                                </Link>
                                !
                            </div>
                        ) : (
                            <h4>Khóa học hiện chưa có bài học nào!</h4>
                        )
                    ) : (
                        <h4>Khóa học hiện chưa có lộ trình nào!</h4>
                    )}
                    <Payments
                        data={data}
                        isModalOpen={isModalOpen}
                        onCancel={onCancel}
                        handleCode={() => {
                            setIsModalCodeOpen(true)
                            setIsModalOpen(false)
                        }}
                        targetModel={'COURSE'}
                    ></Payments>
                    <Modal
                        title="Bạn chắc chắn muốn tham gia khóa học này?"
                        open={isModalCodeOpen}
                        footer={null}
                        onCancel={onCancel}
                    >
                        <p>Vui lòng nhập code</p>
                        <Form onFinish={handelFinish}>
                            <Form.Item
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập code',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập code" />
                            </Form.Item>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <Divider />
                            <Form.Item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Button
                                    type="default"
                                    onClick={onCancel}
                                    style={{ marginRight: '10px' }}
                                >
                                    Hủy
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Tiếp tục
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
            </>
        )
    }

    const CollapseCustom = () => {
        const { Panel } = Collapse

        if (data?.progressions) {
            return (
                <Collapse
                    expandIconPosition="end"
                    className="mt-15"
                    style={{ width: '98%' }}
                >
                    <Panel
                        header={
                            <div>
                                <OrderedListOutlined
                                    style={{ marginRight: 5 }}
                                />
                                Làm bài kiểm tra ngay
                            </div>
                        }
                        key="1"
                    >
                        {data?.tests?.length >= 1 ? (
                            data?.tests?.map((test) => (
                                <div
                                    style={{ marginBottom: 10 }}
                                    key={test?._id}
                                >
                                    <Link
                                        style={{
                                            width: '100%',
                                            marginBottom: 10,
                                            fontSize: 14,
                                        }}
                                        onClick={(e) => {
                                            handleCheckTest(e, test?._id)
                                        }}
                                    >
                                        {test?.name}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <>
                                <p>Không có bài kiểm tra</p>
                            </>
                        )}
                    </Panel>
                </Collapse>
            )
        } else {
            return <></>
        }
    }

    const [evaluate, setEvaluate] = useState(5)
    const [checkEvaluate, setCheckEvaluate] = useState(false)

    useEffect(() => {
        if (assessments.status === 'success') {
            const totalEvaluate = assessments?.data?.reduce(
                (sum, person) => sum + person.evaluate,
                0
            )

            setEvaluate(totalEvaluate / assessments?.data?.length)
            assessments?.data?.find((item) =>
                setCheckEvaluate(item.createdById.includes(user._id))
            )
        }
    }, [assessments])
    useEffect(() => {
        if (createAssessment.status === 'success') {
            message.success('Đã gửi đánh giá')
            setCheckEvaluate(true)
            dispatch(resetAssessmentState())
        }
    }, [createAssessment])

    const CourseDetail = () => {
        const handleChangeRate = (val) => {
            const payload = {
                targetModel: 'COURSE',
                targetId: data._id,
                evaluate: parseInt(val),
            }

            dispatch(createAssessmentRequest(payload))
        }

        return (
            <div
                style={
                    isMobile
                        ? null
                        : { display: 'flex', justifyContent: 'space-between' }
                }
            >
                <Card
                    cover={
                        <img
                            src={
                                data?.coverMedia
                                    ? settings.FILE_URL + '/' + data?.coverMedia
                                    : documentsImg
                            }
                            alt="img"
                            className="card-img"
                        />
                    }
                    style={
                        (isMobile && {
                            width: '100%',
                            backgroundColor: '#f8fbff',
                            marginBottom: 15,
                        }) ||
                        (isTablet && {
                            backgroundColor: '#f8fbff',
                            width: '70%',
                        }) || {
                            backgroundColor: '#f8fbff',
                            width: '75%',
                        }
                    }
                    size="small"
                >
                    <div
                        style={
                            isMobile
                                ? { textAlign: 'center' }
                                : {
                                      display: 'flex',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                  }
                        }
                    >
                        <h2>{data?.name}</h2>

                        <p style={{ minWidth: 127, marginLeft: 10 }}>
                            <Rate
                                style={{
                                    fontSize: 14,
                                    marginTop: -2,
                                }}
                                allowHalf
                                defaultValue={evaluate}
                                disabled={!data.progressions || checkEvaluate}
                                onChange={handleChangeRate}
                            />
                            <b style={{ margin: '2px 0 0 5px' }}>
                                {data.countAssessment > 0
                                    ? data.countAssessment
                                    : 0}
                            </b>
                        </p>
                    </div>

                    <div style={isMobile ? { textAlign: 'center' } : null}>
                        <p className="mb-10">
                            Môn học: <Link to="#">{data?.subject?.name}</Link>
                        </p>
                        <h3>Nội dung:</h3>
                        <div
                            className="descriptions"
                            dangerouslySetInnerHTML={{
                                __html: `${data?.descriptions}`,
                            }}
                        ></div>
                    </div>
                </Card>
                <div
                    className="intro-sz"
                    style={
                        (isMobile && { width: '100%' }) ||
                        (isTablet && { width: '28%' }) || { width: '23%' }
                    }
                >
                    <CourseHeader />
                    <CollapseCustom />
                </div>
            </div>
        )
    }

    const CustomTab = ({ tab, count }) => (
        <>
            {tab}
            <Badge count={count} style={{ marginTop: -15 }} />
        </>
    )

    const { TabPane } = Tabs
    return (
        <div className="mtz-prf-course-main">
            {!course?.data && course?.error?.includes('404') ? (
                <Result
                    status="404"
                    title="404"
                    subTitle="Xin lỗi. Khóa học không tồn tại hoặc đã bị xóa!"
                    extra={
                        <Button
                            type="primary"
                            onClick={() => history.push('/')}
                        >
                            Trở về trang chủ
                        </Button>
                    }
                />
            ) : (
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<CustomTab tab="Giới thiệu" />} key="1">
                        <CourseDetail />
                    </TabPane>

                    <TabPane tab={<CustomTab tab="Lộ trình học tập" />} key="2">
                        <LearningPaths
                            data={data}
                            CourseHeader={CourseHeader}
                            CollapseCustom={CollapseCustom}
                        />
                    </TabPane>

                    <TabPane tab={<CustomTab tab="Tài liệu" />} key="3">
                        <Documents
                            id={data?._id}
                            data={data}
                            user={user}
                            CourseHeader={CourseHeader}
                            CollapseCustom={CollapseCustom}
                        />
                    </TabPane>

                    <TabPane
                        tab={
                            <CustomTab
                                tab="Bình luận"
                                count={course?.data?.countComments}
                            />
                        }
                        key="4"
                    >
                        <Comments
                            targetId={courseId}
                            user={user}
                            CourseHeader={CourseHeader}
                            CollapseCustom={CollapseCustom}
                        />
                    </TabPane>
                </Tabs>
            )}
            <CreateCoursesModal
                showModalUpload={showModalUpload}
                setShowModalUpload={setShowModalUpload}
                courseData={course.data}
                type={type}
            />
        </div>
    )
}
export default memo(CourseDetailPage)
