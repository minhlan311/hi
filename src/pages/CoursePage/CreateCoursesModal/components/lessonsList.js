import React, { useEffect, useState } from 'react'
import Editor from '../../../../components/editor'
import {
    Button,
    Card,
    Collapse,
    Dropdown,
    Empty,
    Form,
    Input,
    Modal,
    Popconfirm,
    Space,
    Spin,
    Tooltip,
    message,
} from 'antd'
import {
    CaretRightOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    FileOutlined,
    PlusOutlined,
    QuestionOutlined,
} from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import {
    createLessonDetailSelector,
    deleteLessonDetailSelector,
    deleteLessonsRequest,
    getLessonsRequest,
    lessonsSelector,
    resetLessonsState,
    updateLessonDetailSelector,
} from '../../../../slices/lessons'
import {
    topicsSelector,
    createTopicsRequest,
    getTopicsRequest,
    deleteTopicsRequest,
    createTopicDetailSelector,
    updateTopicDetailSelector,
    deleteTopicDetailSelector,
    updateTopicsRequest,
    resetTopicState,
} from '../../../../slices/topics'
import {
    courseDetailSelector,
    getCourseDetailRequest,
    resetCourseState,
} from '../../../../slices/course'
import CreateLessons from './CreateLessons'

export default function LessonsList({ coursesId, educations }) {
    const [openTopicMd, setOpenTopicMd] = useState(false)
    const [openLessonMd, setOpenLessonMd] = useState(false)
    const [openLesson, setOpenLesson] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const topics = useSelector(topicsSelector)
    const courseDetail = useSelector(courseDetailSelector)
    const [topicId, setTopicId] = useState('')

    const createTopics = useSelector(createTopicDetailSelector)
    const updateTopics = useSelector(updateTopicDetailSelector)
    const deleteTopics = useSelector(deleteTopicDetailSelector)

    const createLesson = useSelector(createLessonDetailSelector)
    const updateLesson = useSelector(updateLessonDetailSelector)
    const deleteLesson = useSelector(deleteLessonDetailSelector)

    const lessons = useSelector(lessonsSelector)

    const [topicDescriptions, setTopicDescriptions] = useState('')

    const showModal = () => {
        setOpenTopicMd(true)
    }
    const [editTopic, setEditTopic] = useState('')
    const [editLesson, setEditLesson] = useState('')

    const handleSubmitTopic = (values) => {
        const payload = {
            name: values.chapterName,
            descriptions: topicDescriptions,
            parentId: coursesId,
        }
        if (editTopic) {
            const data = {
                id: editTopic,
                body: payload,
            }
            dispatch(updateTopicsRequest(data))
        } else dispatch(createTopicsRequest(payload))
    }

    const handleCancel = () => {
        setOpenTopicMd(false)
    }

    useEffect(() => {
        if (coursesId) {
            const payload = {
                filterQuery: {
                    parentId: coursesId,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getTopicsRequest(payload))
        }
    }, [coursesId])

    useEffect(() => {
        const payload = {
            filterQuery: {
                parentId: coursesId,
            },
            options: {
                pagination: false,
            },
        }

        if (createTopics.status === 'success') {
            message.success('Tạo chuyên đề thành công!')
            form.resetFields()
            dispatch(resetTopicState())
            dispatch(getTopicsRequest(payload))
        }
        if (updateTopics.status === 'success') {
            message.success('Cập nhật chuyên đề thành công!')
            dispatch(resetTopicState())
            dispatch(getTopicsRequest(payload))
        }
        if (deleteTopics.status === 'success') {
            message.success('Xóa chuyên đề thành công!')
            dispatch(resetTopicState())
            dispatch(getTopicsRequest(payload))
        }
    }, [coursesId, courseDetail, createTopics, updateTopics, deleteTopics])

    useEffect(() => {
        if (topicId) {
            const payload = {
                filterQuery: {
                    parentId: topicId,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getLessonsRequest(payload))
        }
    }, [topicId, openLesson])
    useEffect(() => {
        if (coursesId) {
            if (createLesson.status === 'success') {
                message.success('Thêm bài học thành công!')
                dispatch(getCourseDetailRequest(coursesId))
            }

            if (updateLesson.status === 'success') {
                message.success('Cập nhật bài học thành công!')
                dispatch(getCourseDetailRequest(coursesId))
            }

            if (deleteLesson.status === 'success') {
                message.success('Xóa bài học thành công!')
                dispatch(getCourseDetailRequest(coursesId))
            }
        }
    }, [topicId, createLesson, updateLesson, deleteLesson])

    const TopicAction = ({ topicData }) => {
        const items = [
            {
                key: '1',
                label: (
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenTopicMd(true)
                            setEditTopic(topicData._id)
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
                        onClick={(e) => {
                            e.stopPropagation()

                            if (topicData) {
                                Modal.confirm({
                                    title: 'Xóa chuyên đề',
                                    content:
                                        'Bạn có chắc chắn muốn xóa chuyên đề này?',
                                    okText: 'Xóa',
                                    cancelText: 'Hủy',
                                    onCancel: () => {},
                                    onOk: () => {
                                        dispatch(
                                            deleteTopicsRequest(topicData._id)
                                        )

                                        if (topicData.countLessons > 0)
                                            lessons?.data?.filter((ls) => {
                                                if (
                                                    ls.parentId ===
                                                    topicData._id
                                                )
                                                    return dispatch(
                                                        deleteLessonsRequest(
                                                            ls._id
                                                        )
                                                    )
                                                return ls
                                            })
                                    },
                                })
                            }
                        }}
                    >
                        <DeleteOutlined
                            className="mr-5"
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        />{' '}
                        Xóa
                    </div>
                ),

                danger: true,
            },
        ]
        return (
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomRight"
            >
                <EllipsisOutlined />
            </Dropdown>
        )
    }

    const ShowAction = ({ data }) => {
        const items = [
            {
                key: 'edit',
                label: 'Sửa',
                icon: <EditOutlined />,
                onClick: () => {
                    setOpenLessonMd(true)
                    setEditLesson(data._id)
                },
            },

            {
                key: 'dele',
                label: (
                    <Popconfirm
                        title="Xóa bài học"
                        description="Bạn có chắc muốn xóa bài học này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() =>
                            dispatch(deleteLessonsRequest(data._id))
                        }
                        placement="bottom"
                    >
                        <DeleteOutlined /> Xóa
                    </Popconfirm>
                ),

                danger: true,
            },
        ]
        return (
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomRight"
            >
                <Button
                    type="text"
                    shape="circle"
                    icon={<EllipsisOutlined />}
                ></Button>
            </Dropdown>
        )
    }
    useEffect(() => {
        if (editTopic) {
            const findData = topics?.data?.find((item) => {
                return item._id === editTopic
            })
            form.setFieldsValue({
                chapterName: findData?.name,
                topicEditor: findData?.descriptions,
            })
        }
    }, [editTopic])

    return (
        <div>
            {topics.status === 'loading' ? (
                <Spin
                    style={{
                        margin: '50px auto',
                        width: '100%',
                    }}
                />
            ) : (
                topics?.data?.map((item) => (
                    <>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={[item._id]}
                            expandIcon={({ isActive }) => (
                                <CaretRightOutlined
                                    rotate={isActive ? 90 : 0}
                                />
                            )}
                            key={item._id}
                            style={{ marginBottom: 10 }}
                        >
                            <Collapse.Panel
                                header={item.name}
                                key={item._id}
                                extra={<TopicAction topicData={item} />}
                            >
                                <div className="d-space-c">
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setOpenLessonMd(true)
                                            setTopicId(item._id)
                                        }}
                                        icon={<PlusOutlined />}
                                        size="small"
                                    >
                                        Thêm bài học
                                    </Button>
                                    <div>
                                        {item.countLessons > 0 ? (
                                            <Button
                                                size="small"
                                                style={{ marginRight: 15 }}
                                                onClick={() => {
                                                    setOpenLesson(true)
                                                    setTopicId(item._id)
                                                }}
                                            >
                                                Xem bài học
                                            </Button>
                                        ) : null}
                                        <span>
                                            Số bài học:{' '}
                                            <b>{item.countLessons}</b>{' '}
                                        </span>
                                    </div>
                                </div>
                                <Modal
                                    title="Bài học"
                                    open={openLesson}
                                    onCancel={() => setOpenLesson(false)}
                                    onOk={() => setOpenLesson(false)}
                                    cancelText="Thoát"
                                >
                                    {lessons?.data?.length > 0 ? (
                                        lessons?.data?.map((less) => (
                                            <Card
                                                key={less._id}
                                                style={{ marginBottom: 10 }}
                                            >
                                                <div className="d-space-c">
                                                    {less.name}
                                                    <Space size="middle">
                                                        <Space>
                                                            <Tooltip title="Số tài liệu">
                                                                <FileOutlined />
                                                                <b
                                                                    style={{
                                                                        marginLeft: 5,
                                                                    }}
                                                                >
                                                                    {
                                                                        less.countDocuments
                                                                    }
                                                                </b>
                                                            </Tooltip>
                                                            <Tooltip title="Số Câu hỏi">
                                                                <QuestionOutlined />
                                                                <b
                                                                    style={{
                                                                        marginLeft: 5,
                                                                    }}
                                                                >
                                                                    {
                                                                        less.countQuestions
                                                                    }
                                                                </b>
                                                            </Tooltip>
                                                        </Space>
                                                        <ShowAction
                                                            data={less}
                                                        />
                                                    </Space>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <Empty description="Hiện không có bài học nào"></Empty>
                                    )}
                                </Modal>
                            </Collapse.Panel>
                        </Collapse>
                        <CreateLessons
                            topicId={topicId}
                            openLessonMd={openLessonMd}
                            setOpenLessonMd={setOpenLessonMd}
                            editLesson={editLesson}
                            lessonData={lessons?.data}
                            coursesId={coursesId}
                            educations={educations}
                        />
                    </>
                ))
            )}

            <Button
                type="primary"
                onClick={showModal}
                icon={<PlusOutlined />}
                style={{ marginTop: 25 }}
            >
                Thêm chuyên đề
            </Button>
            <Modal
                title={`${editTopic ? 'Cập nhật' : 'Thêm'} chuyên đề`}
                open={openTopicMd}
                okText={editTopic ? 'Cập nhật' : 'Thêm mới'}
                cancelText="Hủy"
                onOk={() => {
                    form.submit()
                    setOpenTopicMd(false)
                }}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitTopic}
                    onFinishFailed={(err) => console.log(err)}
                >
                    <Form.Item
                        name="chapterName"
                        label="Tiêu đề chương"
                        rules={[
                            {
                                required: true,
                                message: 'Tiêu đề chương không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập Tiêu đề chương" />
                    </Form.Item>
                    <Form.Item
                        label="Nội dung chương"
                        name="topicEditor"
                        style={{ marginTop: 10 }}
                    >
                        <Editor
                            handleChange={(value) => {
                                setTopicDescriptions(value)
                            }}
                            // value={topicDescriptions}
                        ></Editor>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
