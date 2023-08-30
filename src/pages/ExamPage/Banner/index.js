/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react'
import { Row, Col, Button } from 'antd'
import mtzTestImg from '../../../assets/images/exam-page/test-img.svg'
// import "./styles.scss";
import './test.scss'
import { useMediaQuery } from 'react-responsive'
const Banner = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    return (
        <div
            className={`${
                isMobile || isTablet ? 'uc-container-m' : 'uc-container'
            } pc`}
            style={{ marginTop: 80 }}
        >
            <div className="mtz-exam-banner">
                <Row className="row-container banner-test">
                    <Col
                        className="col-container"
                        span={24}
                        md={12}
                        lg={16}
                        xl={16}
                        sm={24}
                        style={{ padding: '2rem' }}
                    >
                        <div className="row-content">
                            <p className="heading">
                                Thi thử cùng MentorZ ngay nhé!
                            </p>
                            <p className="description">
                                Với đội ngũ Mentor từ khắp mọi nơi, đầy kinh
                                nghiệm xây dựng kho tài liệu phù hợp cho tất cả
                                học viên.
                            </p>
                        </div>
                        <Button className="btn-banner" size="large">
                            Khám phá ngay
                        </Button>
                    </Col>
                    <Col
                        className="col-image"
                        span={24}
                        md={12}
                        lg={8}
                        xl={8}
                        sm={24}
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'end',
                        }}
                    >
                        <img
                            className="image-test-mtz"
                            src={mtzTestImg}
                            alt="mtz home banner"
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default memo(Banner)
