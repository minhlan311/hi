import React, { useMemo, useEffect, useState } from 'react'
import { Empty, Input, Spin, Typography } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import {
    getCategoriesRequest,
    categoriesSelector,
} from '../../../slices/category'
import SubjectSliders from '../SubjectSlider'
import { SearchOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { debounce } from 'lodash'
import { userDetailSelector } from '../../../slices/user'

const EmptyCustom = () => {
    return (
        <div style={{ borderBottom: '1px solid #efefef', padding: '100px 0' }}>
            <Empty
                description={<span>Hiện không có môn học nào!</span>}
            ></Empty>
        </div>
    )
}
const SubjectList = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const user = useSelector(userDetailSelector)
    const userDetail = user?.data
    const { Title } = Typography
    const dispatch = useDispatch()
    const categories = useSelector(categoriesSelector)

    const onChangeFilter = (e) => {
        const body = {
            filterQuery: {
                educationType: [userDetail?.educationType, ''],
                educationId: userDetail?.educationId,
                onModel: 'SUBJECT',
                search: e?.target.value ? e?.target.value : undefined,
            },
            options: {
                pagination: false,
                sort: { position: 1 },
            },
        }
        dispatch(getCategoriesRequest(body))
    }

    useEffect(() => {
        if (userDetail) {
            onChangeFilter()
        }
    }, [userDetail])

    const Loading = () => {
        return (
            <Spin tip="Loading..." style={{ marginTop: '15vh' }}>
                <div className="content" />
            </Spin>
        )
    }

    if (categories.status === 'loading')
        return (
            <div style={{ height: '55vh' }}>
                <Loading />
            </div>
        )

    return (
        <>
            <div
                className="subject-list"
                style={
                    isMobile || isTablet
                        ? null
                        : {
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                          }
                }
            >
                <h2 className="heading-subject">Môn học theo trường Đại Học</h2>

                <Input
                    prefix={<SearchOutlined />}
                    style={
                        isMobile || isTablet
                            ? { width: '100%' }
                            : { width: '15%' }
                    }
                    placeholder="Tìm kiếm ..."
                    onChange={debounce(onChangeFilter, 800)}
                    allowClear
                />
            </div>
            {categories?.data?.length === 0 ? (
                <EmptyCustom />
            ) : (
                <div className="subject-list">
                    {categories?.data &&
                        categories?.data?.map((category) => (
                            <div
                                className="row"
                                key={category.position}
                                style={{ marginBottom: 20 }}
                            >
                                <Title
                                    level={4}
                                    style={{
                                        textAlign: 'left',
                                        margin: 5,
                                    }}
                                >
                                    {category.name}
                                </Title>
                                {category?.details?.find(
                                    (item) =>
                                        item.educationId ===
                                            userDetail?.educationId &&
                                        item.subjectId !== null
                                ) ? (
                                    category?.details && (
                                        <SubjectSliders
                                            data={category?.details}
                                        />
                                    )
                                ) : (
                                    <EmptyCustom />
                                )}
                            </div>
                        ))}
                </div>
            )}
        </>
    )
}

export default SubjectList
