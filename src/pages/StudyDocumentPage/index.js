/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useState } from 'react'
import { Button, Row, Tabs, Tooltip, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons'
import Banner from './Banner'
import DocumentListing from './DocumentListing'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import DocumentUploadModal from './DocumentUploadModal'
import './styles.scss'
import { DOCUMENT_TYPE } from '../../constants'
import { useMediaQuery } from 'react-responsive'
const { Text } = Typography
const StudyDocumentPage = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const history = useHistory()
    const [showModalUpload, setShowModalUpload] = useState(false)
    const [actionUpload, setActionUpload] = useState('')
    const items = [
        {
            label: 'Tất cả tài liệu',
            key: 'ALL',
            children: (
                <>
                    <DocumentListing type="ALL" />
                </>
            ),
        },
        {
            label: 'Giáo trình học tập',
            key: DOCUMENT_TYPE.CURRICULUM,
            children: (
                <>
                    <DocumentListing type={DOCUMENT_TYPE.CURRICULUM} />
                </>
            ),
        },
        {
            label: 'Slide',
            key: DOCUMENT_TYPE.SLIDE,
            children: (
                <>
                    <DocumentListing type={DOCUMENT_TYPE.SLIDE} />
                </>
            ),
        },
        {
            label: 'Tài liệu tổng hợp',
            key: DOCUMENT_TYPE.OTHER,
            children: (
                <>
                    <DocumentListing type={DOCUMENT_TYPE.OTHER} />
                </>
            ),
        },
        {
            label: 'Đề thi thử',
            key: DOCUMENT_TYPE.EXAM,
            children: (
                <>
                    <DocumentListing type={DOCUMENT_TYPE.EXAM} />
                </>
            ),
        },
    ]
    return (
        <>
            <Navigation />
            <div
                className={`${
                    isMobile || isTablet ? 'uc-container-m' : 'uc-container'
                } mtz-document-page`}
                style={{ marginTop: 80 }}
            >
                <Banner />
                <div className="mtz-documents-box-title">
                    <Row className="mtz-documents-header d-space-c mb-15">
                        <Text className="h3-title">Tài liệu học tập</Text>
                        {isMobile ? (
                            <Tooltip
                                title="Đăng tải tài liệu"
                                placement="topRight"
                            >
                                <Button
                                    type="primary"
                                    icon={<UploadOutlined />}
                                    onClick={() => setShowModalUpload(true)}
                                ></Button>
                            </Tooltip>
                        ) : (
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                onClick={() => setShowModalUpload(true)}
                            >
                                Đăng tải tài liệu
                            </Button>
                        )}
                    </Row>
                    <Row className="mtz-tabs mt-15 mb-15">
                        <Tabs
                            defaultActiveKey={history.location?.state}
                            items={items}
                        />
                    </Row>
                </div>
                <DocumentUploadModal
                    showModalUpload={showModalUpload}
                    setShowModalUpload={setShowModalUpload}
                    actionUpload={actionUpload}
                    setActionUpload={setActionUpload}
                />
            </div>
            <Footer />
        </>
    )
}
StudyDocumentPage.propTypes = {}

export default memo(StudyDocumentPage)
