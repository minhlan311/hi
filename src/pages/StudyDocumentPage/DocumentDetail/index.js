import {
    Button,
    Card,
    Empty,
    Modal,
    Space,
    Typography,
    Divider,
    Form,
    Input,
    message,
    Popover,
} from 'antd'
import React, { memo, useEffect, useState } from 'react'
import {
    DownloadOutlined,
    EyeOutlined,
    LeftOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import fileDownload from 'js-file-download'
import { cloneDeep } from 'lodash'
import JsZip from 'jszip'
import FileSaver from 'file-saver'
import Promise from 'bluebird'

import settings from '../../../settings'
import { useHistory, useParams } from 'react-router-dom'
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import mtzDocumentImg3 from '../../../assets/images/documents-page/documents-img3.svg'
import mtzDocumentImg from '../../../assets/images/homepage/document-img.png'
import mtzFreeIcon from '../../../assets/images/documents-page/free-icon.svg'

import mtzEyeImg from '../../../assets/images/homepage/eye-img.svg'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    documentDetailSelector,
    getDocumentDetailRequest,
    documentsSelector,
    getDocumentsRequest,
    downloadDocumentRequest,
} from '../../../slices/document'
import { fileSelector } from '../../../slices/file'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { splitText } from '../../../utils/helper'
import { DOCUMENT_TYPE } from '../../../constants'
import { useMediaQuery } from 'react-responsive'
import { joinCourseSelector } from '../../../slices/course'
import { USER_INFO } from '../../../constants/storageKeys'
import { FaDollarSign } from 'react-icons/fa'
import { getStorage } from '../../../services/storage'
import Payments from '../../../components/payments'
import axiosInstance from '../../../utils/axios'
import { JOIN_COURSE_PATH } from '../../../constants/paths'
import ShowProfile from '../../../components/layout/ShowProfile'
import Navigation from '../../../components/layout/Navigation'
import Banner from '../Banner'
import Footer from '../../../components/layout/Footer'

const { Text } = Typography
const { Meta } = Card

const DocumentDetail = () => {
    const history = useHistory()
    const params = useParams()
    const [docs, setDocs] = useState([])
    const dispatch = useDispatch()
    const documentDetailInfo = useSelector(documentDetailSelector)
    const relatedDocuments = useSelector(documentsSelector)
    const { data } = documentDetailInfo
    const [showModalPreview, setShowModalPreview] = useState(false)
    const [contentLength, setContentLength] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const user = getStorage(USER_INFO)
    const [error, setError] = useState('')

    const [isModalCodeOpen, setIsModalCodeOpen] = useState(false)

    const id = atob(params.id)

    // TODO: documentDetailInfo: bind document detail
    useEffect(() => {
        dispatch(getDocumentDetailRequest(id))
    }, [dispatch, id])

    useEffect(() => {
        if (data?.type) {
            const query = {
                filterQuery: {
                    type: data.type,
                    subjectId: data.subjectId?._id,
                },
                options: {
                    limit: 5,
                    page: 1,
                    sort: { viewed: -1 },
                },
            }
            dispatch(getDocumentsRequest(query))

            let myDoc = []
            // eslint-disable-next-line array-callback-return
            data.files?.map((item) => {
                myDoc.push({ uri: settings.FILE_URL + '/' + item.url })
            })
            setDocs(myDoc)
        }
    }, [data])

    const downloadFile = useSelector(fileSelector)
    const download = (url) => {
        return fetch(url).then((resp) => resp.blob())
    }

    const renderSwitch = (type) => {
        switch (type) {
            case DOCUMENT_TYPE.CURRICULUM:
                return 'Giáo trình'
            case DOCUMENT_TYPE.SLIDE:
                return 'Slide'
            case DOCUMENT_TYPE.EXAM:
                return 'Đề thi thử'
            default:
                return 'Tài liệu'
        }
    }

    const exportZip = (blobs) => {
        const zip = JsZip()
        blobs.forEach((blob, i) => {
            zip.file(`${data.files[i].name}`, blob)
        })
        zip.generateAsync({ type: 'blob' }).then((zipFile) => {
            const currentDate = new Date().getTime()
            const fileName = `${data.name}-${currentDate}.zip`
            return FileSaver.saveAs(zipFile, fileName)
        })
    }

    const handelFinish = (value) => {
        axiosInstance
            .post(settings.API_URL + JOIN_COURSE_PATH, {
                activationCode: value.code,
                targetId: data?._id,
                targetModel: 'DOCUMENT',
                userIds: [user?._id],
                type: 'STUDENT',
            })
            .then((r) => {
                window.location.reload()
            })
            .catch((e) => {
                const messageError = 'Mã code không đúng! Vui lòng nhập lại.'
                setError(messageError)
                message.error(messageError).then((r) => {})
            })
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const onCancel = () => {
        setIsModalOpen(false)
        setIsModalCodeOpen(false)
    }

    const downloadByGroup = (urls, files_per_group = 10) => {
        return Promise.map(
            urls,
            async (url) => {
                return await download(url)
            },
            { concurrency: files_per_group }
        )
    }
    const handleDownload = () => {
        if (data?.files?.length === 1) {
            window.open(`${settings.FILE_URL}/${data?.files[0].url}`, '_blank')

            dispatch(downloadDocumentRequest(id))
        } else {
            downloadByGroup(
                data.files?.map((e) => `${settings.FILE_URL}/${e.url}`),
                10
            ).then(exportZip)
            dispatch(downloadDocumentRequest(id))
        }
        message.success('Tải tài liệu thành công!')
    }

    useEffect(() => {
        if (downloadFile.data?.length > 0) {
            fileDownload(downloadFile.data, `${data.name}.zip`)
        }
    }, [downloadFile])

    const handleSeeMore = () => {
        const countLength = cloneDeep(contentLength)
        if (countLength < data?.content?.length) {
            setContentLength(data?.content?.length)
        } else {
            setContentLength(3000)
        }
    }

    const handleClickDocument = (id) => {
        history.push(`/documents/${btoa(id)}`)
    }
    const handleBuyDocument = () => {
        showModal()
    }

    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })

    const RenderDocumet = () => {
        return (
            <>
                <div className="mtz-documents-header mb-15">
                    <Text
                        onClick={() => history.push('/documents')}
                        className="header-link h3-title"
                    >
                        <LeftOutlined />
                        Tất cả tài liệu
                    </Text>
                </div>
                <div
                    className="mtz-documents-detail"
                    style={isMobile ? null : { display: 'flex' }}
                >
                    <div
                        className="documents-detail-container"
                        style={
                            isMobile
                                ? { width: '100%' }
                                : {
                                      width: '75%',
                                  }
                        }
                    >
                        {data ? (
                            <>
                                <div className="documents-detail-banner">
                                    <img
                                        alt="documents icon"
                                        src={
                                            data?.image
                                                ? settings.FILE_URL +
                                                  '/' +
                                                  data.image
                                                : mtzDocumentImg3
                                        }
                                    />
                                </div>
                                <div className="documents-tag mt-10">
                                    {data?.plan === 'FREE' ? (
                                        <>
                                            <img
                                                alt="eye icon"
                                                src={mtzFreeIcon}
                                            />

                                            <div
                                                style={{
                                                    color: '#50AA64',
                                                    fontSize: 13,
                                                    marginLeft: 5,
                                                }}
                                            >
                                                Miễn phí
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            style={{
                                                color: '#DF5534',
                                                fontSize: 13,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <FaDollarSign size={18} />
                                            <div>
                                                Có phí{' '}
                                                <span
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {data.cost
                                                        ? ` ${data.cost}A+`
                                                        : ''}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {data?.isLocked ? (
                                    <Button
                                        onClick={() => handleBuyDocument()}
                                        className="mt-15"
                                        type="primary"
                                        icon={<ShoppingCartOutlined />}
                                    >
                                        Mua tài liệu
                                    </Button>
                                ) : (
                                    <div
                                        style={
                                            isMobile
                                                ? null
                                                : {
                                                      display: 'flex',
                                                      justifyContent:
                                                          'space-between',
                                                      alignItems: 'center',
                                                  }
                                        }
                                        className="mt-15"
                                    >
                                        <Button
                                            onClick={() =>
                                                setShowModalPreview(true)
                                            }
                                            icon={<EyeOutlined />}
                                            style={
                                                isMobile
                                                    ? {
                                                          width: '100%',
                                                          marginBottom: 15,
                                                      }
                                                    : null
                                            }
                                        >
                                            Xem tài liệu
                                        </Button>

                                        <Button
                                            size={'large'}
                                            type="primary"
                                            icon={<DownloadOutlined />}
                                            disabled={!data?.isDownloadable}
                                            onClick={handleDownload}
                                            style={
                                                isMobile
                                                    ? { width: '100%' }
                                                    : null
                                            }
                                        >
                                            Tải xuống ({data?.downloaded} lượt)
                                        </Button>
                                    </div>
                                )}

                                <div className="title-group mt-15 mb-15">
                                    <div className="title">
                                        {data?.name}
                                        <div className="sub-title">
                                            Người đăng:{' '}
                                            {data.owner ? (
                                                <Popover
                                                    content={
                                                        <ShowProfile
                                                            id={data.owner?._id}
                                                        />
                                                    }
                                                >
                                                    {data.owner?.fullName}
                                                </Popover>
                                            ) : (
                                                'MentorZ'
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="documents-description">
                                    <div className="description">
                                        {contentLength === 5000 ? (
                                            <>
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: data?.description,
                                                    }}
                                                    className="my-4"
                                                ></p>
                                                <div id="fadeout"></div>
                                            </>
                                        ) : (
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.description,
                                                }}
                                                className="my-4"
                                            ></p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <Empty
                                    style={{ margin: 50 }}
                                    description={
                                        <span>
                                            Tài liệu không tồn tại hoặc đã bị
                                            xóa!
                                        </span>
                                    }
                                >
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            history.push('/documents')
                                        }
                                    >
                                        Xem tài liệu khác
                                    </Button>
                                </Empty>
                            </div>
                        )}
                    </div>

                    {contentLength !== 0 ? (
                        <>
                            <Button
                                className="mt-15 documents-see-more"
                                size="large"
                                onClick={handleSeeMore}
                            >
                                {contentLength === 3000
                                    ? 'Xem thêm'
                                    : 'Thu gọn'}
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}

                    <div
                        style={
                            isMobile
                                ? { marginTop: 10 }
                                : { marginTop: -40, width: '24%' }
                        }
                    >
                        <h2>Tài liệu khác</h2>
                        {relatedDocuments?.data?.docs?.length > 1 ? (
                            // eslint-disable-next-line array-callback-return
                            relatedDocuments?.data?.docs?.map((item) => {
                                if (item._id !== id) {
                                    return (
                                        <Card
                                            style={{
                                                marginBottom: 15,
                                            }}
                                            onClick={() =>
                                                handleClickDocument(item._id)
                                            }
                                            cover={
                                                <div>
                                                    <img
                                                        alt="documents icon"
                                                        src={
                                                            item.image
                                                                ? settings.FILE_URL +
                                                                  '/' +
                                                                  item.image
                                                                : mtzDocumentImg
                                                        }
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </div>
                                            }
                                            actions={[
                                                <>
                                                    <img
                                                        alt="eye icon"
                                                        src={mtzEyeImg}
                                                    />{' '}
                                                    <Text>{item.viewed}</Text>
                                                </>,
                                                <>
                                                    <DownloadOutlined
                                                        style={{
                                                            color: 'black',
                                                            marginRight: 10,
                                                        }}
                                                    />
                                                    <Text>
                                                        {item.downloaded}
                                                    </Text>
                                                </>,
                                            ]}
                                        >
                                            <Space direction="vertical">
                                                {item.type ? (
                                                    <Text
                                                        style={{
                                                            background:
                                                                '#95DCFE',
                                                            maxWidth: '70%',
                                                            padding: '5px 8px',
                                                            borderRadius: '5px',
                                                            color: 'black',
                                                            fontWeight: 'bold',
                                                            fontSize: '12px',
                                                        }}
                                                    >
                                                        {renderSwitch(
                                                            item.type
                                                        )}
                                                    </Text>
                                                ) : (
                                                    ''
                                                )}
                                                <Meta
                                                    title={splitText(
                                                        item.name,
                                                        40
                                                    )}
                                                    className="my-0"
                                                    description={
                                                        <>
                                                            Người đăng:{' '}
                                                            {data.owner ? (
                                                                <Popover
                                                                    content={
                                                                        <ShowProfile
                                                                            id={
                                                                                data
                                                                                    .owner
                                                                                    ?._id
                                                                            }
                                                                        />
                                                                    }
                                                                >
                                                                    {
                                                                        data
                                                                            .owner
                                                                            ?.fullName
                                                                    }
                                                                </Popover>
                                                            ) : (
                                                                'MentorZ'
                                                            )}
                                                        </>
                                                    }
                                                />
                                                <Meta
                                                    description={
                                                        <>
                                                            Môn học:{' '}
                                                            <span>
                                                                {item.description
                                                                    ? splitText(
                                                                          item
                                                                              .subjectId
                                                                              ?.name,
                                                                          30
                                                                      )
                                                                    : splitText(
                                                                          'Môn',
                                                                          30
                                                                      )}
                                                            </span>
                                                        </>
                                                    }
                                                />
                                                <Meta
                                                    description={
                                                        item.description ? (
                                                            <p
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `${item?.description}`,
                                                                }}
                                                            ></p>
                                                        ) : (
                                                            splitText(
                                                                'Kho tài liệu học tập cho tất cả các học sinh trên cả nước được tạo bởi các giảng viên hàng đầu cả nước được tạo bởi các giảng viên hàng đầu',
                                                                30
                                                            )
                                                        )
                                                    }
                                                />
                                                <div className="documents-tag mt-2">
                                                    {item?.plan === 'FREE' ? (
                                                        <>
                                                            <img
                                                                alt="eye icon"
                                                                src={
                                                                    mtzFreeIcon
                                                                }
                                                            />

                                                            <div
                                                                style={{
                                                                    color: '#50AA64',
                                                                    fontSize: 13,
                                                                    marginLeft: 5,
                                                                }}
                                                            >
                                                                {' '}
                                                                Miễn phí
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                color: '#DF5534',
                                                                fontSize: 13,
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <FaDollarSign
                                                                size={18}
                                                            />
                                                            <div>Có phí</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </Space>
                                        </Card>
                                    )
                                }
                            })
                        ) : (
                            <Empty description="Không có tài liệu nào nữa!" />
                        )}
                    </div>
                </div>
                {
                    <Modal
                        title="Preview Document"
                        open={showModalPreview}
                        onCancel={() => setShowModalPreview(false)}
                        width={isMobile || isTablet ? '100%' : '70%'}
                        bodyStyle={{ height: '70vh', overflow: 'auto' }}
                        footer={[]}
                    >
                        {' '}
                        <DocViewer
                            pluginRenderers={DocViewerRenderers}
                            documents={docs}
                            theme={{
                                height: '100%',
                                disableThemeScrollbar: false,
                            }}
                            style={{ height: '100%' }}
                            config={{
                                header: {
                                    disableHeader: false,
                                    disableFileName: false,
                                    retainURLParams: false,
                                },
                                pdfZoom: {
                                    defaultZoom: 0.4, // 1 as default,
                                    zoomJump: 0.1, // 0.1 as default,
                                },
                            }}
                        />{' '}
                    </Modal>
                }
                {data?.isLocked && (
                    <Payments
                        data={data}
                        isModalOpen={isModalOpen}
                        onCancel={onCancel}
                        handleCode={() => {
                            setIsModalCodeOpen(true)
                            setIsModalOpen(false)
                        }}
                    ></Payments>
                )}
                <Modal
                    title="Mua tài liệu"
                    open={isModalCodeOpen}
                    footer={null}
                    onCancel={onCancel}
                >
                    <p>Vui lòng nhập code</p>
                    <Form onFinish={handelFinish}>
                        <Form.Item
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập code',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập code" />
                        </Form.Item>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Divider />
                        <Form.Item
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Button
                                type="default"
                                onClick={onCancel}
                                style={{ marginRight: '10px' }}
                            >
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Tiếp tục
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
    return (
        <>
            <Navigation />
            <div
                className={`${
                    isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
                } mtz-document-page`}
                style={{ marginTop: 80 }}
            >
                <Banner />
                <div style={{ marginTop: 80 }}>
                    <RenderDocumet />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default memo(DocumentDetail)
