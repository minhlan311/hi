import FileSaver from 'file-saver'
import JSZip from 'jszip'
import React from 'react'
import settings from '../../../../settings'
import { Button, Card, Empty, List, Popover, Space, Typography } from 'antd'
import { DownloadOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import mtzDocumentImg from '../../../../assets/images/homepage/document-img.png'
import mtzFreeIcon from '../../../../assets/images/documents-page/free-icon.svg'
import { useHistory } from 'react-router-dom'
import { DOCUMENT_TYPE } from '../../../../constants'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import './styles.scss'
import { FaDollarSign } from 'react-icons/fa'
import { Promise } from 'bluebird'
import ShowProfile from '../../../../components/layout/ShowProfile'
export default function Documents(props) {
    const { data, CourseHeader, CollapseCustom } = props

    const history = useHistory()

    const [loadingDownload, setLoadingDownload] = React.useState(false)
    const download = (url) => {
        return fetch(url).then((resp) => resp.blob())
    }
    const { Text } = Typography
    const { Meta } = Card

    const renderSwitch = (type) => {
        switch (type) {
            case DOCUMENT_TYPE.CURRICULUM:
                return 'Giáo trình'
            case DOCUMENT_TYPE.SLIDE:
                return 'Slide'
            case DOCUMENT_TYPE.EXAM:
                return 'Đề thi thử'
            default:
                return 'Tài liệu tổng hợp'
        }
    }
    const downloadByGroup = (urls, files_per_group = 10) => {
        return Promise.map(
            urls,
            async (url) => {
                if (!url) return
                await download(url)
            },
            { concurrency: files_per_group }
        )
    }
    const exportZip = (blobs, files) => {
        const zip = JSZip()
        blobs.forEach((blob, i) => {
            zip.file(`${files[i].name}`, blob)
        })
        zip.generateAsync({ type: 'blob' }).then((zipFile) => {
            const currentDate = new Date().getTime()
            const fileName = `${data.name}-${currentDate}.zip`
            return FileSaver.saveAs(zipFile, fileName)
        })
        setLoadingDownload(false)
    }
    const handleDownload = () => {
        setLoadingDownload(true)
        const files = data.documents.map((e) => e.files).flat()
        if (files.length === 1) {
            if (files[0].url) {
                return window.open(
                    `${settings.FILE_URL}/${files[0]?.url}`,
                    '_blank'
                )
            }
        } else {
            downloadByGroup(
                files.map((e) => {
                    if (e.url) {
                        return `${settings.FILE_URL}/${e?.url}`
                    } else {
                        return null
                    }
                }),
                10
            ).then((blobs) => {
                exportZip(blobs, files)
            })
        }
    }

    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1919 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const subject = data?.subject?.name
    const mentor = data?.mentor

    return (
        <>
            <div
                style={
                    isMobile
                        ? null
                        : { display: 'flex', justifyContent: 'space-between' }
                }
            >
                {data?.documents?.length > 0 ? (
                    <>
                        <div
                            style={{
                                width: '74%',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 10,
                                }}
                            >
                                <h2>Tài liệu khóa học</h2>
                                <Button
                                    size="large"
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    disabled={
                                        !data?.documents || !data?.progressions
                                            ? true
                                            : false
                                    }
                                    onClick={handleDownload}
                                    loading={loadingDownload}
                                >
                                    Tải xuống
                                </Button>
                            </div>
                            <List
                                grid={{
                                    gutter: 16,
                                    column:
                                        (isMobile && 1) ||
                                        (isTablet && 2) ||
                                        (isLaptop && 3) ||
                                        (isDesktop && 4),
                                }}
                                dataSource={data?.documents}
                                renderItem={(item) => (
                                    <List.Item
                                        key={item._id}
                                        style={{ padding: 0 }}
                                    >
                                        <Card
                                            hoverable
                                            style={
                                                data.progressions && {
                                                    cursor: 'pointer',
                                                }
                                            }
                                            className="path"
                                            onClick={() =>
                                                !data?.progressions
                                                    ? null
                                                    : history.push(
                                                          `/documents/${btoa(
                                                              item._id
                                                          )}`
                                                      )
                                            }
                                            cover={
                                                <img
                                                    alt="documents"
                                                    className="documents-img"
                                                    src={
                                                        item.image
                                                            ? settings.FILE_URL +
                                                              '/' +
                                                              item.image
                                                            : mtzDocumentImg
                                                    }
                                                />
                                            }
                                            actions={[
                                                <>
                                                    <Text>
                                                        <EyeOutlined
                                                            style={{
                                                                color: 'black',
                                                                marginRight: 10,
                                                            }}
                                                        />
                                                        {item.viewed}
                                                    </Text>
                                                </>,
                                                <>
                                                    <Text>
                                                        <DownloadOutlined
                                                            style={{
                                                                color: 'black',
                                                                marginRight: 10,
                                                            }}
                                                        />
                                                        {item.downloaded}
                                                    </Text>
                                                </>,
                                            ]}
                                        >
                                            {!data.progressions && (
                                                <div
                                                    className="lock"
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <LockOutlined
                                                        style={{
                                                            fontSize: '35px',
                                                            color: 'white',
                                                            margin: '50% 0',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <Space direction="vertical">
                                                {item.type ? (
                                                    <Text
                                                        style={{
                                                            background:
                                                                '#95DCFE',
                                                            padding: '5px 10px',
                                                            borderRadius: '5px',
                                                            color: 'black',
                                                            fontWeight: 'bold',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {renderSwitch(
                                                            item.type
                                                        )}
                                                    </Text>
                                                ) : null}
                                                <Meta
                                                    title={item.name}
                                                    className="my-0"
                                                    description={
                                                        <>
                                                            Người đăng:{' '}
                                                            {mentor ? (
                                                                <Popover
                                                                    content={
                                                                        <ShowProfile
                                                                            id={
                                                                                mentor?._id
                                                                            }
                                                                        />
                                                                    }
                                                                >
                                                                    {
                                                                        mentor?.fullName
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
                                                            <Link to>
                                                                {subject}
                                                            </Link>
                                                        </>
                                                    }
                                                />
                                                {item.description ? (
                                                    <Meta
                                                        style={{
                                                            width: '100%',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace:
                                                                'nowrap',
                                                            height: '17px',
                                                        }}
                                                        description={
                                                            <div
                                                                className=""
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        width: '100%',
                                                                        overflow:
                                                                            'hidden',
                                                                        textOverflow:
                                                                            'ellipsis',
                                                                        whiteSpace:
                                                                            'nowrap',
                                                                    }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${item?.description}`,
                                                                    }}
                                                                ></p>
                                                                <p>...</p>
                                                            </div>
                                                        }
                                                    />
                                                ) : (
                                                    <></>
                                                )}

                                                <div className="documents-tag mt-2">
                                                    {item.plan === 'FREE' ? (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
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
                                                        </div>
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
                                                                size={16}
                                                            />
                                                            <div>Có phí</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </Space>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </>
                ) : (
                    <Empty
                        style={
                            (isMobile && { width: '100%' }) ||
                            (isTablet && { width: '70%' }) || { width: '75%' }
                        }
                        description={<span>Hiện chưa có tài liệu nào!</span>}
                    />
                )}

                <div
                    className="intro-sz"
                    style={
                        (isMobile && { width: '100%' }) ||
                        (isTablet && { width: '28%' }) || { width: '23%' }
                    }
                >
                    <CourseHeader />
                    <CollapseCustom />
                </div>
            </div>
        </>
    )
}
