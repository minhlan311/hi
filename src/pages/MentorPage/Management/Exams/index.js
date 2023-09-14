import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import MentorLayout from '../../../../components/layout/MentorLayout'
import {
    Button,
    Card,
    Drawer,
    Empty,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
    Spin,
    Table,
    Tag,
    Tooltip,
} from 'antd'
import {
    DeleteOutlined,
    EditOutlined,
    OrderedListOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteExamDataRequest,
    deleteExamDataSelector,
    examsSelector,
    getExamsRequest,
} from '../../../../slices/exam'

import { Link } from 'react-router-dom'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import DrawerExam from './Drawer/DrawerExam'
import DrawerActiveCode from './Drawer/DrawerActiveCode'
import { debounce } from 'lodash'
import {
    findSubjectRequest,
    subjectsSelector,
} from '../../../../slices/subjects'

const Exams = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const user = getStorage(USER_INFO)

    const [open, setOpen] = useState(false)

    const [openExamDrawer, setOpenExamDrawer] = useState(false)
    const [openListActiveCode, setOpenListActiveCode] = useState(false)

    const [testId, setTestId] = useState()
    const [educationType, setEducationType] = useState('UNIVERSITY')
    // search subjects
    const subjectsData = useSelector(subjectsSelector)
    const [searchSj, setSearchSj] = useState('')
    const [subjectOption, setSubjectOptions] = useState([])
    useEffect(() => {
        if (searchSj !== ' ' && searchSj?.trim()) {
            const payload = {
                filterQuery: {
                    status: 'ACTIVE',
                    search: searchSj,
                    educationType: educationType,
                },
                options: {
                    pagination: false,
                    sort: {
                        position: 1,
                    },
                },
            }
            dispatch(findSubjectRequest(payload))
        } else if (!searchSj) {
            setSubjectOptions([])
        }
    }, [searchSj, educationType])

    // set data subject

    useEffect(() => {
        if (
            subjectsData.status === 'success' &&
            subjectsData?.data?.length > 0 &&
            searchSj
        ) {
            const subjects = []
            subjectsData?.data?.forEach((item) =>
                subjects.push({ label: item.name, value: item._id })
            )
            setSubjectOptions(subjects)
        } else if (
            subjectsData.status === 'success' &&
            subjectsData?.data?.length === 0
        ) {
            setSubjectOptions([])
        }
    }, [subjectsData, searchSj])
    const [data, setData] = useState([])

    const [filterData, setFilterData] = useState({
        filterQuery: {
            createdById: user._id,
        },
        options: {
            limit: 10,
            page: 0,
        },
    })

    const onChangeFilter = () => {
        setData([])
        const { subjectId, plan, status, type, keyword } = form.getFieldsValue()
        const sortBody = {}

        const body = {
            subjectId: subjectId,
            plan: plan,
            status: status,
            search: keyword,
            type: type,
        }

        setFilterData((pre) => {
            return {
                filterQuery: { ...pre.filterQuery, ...body },
                options: {
                    ...pre.options,
                    limit: 10,
                    page: 0,
                    sort: sortBody,
                },
            }
        })
    }

    useEffect(() => {
        dispatch(getExamsRequest(filterData))
    }, [user._id, filterData])

    const [form] = Form.useForm()
    const examData = useSelector(deleteExamDataSelector)

    const dispatch = useDispatch()
    const exams = useSelector(examsSelector)

    useEffect(() => {
        if (exams.status === 'success') {
            setData(exams.data)
        }
    }, [exams])

    const editTest = (record) => {
        setTestId(record._id)
        setOpenExamDrawer(true)
    }

    const onResetFilter = () => {
        form.resetFields()
        onChangeFilter()
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            key: 'stt',
            width: '3%',
            render: (id, record, index) => {
                ++index
                return index
            },
            showSorterTooltip: false,
        },
        {
            title: 'Tên bài thi thử',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (_, record) => (
                <Link className="name-table" onClick={() => editTest(record)}>
                    {record.name}
                </Link>
            ),
        },
        {
            title: 'Phí',
            dataIndex: 'plan',
            key: '_id',
            align: 'center',
            width: '10%',
            render: (_, { plan }) => {
                if (plan === 'PREMIUM') {
                    const color = '#faad14'

                    return (
                        <Tag color={color} key={plan}>
                            {'Mất phí'.toUpperCase()}
                        </Tag>
                    )
                } else {
                    const color = 'green'

                    return (
                        <Tag color={color} key={plan}>
                            {'Miễn phí'.toUpperCase()}
                        </Tag>
                    )
                }
            },
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            width: '10%',
            render: (_, { type }) => {
                if (type === 'TEST') {
                    const color = 'geekblue'

                    return (
                        <Tag color={color} key={type}>
                            {'Bài Test'.toUpperCase()}
                        </Tag>
                    )
                } else {
                    const color = '#faad14'

                    return (
                        <Tag color={color} key={type}>
                            {'Bài Quiz'.toUpperCase()}
                        </Tag>
                    )
                }
            },
        },
        {
            title: 'DS câu hỏi',
            align: 'center',
            dataIndex: 'countQuestions',
            key: 'countQuestions',
            width: '10%',
            render: (_, record) => {
                return (
                    <Link to={`/mentor/exams/${record._id}/questions`}>
                        {record.countQuestions}
                    </Link>
                )
            },
        },
        {
            title: 'DS làm bài',
            align: 'center',
            dataIndex: 'tested',
            key: 'tested',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            render: (_, { status }) => {
                if (status === 'ACTIVE') {
                    let color = 'green'
                    return (
                        <Tag color={color} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    )
                } else {
                    let color = 'volcano'
                    return (
                        <Tag color={color} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    )
                }
            },
        },
        {
            title: 'Hành động',
            key: '_id',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Danh sách câu hỏi">
                        <Link to={`/mentor/exams/${record._id}/questions`}>
                            <OrderedListOutlined className="list-question-icon" />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa bộ đề">
                        <EditOutlined
                            className="edit-icon"
                            onClick={() => editTest(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa bộ đề">
                        <Popconfirm
                            placement="right"
                            title={'Bạn có muốn xóa bộ đề này?'}
                            onConfirm={(event) => deleteTestById(event, record)}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined style={{ color: 'red' }} />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ]

    const handleChangeKeyword = useCallback(debounce(onChangeFilter, 800), [])

    const refreshPage = () => {
        setTestId(undefined)
        setFilterData({ ...filterData, options: { page: 0 } })
    }

    useEffect(() => {
        if (examData.status === 'success') {
            refreshPage()
        }
    }, [examData])

    const deleteTestById = (e, value) => {
        dispatch(deleteExamDataRequest(value._id))
    }

    const FilterIsMobile = () => {
        return (
            <Drawer
                title="Lọc"
                placement="right"
                onClose={() => setOpen(!open)}
                open={isMobile || isTablet ? open : false}
                width={'65%'}
                style={{ marginTop: 70 }}
            >
                <Form
                    form={form}
                    autoComplete="off"
                    initialValues={{
                        educationType: {
                            value: 'UNIVERSITY',
                            label: 'Đại học',
                        },
                    }}
                >
                    <Form.Item name="educationType">
                        <Select
                            className="mr-15"
                            placeholder="Khối"
                            allowClear
                            onChange={(value) => setEducationType(value)}
                            options={[
                                {
                                    value: 'UNIVERSITY',
                                    label: 'Đại học',
                                },
                                {
                                    value: 'HIGH SCHOOL',
                                    label: 'THPT',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="subjectId" label="">
                        <Select
                            placeholder="Tìm kiếm và chọn môn học"
                            allowClear
                            showSearch
                            labelInValue
                            filterOption={false}
                            onChange={onChangeFilter}
                            notFoundContent={
                                subjectsData.status === 'loading' ? (
                                    <div style={{ height: 120 }}>
                                        <Spin
                                            size="small"
                                            style={{ marginTop: 50 }}
                                            tip="Loading..."
                                        >
                                            <div className="content"></div>
                                        </Spin>
                                    </div>
                                ) : (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    ></Empty>
                                )
                            }
                            onSearch={debounce(
                                (text) => setSearchSj(text),
                                800
                            )}
                            options={subjectOption}
                            style={{
                                width: 200,
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="type" label="">
                        <Select
                            placeholder="Thể loại"
                            className="mr-15"
                            allowClear
                            onChange={onChangeFilter}
                            options={[
                                {
                                    value: 'TEST',
                                    label: 'Bài Test',
                                },
                                {
                                    value: 'QUIZ',
                                    label: 'Bài Quiz',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="status" label="">
                        <Select
                            placeholder="Trạng thái"
                            className="mr-15"
                            onChange={onChangeFilter}
                            allowClear
                            options={[
                                {
                                    value: 'ACTIVE',
                                    label: 'Active',
                                },
                                {
                                    value: 'INACTIVE',
                                    label: 'Inactive',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Button
                        onClick={onResetFilter}
                        className="mr-15"
                        icon={<DeleteOutlined />}
                        style={{ width: '100%' }}
                    >
                        Xóa bộ lọc
                    </Button>
                </Form>
            </Drawer>
        )
    }

    const Filter = () => {
        return (
            <>
                {/* <AddExams openAdd={openAdd} setOpenAdd={setOpenAdd} /> */}
                {isMobile ? <h3>Quản lý đề thi thử</h3> : null}
                {isMobile || isTablet ? (
                    <div className="d-space-flex">
                        <Space>
                            <Form.Item>
                                <Button onClick={() => setOpen(!open)}>
                                    Lọc
                                </Button>
                            </Form.Item>
                            {isTablet ? (
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={onPressCreate}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm bộ đề mới
                                    </Button>
                                </Form.Item>
                            ) : (
                                <Form.Item className="mr-10">
                                    <Tooltip title="Thêm bộ đề mới">
                                        <Button
                                            type="primary"
                                            onClick={onPressCreate}
                                            icon={<PlusOutlined />}
                                        ></Button>
                                    </Tooltip>
                                </Form.Item>
                            )}
                        </Space>
                        <Form.Item
                            name="keyword"
                            style={
                                isMobile
                                    ? { width: '100%', minWidth: 100 }
                                    : null
                            }
                        >
                            <Input
                                placeholder="Tìm kiếm..."
                                prefix={<SearchOutlined />}
                                allowClear
                                onChange={handleChangeKeyword}
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <div className="group-filter-container">
                        <Form
                            form={form}
                            autoComplete="off"
                            className="d-space-flex"
                            initialValues={{
                                educationType: {
                                    value: 'UNIVERSITY',
                                    label: 'Đại học',
                                },
                            }}
                        >
                            <Space>
                                <Form.Item
                                    name="educationType"
                                    style={{ width: 150 }}
                                >
                                    <Select
                                        className="mr-15"
                                        placeholder="Khối"
                                        allowClear
                                        onChange={(value) =>
                                            setEducationType(value)
                                        }
                                        options={[
                                            {
                                                value: 'UNIVERSITY',
                                                label: 'Đại học',
                                            },
                                            {
                                                value: 'HIGH SCHOOL',
                                                label: 'THPT',
                                            },
                                        ]}
                                    ></Select>
                                </Form.Item>
                                <Form.Item
                                    name="type"
                                    label=""
                                    style={{ width: 150 }}
                                >
                                    <Select
                                        placeholder="Thể loại"
                                        allowClear
                                        onChange={onChangeFilter}
                                        options={[
                                            {
                                                value: 'TEST',
                                                label: 'Bài Test',
                                            },
                                            {
                                                value: 'QUIZ',
                                                label: 'Bài Quiz',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="status"
                                    label=""
                                    style={{ width: 150 }}
                                >
                                    <Select
                                        placeholder="Trạng thái"
                                        onChange={onChangeFilter}
                                        allowClear
                                        options={[
                                            {
                                                value: 'ACTIVE',
                                                label: 'Active',
                                            },
                                            {
                                                value: 'INACTIVE',
                                                label: 'Inactive',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="subjectId"
                                    label=""
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        placeholder="Tìm kiếm và chọn môn học"
                                        allowClear
                                        showSearch
                                        labelInValue
                                        filterOption={false}
                                        onChange={onChangeFilter}
                                        notFoundContent={
                                            subjectsData.status ===
                                            'loading' ? (
                                                <div style={{ height: 120 }}>
                                                    <Spin
                                                        size="small"
                                                        style={{
                                                            marginTop: 50,
                                                        }}
                                                        tip="Loading..."
                                                    >
                                                        <div className="content"></div>
                                                    </Spin>
                                                </div>
                                            ) : (
                                                <Empty
                                                    image={
                                                        Empty.PRESENTED_IMAGE_SIMPLE
                                                    }
                                                ></Empty>
                                            )
                                        }
                                        onSearch={debounce(
                                            (text) => setSearchSj(text),
                                            800
                                        )}
                                        options={subjectOption}
                                        style={{
                                            width: 200,
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Tooltip title="Xóa bộ lọc">
                                        <Button
                                            onClick={onResetFilter}
                                            icon={<DeleteOutlined />}
                                        ></Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={onPressCreate}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm bộ đề mới
                                    </Button>
                                </Form.Item>
                            </Space>
                            <div>
                                <Form.Item
                                    name="keyword"
                                    label=""
                                    style={{ width: 200 }}
                                >
                                    <Input
                                        placeholder="Tìm kiếm..."
                                        prefix={<SearchOutlined />}
                                        allowClear
                                        onChange={handleChangeKeyword}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                )}
            </>
        )
    }

    const onPressCreate = () => {
        setTestId(undefined)
        setOpenExamDrawer(true)
    }

    const changePage = (value) => {
        setFilterData((pre) => {
            return {
                filterQuery: pre.filterQuery,
                options: {
                    ...pre.options,
                    page: value,
                },
            }
        })
    }

    const renderTable = useMemo(() => {
        return (
            <Table
                columns={columns}
                dataSource={data.docs}
                bordered
                pagination={{
                    pageSize: data.limit,
                    current: data.page,
                    total: data.totalDocs,
                    onChange: (value) => {
                        changePage(value)
                    },
                }}
                scroll={{
                    x: 1024,
                }}
            />
        )
    }, [data])

    return (
        <>
            <MentorLayout>
                <Card>
                    {Filter()}
                    {FilterIsMobile()}
                    {renderTable}
                </Card>
            </MentorLayout>

            <DrawerExam
                open={openExamDrawer}
                setOpenExamDrawer={setOpenExamDrawer}
                refreshPage={refreshPage}
                testId={testId}
            />
            <DrawerActiveCode
                openListActiveCode={openListActiveCode}
                setOpenListActiveCode={setOpenListActiveCode}
                testId={testId}
            />
        </>
    )
}

export default memo(Exams)
