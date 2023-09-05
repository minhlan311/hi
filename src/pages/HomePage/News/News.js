import React from 'react'
import { Button, Image, Typography } from 'antd'
import './News.scss'

export default function News() {
    const { Paragraph } = Typography
    return (
        <div className="news-container">
            <div className="container-1200px">
                <p className="text-xs">ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
                <h3>Tin tức và Góc học tập</h3>
                <div className="title-container">
                    <div className="col">
                        <div className="imgBox">
                            <Image
                                className="imgIn"
                                src={
                                    'https://giasutienphong.com.vn/wp-content/uploads/2020/06/tt_tieng_anh_quan2.jpg'
                                }
                            />
                        </div>
                        <div className="content">
                            <h4>
                                Tổng hợp các cấu trúc câu giả định trong tiếng
                                anh
                            </h4>
                            <Paragraph className="text" ellipsis={{ rows: 3 }}>
                                Tiếng Anh là ngôn ngữ phổ biến của toàn cầu,
                                ngôn ngữ này là lợi thế giúp bạn mở rộng cánh
                                cửa của chúng ta mà chúng ta chưa{' '}
                            </Paragraph>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgBox">
                            <Image
                                className="imgIn"
                                src={
                                    'https://giasutienphong.com.vn/wp-content/uploads/2020/06/tt_tieng_anh_quan2.jpg'
                                }
                            />
                        </div>
                        <div className="content">
                            <h4>
                                Tổng hợp các cấu trúc câu giả định trong tiếng
                                anh
                            </h4>
                            <Paragraph className="text" ellipsis={{ rows: 3 }}>
                                Tiếng Anh là ngôn ngữ phổ biến của toàn cầu,
                                ngôn ngữ này là lợi thế giúp bạn mở rộng cánh
                                cửa của chúng ta mà chúng ta chưa{' '}
                            </Paragraph>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgBox">
                            <Image
                                className="imgIn"
                                src={
                                    'https://giasutienphong.com.vn/wp-content/uploads/2020/06/tt_tieng_anh_quan2.jpg'
                                }
                            />
                        </div>
                        <div className="content">
                            <h4>
                                Tổng hợp các cấu trúc câu giả định trong tiếng
                                anh
                            </h4>
                            <Paragraph className="text" ellipsis={{ rows: 3 }}>
                                Tiếng Anh là ngôn ngữ phổ biến của toàn cầu,
                                ngôn ngữ này là lợi thế giúp bạn mở rộng cánh
                                cửa của chúng ta mà chúng ta chưa{' '}
                            </Paragraph>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgBox">
                            <Image
                                className="imgIn"
                                src={
                                    'https://giasutienphong.com.vn/wp-content/uploads/2020/06/tt_tieng_anh_quan2.jpg'
                                }
                            />
                        </div>
                        <div className="content">
                            <h4>
                                Tổng hợp các cấu trúc câu giả định trong tiếng
                                anh
                            </h4>
                            <Paragraph className="text" ellipsis={{ rows: 3 }}>
                                Tiếng Anh là ngôn ngữ phổ biến của toàn cầu,
                                ngôn ngữ này là lợi thế giúp bạn mở rộng cánh
                                cửa của chúng ta mà chúng ta chưa{' '}
                            </Paragraph>
                        </div>
                    </div>
                </div>
                <Button className="buttonMore">Xem tất cả</Button>
            </div>
        </div>
    )
}
