/* eslint-disable react-hooks/exhaustive-deps */
import {
    Card,
    Space,
    Typography,
    Select,
    Button,
    Input,
    Empty,
    Form,
    List,
    Drawer,
    Tooltip,
    Popover,
    Badge,
    Spin,
    message,
} from 'antd'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    DeleteOutlined,
    SearchOutlined,
    DownloadOutlined,
    EyeOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage } from '../../../services/storage'
import mtzDocumentImg from '../../../assets/images/homepage/document-img.png'
import mtzFreeIcon from '../../../assets/images/documents-page/free-icon.svg'
import './styles.scss'
import settings from '../../../settings'
import { DOCUMENT_TYPE } from '../../../constants'
import { cloneDeep, debounce, uniqBy } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { FaDollarSign } from 'react-icons/fa'
import ShowProfile from '../../../components/layout/ShowProfile'
import DocumentUploadModal from '../DocumentUploadModal'
import {
    documentsSelector,
    getDocumentsRequest,
} from '../../../slices/document'
import { findSubjectRequest, subjectsSelector } from '../../../slices/subjects'
const { Text } = Typography
const { Meta } = Card

const DocumentListing = ({ type, screen, createdById }) => {
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1919 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const [form] = Form.useForm()
    const [showModalUpload, setShowModalUpload] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useMemo(() => getStorage(USER_INFO), [])
    const [actionUpload, setActionUpload] = useState('')
    // search subjects
    const subjectsData = useSelector(subjectsSelector)
    const [searchSj, setSearchSj] = useState('')

    useEffect(() => {
        if (searchSj !== ' ' && searchSj?.trim()) {
            const payload = {
                filterQuery: {
                    status: 'ACTIVE',
                    search: searchSj,
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
            setFilterData({
                filterQuery: {
                    status: 'ACTIVE',
                },
                options: {
                    limit: limit,
                    page: 1,
                },
            })
        }
    }, [searchSj])

    // set data subject
    const [subjectOption, setSubjectOptions] = useState([])
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

    const documents = useSelector(documentsSelector)
    const documentsList = documents?.data?.docs

    const [data, setData] = useState([])
    const [limit, setLimit] = useState(0)

    useEffect(() => {
        if (isMobile) setLimit(5)
        else if (isTablet) setLimit(6)
        else if (isLaptop) setLimit(8)
        else setLimit(12)
    }, [isDesktop, isLaptop, isTablet, isMobile])

    const [filterData, setFilterData] = useState()
    useEffect(() => {
        if (type) setData([])
        if (limit > 0) {
            setFilterData({
                filterQuery: {
                    type: type === 'ALL' ? undefined : type,
                    status: 'ACTIVE',
                    createdById: createdById,
                },
                options: {
                    limit: limit,
                    page: 1,
                },
            })
        }
    }, [limit, type])

    const onChangeFilter = () => {
        const { subjectId, createdAt, viewCountDownCount, plan, keyword } =
            form.getFieldsValue()

        setData([])
        const body = {
            subjectId: subjectId?.value,
            plan: plan,
            search: keyword ? keyword : undefined,
        }

        setFilterData((pre) => {
            return {
                filterQuery: { ...pre.filterQuery, ...body },
                options: {
                    limit: limit,
                    page: 1,
                    sort: {
                        createdAt: createdAt,
                        downloaded:
                            viewCountDownCount === 'mostDownload'
                                ? -1
                                : undefined,
                        viewed:
                            viewCountDownCount === 'mostView' ? -1 : undefined,
                    },
                },
            }
        })
    }

    const loadMoreData = () => {
        const cloneFilter = cloneDeep(filterData)
        cloneFilter.options.page++
        setFilterData(cloneFilter)
    }

    const handleReset = () => {
        setData([])
        form.resetFields()
        setFilterData({
            filterQuery: {
                status: 'ACTIVE',
            },
            options: {
                limit: limit,
                page: 1,
            },
        })
    }

    useEffect(() => {
        if (filterData || actionUpload)
            dispatch(getDocumentsRequest(filterData))
    }, [filterData, actionUpload])

    useEffect(() => {
        if (documents.status === 'success' && documentsList?.length > 0) {
            const newArr = uniqBy([...data, ...documentsList], '_id')
            setData(newArr)
        }
    }, [documentsList])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClickDocument = (_id) => {
        history.push(`/documents/${btoa(_id)}`)
    }
    const onFinish = (values) => {}
    const onFinishFailed = (errorInfo) => {}

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

    const renderFilterData = useCallback(() => {
        const Loading = () => {
            return (
                <Spin tip="Loading..." style={{ marginTop: '15vh' }}>
                    <div className="content" />
                </Spin>
            )
        }

        if (documents?.status === 'loading' && !data?.length) {
            return (
                <div style={{ height: '50vh' }}>
                    <Loading />
                </div>
            )
        }
        return data?.length > 0 ? (
            <div className="mtz-documents-listing">
                <InfiniteScroll
                    dataLength={data?.length}
                    next={loadMoreData}
                    hasMore={data?.length < documents?.data.totalDocs}
                    loader={
                        documents?.status === 'loading' ? (
                            <div style={{ height: '20vh' }}>
                                <Loading />
                            </div>
                        ) : null
                    }
                    style={{ overflowX: 'hidden', padding: 8 }}
                >
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
                        renderItem={(item) => (
                            <List.Item style={{ padding: 0 }} key={item._id}>
                                <Badge.Ribbon
                                    text={
                                        item.createdById === userInfo._id
                                            ? 'Được đăng bởi bạn'
                                            : null
                                    }
                                    color="gold"
                                    style={{
                                        display:
                                            item.createdById === userInfo._id
                                                ? 'block'
                                                : 'none',
                                    }}
                                >
                                    <Card
                                        hoverable
                                        size="small"
                                        onClick={() =>
                                            handleClickDocument(item._id)
                                        }
                                        cover={
                                            <div style={{ height: 152 }}>
                                                <img
                                                    alt="documents icon"
                                                    src={
                                                        item.image
                                                            ? settings.FILE_URL +
                                                              '/' +
                                                              item.image
                                                            : mtzDocumentImg
                                                    }
                                                />
                                            </div>
                                        }
                                        actions={[
                                            <Tooltip title="Số lượt xem">
                                                <EyeOutlined />
                                                <span className="ml-5">
                                                    {item.viewed}
                                                </span>
                                            </Tooltip>,
                                            <Tooltip title="Số lượt tải">
                                                <DownloadOutlined />
                                                <span className="ml-5">
                                                    {item.downloaded}
                                                </span>
                                            </Tooltip>,
                                        ]}
                                    >
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                                gap: '10px',
                                            }}
                                        >
                                            {item.type ? (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <Tooltip title="Loại tài liệu">
                                                        <Text
                                                            style={{
                                                                background:
                                                                    '#95DCFE',
                                                                maxWidth: '70%',
                                                                padding:
                                                                    '5px 8px',
                                                                borderRadius:
                                                                    '5px',
                                                                color: 'black',
                                                                fontWeight:
                                                                    'bold',
                                                                fontSize:
                                                                    '12px',
                                                                whiteSpace:
                                                                    'nowrap',
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                            }}
                                                        >
                                                            {renderSwitch(
                                                                item.type
                                                            )}
                                                        </Text>
                                                    </Tooltip>
                                                    <div className="documents-tag ">
                                                        {item.plan ===
                                                        'FREE' ? (
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <img
                                                                    alt="eye icon"
                                                                    src={
                                                                        mtzFreeIcon
                                                                    }
                                                                />

                                                                <div
                                                                    style={{
                                                                        color: '#50AA64',
                                                                        fontSize: 13,
                                                                        marginLeft: 5,
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    Miễn phí
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    color: '#DF5534',
                                                                    fontSize: 13,
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <FaDollarSign
                                                                    size={16}
                                                                />
                                                                <div>
                                                                    Có phí
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            <Meta
                                                title={item.name}
                                                description={
                                                    <>
                                                        Người đăng:{' '}
                                                        {item.owner ? (
                                                            <Popover
                                                                content={
                                                                    <ShowProfile
                                                                        id={
                                                                            item
                                                                                .owner
                                                                                ?._id
                                                                        }
                                                                    />
                                                                }
                                                            >
                                                                {
                                                                    item.owner
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
                                                        <Tooltip
                                                            title={
                                                                item.subjectId
                                                                    ?.name
                                                            }
                                                        >
                                                            <span>
                                                                {
                                                                    item
                                                                        .subjectId
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </Tooltip>
                                                    </>
                                                }
                                            />
                                            {item.description ? (
                                                <div
                                                    className="d-flex"
                                                    style={{
                                                        color: '#8f95b2',
                                                        marginTop: -5,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace:
                                                                'nowrap',

                                                            color: 'black',
                                                            height: 20,
                                                            marginLeft: 5,
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.description,
                                                        }}
                                                    ></div>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{ height: 18 }}
                                                ></div>
                                            )}
                                        </Space>
                                    </Card>
                                </Badge.Ribbon>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        ) : (
            <div className="mtz-documents-listing justify-center">
                <Empty
                    description={<span>Hiện không có tài liệu nào!</span>}
                    style={{ marginBottom: 80 }}
                >
                    <Button
                        type="primary"
                        onClick={() => setShowModalUpload(true)}
                    >
                        Đăng tài liệu
                    </Button>
                </Empty>
            </div>
        )
    }, [
        documents,
        data,
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        handleClickDocument,
        loadMoreData,
        setShowModalUpload,
    ])

    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="group-filter-container mb-15">
                {isMobile || isTablet ? (
                    <Form form={form} className="d-space-flex">
                        {' '}
                        <Form.Item>
                            <Space>
                                <Button onClick={() => setOpen(!open)}>
                                    Lọc
                                </Button>

                                {screen === 'mentor' ? (
                                    isMobile ? (
                                        <div>
                                            <Tooltip title="Đăng tải tài liệu">
                                                <Button
                                                    type="primary"
                                                    onClick={() =>
                                                        setShowModalUpload(true)
                                                    }
                                                    icon={<PlusOutlined />}
                                                ></Button>
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    setShowModalUpload(true)
                                                }
                                                icon={<PlusOutlined />}
                                            >
                                                Đăng tải tài liệu
                                            </Button>
                                        </div>
                                    )
                                ) : null}
                            </Space>
                        </Form.Item>
                        <Form.Item
                            name="keyword"
                            label=""
                            style={isMobile ? { width: '100%' } : null}
                        >
                            <Input
                                placeholder="Tìm kiếm..."
                                prefix={<SearchOutlined />}
                                allowClear
                                onChange={debounce(onChangeFilter, 800)}
                                style={
                                    isMobile
                                        ? { width: '100%', marginLeft: 10 }
                                        : null
                                }
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div
                            className="group-filter-left mt-10 mb-10"
                            style={{ width: '83%' }}
                        >
                            <Form.Item
                                name="subjectId"
                                label=""
                                style={{ minWidth: 155, maxWidth: 250 }}
                            >
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
                            <Form.Item
                                name="createdAt"
                                label=""
                                style={{ width: 120 }}
                            >
                                <Select
                                    className="mr-15"
                                    placeholder="Ngày tải lên"
                                    allowClear
                                    onChange={onChangeFilter}
                                    options={[
                                        {
                                            value: '-1',
                                            label: 'Mới nhất',
                                        },
                                        {
                                            value: '1',
                                            label: 'Cũ nhất',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="viewCountDownCount" label="">
                                <Select
                                    className="mr-15"
                                    placeholder="Chọn lượt xem, tải"
                                    onChange={onChangeFilter}
                                    allowClear
                                    options={[
                                        {
                                            value: 'mostDownload',
                                            label: 'Tải xuống nhiều nhất',
                                        },
                                        {
                                            value: 'mostView',
                                            label: 'Xem nhiều nhất',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="plan" label="">
                                <Select
                                    className="mr-15"
                                    placeholder="Chọn loại tài liệu"
                                    onChange={onChangeFilter}
                                    allowClear
                                    options={[
                                        {
                                            value: 'FREE',
                                            label: 'Miễn phí',
                                        },
                                        {
                                            value: 'PREMIUM',
                                            label: 'Có tính phí',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Tooltip title="Xóa bộ lọc">
                                <Button
                                    className="mr-15"
                                    onClick={handleReset}
                                    icon={<DeleteOutlined />}
                                ></Button>
                            </Tooltip>
                            {screen === 'mentor' ? (
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={() => setShowModalUpload(true)}
                                        icon={<PlusOutlined />}
                                    >
                                        Đăng tải tài liệu
                                    </Button>
                                </Form.Item>
                            ) : null}
                        </div>
                        <div className="group-filter-right">
                            <Form.Item
                                name="keyword"
                                label=""
                                style={{ width: 200 }}
                            >
                                <Input
                                    placeholder="Tìm kiếm..."
                                    prefix={<SearchOutlined />}
                                    allowClear
                                    onChange={debounce(onChangeFilter, 800)}
                                />
                            </Form.Item>
                        </div>
                    </Form>
                )}
            </div>
            <Drawer
                title="Lọc"
                placement="right"
                onClose={() => setOpen(!open)}
                open={isMobile || isTablet ? open : false}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="subjectId"
                        label=""
                        style={isMobile ? { width: '100%' } : { width: '98%' }}
                    >
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
                    <Form.Item name="createdAt" label="">
                        <Select
                            className="mr-15"
                            placeholder="Ngày tải lên"
                            allowClear
                            onChange={onChangeFilter}
                            options={[
                                {
                                    value: '-1',
                                    label: 'Mới nhất',
                                },
                                {
                                    value: '1',
                                    label: 'Cũ nhất',
                                },
                            ]}
                        />
                    </Form.Item>{' '}
                    <Form.Item
                        name="viewCountDownCount"
                        label=""
                        style={isMobile ? { width: '100%' } : { width: '98%' }}
                    >
                        <Select
                            className="mr-15"
                            placeholder="Chọn lượt xem, tải"
                            onChange={onChangeFilter}
                            allowClear
                            options={[
                                {
                                    value: 'mostDownload',
                                    label: 'Tải xuống nhiều nhất',
                                },
                                {
                                    value: 'mostView',
                                    label: 'Xem nhiều nhất',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="plan" label="">
                        <Select
                            className="mr-15"
                            placeholder="Chọn loại tài liệu"
                            onChange={onChangeFilter}
                            allowClear
                            options={[
                                {
                                    value: 'FREE',
                                    label: 'Miễn phí',
                                },
                                {
                                    value: 'PREMIUM',
                                    label: 'Có tính phí',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Button
                        onClick={handleReset}
                        icon={<DeleteOutlined />}
                        style={{ width: '100%' }}
                    >
                        Xóa bộ lọc
                    </Button>
                </Form>
            </Drawer>

            <DocumentUploadModal
                showModalUpload={showModalUpload}
                setShowModalUpload={setShowModalUpload}
                actionUpload={actionUpload}
                setActionUpload={setActionUpload}
            />
            {renderFilterData()}
        </>
    )
}
export default memo(DocumentListing)
