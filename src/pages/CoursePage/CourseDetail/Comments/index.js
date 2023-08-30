import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Avatar, Button, Card, Empty, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import './styles.scss'
import CommentList from './CommentList'
import SendComment from './Send'
import { useDispatch, useSelector } from 'react-redux'
import {
    commentDetailSelector,
    commentsSelector,
    createCommentSelector,
    deleteCommentSelector,
    getCommentDetailRequest,
    getCommentsRequest,
    replyCommentSelector,
    resetCommentState,
    updateCommentSelector,
} from '../../../../slices/comment'
import { useMediaQuery } from 'react-responsive'
import noAvt from '../../../../assets/images/navigation/No-avt.jpg'
import { cloneDeep, orderBy, uniqBy } from 'lodash'
import { getCourseDetailRequest } from '../../../../slices/course'

moment().locale('vi')

export default function Comments(props) {
    const { targetId, user, CourseHeader, CollapseCustom } = props
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const dispatch = useDispatch()
    const comments = useSelector(commentsSelector)
    const commentsList = comments?.data?.docs
    const createComment = useSelector(createCommentSelector)
    const replyComment = useSelector(replyCommentSelector)
    const updateComment = useSelector(updateCommentSelector)
    const deleteComment = useSelector(deleteCommentSelector)
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState({
        filterQuery: {
            targetId: targetId,
            targetModel: 'COURSE',
        },
        options: {
            // paginaion: false,
            limit: 3,
            sort: { createdAt: -1 },
        },
    })

    useEffect(() => {
        if (targetId) dispatch(resetCommentState())
    }, [targetId])
    useEffect(() => {
        dispatch(getCommentsRequest(filterData))
    }, [filterData])
    useEffect(() => {
        if (createComment.status === 'success') {
            message.success('Đã gửi bình luận')
            // setData([...data, createComment?.data])
            dispatch(getCommentsRequest(filterData))

            dispatch(getCourseDetailRequest(targetId))
        }
    }, [createComment, targetId])

    useEffect(() => {
        if (replyComment.status === 'success') {
            message.success('Đã gửi phản hồi tới bình luận')
            // setData([...data, createComment?.data])
            dispatch(getCommentsRequest(filterData))
        }
    }, [replyComment])

    useEffect(() => {
        if (updateComment.status === 'success') {
            setData([])
            message.success('Đã cập nhật bình luận')
            dispatch(getCommentsRequest(filterData))
        }
    }, [updateComment])

    useEffect(() => {
        if (deleteComment.status === 'success') {
            setData([])
            message.success('Đã xóa bình luận')
            dispatch(getCommentsRequest(filterData))
            dispatch(getCourseDetailRequest(targetId))
        }
    }, [deleteComment])
    const [load, setLoad] = useState(false)
    // check data and concat in load more
    useEffect(() => {
        if (comments.status === 'success' && commentsList?.length > 0 && load) {
            const newArr = uniqBy([...data, ...commentsList], '_id')
            setData(newArr)
        }
        if (comments.status === 'success' && commentsList?.length > 0) {
            const newArr = uniqBy(commentsList, '_id')
            setData(newArr)
        }
    }, [commentsList, comments, load])
    const onLoadMore = () => {
        setLoad(true)
        const cloneFilter = cloneDeep(filterData)
        cloneFilter.options.limit += 3

        setFilterData(cloneFilter)
    }

    const loadMore = (
        <div
            style={{
                textAlign: 'center',
                marginTop: 15,
                height: 32,
            }}
        >
            {comments?.status === 'loading' ? null : (
                <Button onClick={onLoadMore}>Xem thêm</Button>
            )}
        </div>
    )
    return (
        <div
            className="course-main"
            style={
                isMobile || isTablet
                    ? null
                    : { display: 'flex', justifyContent: 'space-between' }
            }
        >
            <Card
                style={
                    isMobile || isTablet
                        ? {
                              width: '100%',
                              backgroundColor: '#f8fbff',
                          }
                        : {
                              backgroundColor: '#f8fbff',
                              width: '75%',
                          }
                }
                size={isMobile || isTablet ? 'small' : null}
            >
                <div className="d-flex">
                    <div>
                        <Avatar
                            src={user?.avatarUrl ? user?.avatarUrl : noAvt}
                            icon={<UserOutlined />}
                            style={{ marginRight: 10 }}
                        />
                    </div>

                    <div style={{ width: '94%' }}>
                        <SendComment targetId={targetId} />
                    </div>
                </div>

                {data?.length > 0 ? (
                    <CommentList
                        comments={
                            // orderBy(data, ['createdAt'], ['desc'])
                            data
                        }
                        totalDocs={comments?.data?.totalDocs}
                        loadMore={loadMore}
                        loading={comments?.status === 'loading'}
                    />
                ) : (
                    <Empty
                        style={{ width: '100%' }}
                        description="Không có bình luận nào!"
                    />
                )}
            </Card>

            {isMobile || isTablet ? null : (
                <div
                    className="intro-sz"
                    style={
                        (isMobile && { width: '100%' }) ||
                        (isTablet && { width: '28%' }) || { width: '23%' }
                    }
                >
                    <CourseHeader />
                    <CollapseCustom />
                </div>
            )}
        </div>
    )
}
