import { Link } from 'react-router-dom'
import './styles.scss'
import { Col, Row, Space, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Header from '../../Header/Header'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
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
            children: [
                {
                    label: 'DU HỌC ANH',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đi',
                            href: 'chuong-trinh-dai-hoc-sau-di',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC ĐỨC',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC NEW ZEALAND',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC HAN QUỐC',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC ÚC',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC NHẬT BẢN',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC SINGAPORE',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC TRUNG QUỐC',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
                {
                    label: 'DU HỌC CANADA',
                    menuChild: [
                        {
                            childLabel: 'Chương trình phổ thông',
                            href: 'chuong-trinh-pho-thong',
                        },
                        {
                            childLabel: 'Chương trình cao đẳng',
                            href: 'chuong-trinh-cao-dang',
                        },
                        {
                            childLabel: 'Chương trình đại học & sau đại học',
                            href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
                        },
                        {
                            childLabel: 'Kinh nghiệm du học',
                            href: 'kinh-nghiem-du-hoc',
                        },
                    ],
                },
            ],
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
        {
            label: (
                <>
                    {!user && (
                        <Button
                            style={{
                                backgroundColor: '#F2184F',
                                color: 'white',
                                fontWeight: 600,
                            }}
                        >
                            Đăng nhâp /Đăng ký
                        </Button>
                    )}
                </>
            ),
            href: '/login',
        },
    ]
    return (
        <div className="menu">
            <Header>
                <div className="menuItem">
                    {menu.map((item) => (
                        <div key={item.label} className="menuLabel">
                            <div className="labelItem">
                                <Space style={{ width: '100%' }} size="small">
                                    {item?.href ? (
                                        <Link to={item.href} className="title">
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
                                <div className="chilMenu uc-container">
                                    <Row justify="space-between" gutter={24}>
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
                </div>
            </Header>
        </div>
    )
}
