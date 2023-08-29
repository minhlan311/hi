import React, { useEffect, useState } from 'react'
import MentorLayout from '../../../../components/layout/MentorLayout'
import '../../styles.scss'
import {
    Button,
    Card,
    Drawer,
    Form,
    Input,
    Select,
    Space,
    Table,
    Tooltip,
    Typography,
    message,
} from 'antd'
import {
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
    EditOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import ModalOpen from '../../Modal/Pedagogy'
import {
    getPedagogiesRequest,
    pedagogiesSelector,
} from '../../../../slices/pedagogy'
import { useDispatch, useSelector } from 'react-redux'
import { USER_INFO } from '../../../../constants/storageKeys'
import { getStorage } from '../../../../services/storage'

import { compact, debounce, update } from 'lodash'
import axiosInstance from '../../../../utils/axios'
import settings from '../../../../settings'
import {
    ANSWER_PEDAGOGY_PATH,
    PEDAGOGY_PATH,
} from '../../../../constants/paths'
import {
    educationDetailSelector,
    getEducationDetailRequest,
} from '../../../../slices/education'

moment().locale('vi')

const Pedagogies = () => {
    const user = getStorage(USER_INFO)
    const { Text } = Typography
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const pedagogies = useSelector(pedagogiesSelector)
    const [detail, setDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState('')

    const [subjectOptions, setSubjectOptions] = useState([])
    const [loadingTable, setLoadingTable] = useState(false)
    const [type, setType] = useState('')
    const debouncedOnChange = debounce(form.submit, 500)

    const planOptions = [
        { label: 'Miễn phí', value: 'FREE' },
        { label: 'Có phí', value: 'PREMIUM' },
    ]
    const handleOpenModal = (record, type) => {
        setDetail(true)
        setType(type)
        setDataDetail(record)
    }
    const educationDetail = useSelector(educationDetailSelector)
    const educationId = getStorage('educationId')

    useEffect(() => {
        if (educationId) {
            dispatch(getEducationDetailRequest(educationId))
        }
    }, [educationId])

    const subjects = compact(educationDetail?.data?.subjects)
    useEffect(() => {
        if (subjects.length > 0) {
            const subjectOptions = subjects.map((item) => ({
                label: item.name,
                value: item._id,
            }))
            setSubjectOptions(subjectOptions)
        }
    }, [subjects])
    const getQuestionByMentor = (record, status) => {
        const payload = {
            status: status,
            ownerId: status === 'PENDING' ? null : user?._id,
        }
        axiosInstance
            .put(`${settings.API_URL}${PEDAGOGY_PATH}/${record._id}`, payload)
            .then((res) => {
                status === 'PENDING'
                    ? message.success(
                          `Hủy nhận trả lời câu hỏi ${record.name} thành công!`
                      )
                    : message.success(
                          `Nhận trả lời câu hỏi ${record.name} thành công!`
                      )
                debouncedOnChange()
            })
            .catch((err) => {
                message.error(`Nhận trả lời câu hỏi ${record.name} thất bại!`)
            })
    }
    const columns = [
        {
            key: 'name',
            title: 'Tiêu đề',
            dataIndex: 'name',
            width: '25%',
            render: (_, record) => <Text>{record?.name}</Text>,
        },
        {
            key: 'cost',
            title: 'Điểm',
            dataIndex: 'cost',
            render: (text) =>
                text ? <Text type="success">{text}</Text> : <Text>0</Text>,
        },

        {
            key: 'subjectId',
            title: 'Môn học',
            dataIndex: 'subjectId',
            render: (_, { subjectId }) => subjectId?.name,
        },
        {
            key: 'owner',
            title: 'Người hỏi',
            dataIndex: ['owner', 'fullName'],
        },
        {
            key: 'plan',
            title: 'Hình thức',
            dataIndex: 'plan',
            render: (text) =>
                text === 'PREMIUM' ? (
                    <Text type="danger">Có phí</Text>
                ) : (
                    <Text type="success">Miễn phí</Text>
                ),
        },
        {
            key: 'status',
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text) =>
                text === 'LOCK' ? (
                    <Text type="danger">Đã trả lời</Text>
                ) : (
                    <Text type="success">Chưa trả lời</Text>
                ),
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (_, record) => (
                <Text>{moment(record.createdAt).format('DD/MM/YYYY')}</Text>
            ),
        },
        {
            key: 'mentor',
            title: 'Hành động',
            dataIndex: 'mentor',
            align: 'center',
            render: (_, record) => (
                <Space>
                    {record.status === 'PENDING' ? (
                        <Tooltip title="Nhận trả lời">
                            <Button
                                type="primary"
                                onClick={() =>
                                    getQuestionByMentor(record, 'LOCK')
                                }
                                disabled={record.status === 'LOCK'}
                                icon={<ArrowDownOutlined />}
                            ></Button>
                        </Tooltip>
                    ) : (
                        <>
                            {record.ownerId === user?._id && (
                                <Tooltip title="Hủy nhận">
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            getQuestionByMentor(
                                                record,
                                                'PENDING'
                                            )
                                        }
                                        icon={<ArrowUpOutlined />}
                                    ></Button>
                                </Tooltip>
                            )}
                        </>
                    )}

                    {record.status === 'LOCK' &&
                        record.ownerId === user?._id && (
                            <Tooltip title="Trả lời câu hỏi">
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        handleOpenModal(record, 'reply')
                                    }
                                    icon={<EditOutlined />}
                                ></Button>
                            </Tooltip>
                        )}

                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"
                            onClick={() => handleOpenModal(record, 'detail')}
                            icon={<EyeOutlined />}
                        ></Button>
                    </Tooltip>
                </Space>
            ),
        },
    ]
    useEffect(() => {
        dispatch(getPedagogiesRequest())
    }, [])

    useEffect(() => {
        if (pedagogies.data) {
            setLoadingTable(false)
        }
    }, [pedagogies.data])

    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })

    const [open, setOpen] = useState(false)
    const onFinish = (values) => {
        setLoadingTable(true)
        const body = {
            filterQuery: {
                ...values,
            },
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        }
        dispatch(getPedagogiesRequest(body))
    }
    return (
        <>
            <div>
                {isMobile ? <h3>Danh sách câu hỏi</h3> : null}
                {isMobile || isTablet ? (
                    <div className="d-space-flex" style={{ width: '100%' }}>
                        <Form.Item>
                            <Button onClick={() => setOpen(!open)}>Lọc</Button>
                        </Form.Item>
                        <Form.Item
                            name="search"
                            label=""
                            style={
                                isMobile
                                    ? {
                                          width: '100%',
                                          minWidth: 100,
                                          marginLeft: 10,
                                      }
                                    : null
                            }
                        >
                            <Input
                                placeholder="Tìm kiếm..."
                                prefix={<SearchOutlined />}
                                allowClear
                                onChange={() => {
                                    debouncedOnChange()
                                }}
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <div className="group-filter-container">
                        <Form
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className="group-filter-left mt-10 mb-10">
                                <Form.Item
                                    name="subjectId"
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        className="mr-15"
                                        placeholder="Môn học"
                                        allowClear
                                        options={subjectOptions}
                                        onChange={form.submit}
                                    ></Select>
                                </Form.Item>
                                <Form.Item name="plan" style={{ width: 200 }}>
                                    <Select
                                        className="mr-15"
                                        placeholder="Hình thức"
                                        allowClear
                                        options={planOptions}
                                        onChange={form.submit}
                                    />
                                </Form.Item>

                                <Form.Item name="status" style={{ width: 200 }}>
                                    <Select
                                        className="mr-15"
                                        placeholder="Trạng thái"
                                        allowClear
                                        options={[
                                            {
                                                value: 'PENDING',
                                                label: 'Chưa trả lời',
                                            },
                                            {
                                                value: 'LOCK',
                                                label: 'Đã trả lời',
                                            },
                                        ]}
                                        onChange={form.submit}
                                    />
                                </Form.Item>
                                <Tooltip title="Xóa bộ lọc">
                                    <Button
                                        onClick={() => {
                                            form.resetFields()
                                            form.submit()
                                        }}
                                        icon={<DeleteOutlined />}
                                    ></Button>
                                </Tooltip>
                            </div>
                            <div className="group-filter-right">
                                <Form.Item
                                    name="search"
                                    label=""
                                    style={{ width: 200 }}
                                >
                                    <Input
                                        placeholder="Tìm kiếm..."
                                        prefix={<SearchOutlined />}
                                        allowClear
                                        onChange={() => {
                                            debouncedOnChange()
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                )}
                <Drawer
                    title="Lọc"
                    placement="right"
                    onClose={() => setOpen(!open)}
                    open={isMobile || isTablet ? open : false}
                >
                    <Form form={form} onFinish={onFinish} autoComplete="off">
                        <Form.Item name="subjectId" label="">
                            <Select
                                className="mr-15"
                                placeholder="Môn học"
                                allowClear
                                options={subjectOptions}
                                onChange={form.submit}
                            ></Select>
                        </Form.Item>
                        <Form.Item name="plan" label="">
                            <Select
                                className="mr-15"
                                placeholder="Hình thức"
                                allowClear
                                options={planOptions}
                                onChange={form.submit}
                            />
                        </Form.Item>

                        <Form.Item name="plan" label="">
                            <Select
                                className="mr-15"
                                placeholder="Trạng thái"
                                allowClear
                                options={[
                                    {
                                        value: 'FREE',
                                        label: 'Chưa trả lời',
                                    },
                                    {
                                        value: 'PREMIUM',
                                        label: 'Đã trả lời',
                                    },
                                ]}
                                onChange={form.submit}
                            />
                        </Form.Item>
                        <Button
                            onClick={() => {
                                form.resetFields()
                                form.submit()
                            }}
                            className="mr-15"
                            icon={<DeleteOutlined />}
                            style={{ width: '100%' }}
                        >
                            Xóa lựa chọn
                        </Button>
                    </Form>
                </Drawer>
                <Table
                    loading={loadingTable}
                    bordered
                    columns={columns}
                    dataSource={pedagogies.data}
                    scroll={{
                        x: 1024,
                    }}
                />
            </div>
            <ModalOpen
                dataDetail={dataDetail}
                onSuccess={() => {
                    dispatch(
                        getPedagogiesRequest({
                            filterQuery: {
                                ...form.getFieldsValue(),
                            },
                            options: {
                                sort: {
                                    createdAt: -1,
                                },
                            },
                        })
                    )
                }}
                detail={detail}
                setDetail={setDetail}
                type={type}
            />
        </>
    )
}

export default Pedagogies
