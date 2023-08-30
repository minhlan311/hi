import { Button, Card, Col, Row, Space } from 'antd'
import React from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
import ball from '../../../assets/icons/ball.svg'
import point3 from '../../../assets/icons/point3.svg'
export default function TopCourses() {
    const courseData = [
        {
            name: 'Tiếng Trung',
            desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
            cover: 'https://littlestepsasia.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2021/08/06153111/Best_Mandarin_Classes_Kuala_Lumpur.jpg',
        },
        {
            name: 'Tiếng Anh',
            desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
            cover: 'https://www.englishexplorer.com.sg/wp-content/uploads/2017/02/english-course.jpg',
        },
        {
            name: 'Tiếng Nhật',
            desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
            cover: 'https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png',
        },
        {
            name: 'Tiếng Đức',
            desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
            cover: 'https://www.studying-in-germany.org/wp-content/uploads/2018/08/learn-german-language-with-online-courses.jpg',
        },
        {
            name: 'Tiếng Hàn',
            desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
            cover: 'https://www.90daykorean.com/wp-content/uploads/2020/10/Online-Korean-Course-min-1.png',
        },
    ]
    return (
        <Header
            size="sm"
            title="Các khóa học tiêu biểu"
            titleSize={50}
            desc="ĐÀO TẠO NHIỀU NGÔN NGỮ"
            padding={60}
            background="var(--lighish-white)"
        >
            <img src={ball} alt="ball" className="ball" />
            <img src={point3} alt="point3" className="point3" />
            <Row gutter={[24, 24]}>
                {courseData.map((item, id) => (
                    <Col span={24} md={8} key={id}>
                        <Card
                            size="small"
                            cover={
                                <img
                                    src={item.cover}
                                    alt={item.cover}
                                    className="cover"
                                />
                            }
                            className="intro-card"
                        >
                            <Space direction="vertical">
                                <div className="d-space-c">
                                    <h2>{item.name}</h2>
                                    <Button
                                        size="small"
                                        type="primary"
                                        className="course-count"
                                    >
                                        28+ Khóa
                                    </Button>
                                </div>
                                <div>{item.desc}</div>
                                <Button type="link" size="small">
                                    <div className="d-space-c more">
                                        <div className="mr-5">Xem thêm </div>
                                        <BsArrowRightCircle />
                                    </div>
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Header>
    )
}
