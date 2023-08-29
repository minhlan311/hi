import {
    Modal,
    Button,
    Form,
    Input,
    InputNumber,
    Row,
    Col,
    Table,
    Tag,
    Space,
    Popconfirm,
    message,
    Tooltip,
} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import {
    addCodeRequest,
    addCodeSelector,
    deleteCodeRequest,
    getListCodeRequest,
    listCodeSelector,
} from '../../../../../slices/activationCode'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    deleteExamDataRequest,
    deleteExamDataSelector,
} from '../../../../../slices/exam'
import { DeleteOutlined } from '@ant-design/icons'

const ActiveCode = (props) => {
    const { open, setIsModalActiveCode, examData, refreshPage } = props
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Mã code',
            key: 'activationCode',
            dataIndex: 'activationCode',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giới hạn',
            key: 'limitAccess',
            dataIndex: 'limitAccess',
            align: 'center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '_id',
            align: 'center',
            render: (status) => (
                <>
                    <Tag color="blue" key={status}>
                        {status}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Hành động',
            key: '_id',
            width: '20%',
            align: 'center',
            render: (_, record) => (
                <div className="display-center">
                    <Space size="middle">
                        <Tooltip title="Xóa">
                            <Popconfirm
                                placement="right"
                                title={'Xác nhận xoá mã kích hoạt?'}
                                okText="Có"
                                cancelText="Không"
                                onConfirm={(event) =>
                                    deleteCodeActive(event, record)
                                }
                            >
                                <DeleteOutlined style={{ color: 'red' }} />
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                </div>
            ),
        },
    ]
    const history = useHistory()
    const initParams = {
        page: 0,
        size: 20,
    }
    const [paramRequest, setParamRequest] = useState(initParams)
    const addCode = useSelector(addCodeSelector)
    const deleteExamData = useSelector(deleteExamDataSelector)
    const listCode = useSelector(listCodeSelector)
    const refreshTable = () => {
        setParamRequest({ ...paramRequest, page: 0 })
    }

    useEffect(() => {
        const body = {
            filterQuery: {
                targetId: examData._id,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getListCodeRequest(body))
    }, [examData._id, paramRequest])
    const deleteTestById = () => {
        dispatch(deleteExamDataRequest(examData._id))
    }
    const deleteCodeActive = (e, value) => {
        dispatch(deleteCodeRequest(value._id))
        refreshTable()
        message.success('Xóa mã code thành công')
    }
    useEffect(() => {
        if (addCode.status === 'success') {
            refreshTable()
            form.resetFields()
            message.success('Tạo mã code thành công')
        }
    }, [addCode])
    useEffect(() => {
        if (deleteExamData.status === 'success') {
            setIsModalActiveCode(false)
            refreshPage()
        }
    }, [deleteExamData])
    const onFinish = (values) => {
        const payload = {
            targetId: examData._id,
            targetModel: examData.type,
            limitAccess: values.limitAccess,
            activationCode: values.activationCode,
        }
        dispatch(addCodeRequest(payload))
    }
    const renderTable = useMemo(() => {
        return <Table columns={columns} dataSource={listCode.data} bordered />
    }, [paramRequest, listCode])
    const handleOk = () => {
        if (examData.plan === 'PREMIUM' && listCode.data < 1) {
            message.error('Bạn cần tạo mã Code để tiếp tục')
        } else {
            setIsModalActiveCode(false)
            history.push(`/mentor/exams/${examData._id}/questions`)
        }
    }
    return (
        <div>
            <Modal
                title="Tạo mã kích hoạt"
                open={open}
                onOk={handleOk}
                onCancel={deleteTestById}
                okText="Tiếp tục"
                cancelText="Hủy"
                width={750}
            >
                <Form
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Mã kích hoạt"
                                name="activationCode"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mã kích hoạt!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Giới hạn số lượng"
                                name="limitAccess"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập giới hạn số lượng mã!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    style={{ width: 150 }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label=" ">
                                <Button type="primary" htmlType="submit">
                                    Thêm{' '}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {renderTable}
            </Modal>
        </div>
    )
}

export default ActiveCode
