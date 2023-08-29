import {
    Badge,
    Button,
    Card,
    Drawer,
    Dropdown,
    Empty,
    Tooltip,
    message,
} from 'antd'
import './styles.scss'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import { socket } from '../../../../socket'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    getNotificationRequest,
    notificationSelector,
    putNotificationRequest,
} from '../../../../slices/notifications'
import { CloseOutlined, FileDoneOutlined } from '@ant-design/icons'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { BiBell } from 'react-icons/bi'
import { userDetailSelector } from '../../../../slices/user'

moment().locale('vi')
export default function Notifications() {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const user = getStorage(USER_INFO)
    const history = useHistory()
    const dispatch = useDispatch()
    const notifications = useSelector(notificationSelector)

    const [socketData, setSocketData] = useState([])
    const [notificate, setNotificate] = useState([])

    useEffect(() => {
        if (notifications?.data?.length > 0) setNotificate(notifications.data)
    }, [notifications])

    useEffect(() => {
        if (user) {
            socket.on(user._id, (value) => {
                setSocketData((prev) => [...prev, ...[value]])
            })
        }
    }, [])

    useEffect(() => {
        const payload = {
            filterQuery: {
                userId: user._id,
            },
            options: {
                pagination: false,
            },
        }

        dispatch(getNotificationRequest(payload))
    }, [])

    const newData = [...socketData, ...notificate]
    const unReadNotifi = newData?.filter((ntf) => ntf.status === 'unread')
    const readNotifi = newData?.filter((ntf) => ntf.status === 'read')
    const mentor = history.location.pathname.includes('/mentor')

    const NotificationMenu = ({ notification }) => {
        const NotificationItem = ({ notifi }) => {
            const handleSee = () => {
                const payload = {
                    id: notifi._id,
                    status: 'read',
                }
                if (notifi.status !== 'read') {
                    dispatch(putNotificationRequest(payload))
                    const data = {
                        filterQuery: {
                            userId: user._id,
                        },
                        options: {
                            pagination: false,
                        },
                    }
                    setTimeout(() => {
                        dispatch(getNotificationRequest(data))
                    }, 100)

                    socket.emit('notification', payload)
                }
                if (notifi.targetModel === 'DOCUMENT')
                    history.push('/documents/' + btoa(notifi.targetId))
            }
            return (
                <Card
                    hoverable
                    className={`notification-item ${
                        notifi.status === 'unread' ? 'see' : null
                    }`}
                    onClick={handleSee}
                >
                    <b>{notifi.title}</b>
                    <div>{notifi.body}</div>
                    <a>{moment(notifi.createdAt).fromNow()}</a>
                </Card>
            )
        }

        const handleRealAll = () => {
            for (let i = 0; i < notification.length; i++) {
                const payload = {
                    id: notification[i]._id,
                    status: 'read',
                }
                dispatch(putNotificationRequest(payload))
            }
            message.success('Đã đánh dấu đã đọc tất cả thông báo!')
            setTimeout(() => {
                const payload = {
                    filterQuery: {
                        userId: user._id,
                    },
                    options: {
                        pagination: false,
                    },
                }

                dispatch(getNotificationRequest(payload))
            }, 1000)
        }

        const NoticationPC = ({ notification }) => {
            return (
                <Card className="notification-menu">
                    <div className="d-space-flex" style={{ padding: 10 }}>
                        <h2 style={{ margin: 0 }}>Thông báo</h2>
                        <Tooltip title="Đánh dấu đã đọc tất cả">
                            <Button
                                type="text"
                                shape="circle"
                                onClick={handleRealAll}
                            >
                                <FileDoneOutlined style={{ fontSize: 16 }} />
                            </Button>
                        </Tooltip>
                    </div>
                    {notification.length > 0 ? (
                        <div className="ntf-main" style={{ height: 350 }}>
                            {notification?.map((notifi, id) => (
                                <NotificationItem notifi={notifi} key={id} />
                            ))}
                        </div>
                    ) : (
                        <Empty
                            style={{ margin: '50px 0' }}
                            description="Không có thông báo nào!"
                        />
                    )}
                </Card>
            )
        }

        const NoticationM = ({ notification }) => {
            return (
                <div
                    className="notification-menu"
                    style={isMobile || isTablet ? { width: '100%' } : null}
                >
                    <div className="d-space-flex" style={{ padding: 10 }}>
                        <div style={{ display: 'flex' }}>
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => setOpenN(!openN)}
                                shape="circle"
                                type="text"
                                style={{ marginRight: 10 }}
                            ></Button>{' '}
                            <h2 style={{ margin: 0 }}>Thông báo</h2>
                        </div>
                        <Tooltip title="Đánh dấu đã đọc tất cả">
                            <Button
                                type="text"
                                shape="circle"
                                onClick={handleRealAll}
                            >
                                <FileDoneOutlined style={{ fontSize: 16 }} />
                            </Button>
                        </Tooltip>
                    </div>
                    {notification.length > 0 ? (
                        <div className="ntf-main">
                            {notification?.map((notifi, id) => (
                                <NotificationItem notifi={notifi} key={id} />
                            ))}
                        </div>
                    ) : (
                        <Empty
                            style={{ margin: '50px 0' }}
                            description="Không có thông báo nào!"
                        />
                    )}
                </div>
            )
        }
        const newArr = [
            ...unReadNotifi.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ),
            ...readNotifi.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            ),
        ]

        return isMobile || isTablet ? (
            <NoticationM notification={newArr} />
        ) : (
            <NoticationPC notification={newArr} />
        )
    }
    const [openN, setOpenN] = useState(false)
    const userDetail = useSelector(userDetailSelector)
    return isMobile || isTablet ? (
        <>
            <Badge count={unReadNotifi ? unReadNotifi?.length : null}>
                <BiBell
                    style={{
                        width: isTablet ? 20 : null,
                        cursor: 'pointer',
                        fontSize: 22,
                        color: '#8f8f8f',
                    }}
                    onClick={() => setOpenN(!openN)}
                />
            </Badge>
            <Drawer
                closable={false}
                onClose={() => setOpenN(!openN)}
                open={openN}
                className="ntf-draw"
            >
                <NotificationMenu notification={newData} />
            </Drawer>
        </>
    ) : (
        <Dropdown
            overlay={<NotificationMenu notification={newData} />}
            className={
                mentor &&
                user.isMentor &&
                (user.mentorStatus === 'APPROVED' || !user.mentorStatus)
                    ? 'menu-ntf-m'
                    : 'menu-ntf'
            }
            placement="bottom"
        >
            <div>
                <Badge count={unReadNotifi ? unReadNotifi?.length : null}>
                    <BiBell
                        style={{
                            fontSize: 22,
                            color: '#8f8f8f',
                        }}
                    />
                </Badge>
            </div>
        </Dropdown>
    )
}
