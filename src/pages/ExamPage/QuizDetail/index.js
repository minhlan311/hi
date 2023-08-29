import React, { useEffect, useMemo, useState } from 'react'
import { Row, Modal, Col, Form, Input } from 'antd'
import { useHistory, Link } from 'react-router-dom'
import { CheckOutlined } from '@ant-design/icons'
import { ROUTERS_URL } from '../../../constants/routerUrl'
import { joinCourseRequest, joinCourseSelector } from '../../../slices/course'
import Quiz from '../../../components/Quiz'
import speaker from '../../../assets/images/exam-page/speaker.svg'
import bling from '../../../assets/images/exam-page/bling.svg'
import target from '../../../assets/images/exam-page/target.svg'
import paperSmall from '../../../assets/images/exam-page/paper-small.svg'
import paper from '../../../assets/images/exam-page/paper.svg'
import spaceShip from '../../../assets/images/exam-page/spaceship.svg'
import noQuestion from '../../../assets/images/exam-page/no-question.jpg'
import { getExamDetailRequest, examDetailSelector } from '../../../slices/exam'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import Payments from '../../../components/payments'
import { useMediaQuery } from 'react-responsive'

const QuizDetail = (props) => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const history = useHistory()
    const dispatch = useDispatch()
    const [testList, setTestlist] = useState([])
    const testDetail = useSelector(examDetailSelector)
    const user = getStorage(USER_INFO)
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const joinCourse = useSelector(joinCourseSelector)
    const [statusCode, setStatusCode] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const handleOk = () => {
        history.push(ROUTERS_URL.QUIZZES)
    }

    useEffect(() => {
        if (joinCourse.status === 'success') {
            setOpen(false)
            window.location.reload()
        } else if (joinCourse.status === 'failed') {
            setStatusCode(true)
        }
    }, [joinCourse])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handelUpdateProgression = () => {
        success()
    }
    useEffect(() => {
        const { id } = props
        if (id) {
            dispatch(getExamDetailRequest(id))
        }
    }, [props, dispatch])

    useEffect(() => {
        if (testDetail.status === 'success') {
            if (testDetail.data?.isLocked) {
                setOpenPayment(true)
            } else {
                setTestlist(testDetail.data)
            }
        }
    }, [testDetail])

    const quizTest = useMemo(() => {
        if (testList?.questions && testList?.questions.length > 0) {
            return (
                <Quiz
                    listQuiz={testList?.questions}
                    handelUpdateProgression={handelUpdateProgression}
                />
            )
        } else {
            return (
                <div className="text-center" style={{ textAlign: 'center' }}>
                    <div>
                        <img
                            src={noQuestion}
                            alt=""
                            className="img-noquestion"
                        />
                    </div>
                    <b style={{ fontSize: '20px' }}>
                        Câu hỏi sẽ được cập nhật trong thời gian sớm nhất!
                    </b>
                </div>
            )
        }
    }, [handelUpdateProgression, testList?.questions])

    const success = () => {
        Modal.confirm({
            content: 'Chúc mừng bạn đã hoàn thành bài thi!',
            okText: 'Quay lại danh sách',
            onOk: () => handleOk(),
            cancelText: 'Xem lại bài thi',
            // onCancel: () => handleOk(),
            icon: <CheckOutlined style={{ color: 'green' }} />,
        })
    }

    const handelFinish = (value) => {
        dispatch(
            joinCourseRequest({
                targetId: testDetail?.data?._id,
                type: 'STUDENT',
                targetModel: testDetail?.data?.type,
                activationCode: value.code,
                userIds: [user?._id],
            })
        )
    }

    const handleCancel = () => {
        if (testDetail.data.isLocked === false) {
            setOpen(false)
        } else {
            window.history.back()
        }
    }

    return (
        <>
            <div
                className={`${
                    isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
                } quiz-detail-conainer`}
            >
                <div
                    style={
                        isMobile || isTablet
                            ? { width: '100%' }
                            : { width: '75%' }
                    }
                >
                    {quizTest}
                </div>

                {isMobile || isTablet ? null : (
                    <div className="test-trick">
                        <div className="box-top">
                            <div className="content">
                                <h3 className="title">
                                    Có thể bạn chưa biết ?
                                </h3>
                                <p className="title-sp">
                                    Bạn có thể tạo ra những bài Thi bằng cách
                                    đăng ký làm Mentor.
                                </p>
                                <Link
                                    to="/regis-is-mentor"
                                    className="content-bottom"
                                >
                                    Đăng ký ngay!
                                </Link>
                            </div>
                            <div className="image-intro">
                                <img
                                    className="image-bling"
                                    src={bling}
                                    align="right"
                                    alt="speaker-top-box"
                                />
                                <img
                                    className="image-speaker"
                                    src={speaker}
                                    align="right"
                                    alt="speaker-top-box"
                                />
                            </div>
                        </div>
                        <div className="box-bottom">
                            <div className="content-top">
                                <img
                                    className="image-target"
                                    src={target}
                                    align="left"
                                    alt="target-top-box"
                                />
                                <p className="title-content-box-bottom">
                                    Tạo ra các bài Test bạn sẽ được gì?
                                </p>
                                <img
                                    className="image-paper-small"
                                    src={paperSmall}
                                    align="right"
                                    alt="target-top-box"
                                />
                            </div>
                            <div className="top-content-box">
                                <div>
                                    <CheckOutlined
                                        style={{
                                            color: '#6aff60',
                                            fontSize: 25,
                                        }}
                                    />
                                    Giúp bạn ghi nhớ nhanh những kiến thức bạn
                                    được học.
                                </div>
                                <div
                                    style={{
                                        margin: '25px 0',
                                    }}
                                >
                                    <CheckOutlined
                                        style={{
                                            color: '#6aff60',
                                            fontSize: 25,
                                        }}
                                    />
                                    Bạn có thể chia sẻ những bài Test mà bạn đã
                                    tạo ra cho các thành viên trong lớp của bạn.
                                </div>

                                <div style={{ maxWidth: 200 }}>
                                    <CheckOutlined
                                        style={{
                                            color: '#6aff60',
                                            fontSize: 25,
                                        }}
                                    />
                                    Bạn có thể gia tăng thu nhập từ việc tạo ra
                                    các bài Test có trả phí.
                                </div>
                            </div>
                            <img
                                className="image-paper-large"
                                src={paper}
                                align="left"
                                alt="target-top-box"
                            />

                            <img
                                className="image-paper-large-right"
                                src={paper}
                                align="right"
                                alt="target-top-box"
                            />
                            <img
                                className="image-paper-spaceShip"
                                src={spaceShip}
                                align="right"
                                alt="target-top-box"
                            />
                        </div>
                    </div>
                )}
            </div>

            <Modal
                title="Nhập mã kích hoạt"
                open={open}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpen(false)
                    setOpenPayment(true)
                    setStatusCode(false)
                }}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Form onFinish={handelFinish} form={form}>
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
                    {statusCode && (
                        <p style={{ color: 'red' }}>
                            {'Mã code sai, vui lòng kiểm tra lại'}
                        </p>
                    )}
                </Form>
            </Modal>
            <Payments
                data={testDetail?.data}
                targetModel="QUIZ"
                isModalOpen={openPayment}
                onCancel={handleCancel}
                handleCode={() => {
                    setOpenPayment(false)
                    setOpen(true)
                }}
            ></Payments>
        </>
    )
}

QuizDetail.propTypes = {}

export default QuizDetail
