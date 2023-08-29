import { Card, Divider, List, Skeleton, Space, Typography } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import mtzEyeImg from '../../../../assets/images/homepage/eye-img.svg'
import { splitText } from '../../../../utils/helper'

import InfiniteScroll from 'react-infinite-scroll-component'
import mtzCourseImg from '../../../../assets/images//homepage/course-img.svg'
import mtzFreeIcon from '../../../../assets/images/courses-page/free-icon.svg'
import mtzMemberImg from '../../../../assets/images/homepage/member-img.svg'
import './styles.scss'

export default function MainPage({ data }) {
    const { Meta } = Card
    const { Text } = Typography
    const history = useHistory()
    function handleClickCourse(id) {
        history.push(`/coures/detail/${id}`)
    }
    return (
        <>
            <div
                className="mtz-courses-listing"
                id="scrollableDiv"
                style={{
                    height: 800,
                    overflow: 'auto',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        grid={{
                            gutter: 4,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 3,
                            xxl: 4,
                        }}
                        renderItem={(item) => (
                            <List.Item key={item._id}>
                                <Card
                                    hoverable
                                    onClick={() => handleClickCourse(item._id)}
                                    cover={
                                        <div style={{ height: '200px' }}>
                                            <img
                                                alt="courses icon"
                                                src={
                                                    item.image
                                                        ? item.image
                                                        : mtzCourseImg
                                                }
                                                style={{ height: '200px' }}
                                            />
                                        </div>
                                    }
                                    actions={[
                                        <>
                                            <img
                                                alt="eye icon"
                                                src={mtzEyeImg}
                                            />{' '}
                                            <Text>{item.viewed}</Text>
                                        </>,
                                        <>
                                            <img
                                                alt="member icon"
                                                src={mtzMemberImg}
                                            />
                                            <Text>{item.downloaded}</Text>
                                        </>,
                                    ]}
                                >
                                    <Space direction="vertical">
                                        <Meta
                                            title={item.name}
                                            description={
                                                <>
                                                    By{' '}
                                                    <span>
                                                        {item.ownerId?.fullName
                                                            ? item.ownerId
                                                                  ?.fullName
                                                            : 'MentorZ'}
                                                    </span>
                                                </>
                                            }
                                        />
                                        <Meta
                                            style={{ height: '66px' }}
                                            description={
                                                item.description
                                                    ? splitText(
                                                          item.description,
                                                          90
                                                      )
                                                    : splitText(
                                                          'Kho tài liệu học tập cho tất cả các học sinh trên cả nước được tạo bởi các giảng viên hàng đầu cả nước được tạo bởi các giảng viên hàng đầu',
                                                          90
                                                      )
                                            }
                                        />
                                        <div className="courses-tag mt-10">
                                            <img
                                                alt="eye icon"
                                                src={mtzFreeIcon}
                                            />
                                            <Text style={{ color: '#DF5534' }}>
                                                {item.s}
                                            </Text>
                                        </div>
                                    </Space>
                                </Card>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    )
}
