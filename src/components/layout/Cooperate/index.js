import { Button, Card, Space, Typography } from 'antd'
import React, { memo } from 'react'

import { BsArrowRight } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import book from '../../../assets/icons/book.svg'
import point2 from '../../../assets/icons/point2.svg'
import slickIconLeft from '../../../assets/icons/slick-icon-left.png'
import slickIonRight from '../../../assets/icons/slick-icon-right.png'
import { configsSelector } from '../../../slices/configs'
import Header from '../Header/Header'
import './styles.scss'

const { Text } = Typography

const Cooperate = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const configs = useSelector(configsSelector)

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
    var settings = {
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <Header
            title="Đội ngũ giảng viên tại UCAM"
            titleSize={50}
            desc="ĐỘI NGŨ GIẢNG DẠY CHUYÊN NGHIỆP"
            descSize={20}
            styleChild={{
                background: 'var(--bgColor2)',
                color: 'var(--white)',
                padding: '120px 100px 70px 100px     ',
                borderRadius: 12,
            }}
        >
            <img src={point2} alt="point2" className="point2" />
            <img src={book} alt="book" className="book" />
            <div className="mtz-cooperate">
                <div className="mtz-dt">
                    <Slider
                        {...settings}
                        dots
                        // dotsClass="dots-slider"
                        className="slider-mentor"
                    >
                        {configs?.data?.logos?.map((item) => (
                            <Card key={item} className="mentor-introduce">
                                <Space
                                    direction="vertical"
                                    align="center"
                                    className="it-main"
                                >
                                    <div className="image">
                                        <img
                                            src={item}
                                            alt="mtz cooperate university"
                                            className="logo-img"
                                        />
                                    </div>
                                    <div>
                                        <h2>Name</h2>

                                        <div>Chứng chỉ Teft</div>
                                    </div>

                                    <Space className="it-butt">
                                        <Button size="small">865 giờ</Button>
                                        <Button size="small">
                                            3456 học viên
                                        </Button>
                                    </Space>
                                    <Button
                                        className="sm-butt"
                                        size="large"
                                        style={{ width: '100%' }}
                                    >
                                        <Space>
                                            <div>Chọn giáo viên</div>
                                            <BsArrowRight
                                                style={{ margin: '0 0 -3px' }}
                                            />
                                        </Space>
                                    </Button>
                                </Space>
                            </Card>
                        ))}
                    </Slider>
                </div>{' '}
            </div>
        </Header>
    )
}

export default memo(Cooperate)
