import { Card, Empty, List, Pagination } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useConvertSlug } from '../../../../hooks'
import { CheckOutlined, LockOutlined } from '@ant-design/icons'
import { setStorage } from '../../../../services/storage'
import { useMediaQuery } from 'react-responsive'

export default function LearningPaths(props) {
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1919 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const { data, CourseHeader, CollapseCustom } = props
    const history = useHistory()
    const HandleOnTopicClick = (id, name) => {
        setStorage({ key: 'topicId', val: id })
        history.push(
            `/learning/${useConvertSlug(data?.subject?.name)}/${useConvertSlug(
                data?.name
            )}/${useConvertSlug(name)}`,
            {
                topicId: id,
            }
        )
    }
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return
        }
        if (type === 'next') {
            return
        }
        return originalElement
    }

    const DataOpen = ({ topic }) => {
        return (
            <Card
                className="path"
                title={topic.name}
                key={topic._id}
                hoverable
                onClick={() => HandleOnTopicClick(topic._id, topic.name)}
            >
                <div
                    style={{ height: 85, overflow: 'hidden' }}
                    dangerouslySetInnerHTML={{
                        __html: `${
                            topic?.descriptions
                                ? topic?.descriptions
                                : `Nội dung ${topic.name}`
                        }`,
                    }}
                ></div>
                <div className="pagination-wrap">
                    <Pagination
                        total={topic.countLessons}
                        pageSize={1}
                        size="small"
                        showLessItems
                        itemRender={itemRender}
                    />
                </div>
            </Card>
        )
    }

    const DataBlur = ({ topic }) => {
        return (
            <div style={{ filter: 'blur(3px)', cursor: 'not-allowed' }}>
                <Card className="path" title={topic.name}>
                    <div
                        style={{ height: 85, overflow: 'hidden' }}
                        dangerouslySetInnerHTML={{
                            __html: `${
                                topic?.descriptions
                                    ? topic?.descriptions
                                    : `Nội dung ${topic.name}`
                            }`,
                        }}
                    ></div>
                    <div className="pagination-wrap">
                        <Pagination
                            total={topic.countLessons}
                            pageSize={1}
                            size="small"
                            itemRender={itemRender}
                            showLessItems
                        />
                    </div>
                </Card>
            </div>
        )
    }

    const DataLock = ({ topic }) => {
        return (
            <Card className="path" title={topic.name} key={topic._id}>
                <div className="lock" style={{ textAlign: 'center' }}>
                    <LockOutlined
                        style={{
                            fontSize: '35px',
                            color: 'white',
                            padding: 88,
                        }}
                    />
                </div>

                <div>
                    <div
                        style={{ height: 85, overflow: 'hidden' }}
                        dangerouslySetInnerHTML={{
                            __html: `${
                                topic?.descriptions
                                    ? topic?.descriptions
                                    : `Nội dung ${topic.name}`
                            }`,
                        }}
                    ></div>
                    <div className="pagination-wrap">
                        <Pagination
                            total={topic.countLessons}
                            pageSize={1}
                            size="small"
                            itemRender={itemRender}
                            showLessItems
                        />
                    </div>
                </div>
            </Card>
        )
    }

    const DataCompleted = ({ topic }) => {
        return (
            <Card className="path" title={topic.name} key={topic._id}>
                <div
                    className="lock"
                    style={{
                        textAlign: 'center',
                        background: '#d5ebd8b0',
                    }}
                >
                    <CheckOutlined
                        style={{
                            fontSize: '35px',
                            color: '#43e543',
                            padding: 88,
                        }}
                    />
                </div>

                <div>
                    <div
                        style={{ height: 85, overflow: 'hidden' }}
                        dangerouslySetInnerHTML={{
                            __html: `${
                                topic?.descriptions
                                    ? topic?.descriptions
                                    : `Nội dung ${topic.name}`
                            }`,
                        }}
                    ></div>
                    <div className="pagination-wrap">
                        <Pagination
                            total={topic.countLessons}
                            pageSize={1}
                            size="small"
                            itemRender={itemRender}
                            showLessItems
                        />
                    </div>
                </div>
            </Card>
        )
    }
    return (
        <div
            style={
                (isMobile && { width: '100%' }) || {
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            }
        >
            {data?.topics?.length > 0 ? (
                <List
                    style={
                        (isMobile && { width: '100%' }) ||
                        (isTablet && { width: '70%' }) || { width: '75%' }
                    }
                    grid={{
                        gutter: 16,
                        column:
                            (isMobile && 1) ||
                            (isTablet && 2) ||
                            (isLaptop && 2) ||
                            (isDesktop && 3),
                    }}
                    itemLayout="horizontal"
                    dataSource={data?.topics}
                    renderItem={(topic) => (
                        <List.Item style={{ padding: 0 }}>
                            {data?.progressions ? (
                                (data?.progressions?.done?.some(
                                    (e) => e === topic._id
                                ) && (
                                    <DataCompleted
                                        topic={topic}
                                        key={topic._id}
                                    />
                                )) ||
                                (data?.progressions?.remains?.some(
                                    (e) => e === topic._id
                                ) && (
                                    <DataBlur topic={topic} key={topic._id} />
                                )) ||
                                (topic._id === data?.progressions.doing && (
                                    <DataOpen topic={topic} key={topic._id} />
                                ))
                            ) : (
                                <DataLock topic={topic} key={topic._id} />
                            )}
                        </List.Item>
                    )}
                />
            ) : (
                <Empty
                    style={
                        (isMobile && { width: '100%' }) ||
                        (isTablet && { width: '70%' }) || { width: '75%' }
                    }
                    description={<span>Hiện chưa có lộ trình nào!</span>}
                />
            )}
            <div
                className="intro-sz"
                style={
                    (isMobile && { width: '100%' }) ||
                    (isTablet && { width: '28%', marginLeft: '2%' }) || {
                        width: '23%',
                        marginLeft: '2%',
                    }
                }
            >
                <CourseHeader />
                <CollapseCustom />
            </div>
        </div>
    )
}
