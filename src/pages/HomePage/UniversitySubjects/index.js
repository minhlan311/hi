import { Button, Card, Empty, Row, Skeleton, Typography } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'

import mtzDocumentImg from '../../../assets/images/homepage/document-img.png'
import slickIonRight from '../../../assets/icons/slick-icon-right.png'
import slickIconLeft from '../../../assets/icons/slick-icon-left.png'
import { educationDetailSelector } from '../../../slices/education'

import './styles.scss'
import settings from '../../../settings/dev/index'
import { useMediaQuery } from 'react-responsive'
import { compact } from 'lodash'

const { Text } = Typography
const UniversitySubjects = () => {
    const educationDetail = useSelector(educationDetailSelector)
    const subjects = compact(educationDetail?.data?.subjects)
    const history = useHistory()
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    function SampleNextArrow(props) {
        const { className, style, onClick } = props
        return (
            <div className={className} style={{ ...style }} onClick={onClick}>
                <div
                    style={{
                        display: 'flex',
                        padding: '7px 11px',
                        borderRadius: '50%',
                        background: '#EDEFF5',
                        width: '25px',
                        height: '25px',
                        textAlign: 'center',
                    }}
                >
                    <img src={slickIonRight} alt="slick icon right"></img>
                </div>
            </div>
        )
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props
        return (
            <div className={className} style={{ ...style }} onClick={onClick}>
                <div
                    style={{
                        display: 'flex',
                        padding: '7px 8px',
                        borderRadius: '50%',
                        background: '#EDEFF5',
                        width: '25px',
                        height: '25px',
                        textAlign: 'center',
                    }}
                >
                    <img src={slickIconLeft} alt="slick icon left"></img>
                </div>
            </div>
        )
    }
    var settingSlider = {
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: (isMobile && 1) || (isTablet && 2) || 4,
        slidesToScroll: (isMobile && 1) || (isTablet && 2) || 4,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settingSlider: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settingSlider: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settingSlider: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    if (educationDetail.status === 'loading') {
        return (
            <div
                className={`${
                    isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
                } mtz-university-subjects pb-30`}
            >
                <Skeleton active />
            </div>
        )
    }
    const imageStyle = {
        backgroundSize: 'cover',
        borderRadius: '5px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
    }

    return (
        <div
            className={`${
                isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
            } mtz-university-subjects pb-30`}
        >
            <Row className="mtz-university-header pb-15 pt-15">
                <Text>Môn học của trường {educationDetail?.data?.name}</Text>
                <Button
                    className="reverse-btn"
                    icon={<CaretRightOutlined />}
                    onClick={() => history.push('/subjects')}
                >
                    Xem thêm
                </Button>
            </Row>
            {subjects.length > 0 ? (
                <Slider {...settingSlider} className="doc-list">
                    {subjects?.map(
                        (item, id) =>
                            item && (
                                <div
                                    key={item?._id}
                                    onClick={() =>
                                        history.push('/courses', item._id)
                                    }
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <>
                                                <img
                                                    alt="documents icon"
                                                    style={imageStyle}
                                                    src={
                                                        item.image
                                                            ? settings.FILE_URL +
                                                              '/' +
                                                              item.image
                                                            : mtzDocumentImg
                                                    }
                                                />
                                            </>
                                        }
                                        className="doc-card"
                                    >
                                        {item.name ? (
                                            <div
                                                className="d-flex"
                                                style={{
                                                    color: '#8f95b2',
                                                    marginTop: -5,
                                                }}
                                            >
                                                <h3
                                                    className="dangerHTMLOneLine"
                                                    style={{
                                                        color: 'black',
                                                        margin: 0,
                                                    }}
                                                >
                                                    {item.name}
                                                </h3>
                                            </div>
                                        ) : null}

                                        {/* <div
                                            style={{
                                                marginTop: -5,
                                                width: '100%',
                                            }}
                                        >
                                            {item.descriptions ? (
                                                <div
                                                    className="dangerHTMLOneLine"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.descriptions,
                                                    }}
                                                ></div>
                                            ) : null}
                                        </div> */}
                                    </Card>
                                </div>
                            )
                    )}
                </Slider>
            ) : (
                <Empty
                    style={{ width: '100%' }}
                    description={<span>Hiện chưa có môn học nào!</span>}
                />
            )}
        </div>
    )
}

export default memo(UniversitySubjects)
