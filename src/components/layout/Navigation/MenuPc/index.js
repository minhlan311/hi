import { Link, NavLink, useHistory } from 'react-router-dom'
import { Dropdown, Button, Avatar, Typography, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { TbLock } from 'react-icons/tb'
import {
    BsFillPersonFill,
    BsQuestionCircle,
    BsFillStarFill,
} from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { getStorage, removeStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import mtzQuizIcon from '../../../../assets/images/navigation/quiz-icon.svg'
import mtzTestIcon from '../../../../assets/images/navigation/test-icon.svg'
import noAvt from '../../../../assets/images/navigation/No-avt.jpg'
import { useMediaQuery } from 'react-responsive'
import Notifications from '../Notifications'

export default function MenuPc() {
    const { Text } = Typography
    const user = getStorage(USER_INFO)
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const isLaptop14 = useMediaQuery({ minWidth: 1024, maxWidth: 1366 })
    const history = useHistory()

    const menuQuizTest = (
        <Menu>
            <Menu.Item>
                <Link to="/quizzes" className="menu-content">
                    <img src={mtzQuizIcon} alt="mtz logo" />
                    <Text>Bài Quiz</Text>
                </Link>
            </Menu.Item>

            <Menu.Item>
                <Link to="/tests" className="menu-content">
                    <img src={mtzTestIcon} alt="mtz logo" />
                    <Text>Bài Test</Text>
                </Link>
            </Menu.Item>
        </Menu>
    )

    const handleLogout = () => {
        removeStorage(USER_INFO)
        history.push('/login')
    }
    const items = [
        {
            label: (
                <Link to="/profiles" className="menu-content">
                    <Text>Trang cá nhân</Text>
                </Link>
            ),
            key: '1',
            icon: <BsFillPersonFill size={20} style={{ marginLeft: 0 }} />,
        },
        {
            label: (
                <Link to="/point-management" className="menu-content">
                    <Text>Quản lý điểm A+</Text>
                </Link>
            ),
            key: '2',
            icon: <BsFillStarFill size={19} style={{ marginLeft: 0 }} />,
        },
        {
            label: (
                <Link to="/pedagogys" className="menu-content">
                    <Text>Các câu hỏi</Text>
                </Link>
            ),
            key: '3',
            icon: <BsQuestionCircle size={18} style={{ marginLeft: 1 }} />,
        },
        {
            label: (
                <Link to="/change-password" className="menu-content">
                    <Text>Đổi mật khẩu</Text>
                </Link>
            ),
            key: '4',
            icon: <TbLock size={20} style={{ marginLeft: 0 }} />,
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div className="menu-content" onClick={handleLogout}>
                    <Text>Đăng xuất</Text>
                </div>
            ),
            key: '5',
            icon: <MdLogout size={20} style={{ marginLeft: 2 }} />,
        },
    ]

    return (
        <div
            className="d-space-flex menu-bar"
            style={isLaptop14 ? { width: '83%' } : { width: 980 }}
        >
            <div className="d-space-flex" style={{ width: 760 }}>
                <NavLink
                    exact
                    to={'/'}
                    className="link"
                    activeClassName="active"
                    style={
                        isMobile || isTablet
                            ? { padding: '10px 0' }
                            : { padding: '25px 0' }
                    }
                >
                    Trang chủ
                    <div className="sticky-active"></div>
                </NavLink>
                <NavLink
                    exact
                    to={'/subjects'}
                    className={
                        history.location.pathname.includes('/courses')
                            ? 'active link'
                            : 'link'
                    }
                    activeClassName="active"
                    style={
                        isMobile || isTablet
                            ? { padding: '10px 0' }
                            : { padding: '25px 0' }
                    }
                >
                    Môn học
                    <div className="sticky-active"></div>
                </NavLink>
                <NavLink
                    exact
                    to={'/documents'}
                    className={
                        history.location.pathname.includes('/documents')
                            ? 'active link'
                            : 'link'
                    }
                    activeClassName="active"
                    style={
                        isMobile || isTablet
                            ? { padding: '10px 0' }
                            : { padding: '25px 0' }
                    }
                >
                    Tài liệu
                    <div className="sticky-active"></div>
                </NavLink>
                <Dropdown overlay={menuQuizTest} className="menu-test">
                    <div>
                        <NavLink
                            exact
                            to={'/tests'}
                            className={
                                history.location.pathname.includes('/tests') ||
                                history.location.pathname.includes('/quizzes')
                                    ? 'active link'
                                    : 'link'
                            }
                            activeClassName="active"
                            style={
                                isMobile || isTablet
                                    ? {
                                          padding: '10px 0',
                                          height: 70,
                                      }
                                    : {
                                          padding: '25px 0',
                                      }
                            }
                        >
                            <p
                                style={{
                                    margin: 0,
                                    padding: '25px 0',
                                }}
                            >
                                Thi Thử
                            </p>
                            <div className="sticky-active"></div>
                        </NavLink>{' '}
                    </div>
                </Dropdown>
                <NavLink
                    exact
                    to={'/sharing-experience'}
                    className="link"
                    activeClassName="active"
                    style={
                        isMobile || isTablet
                            ? { padding: '10px 0' }
                            : { padding: '25px 0' }
                    }
                >
                    Chia sẻ kinh nghiệm
                    <div className="sticky-active"></div>
                </NavLink>

                {user.isMentor && user.mentorStatus === 'APPROVED' ? (
                    <Button
                        type="primary"
                        size="middle"
                        onClick={() => history.push('/mentor')}
                    >
                        Mentor
                    </Button>
                ) : (
                    <Button
                        style={{ marginRight: 15 }}
                        onClick={() => history.push('/regis-is-mentor')}
                        type="primary"
                    >
                        Đăng ký làm Mentor
                    </Button>
                )}
            </div>

            <div className="avatar-action">
                <div style={{ marginRight: 20, marginTop: 3 }}>
                    <Notifications />
                </div>

                <Dropdown
                    className="menu-nav"
                    menu={{
                        items,
                    }}
                    autoAdjustOverflow
                >
                    <div>
                        <Avatar
                            src={user.avatarUrl ? user.avatarUrl : noAvt}
                            size={32}
                            icon={<UserOutlined />}
                        />
                        <FaChevronDown
                            style={{
                                marginLeft: 5,
                                fontSize: 14,
                            }}
                        />
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}
