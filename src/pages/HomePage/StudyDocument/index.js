import { Card, Col, Row, Typography } from 'antd'
import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import mtzDocumentCover1Img from '../../../assets/images/homepage/document-cover1.svg'
import mtzDocumentCover2Img from '../../../assets/images/homepage/document-cover2.svg'
import mtzDocumentCover3Img from '../../../assets/images/homepage/document-cover3.svg'
import mtzDocumentCover4Img from '../../../assets/images/homepage/document-cover4.svg'

import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import { DOCUMENT_TYPE } from '../../../constants'
const { Text } = Typography

const StudyDocuments = () => {
    // const dispatch = useDispatch();
    const history = useHistory()
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const document = [
        {
            title: 'Giáo trình học tập',
            desc: 'Giáo trình học tập dành cho tất cả học sinh, sinh viên trển cả nước.',
            cover: <img alt="documents icon" src={mtzDocumentCover1Img} />,
            href: '/documents',
            key: DOCUMENT_TYPE.CURRICULUM,
        },
        {
            title: 'Slide',
            desc: 'Giáo trình học tập dành cho tất cả học sinh, sinh viên trển cả nước.',
            cover: <img alt="documents icon" src={mtzDocumentCover2Img} />,
            href: '/documents',
            key: DOCUMENT_TYPE.SLIDE,
        },
        {
            title: 'Tài liệu tổng hợp',
            desc: 'Giáo trình học tập dành cho tất cả học sinh, sinh viên trển cả nước.',
            cover: <img alt="documents icon" src={mtzDocumentCover3Img} />,
            href: '/documents',
            key: DOCUMENT_TYPE.OTHER,
        },
        {
            title: 'Đề thi thử',
            desc: 'Giáo trình học tập dành cho tất cả học sinh, sinh viên trển cả nước.',
            cover: <img alt="documents icon" src={mtzDocumentCover4Img} />,
            href: '/documents',
            key: DOCUMENT_TYPE.EXAM,
        },
    ]
    return (
        <div
            className={`${
                isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
            } mtz-study-documents pb-30`}
        >
            <Row className="mtz-study-documents-header pb-15">
                <Text className="h3-title">Tài liệu học tập</Text>
            </Row>
            <Row gutter={32}>
                {document.map((item, id) => (
                    <Col
                        className="gutter-row"
                        span={24}
                        md={12}
                        sm={24}
                        lg={6}
                        key={item.title}
                        style={
                            isMobile || isTablet ? { marginBottom: 10 } : null
                        }
                    >
                        <Card
                            hoverable
                            onClick={() => history.push(item.href, item.key)}
                            cover={item.cover}
                            // className="op-0 am-up"
                            // style={{ animationDelay: `${id * 2 * 0.1}s` }}
                        >
                            <div
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <p style={{ fontSize: 25, color: '#0d84e0' }}>
                                    {item.title}
                                </p>
                                <p style={{ color: '#8f95b2' }}>{item.desc}</p>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default memo(StudyDocuments)
