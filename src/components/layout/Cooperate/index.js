import { Typography } from 'antd'
import React, { memo } from 'react'

import slickIonRight from '../../../assets/icons/slick-icon-right.png'
import slickIconLeft from '../../../assets/icons/slick-icon-left.png'
import Slider from 'react-slick'
import './styles.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'
import { configsSelector } from '../../../slices/configs'

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
        slidesToShow: 5,
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
        <div className="mtz-cooperate">
            <div
                className={`${
                    isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
                }`}
            >
                <Text className="mtz-cooperate-title">
                    Chúng tôi hợp tác với hơn 200 trường đại học và các Mentor
                    hàng đầu
                </Text>

                <div className="mtz-dt">
                    <Slider {...settings} className="pb-15 pt-15">
                        {configs?.data?.logos?.map((item) => (
                            <img
                                key={item}
                                src={item}
                                alt="mtz cooperate university"
                                className="logo-img"
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default memo(Cooperate)
