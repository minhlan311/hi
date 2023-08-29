import { Link } from 'react-router-dom'
import './styles.scss'
import { Col, Row, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
export default function MenuPc() {
    const menu = [
        {
            label: 'Giới thiệu',
            children: [],
        },
        {
            label: 'Du học các nước',
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
            label: 'Thực tập có lương',
            children: [{}],
        },
        {
            label: 'Định cư - Thực tập',
            children: [{}],
        },
        {
            label: 'Ngành hot',
            children: [{}],
        },
        {
            label: 'Trường học',
            children: [],
        },
        {
            label: 'XK Lao động',
            children: [],
        },
        {
            label: 'Đào tạo ngoại ngữ',
            children: [{}],
        },
        {
            label: 'Tin tức - Học bổng',
            children: [],
        },
        {
            label: "FAQ'S",
            children: [],
        },
    ]
    return (
        <div className="menu">
            <div className="menuItem mtz-container">
                {menu.map((item) => (
                    <div key={item.label} className="menuLabel">
                        <div className="labelItem">
                            <Space style={{ width: '100%' }} size="small">
                                {item.label}
                                {item.children.length > 0 && <DownOutlined />}
                            </Space>
                            <div className="arr"></div>
                        </div>
                        <div className="chilMenu mtz-container">
                            <Row justify="space-between" gutter={24}>
                                {item.children.map((chil) => (
                                    <Col
                                        span={6}
                                        className="chil"
                                        key={chil.label}
                                    >
                                        <h3>{chil.label}</h3>
                                        {chil?.menuChild?.map((menuChil) => (
                                            <Space
                                                style={{ width: '100%' }}
                                                direction="vertical"
                                                key={menuChil.childLabel}
                                            >
                                                <Link to={menuChil.href}>
                                                    {menuChil.childLabel}
                                                </Link>
                                            </Space>
                                        ))}
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
