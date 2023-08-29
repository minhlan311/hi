/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useMemo } from 'react'
import mtzFreeIcon from '../../../assets/images/documents-page/free-icon.svg'
import '../Course/styles.scss'
import {
    SearchOutlined,
    ExclamationCircleFilled,
    EditOutlined,
    DeleteOutlined,
    BarcodeOutlined,
} from '@ant-design/icons'
import {
    Button,
    Empty,
    Input,
    Tooltip,
    Modal,
    Card,
    Space,
    Typography,
    List,
    Pagination,
    Tabs,
    Popover,
} from 'antd'
import {
    documentsSelector,
    getDocumentsRequest,
    deleteDocumentRequest,
} from '../../../slices/document'
import {
    getListEnRollRequest,
    listEnrollSelector,
} from '../../../slices/enroll'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import settings from '../../../settings'
import { DocumentUploadModal } from '../DocumentUploadModal'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage } from '../../../services/storage'
import Meta from 'antd/es/card/Meta'
import { DOCUMENT_TYPE } from '../../../constants'
import { splitText } from '../../../utils/helper'
import { useMediaQuery } from 'react-responsive'
import { FaDollarSign } from 'react-icons/fa'
import mtzCourseImg from '../../../assets/images/homepage/document-img.svg'
import ListCode from '../ListCode'
import ShowProfile from '../../../components/layout/ShowProfile'

const { Text } = Typography

const Document = () => {
    const userInfo = getStorage(USER_INFO)
    const documentsList = useSelector(documentsSelector)
    const enrollLists = useSelector(listEnrollSelector)
    const [showModalUpload, setShowModalUpload] = useState(false)
    const history = useHistory()
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [documentId, setDocumentId] = useState(null)
    const [countUpdate, setCountUpdate] = useState(0)
    const [data, setData] = useState([])
    const [paginate, setPaginate] = useState({
        totalDocs: 0,
        limit: 8,
        totalPages: 1,
        page: 1,
    })

    const [showModalListCode, setShowModalListCode] = useState(false)
    const { confirm } = Modal
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1919 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const confirmDelete = (id) =>
        confirm({
            title: 'Bạn có chắc chắn muốn xóa tài liệu này không?',
            icon: <ExclamationCircleFilled />,
            content: 'Tài liệu sẽ bị xóa vĩnh viễn',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handelDeleteDocument(id)
            },
            onCancel() {},
        })

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            const body = {
                filterQuery: {
                    createdById: userInfo._id,
                },
                options: {
                    limit: paginate.limit,
                    page: paginate.page,
                    sort: { viewed: -1 },
                },
            }
            dispatch(getDocumentsRequest(body))
        }
    }, [dispatch])

    useEffect(() => {
        if (userInfo) {
            const body = {
                filterQuery: {
                    userId: userInfo?._id,
                    targetModel: 'DOCUMENT',
                },
                options: {
                    limit: paginate.limit,
                    page: paginate.page,
                    sort: { viewed: -1 },
                },
            }
            dispatch(getListEnRollRequest(body))
        }
    }, [dispatch])
    const handelEditDocument = (id) => {
        setDocumentId(id)
        setShowModalUpload(true)
    }
    const handelDeleteDocument = (id) => {
        dispatch(deleteDocumentRequest(id))
        const body = {
            filterQuery: {
                createdById: userInfo._id,
            },
            options: {
                limit: paginate.limit,
                page: paginate.page,
                sort: { viewed: -1 },
            },
        }
        setTimeout(() => {
            dispatch(getDocumentsRequest(body))
        }, 300)
    }

    const EmptyCustom = () => (
        <Empty
            description={<span>Hiện không tài liệu nào!</span>}
            style={{ margin: '50px 0' }}
        >
            <Button
                type="primary"
                onClick={() => {
                    history.push('/documents')
                }}
            >
                Thêm tài liệu
            </Button>
        </Empty>
    )

    useEffect(() => {
        setData(documentsList?.data?.docs)
        setPaginate({
            limit: documentsList?.data.limit,
            page: documentsList?.data.page,
            totalDocs: documentsList?.data.totalDocs,
            totalPages: documentsList?.data.totalPages,
        })
    }, [documentsList])

    const [search, setSearch] = useState('')
    useEffect(() => {
        if (search) {
            let docs = data?.filter((data) =>
                data.name.toLowerCase().includes(search.toLowerCase())
            )
            setData(docs)
        } else {
            setData(documentsList?.data?.docs)
            setPaginate({
                limit: documentsList?.data.limit,
                page: parseInt(documentsList?.data.page),
                totalDocs: documentsList?.data.totalDocs,
                totalPages: documentsList?.data.totalPages,
            })
        }
    }, [search])

    const handelChangePage = (page) => {
        const body = {
            filterQuery: {
                ownerId: userInfo?._id,
            },
            options: {
                limit: paginate.limit,
                page: page,
                sort: { viewed: -1 },
            },
        }
        dispatch(getDocumentsRequest(body))
    }

    const renderSwitch = (type) => {
        switch (type) {
            case DOCUMENT_TYPE.CURRICULUM:
                return 'Giáo trình'
            case DOCUMENT_TYPE.SLIDE:
                return 'Slide'
            case DOCUMENT_TYPE.EXAM:
                return 'Đề thi thử'
            default:
                return 'Tài liệu tổng hợp'
        }
    }

    const updateCode = (id) => {
        setDocumentId(id)
        setShowModalListCode(true)
    }
    const actions = (data) => {
        const actions = [
            <Tooltip title="Sửa tài liệu">
                <EditOutlined
                    onClick={(e) => {
                        e.stopPropagation()
                        handelEditDocument(data._id)
                    }}
                />
            </Tooltip>,
            <Tooltip title="Xóa tài liệu">
                <DeleteOutlined
                    onClick={(e) => {
                        e.stopPropagation()
                        confirmDelete(data._id)
                    }}
                />
            </Tooltip>,
        ]
        if (data.plan === 'PREMIUM') {
            actions.push(
                <Tooltip title="Mã code">
                    <BarcodeOutlined
                        key="code"
                        onClick={(e) => {
                            e.stopPropagation()
                            updateCode(data._id)
                        }}
                    />
                </Tooltip>
            )
        }
        return actions
    }
    const Documents = () => {
        return data?.length > 0 ? (
            <List
                grid={{
                    gutter: 16,
                    column:
                        (isMobile && 1) ||
                        (isTablet && 2) ||
                        (isLaptop && 4) ||
                        (isDesktop && 6),
                }}
                dataSource={data}
                renderItem={(data) => (
                    <List.Item style={{ padding: 0 }}>
                        <Card
                            size="small"
                            cover={
                                <div style={{ height: '160px' }}>
                                    <img
                                        alt="documents icon"
                                        src={
                                            data.image
                                                ? settings.FILE_URL +
                                                  '/' +
                                                  data.image
                                                : mtzCourseImg
                                        }
                                        style={{
                                            width: '100%',
                                            height: ' 100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            }
                            actions={actions(data)}
                            onClick={() =>
                                history.push(`/documents/${btoa(data._id)}`)
                            }
                            hoverable
                        >
                            <Space
                                direction="vertical"
                                style={{ width: '100%' }}
                            >
                                {data.type ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                background: '#95DCFE',
                                                maxWidth: '70%',
                                                padding: '5px 8px',
                                                borderRadius: '5px',
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {renderSwitch(data.type)}
                                        </Text>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {data.plan === 'FREE' ? (
                                                <>
                                                    <img
                                                        alt="eye icon"
                                                        src={mtzFreeIcon}
                                                        style={{
                                                            marginRight: 5,
                                                        }}
                                                    />

                                                    <div
                                                        style={{
                                                            color: '#50AA64',
                                                            fontSize: 13,
                                                        }}
                                                    >
                                                        {' '}
                                                        Miễn phí
                                                    </div>
                                                </>
                                            ) : (
                                                <div
                                                    style={{
                                                        color: '#DF5534',
                                                        fontSize: 13,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <FaDollarSign size={18} />
                                                    <div>Có phí</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <Meta
                                    title={splitText(data.name, 31)}
                                    className="my-0"
                                    description={
                                        <>
                                            Người đăng:{' '}
                                            {data.owner ? (
                                                <Popover
                                                    content={
                                                        <ShowProfile
                                                            id={data.owner?._id}
                                                        />
                                                    }
                                                >
                                                    {data.owner?.fullName}
                                                </Popover>
                                            ) : (
                                                'MentorZ'
                                            )}
                                        </>
                                    }
                                />
                                <Meta
                                    description={
                                        <>
                                            Môn học:{' '}
                                            <span>
                                                {data.description
                                                    ? splitText(
                                                          data.subjectId?.name,
                                                          30
                                                      )
                                                    : splitText('Môn', 30)}
                                            </span>
                                        </>
                                    }
                                />
                                <Meta
                                    description={
                                        <div
                                            className="dangerHTML"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.description,
                                            }}
                                        ></div>
                                    }
                                />
                            </Space>
                        </Card>
                    </List.Item>
                )}
            ></List>
        ) : (
            <EmptyCustom />
        )
    }

    const DocumentsPurchased = () => {
        return enrollLists.data?.length > 0 ? (
            <List
                grid={{
                    gutter: 16,
                    column:
                        (isMobile && 1) ||
                        (isTablet && 2) ||
                        (isLaptop && 4) ||
                        (isDesktop && 6),
                }}
                dataSource={enrollLists.data}
                renderItem={(data) => (
                    <List.Item style={{ padding: 0 }}>
                        <Card
                            onClick={() =>
                                history.push(
                                    `/documents/${btoa(data.document._id)}`
                                )
                            }
                            hoverable
                            size="small"
                            cover={
                                <div style={{ height: '160px' }}>
                                    <img
                                        alt="documents icon"
                                        src={
                                            data.document.image
                                                ? settings.FILE_URL +
                                                  '/' +
                                                  data.document.image
                                                : mtzCourseImg
                                        }
                                        style={{
                                            width: '100%',
                                            height: ' 100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            }
                        >
                            <Space
                                direction="vertical"
                                style={{ width: '100%' }}
                            >
                                {data.type ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                background: '#95DCFE',
                                                maxWidth: '70%',
                                                padding: '5px 8px',
                                                borderRadius: '5px',
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {renderSwitch(data.type)}
                                        </Text>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {data.document.plan === 'FREE' ? (
                                                <>
                                                    <img
                                                        alt="eye icon"
                                                        src={mtzFreeIcon}
                                                        style={{
                                                            marginRight: 5,
                                                        }}
                                                    />

                                                    <div
                                                        style={{
                                                            color: '#50AA64',
                                                            fontSize: 13,
                                                        }}
                                                    >
                                                        {' '}
                                                        Miễn phí
                                                    </div>
                                                </>
                                            ) : (
                                                <div
                                                    style={{
                                                        color: '#DF5534',
                                                        fontSize: 13,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <FaDollarSign size={18} />
                                                    <div>Có phí</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <Meta
                                    title={splitText(data.document.name, 31)}
                                    className="my-0"
                                    description={
                                        <>
                                            Người đăng:{' '}
                                            {data.document.owner ? (
                                                <Popover
                                                    content={
                                                        <ShowProfile
                                                            id={
                                                                data.document
                                                                    .owner?._id
                                                            }
                                                        />
                                                    }
                                                >
                                                    {
                                                        data.document.owner
                                                            ?.fullName
                                                    }
                                                </Popover>
                                            ) : (
                                                'MentorZ'
                                            )}
                                        </>
                                    }
                                />
                                <Meta
                                    description={
                                        <>
                                            Môn học:{' '}
                                            {data?.document?.subjectId?.name}
                                        </>
                                    }
                                />
                                <Meta
                                    description={
                                        <div
                                            className="dangerHTML"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.document
                                                    ?.description,
                                            }}
                                        ></div>
                                    }
                                />
                            </Space>
                        </Card>
                    </List.Item>
                )}
            ></List>
        ) : (
            <EmptyCustom />
        )
    }

    useEffect(() => {
        if (countUpdate > 0) {
            const body = {
                filterQuery: {
                    ownerId: userInfo?._id,
                },
                options: {
                    limit: paginate.limit,
                    page: paginate.page,
                    sort: { viewed: -1 },
                },
            }
            dispatch(getDocumentsRequest(body))
        }
    }, [countUpdate])

    const items = [
        {
            key: '3',
            label: 'Tài liệu của tôi',
            children: <Documents />,
        },
        {
            key: '4',
            label: 'Tài liệu Đã mua',
            children: <DocumentsPurchased />,
        },
    ]

    return (
        <>
            <div className="prf-main pb-30">
                <div
                    style={
                        isMobile || isTablet
                            ? null
                            : {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                              }
                    }
                >
                    <h2 style={{ marginTop: 0 }}>Quản lý tài liệu</h2>
                    <div>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm ..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: 50 }}>
                    <Tabs defaultActiveKey="3" items={items} />
                </div>
                {data?.length > 7 || paginate.page > 1 ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            current={paginate.page}
                            pageSize={paginate.limit}
                            defaultCurrent={paginate.page}
                            total={paginate.totalDocs}
                            onChange={(page) => handelChangePage(page)}
                        />
                    </div>
                ) : null}

                {documentId && (
                    <>
                        <DocumentUploadModal
                            showModalUpload={showModalUpload}
                            setShowModalUpload={setShowModalUpload}
                            setUpdateSuccess={setUpdateSuccess}
                            documentId={documentId}
                            setDocumentId={setDocumentId}
                            setCountUpdate={setCountUpdate}
                        />
                        <ListCode
                            documentId={documentId}
                            isModalOpen={showModalListCode}
                            handleCancel={() => {
                                setShowModalListCode(false)
                            }}
                        />
                    </>
                )}
            </div>
        </>
    )
}
export default Document
