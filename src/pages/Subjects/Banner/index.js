import React from 'react'
import { Button, Col, Row } from 'antd'
import bannerSubject from '../../../assets/images/subject/banner.svg'
import './styles.scss'
const Banner = () => {
    return (
        <div className="banner-subject">
            <Row>
                <Col span={24} xl={16} md={12} sm={24} lg={12} xxl={16}>
                    <div className="p-5 mt-4">
                        <p className="title-subject">
                            Tổng hợp các môn học của trường Đại Học
                        </p>
                        <p className="description-subject">
                            Tổng hợp các môn học của trường đại học mà sinh viên
                            đang theo học
                        </p>
                        <div className="onPress-banner-subject">
                            <Button className="btn-banner" size="large">
                                Khám phá ngay
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col
                    span={24}
                    xl={8}
                    md={12}
                    sm={24}
                    lg={12}
                    xxl={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignSelf: 'end',
                    }}
                >
                    <img
                        style={{ width: '100%', maxHeight: '322px' }}
                        className="w-100"
                        src={bannerSubject}
                        alt=""
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Banner
