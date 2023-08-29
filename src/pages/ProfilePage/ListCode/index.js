import React, { useEffect, useState } from 'react'
import {
    Button,
    Modal,
    Table,
    Space,
    Popconfirm,
    Tooltip,
    Form,
    Input,
    Row,
    Col,
    message as $message,
} from 'antd'
import { AiOutlineDelete } from 'react-icons/ai'
import './index.scss'

import { useDispatch, useSelector } from 'react-redux'
import {
    getListCodeRequest,
    listCodeSelector,
    addCodeRequest,
    addCodeSelector,
    deleteCodeRequest,
    deleteCodeSelector,
} from '../../../slices/activationCode'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import { useMemo } from 'react'
const ListCode = (props) => {
    const { isModalOpen, handleCancel, documentId } = props

    const dispatch = useDispatch()
    const listCode = useSelector(listCodeSelector)
    const addCode = useSelector(addCodeSelector)
    const user = getStorage(USER_INFO)
    const [form] = Form.useForm()
    const [listCodeDocument, setListCodeDocument] = useState([])
    const [loading, setLoading] = useState(false)
    const deleteCode = useSelector(deleteCodeSelector)

    useEffect(() => {
        if (documentId) {
            const payload = {
                filterQuery: {
                    targetId: documentId,
                    targetModel: 'DOCUMENT',
                    userId: user._id,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getListCodeRequest(payload))
        }
    }, [dispatch, documentId])

    const handelAddCode = (values) => {
        values.limitAccess = parseInt(values.limitAccess)
        const payload = {
            targetId: documentId,
            targetModel: 'DOCUMENT',
            userId: user._id,
            ...values,
        }
        dispatch(addCodeRequest(payload))
    }

    const handleDeleteCode = (id) => {
        const payload = {
            id,
        }
        dispatch(deleteCodeRequest(payload))
    }

    useEffect(() => {
        if (deleteCode.status === 'success') {
            $message.success('Xoá mã code thành công')
            const payload = {
                filterQuery: {
                    targetId: documentId,
                    targetModel: 'DOCUMENT',
                    userId: user._id,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getListCodeRequest(payload))
        }
    }, [deleteCode])
    useEffect(() => {
        if (listCode.status === 'success') {
            setListCodeDocument(listCode.data)
        }
    }, [listCode])

    useEffect(() => {
        if (addCode.status === 'success') {
            setLoading(false)
            $message.success('Thêm mã code thành công')
            const payload = {
                filterQuery: {
                    targetId: documentId,
                    targetModel: 'DOCUMENT',
                    userId: user._id,
                },
                options: {
                    limit: 10,
                },
            }
            dispatch(getListCodeRequest(payload))
            form.resetFields()
        } else if (addCode.status === 'loading') {
            setLoading(true)
        } else if (addCode.status === 'failed') {
            setLoading(false)
            $message.error('Thêm mã code thất bại')
        }
    }, [addCode])
    const columns = [
        {
            title: 'Mã code',
            dataIndex: 'activationCode',
            key: '_id',
        },
        {
            title: 'Đã sử dụng',
            dataIndex: 'used',
            key: '_id',
        },
        {
            title: 'Giới hạn',
            dataIndex: 'limitAccess',
            key: '_id',
        },
        {
            title: 'Hành động',
            key: '_id',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        placement="right"
                        title={'Xác nhận xoá bản ghi?'}
                        okText="Có"
                        cancelText="Không"
                        onConfirm={(_) => handleDeleteCode(record._id)}
                    >
                        <Tooltip placement="top" title="Xóa code">
                            <AiOutlineDelete className="icon-button-delete" />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const tableListCode = useMemo(() => {
        return (
            <Table
                loading={loading}
                dataSource={listCodeDocument}
                columns={columns}
                pagination={{
                    pageSize: 5,
                }}
            />
        )
    }, [listCodeDocument])
    return (
        <Modal
            title="Danh sách mã code"
            open={isModalOpen}
            footer={
                <>
                    <Button onClick={handleCancel}>Đóng</Button>
                </>
            }
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical" onFinish={handelAddCode}>
                <Row gutter={10}>
                    <Col span={10}>
                        <Form.Item
                            label="Mã code"
                            name="activationCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã code',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mã code" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Giới hạn"
                            name="limitAccess"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giới hạn',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập giới hạn" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginTop: '30px' }}
                            >
                                Thêm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {tableListCode}
        </Modal>
    )
}

export default ListCode
