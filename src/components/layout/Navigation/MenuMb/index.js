import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Menu, Space } from 'antd'
import React from 'react'
import { HiMenu } from 'react-icons/hi'
import { getStorage, removeStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './styles.scss'
import noAvt from '../../../../assets/images/navigation/No-avt.jpg'
import { useMediaQuery } from 'react-responsive'
import Notifications from '../Notifications'

export default function MenuMb({ setOpen, open }) {
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const history = useHistory()
    const location = useLocation()
    const user = getStorage(USER_INFO)
    const getItem = (label, key, children, type) => {
        return {
            key,
            children,
            label,
            type,
        }
    }
    const items = [
        getItem(<Link to="/">Trang chủ</Link>, '/'),
        getItem(<Link to="/courses">Môn học</Link>, '/courses'),
        getItem(<Link to="/documents">Tài liệu</Link>, '/documents'),
        getItem('Thi thử', 'sub1', [
            getItem(<Link to="/tests">Bài Test</Link>, '/tests'),
            getItem(<Link to="/quizzes">Bài Quiz</Link>, '/quizzes'),
        ]),
        getItem(
            <Link to="/sharing-experience">Chia sẻ kinh nghiệm</Link>,
            '/sharing-experience'
        ),
        getItem(
            user.isMentor && user.mentorStatus === 'APPROVED' ? (
                <Button
                    type="primary"
                    size="middle"
                    onClick={() => history.push('/mentor')}
                >
                    Mentor
                </Button>
            ) : (
                <Button
                    onClick={() => history.push('/regis-is-mentor')}
                    type="primary"
                    style={{ marginRight: 15 }}
                >
                    Đăng ký mentor
                </Button>
            ),
            '7'
        ),

        getItem(
            <Space>
                <Avatar
                    src={user.avatarUrl ? user.avatarUrl : noAvt}
                    size={32}
                    icon={<UserOutlined />}
                />
                <h3 style={{ margin: 0 }}>{user.fullName}</h3>
            </Space>,
            'sub2',

            [
                getItem(<Link to="/profiles">Trang cá nhân</Link>, '/profiles'),
                getItem(
                    <Link to="/point-management">Quản lý điểm A+</Link>,
                    '9'
                ),
                getItem(<Link to="/pedagogys">Các câu hỏi</Link>, '10'),
                getItem(<Link to="/change-password">Đổi mật khẩu</Link>, '11'),
                getItem(
                    <div
                        className="ant-menu-title-content"
                        onClick={() => {
                            removeStorage(USER_INFO)
                            history.push('/login')
                        }}
                    >
                        Đăng xuất
                    </div>,
                    '12'
                ),
            ]
        ),
    ]

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ marginTop: 8 }}>
                    <Notifications />
                </div>
                <HiMenu
                    style={{
                        fontSize: isMobile ? 30 : 40,
                        color: '#8f8f8f',
                        cursor: 'pointer',
                        marginLeft: isMobile ? 15 : 25,
                    }}
                    onClick={() => setOpen(!open)}
                />
            </div>
            <Drawer
                placement={'top'}
                closable={false}
                onClose={() => setOpen(!open)}
                open={open}
                style={{
                    textAlign: 'center',
                    height: 'auto',
                    maxHeight: '85vh',
                }}
                className="nav-drawer"
            >
                <Menu
                    defaultSelectedKeys={location.pathname}
                    mode="inline"
                    items={items}
                />
            </Drawer>
        </>
    )
}
