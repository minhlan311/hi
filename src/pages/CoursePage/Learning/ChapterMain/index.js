import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Empty, Space, Spin, Tooltip, message } from 'antd'
import {
    updateProgressionRequest,
    progressionSelector,
    getQuizRequest,
    quizSelector,
} from '../../../../slices/course'
import { USER_INFO } from '../../../../constants/storageKeys'
import { getStorage, setStorage } from '../../../../services/storage'
import { Checkbox, Card, Modal } from 'antd'
import {
    PlayCircleOutlined,
    EditOutlined,
    DownloadOutlined,
    ExclamationCircleFilled,
    PushpinOutlined,
    ArrowsAltOutlined,
    ShrinkOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
} from '@ant-design/icons'
import './styles.scss'

import Vimeo from '@u-wave/react-vimeo'
import Quiz from '../../../../components/Quiz'
import { useConvertSlug } from '../../../../hooks'
import settings from '../../../../settings'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { fileSelector } from '../../../../slices/file'
import fileDownload from 'js-file-download'
import Promise from 'bluebird'
import { useMediaQuery } from 'react-responsive'

import Notes from './components/Notes'
import { useRef } from 'react'
import {
    getTopicDetailRequest,
    topicDetailSelector,
} from '../../../../slices/topics'
const { confirm } = Modal

export default function ChapterMain() {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const user = getStorage(USER_INFO)
    const dispatch = useDispatch()
    const history = useHistory()
    const topicDetail = useSelector(topicDetailSelector)
    const progressSelector = useSelector(progressionSelector)
    const quiz = useSelector(quizSelector)
    const [doingLesson, setDoingLesson] = useState({})
    const [listQuiz, setListQuiz] = useState([])
    const [isQuiz, setIsQuiz] = useState(false)
    const [lessonQuiz, setLessonQuiz] = useState({})
    const [topicId, setTopicId] = useState('')

    const convertTime = (length) => {
        const hours = Math.trunc(length / 60)
        const minutes = length - hours * 60
        return `${hours} giờ ${minutes} phút`
    }
    const downloadFile = useSelector(fileSelector)

    useEffect(() => {
        const topicIds = getStorage('topicId')
        setTopicId(topicIds ? topicIds : history.location.state.topicId)
    }, [dispatch, history])

    useEffect(() => {
        if (topicId) {
            dispatch(getTopicDetailRequest(topicId))
        }
    }, [dispatch, topicId])
    const { data } = topicDetail

    useEffect(() => {
        if (data?.progression?.doing) {
            setDoingLesson(
                data.lessons.find(
                    (e) => e._id.toString() === data?.progression?.doing
                )
            )
            setLessonQuiz(
                data.lessons.find(
                    (e) => e._id.toString() === data?.progression?.doing
                )
            )
        }
    }, [data])

    useEffect(() => {
        if (downloadFile.data?.length > 0) {
            fileDownload(downloadFile.data, `${data.name}.zip`)
        }
    }, [downloadFile])

    const download = (url) => {
        return fetch(url).then((resp) => resp.blob())
    }

    const exportZip = (blobs, files) => {
        const zip = JSZip()
        blobs.forEach((blob, i) => {
            zip.file(`${files[i].name}`, blob)
        })
        zip.generateAsync({ type: 'blob' }).then((zipFile) => {
            const currentDate = new Date().getTime()
            const fileName = `${data.name}-${currentDate}.zip`
            return FileSaver.saveAs(zipFile, fileName)
        })
    }

    const downloadByGroup = (urls, files_per_group = 10) => {
        return Promise.map(
            urls,
            async (url) => {
                return await download(url)
            },
            { concurrency: files_per_group }
        )
    }

    const handleDownload = (documents) => {
        const files = documents
            .map((e) =>
                e.files.map((f) => {
                    return {
                        name: f.name,
                        url: f.url,
                    }
                })
            )
            .flat()
        if (files?.length === 1) {
            window.open(`${settings.FILE_URL}/${files[0].url}`, '_blank')
        } else {
            downloadByGroup(
                files?.map((e) => `${settings.FILE_URL}/${e.url}`),
                10
            ).then((blobs) => {
                exportZip(blobs, files)
            })
        }
        message.success('Tải tài liệu thành công!')
    }

    const handelUpdateProgression = (lesson) => {
        const isDone = data?.progression?.done?.some(
            (e) => e === lesson._id.toString()
        )
        const isDoing = data?.progression?.doing === lesson._id.toString()
        if (!isDone && isDoing) {
            setIsQuiz(false)
            setListQuiz([])
            setLessonQuiz(lesson)
            setDoingLesson(lesson)
        }
    }
    const updateProgression = (lesson = null) => {
        if (!lesson) {
            lesson = lessonQuiz
        }

        dispatch(
            updateProgressionRequest({
                topicId: data.progression._id,
                targetId: topicId,
                targetModel: 'TOPIC',
                userId: user?._id,
            })
        )
    }

    const showConfirmUpdateProgress = (lesson) => {
        confirm({
            title: 'Hoàn thành bài học',
            icon: <ExclamationCircleFilled />,
            content:
                'Sau khi kết thúc bài học sẽ không thể xem lại. Bạn có chắc chắn muốn sang bài học tiếp theo?',
            okText: 'Tiếp tục',
            cancelText: 'Quay lại',
            async onOk() {
                updateProgression(lesson)
            },
            onCancel() {},
        })
    }

    const showConfirmQuestion = (lesson) => {
        confirm({
            title: 'Chưa hoàn thành bài Quiz',
            icon: <ExclamationCircleFilled />,
            content:
                'Bạn cần phải hoàn thành bài Quiz để sang bài học tiếp theo! Bạn có muốn làm Quiz ngay bây giờ?',
            okText: 'Tiếp tục',
            cancelText: 'Quay lại',
            async onOk() {
                const queryRequest = {
                    filterQuery: {
                        lessonId: lesson._id,
                    },
                    options: {
                        pagination: false,
                    },
                }
                dispatch(getQuizRequest(queryRequest))
            },
            onCancel() {},
        })
    }
    useEffect(() => {
        if (quiz.status === 'success') {
            setListQuiz(quiz.data?.docs)
            setIsQuiz(true)
        }
    }, [quiz])

    useEffect(() => {
        if (progressSelector.status === 'success') {
            if (
                progressSelector?.data?.done?.some(
                    (e) => e === progressSelector.data.doing.toString()
                )
            ) {
                confirm({
                    title: 'Chúc mừng',
                    icon: <ExclamationCircleFilled />,
                    content: `Chúc mừng ạn đã hoàn thành khoá học ${data?.course?.name}!`,
                    okText: 'Tiếp tục',
                    cancelText: 'Quay lại',
                    async onOk() {
                        HandleClickCourse(
                            data?.course?._id,
                            data?.course?.subjectId?.name,
                            data?.course?.name
                        )
                    },
                    onCancel() {},
                })
            } else {
                if (topicId) {
                    if (progressSelector.data?.targetModelId !== topicId) {
                        confirm({
                            title: 'Chúc mừng',
                            icon: <ExclamationCircleFilled />,
                            content: `Chúc mừng ạn đã hoàn thành chuyên đề ${data?.name}! Bạn có muốn sang chuyên đề tiếp theo?`,
                            okText: 'Tiếp tục',
                            cancelText: 'Quay lại',
                            async onOk() {
                                setStorage({
                                    key: 'topicId',
                                    val: progressSelector.data?.targetModelId,
                                })
                                setTopicId(progressSelector.data?.targetModelId)
                            },
                            onCancel() {
                                HandleClickCourse(
                                    data?.course?._id,
                                    data?.course?.subjectId?.name,
                                    data?.course?.name
                                )
                            },
                        })
                    } else {
                        window.location.reload()
                    }
                }
            }
        }
    }, [data, progressSelector])

    const handelFinishLesson = () => {
        const isDone = data?.progression.done.some(
            (e) => e === lessonQuiz._id.toString()
        )
        const isDoing = data?.progression.doing === lessonQuiz._id.toString()
        if (lessonQuiz.countQuestions <= 0) {
            if (!isDone && isDoing) {
                showConfirmUpdateProgress(lessonQuiz)
            } else {
                return
            }
        } else {
            if (isDoing) {
                showConfirmQuestion(lessonQuiz)
            }
        }
    }
    const HandleClickCourse = (id, subject, name) => {
        history.push(
            `/courses/${useConvertSlug(subject)}/${useConvertSlug(name)}`,
            {
                courseId: id,
            }
        )
    }

    const [currentTime, setCurrentTime] = useState(0)
    const [openNote, setOpenNote] = useState(false)
    const [paused, setPaused] = useState(false)

    const handleProgress = (data) => {
        setCurrentTime(data.seconds)
    }
    const skip = useRef()

    useEffect(() => {
        skip?.current?.player.setCurrentTime(currentTime)
    }, [currentTime])

    const renderVideoPlayer = useCallback(() => {
        if (doingLesson.media) {
            return (
                <Vimeo
                    responsive={true}
                    video={doingLesson.media}
                    onPlaying={handleProgress}
                    paused={paused}
                    onPause={handleProgress}
                    ref={skip}
                />
            )
        }
    }, [doingLesson, paused, skip])

    const [openMore, setOpenMore] = useState(false)
    const [enlarge, setEnlarge] = useState(false)
    const handleNote = () => {
        if (enlarge && !openNote) {
            setEnlarge(false)
            setOpenNote(true)
            setPaused(true)
        } else if (!enlarge && !openNote) {
            setOpenNote(true)
            setPaused(true)
        } else if (enlarge && openNote) {
            setEnlarge(false)
            setOpenNote(true)
            setPaused(true)
        } else {
            setOpenNote(false)
        }
    }
    return data?.length > 0 ? (
        <div
            className={`mtz-prf-chapter-main ${
                isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
            } `}
            style={{ marginTop: 90 }}
        >
            <Breadcrumb separator=">" style={{ marginBottom: 15 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item
                    href="#"
                    onClick={() => {
                        history.push('/courses', {
                            subjectId: data?.course?.subjectId?._id,
                        })
                    }}
                >
                    {data?.course?.subjectId?.name}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                    href="#"
                    onClick={() =>
                        HandleClickCourse(
                            data?.course?._id,
                            data?.course?.subjectId?.name,
                            data?.course?.name
                        )
                    }
                >
                    {data?.course?.name}
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{ color: '#1677ff' }}>
                    {data?.name}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={`body-learn ${enlarge ? 'vimeo-enlarge' : null}`}>
                {!isQuiz ? (
                    <div
                        className="learn-card"
                        style={enlarge ? null : { width: '70%' }}
                    >
                        <div className="vimeo-main">
                            {openMore ? (
                                <Space.Compact
                                    onMouseOver={() => setOpenMore(true)}
                                    onMouseLeave={() => setOpenMore(false)}
                                    block
                                    className="vimeo-more"
                                    direction="vertical"
                                    size="large"
                                >
                                    {enlarge ? (
                                        <>
                                            <Tooltip title="Thu nhỏ khung hình">
                                                <Button
                                                    onClick={() => {
                                                        setEnlarge(false)
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: 'smooth',
                                                        })
                                                    }}
                                                    icon={<ShrinkOutlined />}
                                                ></Button>
                                            </Tooltip>
                                            <Tooltip title="Bài học tiếp theo">
                                                <Button
                                                    icon={
                                                        <DoubleRightOutlined />
                                                    }
                                                    onClick={handelFinishLesson}
                                                ></Button>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Tooltip title="Mở rộng khung hình">
                                            <Button
                                                onClick={() => {
                                                    setEnlarge(true)
                                                    window.scrollTo({
                                                        top: 55,
                                                        behavior: 'smooth',
                                                    })
                                                }}
                                                icon={<ArrowsAltOutlined />}
                                            ></Button>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Ghi chú">
                                        <Button
                                            onClick={handleNote}
                                            icon={<PushpinOutlined />}
                                        ></Button>
                                    </Tooltip>
                                </Space.Compact>
                            ) : null}
                            <div
                                className="vimeo-video"
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: '6px 6px 0 0',
                                }}
                                onMouseOver={() => setOpenMore(true)}
                                onMouseLeave={() => setOpenMore(false)}
                            >
                                {renderVideoPlayer()}
                            </div>
                        </div>
                        {enlarge ? (
                            <>
                                {data?.lessons?.map((item, index) => {
                                    const isDone =
                                        data?.progression?.done?.some(
                                            (e) => e === item._id.toString()
                                        )
                                    const isDoing =
                                        data?.progression?.doing ===
                                        item._id.toString()

                                    return (
                                        <div
                                            style={
                                                isDone
                                                    ? { background: '#F9F9F9' }
                                                    : {}
                                            }
                                        >
                                            <div
                                                onClick={() =>
                                                    handelUpdateProgression(
                                                        item
                                                    )
                                                }
                                                className="item"
                                                key={item._id}
                                                style={
                                                    index > 0
                                                        ? {
                                                              padding:
                                                                  '10px 15px',
                                                              paddingTop:
                                                                  '24px',
                                                              borderTop:
                                                                  '1px solid #ccc',
                                                          }
                                                        : {
                                                              padding:
                                                                  '10px 15px',
                                                          }
                                                }
                                            >
                                                <div>
                                                    {isDoing ? (
                                                        <div className="d-space-flex">
                                                            <Space>
                                                                <h3
                                                                    style={{
                                                                        margin: 0,
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    Đang học:
                                                                </h3>
                                                                <h3
                                                                    style={{
                                                                        color: 'blue',
                                                                        fontWeight:
                                                                            'bold',
                                                                        margin: 0,
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    {item?.name}
                                                                </h3>
                                                            </Space>
                                                            <Space>
                                                                <div>
                                                                    <PlayCircleOutlined
                                                                        style={{
                                                                            marginRight: 5,
                                                                        }}
                                                                    />
                                                                    <span>
                                                                        {convertTime(
                                                                            item.length
                                                                                ? item.length
                                                                                : 60
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        marginRight: 15,
                                                                    }}
                                                                >
                                                                    <EditOutlined
                                                                        style={{
                                                                            marginLeft: 10,
                                                                            color: '#FD7C48',
                                                                        }}
                                                                    />
                                                                    <span
                                                                        style={{
                                                                            marginLeft: 5,
                                                                            color: '#FD7C48',
                                                                        }}
                                                                    >
                                                                        {'0/'}
                                                                        {
                                                                            item.countQuestions
                                                                        }
                                                                    </span>
                                                                </div>
                                                                {item.countDocuments !==
                                                                0 ? (
                                                                    <Button
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.preventDefault()
                                                                            handleDownload(
                                                                                item?.documents
                                                                            )
                                                                        }}
                                                                        icon={
                                                                            <DownloadOutlined />
                                                                        }
                                                                    >
                                                                        Tải tài
                                                                        liệu
                                                                    </Button>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </Space>
                                                        </div>
                                                    ) : (
                                                        <>{item?.name}</>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : null}
                        <div style={{ padding: 15 }}>
                            <div
                                className="d-flex"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h2>{doingLesson?.name}</h2>
                                <Button
                                    size="large"
                                    type="primary"
                                    onClick={() => handelFinishLesson()}
                                >
                                    Hoàn thành bài học
                                </Button>
                            </div>
                            <div className="infor mt-15">
                                <h3>Nội dung</h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: `${doingLesson?.descriptions}`,
                                    }}
                                ></p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Quiz
                        listQuiz={listQuiz}
                        handelUpdateProgression={updateProgression}
                    />
                )}

                {openNote ? (
                    <Notes
                        currentTime={currentTime}
                        enlarge={enlarge}
                        setOpenNote={setOpenNote}
                        setCurrentTime={setCurrentTime}
                        lessonId={topicId}
                        userId={user._id}
                    />
                ) : (
                    <Card
                        style={{
                            width: '28%',
                            display: enlarge ? 'none' : null,
                        }}
                        className="path"
                        hoverable
                        title={`Bài học (${convertTime(
                            data?.length ? data.length : 60
                        )})`}
                    >
                        {data?.lessons?.map((item, index) => {
                            const isDone = data?.progression?.done?.some(
                                (e) => e === item._id.toString()
                            )
                            const isDoing =
                                data?.progression?.doing === item._id.toString()

                            return (
                                <div
                                    style={
                                        isDone ? { background: '#F9F9F9' } : {}
                                    }
                                >
                                    <div
                                        onClick={() =>
                                            handelUpdateProgression(item)
                                        }
                                        className="item"
                                        key={item._id}
                                        style={
                                            index > 0
                                                ? {
                                                      padding: '10px 24px',
                                                      paddingTop: '24px',
                                                      borderTop:
                                                          '1px solid #ccc',
                                                  }
                                                : { padding: '10px 24px' }
                                        }
                                    >
                                        <div>
                                            <Checkbox
                                                checked={isDone}
                                                style={{ marginRight: '10px' }}
                                            />
                                            {isDone ? (
                                                <>{item?.name}</>
                                            ) : isDoing ? (
                                                <>
                                                    <span
                                                        style={{
                                                            color: 'blue',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {item?.name} (Đang học)
                                                    </span>
                                                </>
                                            ) : (
                                                <>{item?.name}</>
                                            )}
                                        </div>
                                        <div
                                            className="d-space-flex"
                                            style={{ padding: '10px 0' }}
                                        >
                                            <Space>
                                                <div
                                                    style={{ marginRight: 15 }}
                                                >
                                                    <PlayCircleOutlined />
                                                    <span
                                                        style={{
                                                            marginLeft: 5,
                                                        }}
                                                    >
                                                        {convertTime(
                                                            item.length
                                                                ? item.length
                                                                : 60
                                                        )}
                                                    </span>
                                                </div>
                                                <div>
                                                    <EditOutlined
                                                        style={{
                                                            color: '#FD7C48',
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            marginLeft: 5,
                                                            color: '#FD7C48',
                                                        }}
                                                    >
                                                        {'0/'}
                                                        {item.countQuestions}
                                                    </span>
                                                </div>
                                            </Space>
                                            {item.countDocuments !== 0 ? (
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleDownload(
                                                            item?.documents
                                                        )
                                                    }}
                                                    icon={<DownloadOutlined />}
                                                >
                                                    Tải tài liệu
                                                </Button>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Card>
                )}
            </div>
        </div>
    ) : topicDetail.status === 'loading' ? (
        <div
            style={{
                marginTop: 80,
                padding: '200px 50px',
                textAlign: 'center',
            }}
        >
            <Spin tip="Vui lòng chờ..." style={{ color: 'black' }}></Spin>
        </div>
    ) : (
        <Empty
            style={{ margin: '150px 0 100px' }}
            description={
                <span>
                    Bạn chưa tham gia khóa học này hoặc khóa học đã bị xóa!
                </span>
            }
        >
            <Button type="primary" onClick={() => history.push('/courses')}>
                Xem khóa học khác
            </Button>
        </Empty>
    )
}
