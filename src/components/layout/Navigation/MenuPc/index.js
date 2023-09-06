import { Link } from 'react-router-dom'
import './styles.scss'
import { Col, Row, Space, Button, Avatar } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Header from '../../Header/Header'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import { useMediaQuery } from 'react-responsive'
import { ReactComponent as LogoLight } from '../../../../assets/images/backgrounds/logo-light.svg'
import { IoMenuSharp } from 'react-icons/io5'
export default function MenuPc() {
    const user = getStorage(USER_INFO)
    const menu = [
        {
            label: 'Giới thiệu',
            href: '/',
        },
        {
            label: 'Giáo viên',
            href: '/',
        },
        {
            label: 'Khóa học',
            // children: [
            //     {
            //         label: 'DU HỌC ANH',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đi',
            //                 href: 'chuong-trinh-dai-hoc-sau-di',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC ĐỨC',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC NEW ZEALAND',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC HAN QUỐC',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC ÚC',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC NHẬT BẢN',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC SINGAPORE',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC TRUNG QUỐC',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            //     {
            //         label: 'DU HỌC CANADA',
            //         menuChild: [
            //             {
            //                 childLabel: 'Chương trình phổ thông',
            //                 href: 'chuong-trinh-pho-thong',
            //             },
            //             {
            //                 childLabel: 'Chương trình cao đẳng',
            //                 href: 'chuong-trinh-cao-dang',
            //             },
            //             {
            //                 childLabel: 'Chương trình đại học & sau đại học',
            //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
            //             },
            //             {
            //                 childLabel: 'Kinh nghiệm du học',
            //                 href: 'kinh-nghiem-du-hoc',
            //             },
            //         ],
            //     },
            // ],
        },

        {
            label: 'Luyện thi',
            href: '/',
        },
        {
            label: 'Lịch khai giảng',
            href: '/',
        },
        {
            label: 'Trách nhiệm',
            href: '/',
        },
        {
            label: 'Tin tức',
            href: '/',
        },
        {
            label: 'Hỏi đáp',
            href: '/',
        },
        {
            label: 'Thi đấu',
            href: '/',
        },
    ]

    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    return (
        <div className="menu">
            <Header type="fullsize">
                {isTablet || isMobile ? (
                    <Row
                        justify="space-between"
                        align="middle"
                        style={{ padding: '10px 12px' }}
                    >
                        <Col span={16} className="menuItem">
                            <LogoLight />
                        </Col>
                        <Col>
                            <Button type="text" size="small">
                                <IoMenuSharp size={35} color="white" />
                            </Button>
                        </Col>
                    </Row>
                ) : (
                    <Row
                        justify="space-between"
                        align="middle"
                        className="uc-container"
                    >
                        <Col span={16} className="menuItem">
                            {menu.map((item) => (
                                <div key={item.label} className="menuLabel">
                                    <div className="labelItem">
                                        <Space
                                            style={{ width: '100%' }}
                                            size="small"
                                        >
                                            {item?.href ? (
                                                <Link
                                                    to={item.href}
                                                    className="title"
                                                >
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <div className="title">
                                                    {item.label}
                                                </div>
                                            )}
                                            {item?.children?.length > 0 && (
                                                <DownOutlined />
                                            )}
                                        </Space>
                                        {item?.children?.length > 0 && (
                                            <div className="arr"></div>
                                        )}
                                    </div>
                                    {item?.children?.length > 0 && (
                                        <div className="chilMenu">
                                            <Row
                                                justify="space-between"
                                                gutter={24}
                                            >
                                                {item.children.map((chil) => (
                                                    <Col
                                                        span={6}
                                                        className="chil"
                                                        key={chil.label}
                                                    >
                                                        <h3>{chil.label}</h3>
                                                        {chil?.menuChild?.map(
                                                            (menuChil) => (
                                                                <Space
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    direction="vertical"
                                                                    key={
                                                                        menuChil.childLabel
                                                                    }
                                                                >
                                                                    <Link
                                                                        to={
                                                                            menuChil.href
                                                                        }
                                                                    >
                                                                        {
                                                                            menuChil.childLabel
                                                                        }
                                                                    </Link>
                                                                </Space>
                                                            )
                                                        )}
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Col>

                        {!user ? (
                            <div className="butt-auth">
                                <Link to="/login">
                                    <Button type="text" className="butt-item">
                                        Đăng nhâp
                                    </Button>
                                </Link>
                                /
                                <Link to="/register">
                                    <Button type="text" className="butt-item">
                                        Đăng ký
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Space>
                                <h4>{user.fullName}</h4>
                                <Avatar>{user.fullName}</Avatar>
                            </Space>
                        )}
                    </Row>
                )}
            </Header>
        </div>
    )
}
