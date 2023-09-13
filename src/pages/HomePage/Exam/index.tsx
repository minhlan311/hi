import React from 'react'
import { Row, Col, Card } from 'antd'
import testImage from '../../../assets/images/homepage/image-test.png'
import testImage1 from '../../../assets/images/homepage/image_test1.png'
import hat from '../../../assets/images/homepage/hat.png'
import coin from '../../../assets/images/homepage/coin.png'

import { useHistory } from 'react-router-dom'

import './index.scss'
import { useMediaQuery } from 'react-responsive'
const Exam = () => {
    const history = useHistory()
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    return (
        <div
            className={`${
                isMobile || isTablet ? 'uc-container-m' : 'uc-container'
            } exam pb-30`}
        >
            <Row gutter={10}>
                <Col span={24} md={12} lg={8} className="test-image">
                    <img src={coin} alt="" className="coin" />
                    <img src={hat} alt="" className="hat" />
                    <img src={testImage} alt="" />
                </Col>
                <Col span={24} md={12} lg={16}>
                    <div className="exam-test">
                        <h3>Test đánh giá</h3>
                        <p>
                            Thi thử để dánh giá kế quả học tập của bạn.. Với đội
                            ngũ Mentor từ khắp mọi nơi, đầy kinh nghiệm xây dựng
                            kho tài liệu phù hợp cho tất cả học viên.
                        </p>
                        <p>Thi thử để dánh giá kế quả học tập của bạn..</p>
                        <Row gutter={10} style={{ marginTop: '20px' }}>
                            <Col
                                span={24}
                                md={12}
                                lg={12}
                                style={
                                    isMobile || isTablet
                                        ? { marginBottom: 10 }
                                        : null
                                }
                            >
                                <Card
                                    onClick={() => history.push('/tests')}
                                    hoverable
                                >
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            <img src={testImage1} alt="" />
                                        </Col>
                                        <Col span={16}>
                                            <h4>BÀI TEST</h4>
                                            <p>
                                                Bộ đề Test tất cả các môn các
                                                chuyên ngành. Phù hợp với các
                                                bạn.
                                            </p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24} md={12} lg={12}>
                                <Card
                                    onClick={() => history.push('/quizzes')}
                                    hoverable
                                >
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            <img src={testImage1} alt="" />
                                        </Col>
                                        <Col span={16}>
                                            <h4>BÀI QUIZ</h4>
                                            <p>
                                                Bộ đề Test tất cả các môn các
                                                chuyên ngành. Phù hợp với các
                                                bạn.
                                            </p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Exam
