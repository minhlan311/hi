import React, { useEffect, useMemo, useState } from 'react'
import {
    Drawer,
    Popconfirm,
    Space,
    Table,
    Tag,
    Tooltip,
    message,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteCodeRequest,
    getListCodeRequest,
    listCodeSelector,
} from '../../../../../slices/activationCode'
import { DeleteOutlined, OrderedListOutlined } from '@ant-design/icons'
const DrawerActiveCode = (props) => {
    const { openListActiveCode, setOpenListActiveCode, testId } = props
    const dispatch = useDispatch()
    const listCode = useSelector(listCodeSelector)
    const onClose = () => {
        setOpenListActiveCode(false)
    }
    const initParams = {
        page: 0,
        size: 20,
    }
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
            title: 'Đã sử dụng',
            key: 'used',
            dataIndex: 'used',
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
                        <Tooltip title="Xem danh sách người dùng">
                            <OrderedListOutlined className="list-question-icon" />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Popconfirm
                                placement="right"
                                title={'Xác nhận xoá mã kích hoạt?'}
                                okText="Có"
                                cancelText="Không"
                                onConfirm={(event) => deleteM(event, record)}
                            >
                                <DeleteOutlined style={{ color: 'red' }} />
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                </div>
            ),
        },
    ]
    const [paramRequest, setParamRequest] = useState(initParams)
    const refreshPage = () => {
        setParamRequest({ ...paramRequest, page: 0 })
    }
    // useEffect(() => {
    //     if (deleteCode.status === 'success') {
    //         refreshPage()
    //         message.success('Xóa thành công!')
    //     }
    // }, [deleteCode.status])
    const deleteM = (e, value) => {
        dispatch(deleteCodeRequest(value._id))
        refreshPage()
        message.success('Xóa thành công!')
    }
    useEffect(() => {
        const body = {
            filterQuery: {
                targetId: testId,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getListCodeRequest(body))
    }, [testId, paramRequest])
    const renderTable = useMemo(() => {
        return <Table columns={columns} dataSource={listCode?.data} bordered />
    }, [paramRequest])
    return (
        <div>
            <Drawer
                title="Danh sách mã kích hoạt"
                placement="right"
                onClose={onClose}
                width={650}
                open={openListActiveCode}
            >
                {renderTable}
            </Drawer>
        </div>
    )
}

export default DrawerActiveCode
