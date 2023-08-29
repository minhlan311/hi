import {
    DeleteOutlined,
    ExclamationCircleFilled,
    UploadOutlined,
} from '@ant-design/icons'
import {
    Button,
    Form,
    Input,
    Modal,
    Popconfirm,
    Space,
    Table,
    Tabs,
    Upload,
    message,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createExamDataRequest,
    createExamDataSelector,
    deleteExamDataRequest,
    deleteExamDataSelector,
    examsSelector,
    getExamsRequest,
} from '../../../../slices/exam'
import { getCourseDetailRequest } from '../../../../slices/course'
import settings from '../../../../settings'
import { UPLOAD_ATTACHMENT } from '../../../../constants/paths'
import {
    deleteQuestionDataSelector,
    deleteQuestionRequest,
    getQuestionsRequest,
    importQuestionDataSelector,
    importQuestionRequest,
    questionsSelector,
    resetQuestionState,
} from '../../../../slices/question'

export default function TestList({ coursesData }) {
    const dispatch = useDispatch()
    const exams = useSelector(examsSelector)
    const createExam = useSelector(createExamDataSelector)
    const deleteExam = useSelector(deleteExamDataSelector)
    const importData = useSelector(importQuestionDataSelector)
    const questionData = useSelector(questionsSelector)
    const deleteQuestion = useSelector(deleteQuestionDataSelector)
    const [activeKey, setActiveKey] = useState()
    useEffect(() => {
        if (
            coursesData ||
            createExam.status === 'success' ||
            deleteExam.status === 'success'
        ) {
            if (coursesData.subjectId) {
                const payload = {
                    filterQuery: {
                        subjectId: coursesData?.subjectId,
                        courseId: coursesData?._id,
                    },
                }
                dispatch(getExamsRequest(payload))
            }
        }
    }, [coursesData])

    useEffect(() => {
        if (createExam.status === 'success') {
            message.success('Tạo bài thi thành công!')
            form.resetFields()
            setOpenAdd(false)
        }
    }, [createExam])

    useEffect(() => {
        if (deleteExam.status === 'success') {
            message.success('Xóa bài thi thành công!')
        }
    }, [deleteExam])

    useEffect(() => {
        if (deleteQuestion.status === 'success' && activeKey) {
            message.success('Xóa câu hỏi thành công!')
            const payload = {
                filterQuery: {
                    lessonId: activeKey,
                },
            }
            dispatch(getQuestionsRequest(payload))
            dispatch(resetQuestionState())
        }
    }, [deleteQuestion, activeKey])

    const examList = exams?.data?.docs
    const [questions, setQuestions] = useState([])

    const columns = [
        {
            title: 'Câu hỏi',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Loại đáp án',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Số đáp án',
            key: 'choicesLength',
            render: (_, record) => {
                return record?.choices?.length
            },
        },
        {
            title: 'Đáp án đúng',
            key: 'choices',
            render: (_, record) => {
                const anws = record?.choices?.find(
                    (item) => item.isCorrect === true
                )
                return anws.answer
            },
        },
        {
            title: 'Giải thích',
            dataIndex: 'explanation',
            key: 'explanation',
        },
        {
            title: 'Gợi ý',
            dataIndex: 'hint',
            key: 'hint',
        },
        {
            title: 'Điểm số',
            key: 'point',
            dataIndex: 'point',
            align: 'center',
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Xóa câu hỏi"
                        description="Bạn có chắc chắn muốn xóa câu hỏi này?"
                        onConfirm={() => {
                            dispatch(deleteQuestionRequest(record._id))
                        }}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            loading={deleteQuestion.status === 'loading'}
                        ></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const [openAdd, setOpenAdd] = useState(false)

    const [tabs, setTabs] = useState([])
    const [uploadQuestionFile, setUploadQuestionFile] = useState()
    const uploadQuestionProps = {
        name: 'attachment',
        multiple: false,
        action: settings.FILE_URL + UPLOAD_ATTACHMENT,
        onChange(info) {
            const { status } = info.file

            if (status === 'done') {
                setUploadQuestionFile(info.file.response[0])

                message.success(`Tải file ${info.file.name} thành công.`)
            } else if (status === 'error') {
                message.error(`Tải file ${info.file.name} thất bại.`)
            }
        },
    }

    useEffect(() => {
        if (activeKey) {
            const payload = {
                filterQuery: {
                    lessonId: activeKey,
                },
            }
            dispatch(getQuestionsRequest(payload))
        }

        if (examList?.length > 0) setActiveKey(examList?.[0]?._id)
    }, [activeKey, examList])
    const [uploadAction, setUploadAction] = useState(false)

    useEffect(() => {
        if (uploadQuestionFile && createExam?.data?._id) {
            const payload = {
                url: uploadQuestionFile?.url,
                lessonId: createExam?.data?._id,
            }

            dispatch(importQuestionRequest(payload))
            setUploadAction(true)
            setUploadQuestionFile('')
        } else if (uploadQuestionFile && activeKey) {
            const payload = {
                url: uploadQuestionFile?.url,
                lessonId: activeKey,
            }
            dispatch(importQuestionRequest(payload))
            setUploadAction(true)
            setUploadQuestionFile('')
            setActiveKey('')
        }
    }, [uploadQuestionFile, createExam, activeKey])
    useEffect(() => {
        if (questionData.status === 'success') {
            setQuestions(questionData?.data)
        }
    }, [questionData])

    useEffect(() => {
        if (importData.status === 'success') {
            setQuestions(importData?.data)
        }
    }, [importData])

    useEffect(() => {
        if (examList?.length > 0) {
            const newTab = examList?.map((item) => {
                return {
                    label: item.name,
                    children: (
                        <>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={questions}
                            />
                            <Upload {...uploadQuestionProps}>
                                <Button
                                    icon={<UploadOutlined />}
                                    style={{ marginTop: 15 }}
                                >
                                    Tải lên file câu hỏi
                                </Button>
                            </Upload>
                        </>
                    ),
                    key: item._id,
                }
            })

            setTabs(newTab)
        }
    }, [examList, questions])
    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey)
    }
    const { confirm } = Modal
    const remove = (targetKey) => {
        let newActiveKey = activeKey
        confirm({
            title: 'Xóa bài thi',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn muốn xóa bài thi này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk() {
                dispatch(deleteExamDataRequest(targetKey))
                dispatch(getCourseDetailRequest(coursesData._id))
                const newTabs = tabs.filter((tab) => tab.key !== targetKey)
                if (activeKey === targetKey) {
                    const currentTabIndex = tabs.findIndex(
                        (tab) => tab.key === targetKey
                    )
                    newActiveKey =
                        currentTabIndex > 0
                            ? tabs[currentTabIndex - 1].key
                            : undefined
                }
                setTabs(newTabs)
                setActiveKey(newActiveKey)
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const onEdit = (targetKey, action) => {
        setActiveKey(targetKey)
        if (action === 'add') {
            setOpenAdd(true)
        } else {
            remove(targetKey)
        }
    }

    const [form] = Form.useForm()

    const handleAdd = (value) => {
        const payload = {
            name: value.name,
            type: 'TEST',
            subjectId: coursesData.subjectId,
            courseId: coursesData._id,
            educations: coursesData.educations,
        }
        dispatch(createExamDataRequest(payload))
        dispatch(getCourseDetailRequest(coursesData._id))
    }
    return (
        <>
            {examList?.length > 0 ? (
                <div>
                    <Tabs
                        type="editable-card"
                        onChange={onChange}
                        activeKey={activeKey}
                        onEdit={onEdit}
                        items={tabs}
                        pagination={{ pageSize: 5 }}
                    ></Tabs>
                </div>
            ) : (
                <>
                    <Button type="primary" onClick={() => setOpenAdd(true)}>
                        Thêm bài Thi
                    </Button>
                </>
            )}
            <Modal
                title="Thêm bài thi"
                open={openAdd}
                onOk={() => form.submit()}
                onCancel={() => setOpenAdd(false)}
                okText="Thêm"
                cancelText="Hủy"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAdd}
                    onFinishFailed={(err) => console.log(err)}
                    autoComplete="off"
                    initialValues={{ plan: 'PREMIUM' }}
                >
                    <Form.Item
                        name="name"
                        label="Tên bài thi"
                        rules={[
                            {
                                required: true,
                                message: 'Tên bài thi không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập Tên bài thi" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
