import {
    ClockCircleOutlined,
    EditOutlined,
    EllipsisOutlined,
    EnterOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, List, Popconfirm, Tag, message } from 'antd'
import moment from 'moment-timezone'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { getStorage } from '../../../../../services/storage'
import { USER_INFO } from '../../../../../constants/storageKeys'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { courseDetailSelector } from '../../../../../slices/course'
import SendComment from '../Send'
import UpadteComment from '../Update'
import { deleteCommentsRequest } from '../../../../../slices/comment'
import { useMediaQuery } from 'react-responsive'
import noAvt from '../../../../../assets/images/navigation/No-avt.jpg'
export default function CommentList(props) {
    const { comments, totalDocs, loadMore, loading } = props
    const user = getStorage(USER_INFO)
    const course = useSelector(courseDetailSelector)
    const dispatch = useDispatch()
    const CommentItems = (props) => {
        const { data } = props
        const [openReply, setOpenReply] = useState(false)

        const [like, setLike] = useState(Math.floor(Math.random() * 1000))
        const [liked, setLiked] = useState(false)

        const [actionComment, setActionComment] = useState('')
        const handleLiked = () => {
            if (liked) {
                setLike(like - 1)
                setLiked(false)
            } else {
                setLike(like + 1)
                setLiked(true)
            }
        }
        const [confirmLoading, setConfirmLoading] = useState(false)
        const handleOk = (id) => {
            setConfirmLoading(true)
            setTimeout(() => {
                setConfirmLoading(false)
                dispatch(deleteCommentsRequest(id))
            }, 1000)
        }

        const items = [
            {
                key: 'edit',
                label: 'Sửa',
                onClick: () => {
                    setActionComment('update')
                },
            },

            {
                key: 'dele',
                label: 'Xóa',
                onClick: () => setActionComment('delete'),
            },
        ]
        const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
        const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
        return (
            <List.Item key={data?._id} style={{ padding: '10px 0' }}>
                <div
                    className="d-flex"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                >
                    <div
                        style={
                            isMobile
                                ? { width: 23, marginRight: 5 }
                                : { width: 39, height: 40, marginRight: 10 }
                        }
                    >
                        <Avatar
                            src={
                                data?.user?.avatarUrl
                                    ? data?.user?.avatarUrl
                                    : noAvt
                            }
                            size={isMobile ? 'small' : 'default'}
                        />
                    </div>
                    <div style={{ width: '95%' }}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={
                                    isMobile
                                        ? null
                                        : {
                                              display: 'flex',
                                              alignItems: 'baseline',
                                          }
                                }
                            >
                                <div style={{ display: 'flex' }}>
                                    <h3
                                        style={
                                            isMobile
                                                ? { fontSize: 14, margin: 0 }
                                                : { margin: 0 }
                                        }
                                    >
                                        {data?.user?.fullName}
                                    </h3>
                                    {course?.data?.mentor?._id ===
                                        data?.userId && (
                                        <Tag
                                            color="green"
                                            style={{
                                                maxHeight: 25,
                                                margin: '0 0 0 5px',
                                            }}
                                        >
                                            Tác giả
                                        </Tag>
                                    )}
                                </div>

                                {isMobile ? (
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            {' '}
                                            <ClockCircleOutlined
                                                style={{ marginRight: 2 }}
                                            />
                                            <Link to={'#'}>
                                                {moment(
                                                    data?.createdAt
                                                ).fromNow()}
                                            </Link>
                                        </div>
                                        {data?.createdAt !== data?.updatedAt &&
                                        data?.updatedAt ? (
                                            <>
                                                <div
                                                    style={{ margin: '0 5px' }}
                                                >
                                                    -
                                                </div>
                                                <div>
                                                    <EditOutlined
                                                        style={{
                                                            marginRight: 2,
                                                        }}
                                                    />
                                                    <Link to={'#'}>
                                                        {moment(
                                                            data?.updatedAt
                                                        ).fromNow()}
                                                    </Link>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                ) : (
                                    <>
                                        <p style={{ margin: '0 5px' }}>•</p>
                                        <Link to={'#'}>
                                            {moment(data?.createdAt).fromNow()}
                                        </Link>
                                        {data?.createdAt !== data?.updatedAt &&
                                        data?.updatedAt ? (
                                            <>
                                                <p style={{ margin: '0 5px' }}>
                                                    -
                                                </p>
                                                <p>
                                                    Đã chỉnh sửa{' '}
                                                    <Link to={'#'}>
                                                        {moment(
                                                            data?.updatedAt
                                                        ).fromNow()}
                                                    </Link>
                                                </p>
                                            </>
                                        ) : null}
                                    </>
                                )}
                            </div>

                            {user._id === data?.userId && (
                                <div>
                                    <Popconfirm
                                        title="Xóa bình luận"
                                        description="Bạn chắc chắn muốn xóa bình luận này?"
                                        open={actionComment === 'delete'}
                                        onConfirm={() => handleOk(data?._id)}
                                        okButtonProps={{
                                            loading: confirmLoading,
                                        }}
                                        onCancel={() => setActionComment('')}
                                        cancelText="Hủy"
                                        okText="Xóa"
                                    />
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <Button shape="circle" type="text">
                                            <EllipsisOutlined />
                                        </Button>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                        {actionComment === 'update' ? (
                            <UpadteComment
                                comments={data}
                                setUpdate={setActionComment}
                            />
                        ) : (
                            <div
                                style={
                                    isMobile || isTablet
                                        ? {
                                              width: '95%',
                                              whiteSpace: 'pre-wrap',
                                              wordWrap: 'break-word',
                                          }
                                        : {
                                              width: '100%',
                                              whiteSpace: 'pre-wrap',
                                              wordWrap: 'break-word',
                                          }
                                }
                            >
                                {data?.content.content}
                            </div>
                        )}
                        <div className="d-flex" style={{ margin: '10px 0' }}>
                            <Button
                                onClick={handleLiked}
                                type={isMobile ? 'text' : null}
                                style={isMobile ? { padding: 0 } : null}
                            >
                                {liked ? (
                                    <p
                                        style={{
                                            margin: '0 5px',
                                        }}
                                    >
                                        <FaHeart style={{ color: 'red' }} />{' '}
                                        {like}
                                    </p>
                                ) : (
                                    <p
                                        style={{
                                            color: '#cecece',
                                            margin: '0 5px',
                                        }}
                                    >
                                        <FaRegHeart /> {like}
                                    </p>
                                )}
                            </Button>
                            <Button
                                type="text"
                                icon={<EnterOutlined />}
                                className="ml-10"
                                onClick={() => setOpenReply(!openReply)}
                                style={isMobile ? { padding: '0 5px' } : null}
                            >
                                Phản hồi
                            </Button>
                        </div>

                        {openReply && (
                            <div className="d-flex">
                                <Avatar
                                    src={
                                        user.avatarUrl ? user.avatarUrl : noAvt
                                    }
                                    icon={<UserOutlined />}
                                    style={{
                                        marginRight: 10,
                                        width: 29,
                                        height: 28,
                                    }}
                                />
                                <SendComment
                                    parentId={data._id}
                                    targetId={data.targetId}
                                    comments={data}
                                />
                            </div>
                        )}
                        {data?.child?.length > 0 && (
                            <List
                                itemLayout="vertical"
                                dataSource={data?.child}
                                renderItem={(child) => (
                                    <CommentItems data={child} />
                                )}
                            />
                        )}
                    </div>
                </div>
            </List.Item>
        )
    }
    return (
        <>
            <List
                loading={loading}
                loadMore={comments?.length < totalDocs ? loadMore : null}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(data) => <CommentItems data={data} />}
            />
        </>
    )
}
