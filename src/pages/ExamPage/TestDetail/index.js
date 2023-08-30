import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Progress,
    Row,
    Space,
    Tooltip,
    Typography,
} from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import {
    BarsOutlined,
    HighlightOutlined,
    FlagOutlined,
    RollbackOutlined,
} from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { ROUTERS_URL } from '../../../constants/routerUrl'
import BreadCrumb from '../../../components/layout/BreadCrumb'
import mtzTimerIcon from '../../../assets/images/exam-page/timer-icon.svg'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    submitExamDataSelector,
    getExamDetailRequest,
    examDetailSelector,
} from '../../../slices/exam'
import QuestionForm from './Components/QuestionForm'
import CheckFormQuestion from './Components/CheckFormQuestion'
import { joinCourseRequest, joinCourseSelector } from '../../../slices/course'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage } from '../../../services/storage'
import { setStatusGlobal } from '../../../constants/component'
import Payments from '../../../components/payments'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography
const TestDetail = () => {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const user = getStorage(USER_INFO)
    const [form] = Form.useForm()
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const [hours, setHourse] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [intervalTime, setIntervalTime] = useState(() => {})
    const [start, setStart] = useState(null)
    const [stateTest, setStateTest] = useState(setStatusGlobal() !== 'test')

    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault()
            event.returnValue = ''
            setStatusGlobal('')
            return event.returnValue
        }

        window.addEventListener('beforeunload', unloadCallback)
        return () => window.removeEventListener('beforeunload', unloadCallback)
    }, [])

    useEffect(() => {
        if (start !== null) {
            if (start) {
                setIntervalTime(
                    setInterval(() => {
                        setSeconds((seconds) => seconds + 1)
                    }, 1000)
                )
                // setStatusGlobal('test')
            } else {
                setIntervalTime(clearInterval(intervalTime))
                setStatusGlobal('')
            }
        }
    }, [start])

    useEffect(() => {
        if (!stateTest) {
            Modal.error({
                title: 'Thông báo',
                content:
                    'Bạn đang làm 1 bài thi khác, vui lòng hoàn thành bài thi trước đó!',
            })
        }
    }, [stateTest])

    useEffect(() => {
        if (seconds >= 60) {
            setMinutes((minutes) => minutes + 1)
            setSeconds(0)
        }
        if (minutes === 60) {
            setHourse((hours) => hours + 1)
            setMinutes(0)
        }
    }, [hours, minutes, seconds])

    const examDetail = useSelector(examDetailSelector)
    const joinCourse = useSelector(joinCourseSelector)

    useEffect(() => {
        if (stateTest) {
            dispatch(getExamDetailRequest(params.id))
        }
    }, [stateTest])

    useEffect(() => {
        if (
            examDetail.data.plan === 'PREMIUM' &&
            examDetail.data.isLocked === true
        ) {
            setOpen(true)
        } else {
            setOpen(false)
            setStart(true)
        }
    }, [examDetail.data])
    const [statusCode, setStatusCode] = useState(false)
    useEffect(() => {
        if (joinCourse.status === 'success') {
            setOpen(false)
            window.location.reload()
        } else if (joinCourse.status === 'failed') {
            setStatusCode(true)
        }
    }, [joinCourse])
    const getExamFromTestList = JSON.parse(sessionStorage.getItem('moveExam'))
    const [testResult, setTestResult] = useState(false)
    const [checkForm, setCheckForm] = useState(false)
    const [open, setOpen] = useState(false)
    const [openCode, setOpenCode] = useState(false)
    const resetTest = () => {
        // reset()
        setTestResult(false)
    }

    const showModal = () => {
        setTestResult(false)
        setCheckForm(true)
    }
    const handleOk = () => {
        setTestResult(true)
    }
    const handleActive = () => {
        form.submit()
    }
    const handleCancel = () => {
        if (examDetail.data.isLocked === false) {
            setOpenCode(false)
        }
        setStatusGlobal('')
        window.history.back()
    }

    const breadcrumbData = [
        {
            id: uuidv4(),
            title: getExamFromTestList?.getCategory,
            style: null,
            action: () => history.push(ROUTERS_URL.TESTS),
        },
        {
            id: uuidv4(),
            title: getExamFromTestList?.getSubject,
            style: { color: '#0D84E0' },
            action: () => {},
        },
    ]
    const examDataSubmit = useSelector(submitExamDataSelector)
    const renderTimer = () => {
        return (
            <Text className="title-label text-bold-600">
                <span>{hours < 10 ? '0' + hours : hours}</span>:
                <span>{minutes < 10 ? '0' + minutes : minutes}</span>:
                <span>{seconds < 10 ? '0' + seconds : seconds}</span>
            </Text>
        )
    }
    const renderTestResult = (
        <div className="test-result-container">
            <BreadCrumb breadcrumbData={breadcrumbData} />
            {/* <Button className="mt-15" icon={<FolderAddOutlined />} type="primary">
        Chọn đề khác
      </Button> */}
            <div
                className="d-flex justify-center align-center mb-15"
                style={{ color: '#22AD55' }}
            >
                <img
                    style={{ width: 'auto !important' }}
                    className="mr-10"
                    alt="member icon"
                    src={mtzTimerIcon}
                />{' '}
                <span>{hours < 10 ? '0' + hours : hours}</span>:
                <span>{minutes < 10 ? '0' + minutes : minutes}</span>:
                <span>{seconds < 10 ? '0' + seconds : seconds}</span>
            </div>

            <h3 className="d-flex justify-center align-center mb-15">
                Chúc mừng bạn đã hoàn thành bài kiểm tra
            </h3>

            <Progress
                percent={
                    (examDataSubmit?.data?.totalCorrectAnswer * 100) /
                    examDataSubmit?.data?.totalQuestions
                }
                strokeColor={
                    (examDataSubmit?.data?.totalCorrectAnswer * 100) /
                        examDataSubmit?.data?.totalQuestions <
                    100
                        ? '#FD7C48'
                        : ''
                }
                showInfo={false}
            />
            <div className="score-number">
                <span>{examDataSubmit?.data?.totalCorrectAnswer}</span>
                <span>{examDataSubmit?.data?.totalQuestions}</span>
            </div>

            <h3 className="d-flex justify-center align-center mt-15 mb-15">
                Kết quả bài test
            </h3>
            <div className="test-result-box">
                <Row style={{ height: 'inherit', margin: '20px 0 20px 0' }}>
                    <Col xs={12} xl={12} style={{ lineHeight: '35px' }}>
                        <Space direction="vertical">
                            <Text className="grey-label">Tên:</Text>
                            <Text className="grey-label">Số câu hỏi:</Text>
                            <Text className="grey-label">Số đáp án đúng:</Text>
                            <Text className="grey-label">Số đáp án sai:</Text>
                            {/* <Text className="grey-label">
                                Số câu chưa trả lời:
                            </Text> */}
                            <Text className="grey-label">
                                Thời gian làm bài:
                            </Text>
                        </Space>
                    </Col>
                    <Col xs={12} xl={12} style={{ lineHeight: '35px' }}>
                        <Space direction="vertical">
                            <Text className="title-label text-bold-600">
                                {examDetail?.data?.name}
                            </Text>
                            <Text className="title-label text-bold-600">
                                {examDataSubmit?.data?.totalQuestions}
                            </Text>
                            <Text className="title-label text-bold-600">
                                {examDataSubmit?.data?.totalCorrectAnswer}
                            </Text>
                            <Text className="title-label text-bold-600">
                                {examDataSubmit?.data?.totalQuestions -
                                    examDataSubmit?.data?.totalCorrectAnswer}
                            </Text>
                            {renderTimer}
                        </Space>
                    </Col>
                </Row>
            </div>
            <Row className="d-flex justify-center align-center mt-15">
                <Button className="mt-15 mr-15" onClick={resetTest}>
                    Thi Lại
                </Button>

                <Button
                    className="mt-15 ml-15"
                    type="primary"
                    onClick={showModal}
                >
                    Kiểm tra đáp án
                </Button>
            </Row>
        </div>
    )

    if (testResult) return renderTestResult
    const handelFinish = (value) => {
        dispatch(
            joinCourseRequest({
                targetId: examDetail?.data?._id,
                type: 'STUDENT',
                targetModel: examDetail?.data?.type,
                activationCode: value.code,
                userIds: [user?._id],
            })
        )
    }
    return (
        <>
            {stateTest && (
                <>
                    <div
                        className={`${
                            isMobile || isTablet
                                ? 'uc-container-m'
                                : 'uc-container'
                        } test-detail-conainer`}
                    >
                        <BreadCrumb breadcrumbData={breadcrumbData} />
                        <Row className="mtz-test-detail">
                            <div className="header-timer d-space-c">
                                {isMobile ? (
                                    <div style={{ width: '100%' }}>
                                        <h4>{examDetail?.data?.name} </h4>{' '}
                                        <div className="d-space-c">
                                            <div className="tag-label">
                                                {
                                                    examDetail?.data
                                                        ?.countQuestions
                                                }
                                            </div>
                                            <div className="d-flex align-center">
                                                <img
                                                    style={{
                                                        width: 'auto !important',
                                                    }}
                                                    className="mr-10"
                                                    alt="member icon"
                                                    src={mtzTimerIcon}
                                                />{' '}
                                                <span>
                                                    {hours < 10
                                                        ? '0' + hours
                                                        : hours}
                                                </span>
                                                :
                                                <span>
                                                    {minutes < 10
                                                        ? '0' + minutes
                                                        : minutes}
                                                </span>
                                                :
                                                <span>
                                                    {seconds < 10
                                                        ? '0' + seconds
                                                        : seconds}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h4 className="d-flex align-center">
                                            {examDetail?.data?.name}{' '}
                                            <div className="tag-label ml-15">
                                                {
                                                    examDetail?.data
                                                        ?.countQuestions
                                                }
                                            </div>
                                        </h4>
                                        <div className="d-flex align-center">
                                            <img
                                                style={{
                                                    width: 'auto !important',
                                                }}
                                                className="mr-10"
                                                alt="member icon"
                                                src={mtzTimerIcon}
                                            />{' '}
                                            <span>
                                                {hours < 10
                                                    ? '0' + hours
                                                    : hours}
                                            </span>
                                            :
                                            <span>
                                                {minutes < 10
                                                    ? '0' + minutes
                                                    : minutes}
                                            </span>
                                            :
                                            <span>
                                                {seconds < 10
                                                    ? '0' + seconds
                                                    : seconds}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* <Progress percent={0} showInfo={false} /> */}

                            <div className="action-footer d-space-c">
                                <Tooltip
                                    title={isMobile ? 'Kiểm tra lại' : null}
                                >
                                    <Button
                                        icon={<RollbackOutlined />}
                                        onClick={() => window.location.reload()}
                                    >
                                        {isMobile ? null : 'Kiểm tra lại'}
                                    </Button>
                                </Tooltip>

                                <Space>
                                    <Tooltip
                                        title={isMobile ? 'Lượt đã làm' : null}
                                    >
                                        <Button
                                            icon={<HighlightOutlined />}
                                            type="text"
                                        >
                                            {examDetail?.data?.tested}{' '}
                                            {isMobile ? null : 'lượt đã làm'}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={isMobile ? 'Flag' : null}>
                                        <Button
                                            icon={<FlagOutlined />}
                                            type="text"
                                        >
                                            {isMobile ? null : 'Flag'}
                                        </Button>
                                    </Tooltip>
                                </Space>
                            </div>
                            {checkForm ? (
                                <CheckFormQuestion
                                    examDataSubmit={examDataSubmit}
                                />
                            ) : (
                                <QuestionForm
                                    questions={examDetail?.data?.questions}
                                    idTest={params.id}
                                    setTestResult={setTestResult}
                                    pauseTimer={() => {
                                        setStart(false)
                                    }}
                                    setCheckForm={setCheckForm}
                                />
                            )}
                        </Row>
                    </div>
                    <Payments
                        data={examDetail?.data}
                        targetModel="TEST"
                        isModalOpen={open}
                        onCancel={handleCancel}
                        handleCode={() => {
                            setOpen(false)
                            setOpenCode(true)
                        }}
                    ></Payments>
                    <Modal
                        title="Nhập mã kích hoạt"
                        open={openCode}
                        onOk={handleActive}
                        onCancel={() => {
                            setOpenCode(false)
                            setOpen(true)
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
                </>
            )}
        </>
    )
}

TestDetail.propTypes = {}

export default TestDetail
