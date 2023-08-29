/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.scss'
import { SearchOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Empty,
    Input,
    List,
    Pagination,
    Tabs,
    Tooltip,
} from 'antd'
import { Link } from 'react-router-dom'
import { useConvertSlug } from '../../../hooks'
import settings from '../../../settings'
import { useMediaQuery } from 'react-responsive'
import mtzCourseImg from '../../../assets/images/homepage/document-img.png'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import {
    getProgressionRequest,
    progressionSelector,
} from '../../../slices/progression'
import { uniqBy } from 'lodash'

export default function Course() {
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1919 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const dispatch = useDispatch()
    const user = getStorage(USER_INFO)
    const progression = useSelector(progressionSelector)
    const [filter, setFilter] = useState()
    const [limit, setLimit] = useState(0)

    useEffect(() => {
        if (isMobile) setLimit(5)
        else if (isTablet) setLimit(6)
        else if (isLaptop) setLimit(8)
        else if (isDesktop) setLimit(12)
    }, [isDesktop, isLaptop, isTablet, isMobile])

    useEffect(() => {
        if (limit > 0) {
            const payload = {
                filterQuery: {
                    userId: user._id,
                    targetModel: 'COURSE',
                },

                // options: {
                //     limit: limit,
                //     page: 1,
                // },
                options: {
                    pagination: false,
                },
            }
            setFilter(payload)
        }
    }, [limit])

    useEffect(() => {
        if (filter) dispatch(getProgressionRequest(filter))
    }, [filter])

    const course = progression?.data?.docs
    const history = useHistory()
    const EmptyCustom = () => (
        <Empty
            description={<span>Hiện không có khóa học nào!</span>}
            style={{ margin: '50px 0' }}
        >
            <Button type="primary" onClick={() => history.push('/courses')}>
                Xem thêm khóa học
            </Button>
        </Empty>
    )

    const [search, setSearch] = useState('')
    const [doneList, setDoneList] = useState([])
    const [doingList, setDoingList] = useState([])

    useEffect(() => {
        if (!course) {
            setDoneList([])
            setDoingList([])
            return
        }
        const done = course?.filter((item) =>
            item?.done?.find((f) => f === item.doing)
        )
        setDoneList(done)
        const doing = course?.filter(
            (item) => item?.done?.length < item?.modelInfo?.countTopics
        )
        setDoingList(doing)
    }, [course])
    const HandleClickCourse = (id, subject, name) => {
        history.push(
            `/courses/${useConvertSlug(subject)}/${useConvertSlug(name)}`,
            {
                courseId: id,
            }
        )
    }
    const [study, setStudy] = useState([])
    const [done, setDone] = useState([])
    useEffect(() => {
        setStudy(doingList)
        setDone(doneList)
    }, [doingList, doneList])

    useEffect(() => {
        if (!search) {
            setStudy(doingList)
            setDone(doneList)
        } else {
            const newData = doingList?.filter((data) =>
                data?.modelInfo?.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
            const done = doneList?.filter((data) =>
                data?.modelInfo?.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
            setStudy(newData)
            setDone(done)
        }
    }, [search])
    console.log(study)
    const [pageStudy, setPageStudy] = useState(1)
    const handelChangePageStudy = (current) => {
        setPageStudy(current)
    }

    const [pageDone, setPageDone] = useState(1)
    const handelChangePageDone = (current) => {
        setPageDone(current)
    }
    const Study = () => {
        const startIndex = (pageStudy - 1) * limit
        const endIndex = startIndex + limit
        const studyData = study.slice(startIndex, endIndex)
        return studyData?.length > 0 ? (
            <List
                style={{ width: '100%' }}
                grid={{
                    gutter: 16,
                    column:
                        (isMobile && 1) ||
                        (isTablet && 2) ||
                        (isLaptop && 4) ||
                        (isDesktop && 6),
                }}
                dataSource={uniqBy(studyData, '_id')}
                renderItem={(data) =>
                    data?.modelInfo?.countTopics > 0 ? (
                        <List.Item style={{ padding: 0 }}>
                            <Card
                                hoverable
                                onClick={() =>
                                    HandleClickCourse(
                                        data?.modelInfo?._id,
                                        data?.modelInfo?.subjectId?.name,
                                        data?.modelInfo?.name
                                    )
                                }
                                key={data?._id}
                                size="small"
                                cover={
                                    <img
                                        src={
                                            data?.modelInfo?.coverMedia
                                                ? settings.FILE_URL +
                                                  '/' +
                                                  data?.modelInfo?.coverMedia
                                                : mtzCourseImg
                                        }
                                        alt={data?.modelInfo?.name}
                                        style={{
                                            width: '100%',
                                            height: 150,
                                            objectFit: 'cover',
                                        }}
                                    />
                                }
                            >
                                <div>
                                    <Tooltip
                                        placement="topRight"
                                        title={data?.modelInfo?.name}
                                    >
                                        <h3 className=" two-lines">
                                            {data?.modelInfo?.name}
                                        </h3>
                                    </Tooltip>

                                    <div className="desc">
                                        <div className="desc-item d-flex">
                                            <p className="mr-5">Môn học</p>
                                            <Link to="#">
                                                {
                                                    data?.modelInfo?.subjectId
                                                        ?.name
                                                }
                                            </Link>
                                        </div>
                                        <div className="desc-item d-flex">
                                            <p className="mr-5">Giảng viên</p>
                                            <Link to="#">
                                                {
                                                    data?.modelInfo?.mentor
                                                        ?.fullName
                                                }
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p>Tiến độ hoàn thành</p>

                                    <div className="line">
                                        <div
                                            className="line-complete"
                                            style={{
                                                width: `${
                                                    (data?.done?.length /
                                                        data?.modelInfo
                                                            ?.countTopics) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>

                                    <div
                                        className="d-flex mt-5 ml-5"
                                        style={{
                                            fontSize: 12,
                                            color: 'gray',
                                        }}
                                    >
                                        <div>Còn lại:</div>

                                        <p
                                            style={{
                                                margin: '0 5px',
                                            }}
                                        >
                                            {data?.modelInfo?.countTopics &&
                                            data?.modelInfo?.countTests
                                                ? `${
                                                      data?.modelInfo
                                                          ?.countTopics -
                                                      data?.done?.length
                                                  } chuyên đề, ${
                                                      data?.modelInfo
                                                          ?.countTests
                                                  } bài test`
                                                : data?.modelInfo[0]
                                                      ?.countTopics
                                                ? `${
                                                      data?.modelInfo
                                                          ?.countTopics -
                                                      data?.done?.length
                                                  } chuyên đề.`
                                                : `${data?.modelInfo?.countTests} bài test.`}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    ) : null
                }
            ></List>
        ) : (
            <EmptyCustom />
        )
    }

    const Finish = () => {
        const startIndex = (pageDone - 1) * limit
        const endIndex = startIndex + limit
        const doneData = done.slice(startIndex, endIndex)
        return doneData.length > 0 ? (
            <List
                grid={{
                    gutter: 16,
                    column:
                        (isMobile && 1) ||
                        (isTablet && 2) ||
                        (isLaptop && 4) ||
                        (isDesktop && 6),
                }}
                dataSource={uniqBy(doneData, '_id')}
                renderItem={(item) => (
                    <List.Item style={{ padding: 0 }}>
                        <Card
                            hoverable
                            onClick={() =>
                                HandleClickCourse(
                                    item?.modelInfo?._id,
                                    item?.modelInfo?.subjectId?.name,
                                    item?.modelInfo?.name
                                )
                            }
                            key={item?._id}
                            size="small"
                            cover={
                                <img
                                    src={
                                        item?.modelInfo?.coverMedia
                                            ? settings.FILE_URL +
                                              '/' +
                                              item?.modelInfo?.coverMedia
                                            : mtzCourseImg
                                    }
                                    alt={item?.modelInfo?.name}
                                />
                            }
                        >
                            <div>
                                <Tooltip
                                    placement="topRight"
                                    title={item?.modelInfo?.name}
                                >
                                    <h3 className="title two-lines">
                                        {item?.modelInfo?.name}
                                    </h3>
                                </Tooltip>

                                <div className="desc">
                                    <div className="desc-item d-flex">
                                        <p className="mr-5">Môn học</p>
                                        <Link to="#">
                                            {item?.modelInfo?.subjectId?.name}
                                        </Link>
                                    </div>
                                    <div className="desc-item d-flex">
                                        <p className="mr-5">Giảng viên</p>
                                        <Link to="#">
                                            {item?.modelInfo?.mentor?.fullName}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p>Tiến độ hoàn thành</p>

                                <div className="line">
                                    <div
                                        className="line-complete"
                                        style={{
                                            width: `100%`,
                                        }}
                                    ></div>
                                </div>

                                <div
                                    className="d-flex mt-5 ml-5"
                                    style={{
                                        fontSize: 12,
                                        color: 'gray',
                                    }}
                                >
                                    Đã hoàn thành khóa học
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            ></List>
        ) : (
            <EmptyCustom />
        )
    }

    const items = [
        {
            key: '1',
            label: 'Đang học',
            children: (
                <>
                    <Study />
                    {study?.length > 7 || pageStudy > 1 ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Pagination
                                current={pageStudy}
                                pageSize={8}
                                defaultCurrent={1}
                                total={study?.length}
                                onChange={handelChangePageStudy}
                            />
                        </div>
                    ) : null}
                </>
            ),
        },
        {
            key: '2',
            label: 'Đã hoàn thành',
            children: (
                <>
                    <Finish />
                    {done?.length > 7 || pageDone > 1 ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Pagination
                                current={pageDone}
                                pageSize={8}
                                defaultCurrent={1}
                                total={done?.length}
                                onChange={handelChangePageDone}
                            />
                        </div>
                    ) : null}
                </>
            ),
        },
    ]

    return (
        <div className="prf-main pb-30">
            <div
                style={
                    isMobile || isTablet
                        ? null
                        : { display: 'flex', justifyContent: 'space-between' }
                }
            >
                <h2>Quản lý khóa học</h2>
                <div className="prf-search">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm ..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}
