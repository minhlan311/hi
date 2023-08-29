/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react'
import { Button, Row, Col } from 'antd'
import mtzDocumentsImg from '../../../assets/images/banner/banner1.png'
import './styles.scss'

const Banner = () => {
    return (
        <div className="mtz-document-banner">
            <Row className="row-container">
                <Col span={24} md={12}  sm={24} lg={12} xl={16} className='info'>
                    <div className="banner-info">
                        <h4 className="title">
                            Kho tài liệu dành cho học sinh, sinh viên
                        </h4>

                        <h4 className="title-description">
                            Với đội ngũ Mentor từ khắp mọi nơi, đầy kinh nghiệm
                            xây dựng kho tài liệu phù hợp cho tất cả học viên.
                        </h4>

                        <div className="docs-discover">
                            <Button className="btn-banner" size="large">
                                Khám phá ngay
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col
                    span={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={8}
                    className="docs-img"
                >
                    <img
                        style={{ width: '100%', maxHeight: '322px' }}
                        className=""
                        src={mtzDocumentsImg}
                        alt="mtz home banner"

                    />
                </Col>
            </Row>
        </div>
    )
}

export default memo(Banner)
