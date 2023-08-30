/* eslint-disable react-hooks/rules-of-hooks */
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
    Rate,
    Drawer,
    Popover,
    Tooltip,
    Badge,
    Modal,
    Spin,
    message,
} from 'antd'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { USER_INFO } from '../../../constants/storageKeys'

import { getStorage } from '../../../services/storage'
import mtzCourseImg from '../../../assets/images/homepage/document-img.png'
import mtzFreeIcon from '../../../assets/images/documents-page/free-icon.svg'
import mtzMemberImg from '../../../assets/images/homepage/member-img.svg'
import './styles.scss'
import settings from '../../../settings'
import { useConvertSlug } from '../../../hooks'
import { splitText } from '../../../utils/helper'
import { FaDollarSign } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import ShowProfile from '../../../components/layout/ShowProfile'
import { CreateCoursesModal } from '../CreateCoursesModal'
import {
    courseDetailSelector,
    coursesSelector,
    deleteCourseDetailSelector,
    deleteCoursesRequest,
    getCourseDetailRequest,
    getCoursesRequest,
} from '../../../slices/course'
import { cloneDeep, debounce, uniqBy } from 'lodash'
import {
    subjectDetailRequest,
    subjectsDetailSelector,
    findSubjectRequest,
    subjectsSelector,
} from '../../../slices/subjects'

const { Text } = Typography
const { Meta } = Card
const CourseListing = ({ subjectId, screen, mentorId }) => {
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1919 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const [form] = Form.useForm()
    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useMemo(() => getStorage(USER_INFO), [])
    const deleteCourse = useSelector(deleteCourseDetailSelector)
    // set id subject in history
    const [sjId, setSjId] = useState('')
    const subjectDetail = useSelector(subjectsDetailSelector)
    useEffect(() => {
        if (subjectId || history.location?.state) {
            setSjId(subjectId || history.location?.state)
        }
    }, [subjectId, history])
    useEffect(() => {
        if (sjId) {
            dispatch(subjectDetailRequest(sjId))
        }
    }, [sjId])

    // search subjects
    const subjectsData = useSelector(subjectsSelector)
    const [searchSj, setSearchSj] = useState('')

    useEffect(() => {
        if (searchSj !== ' ' && searchSj?.trim()) {
            setSjId('')
            const payload = {
                filterQuery: {
                    status: 'ACTIVE',
                    search: searchSj,
                    mentorId: mentorId ? mentorId : undefined,
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
                    mentorId: mentorId ? mentorId : undefined,
                },
                options: {
                    limit: limit,
                    page: 1,
                },
            })
        }
    }, [searchSj, mentorId])

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
        } else if (
            sjId &&
            subjectDetail.status === 'success' &&
            subjectDetail?.data
        ) {
            setSubjectOptions([
                {
                    label: subjectDetail?.data?.name,
                    value: subjectDetail?.data?._id,
                },
            ])
        }
    }, [subjectsData, subjectDetail, sjId, searchSj])

    const courses = useSelector(coursesSelector)
    const coursesList = courses?.data?.docs

    const [data, setData] = useState([])
    const [type, setType] = useState('')
    const [limit, setLimit] = useState(0)

    const courseDetail = useSelector(courseDetailSelector)
    useEffect(() => {
        if (isMobile) setLimit(5)
        else if (isTablet) setLimit(6)
        else if (isLaptop) setLimit(8)
        else setLimit(12)
    }, [isDesktop, isLaptop, isTablet, isMobile])

    const [filterData, setFilterData] = useState()

    // Load default filter
    useEffect(() => {
        if (limit > 0) {
            setFilterData({
                filterQuery: {
                    status: 'ACTIVE',
                },
                options: {
                    limit: limit,
                    page: 1,
                    sort: {
                        createdAt: -1,
                    },
                },
            })
        }
        if (sjId || mentorId) {
            setData([])
            setFilterData({
                filterQuery: {
                    status: 'ACTIVE',
                    mentorId: mentorId ? mentorId : undefined,
                    subjectId: sjId ? sjId : undefined,
                },
                options: {
                    limit: limit,
                    page: 1,
                    sort: {
                        createdAt: -1,
                    },
                },
            })
            form.setFieldsValue({ subjectId: sjId ? sjId : undefined })
        }
    }, [limit, mentorId, sjId])

    // load change filter
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
                        countAssessment:
                            viewCountDownCount === 'highestRating'
                                ? -1
                                : undefined,
                        countStudents:
                            viewCountDownCount === 'highestParticipant'
                                ? -1
                                : undefined,
                    },
                },
            }
        })
    }

    // load more
    const loadMoreData = () => {
        const cloneFilter = cloneDeep(filterData)
        cloneFilter.options.page++
        setFilterData(cloneFilter)
    }

    // reset filter
    const handleReset = () => {
        setData([])
        setSjId('')
        form.resetFields()
        setFilterData({
            filterQuery: {
                status: 'ACTIVE',
                mentorId: mentorId ? mentorId : undefined,
                subjectId: sjId ? sjId : undefined,
            },
            options: {
                limit: limit,
                page: 1,
            },
        })
    }

    useEffect(() => {
        if (deleteCourse.status === 'success' && type === 'delete') {
            message.success('Xóa khóa học thành công')
            setType('')
        }
    }, [deleteCourse, filterData])

    // find course in filter
    useEffect(() => {
        if (filterData) dispatch(getCoursesRequest(filterData))
    }, [filterData])

    // check data and concat in load more
    useEffect(() => {
        if (courses.status === 'success' && coursesList?.length > 0 && !type) {
            const newArr = uniqBy([...data, ...coursesList], '_id')
            setData(newArr)
        } else if (courses.status === 'success' && type === 'delete') {
            setData([])
        }
    }, [coursesList, courses, type])

    const handleClickCourse = (id, subject, name) => {
        history.push(
            `/courses/${useConvertSlug(subject)}/${useConvertSlug(name)}`,
            {
                courseId: id,
            }
        )
    }

    const onFinish = (values) => {}
    const onFinishFailed = (errorInfo) => {}
    const renderFilterData = useCallback(() => {
        const Loading = () => {
            return (
                <Spin tip="Loading..." style={{ marginTop: '15vh' }}>
                    <div className="content" />
                </Spin>
            )
        }

        if (courses.status === 'loading' && !data?.length)
            return (
                <div style={{ height: '50vh' }}>
                    <Loading />
                </div>
            )
        const actions = (data) => {
            if (screen === 'mentor') {
                const actions = [
                    <Tooltip title="Sửa">
                        <EditOutlined
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowModalUpload(true)

                                setType('update')
                                dispatch(getCourseDetailRequest(data._id))
                            }}
                        />
                    </Tooltip>,
                    <Tooltip title="Xóa">
                        <DeleteOutlined
                            onClick={(e) => {
                                e.stopPropagation()
                                Modal.confirm({
                                    title: 'Xóa khóa học',
                                    content:
                                        'Bạn có chắc chắn muốn xóa khóa học này?',
                                    okText: 'Xóa',
                                    cancelText: 'Hủy',
                                    onCancel: () => {},
                                    onOk: () => {
                                        dispatch(
                                            deleteCoursesRequest(data?._id)
                                        )
                                        setType('delete')
                                    },
                                })
                            }}
                        />
                    </Tooltip>,
                ]
                return actions
            }
            const action = [
                <>
                    <img alt="eye icon" src={mtzMemberImg} />{' '}
                    <Text>{data.countStudents}</Text>
                </>,
                <Rate
                    style={{ fontSize: 14 }}
                    allowHalf
                    allowClear
                    disabled
                    defaultValue={data.avgAssessment}
                />,
            ]
            return action
        }
        return data?.length > 0 ? (
            <div className="mtz-courses-listing">
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < courses?.data.totalDocs}
                    loader={
                        courses?.status === 'loading' ? (
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
                        className={screen === 'mentor' ? null : 'list-card'}
                        renderItem={(item) => (
                            <List.Item key={item._id}>
                                <Badge.Ribbon
                                    text={
                                        item.mentorId === userInfo._id
                                            ? 'Được đăng bởi bạn'
                                            : null
                                    }
                                    color="gold"
                                    style={{
                                        display:
                                            item.mentorId === userInfo._id
                                                ? 'block'
                                                : 'none',
                                    }}
                                >
                                    <Card
                                        cover={
                                            <img
                                                alt="courses icon"
                                                src={
                                                    item.coverMedia
                                                        ? settings.FILE_URL +
                                                          '/' +
                                                          item.coverMedia
                                                        : mtzCourseImg
                                                }
                                                style={{
                                                    objectFit: 'cover',
                                                    height: 170,
                                                    width: '100%',
                                                }}
                                            />
                                        }
                                        actions={actions(item)}
                                        hoverable
                                        onClick={() =>
                                            handleClickCourse(
                                                item._id,
                                                item.subjectId?.name,
                                                item.name
                                            )
                                        }
                                    >
                                        <Space
                                            direction="vertical"
                                            style={{ width: '100%' }}
                                        >
                                            {item.subjectId ? (
                                                <div
                                                    style={
                                                        isMobile
                                                            ? null
                                                            : {
                                                                  width: '100%',
                                                                  display:
                                                                      'flex',
                                                                  justifyContent:
                                                                      'space-between',
                                                                  alignItems:
                                                                      'center',
                                                              }
                                                    }
                                                >
                                                    <Text
                                                        style={{
                                                            background:
                                                                '#95DCFE',
                                                            maxWidth: '68%',
                                                            padding: '5px 8px',
                                                            borderRadius: '5px',
                                                            color: 'black',
                                                            fontWeight: 'bold',
                                                            fontSize: '12px',
                                                            whiteSpace:
                                                                'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                        }}
                                                    >
                                                        {item.subjectId.name}
                                                    </Text>
                                                    <div
                                                        style={
                                                            isMobile
                                                                ? {
                                                                      marginTop: 10,
                                                                  }
                                                                : null
                                                        }
                                                    >
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
                                                title={splitText(item.name, 40)}
                                                className="my-0"
                                                description={
                                                    <>
                                                        Mentor:{' '}
                                                        {item.mentor ? (
                                                            <Popover
                                                                content={
                                                                    <ShowProfile
                                                                        id={
                                                                            item
                                                                                .mentor
                                                                                ?.id
                                                                        }
                                                                    />
                                                                }
                                                            >
                                                                {
                                                                    item.mentor
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
                                                    item.descriptions ? (
                                                        <div
                                                            className="dangerHTMLOneLine "
                                                            dangerouslySetInnerHTML={{
                                                                __html: `${item?.descriptions}`,
                                                            }}
                                                        ></div>
                                                    ) : (
                                                        splitText(
                                                            'Kho tài liệu học tập cho tất cả các học sinh trên cả nước được tạo bởi các giảng viên hàng đầu cả nước được tạo bởi các giảng viên hàng đầu',
                                                            30
                                                        )
                                                    )
                                                }
                                            />
                                        </Space>
                                    </Card>
                                </Badge.Ribbon>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        ) : (
            <div className="mtz-courses-listing justify-center">
                <Empty
                    description={<span>Hiện không có khóa học nào!</span>}
                    style={{ marginBottom: 80 }}
                >
                    <Button
                        type="primary"
                        onClick={() => history.push('/courses')}
                    >
                        Xem thêm khóa học
                    </Button>
                </Empty>
            </div>
        )
    }, [
        courses,
        data,
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        handleClickCourse,
        loadMoreData,
    ])

    const [open, setOpen] = useState(false)

    const [showModalUpload, setShowModalUpload] = useState(false)
    return (
        <>
            {isMobile || isTablet ? (
                <div
                    style={{
                        width: '100%',
                    }}
                    className="d-space-c"
                >
                    {isTablet ? (
                        <Space>
                            <Form.Item name="action">
                                <Button onClick={() => setOpen(!open)}>
                                    Lọc
                                </Button>
                            </Form.Item>
                            {screen === 'mentor' ? (
                                <Form.Item name="action-add">
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setShowModalUpload(true)
                                            setType('create')
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Đăng tải khóa học
                                    </Button>
                                </Form.Item>
                            ) : null}
                        </Space>
                    ) : (
                        <Space>
                            <Form.Item name="action">
                                <Button onClick={() => setOpen(!open)}>
                                    Lọc
                                </Button>
                            </Form.Item>
                            {screen === 'mentor' ? (
                                <Form.Item name="action-add">
                                    <Tooltip title="Đăng tải khóa học">
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setShowModalUpload(true)
                                                setType('create')
                                            }}
                                            icon={<PlusOutlined />}
                                        ></Button>
                                    </Tooltip>
                                </Form.Item>
                            ) : null}
                        </Space>
                    )}

                    <Form
                        form={form}
                        style={
                            isMobile ? { width: '100%', marginLeft: 10 } : null
                        }
                    >
                        <Form.Item name="keyword" label="">
                            <Input
                                placeholder="Tìm kiếm..."
                                prefix={<SearchOutlined />}
                                allowClear
                                onChange={debounce(onChangeFilter, 800)}
                            />
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <div className="group-filter-container mb-15">
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
                            {/* Search subject */}
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

                            <Form.Item name="createdAt" style={{ width: 120 }}>
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
                            <Form.Item
                                name="viewCountDownCount"
                                label=""
                                style={{ width: 200 }}
                            >
                                <Select
                                    className="mr-15"
                                    placeholder="Chọn đánh giá, người tham gia"
                                    onChange={onChangeFilter}
                                    allowClear
                                    options={[
                                        {
                                            value: 'highestRating',
                                            label: 'Đánh giá tốt nhất',
                                        },
                                        {
                                            value: 'highestParticipant',
                                            label: 'Tham gia nhiều nhất',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item name="plan" label="">
                                <Select
                                    className="mr-15"
                                    placeholder="Chọn loại khoá học"
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
                                    onClick={handleReset}
                                    icon={<DeleteOutlined />}
                                ></Button>
                            </Tooltip>
                            {(!isMobile || !isTablet) && screen === 'mentor' ? (
                                <Form.Item style={{ marginLeft: 10 }}>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setShowModalUpload(true)
                                            setType('create')
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Đăng tải khóa học
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
                                    placeholder="Tìm kiếm..."
                                    prefix={<SearchOutlined />}
                                    allowClear
                                    onChange={debounce(onChangeFilter, 800)}
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
                // style={screen !== 'mentor' ? { marginTop: 70 } : null}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ subjectId: subjectId }}
                >
                    <div className="group-filter-left mt-10 mb-10">
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
                                        <Spin
                                            size="small"
                                            style={{ margin: '50px 0' }}
                                        >
                                            <div className="content"></div>
                                        </Spin>
                                    ) : null
                                }
                                onSearch={debounce(
                                    (text) => setSearchSj(text),
                                    800
                                )}
                                options={subjectOption}
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
                        </Form.Item>
                        <Form.Item name="viewCountDownCount" label="">
                            <Select
                                className="mr-15"
                                placeholder="Chọn đánh giá"
                                onChange={onChangeFilter}
                                allowClear
                                options={[
                                    {
                                        value: 'highestRating',
                                        label: 'Đánh giá tốt nhất',
                                    },
                                    {
                                        value: 'highestParticipant',
                                        label: 'Tham gia nhiều nhất',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="plan" label="">
                            <Select
                                className="mr-15"
                                placeholder="Chọn loại khoá học"
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
                            icon={<DeleteOutlined />}
                            style={{ width: '100%' }}
                            onClick={handleReset}
                        >
                            Xóa bộ lọc
                        </Button>
                    </div>
                </Form>
            </Drawer>
            <CreateCoursesModal
                showModalUpload={showModalUpload}
                setShowModalUpload={setShowModalUpload}
                courseData={
                    type === 'update' && courseDetail?.data
                        ? courseDetail?.data
                        : []
                }
                type={type}
                mentorId={mentorId}
            />
            {renderFilterData()}
        </>
    )
}
export default memo(CourseListing)
