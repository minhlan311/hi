import { Card, Popover, Space } from 'antd'
import React, { memo } from 'react'
import Slider from 'react-slick'
import { useHistory } from 'react-router-dom'

import mtzDocumentImg from '../../../assets/images/homepage/document-img.png'
import slickIonRight from '../../../assets/icons/slick-icon-right.png'
import slickIconLeft from '../../../assets/icons/slick-icon-left.png'
import { SUBJECT_INFO } from '../../../constants/storageKeys'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import settings from '../../../settings/dev/index'
const SubjectSliders = (props) => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const { data } = props

    const history = useHistory()
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

    const SamplePrevArrow = (props) => {
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
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

    const handelClickSubject = (item) => {
        history.push('/courses', { subjectId: item.id })
        window.localStorage.setItem(SUBJECT_INFO, JSON.stringify(item))
    }
    const imageStyle = {
        backgroundSize: 'cover',
        borderRadius: '5px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
    }

    return (
        <div
            className="mtz-subjects"
            style={isMobile || isTablet ? { padding: '0 30px' } : null}
        >
            <Slider {...settingSlider}>
                {data.map(
                    (item) =>
                        item.subjectId && (
                            <div
                                onClick={() =>
                                    handelClickSubject(item.subjectId)
                                }
                                key={item.subjectId?.id}
                            >
                                <Card
                                    hoverable
                                    key={item.subjectId?.id}
                                    cover={
                                        <img
                                            alt="documents icon"
                                            style={imageStyle}
                                            src={
                                                item.subjectId?.image
                                                    ? settings.FILE_URL +
                                                      '/' +
                                                      item.subjectId?.image
                                                    : mtzDocumentImg
                                            }
                                        />
                                    }
                                >
                                    <Space
                                        direction="vertical"
                                        style={{ width: '100%' }}
                                    >
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
                                                {item.subjectId?.name}
                                            </h3>
                                        </div>

                                        <div
                                            style={{
                                                marginTop: -5,
                                                width: '100%',
                                            }}
                                        >
                                            {item.subjectId?.description ? (
                                                <Popover
                                                    content={
                                                        <div
                                                            style={{
                                                                maxWidth:
                                                                    '50vw',
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: item
                                                                    .subjectId
                                                                    ?.description,
                                                            }}
                                                        ></div>
                                                    }
                                                    title="Thông tin môn học"
                                                >
                                                    <div
                                                        className="dangerHTML"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item
                                                                .subjectId
                                                                ?.description,
                                                        }}
                                                    ></div>
                                                </Popover>
                                            ) : (
                                                <p>Môn học này thú vị quá.</p>
                                            )}
                                        </div>
                                    </Space>
                                </Card>
                            </div>
                        )
                )}
            </Slider>
        </div>
    )
}

export default memo(SubjectSliders)
