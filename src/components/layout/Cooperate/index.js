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
    const data = [
        {
            _id: '1',
            avatarUrl: 'https://i.pravatar.cc/150?img=1',
            fullName: 'Nguyễn Văn A',
            certificate: 'Teft',
            time: 50,
            student: 30,
        },
        {
            _id: '2',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
            fullName: 'Trần Thị B',
            certificate: 'Teft',
            time: 60,
            student: 25,
        },
        {
            _id: '3',
            avatarUrl: 'https://i.pravatar.cc/150?img=3',
            fullName: 'Lê Văn C',
            certificate: 'Teft',
            time: 45,
            student: 40,
        },
        {
            _id: '4',
            avatarUrl: 'https://i.pravatar.cc/150?img=4',
            fullName: 'Phạm Thị D',
            certificate: 'Teft',
            time: 55,
            student: 35,
        },
        {
            _id: '5',
            avatarUrl: 'https://i.pravatar.cc/150?img=5',
            fullName: 'Hoàng Văn E',
            certificate: 'Teft',
            time: 70,
            student: 20,
        },
        {
            _id: '6',
            avatarUrl: 'https://i.pravatar.cc/150?img=6',
            fullName: 'Nguyễn Thị F',
            certificate: 'Teft',
            time: 48,
            student: 38,
        },
        {
            _id: '7',
            avatarUrl: 'https://i.pravatar.cc/150?img=7',
            fullName: 'Trần Văn G',
            certificate: 'Teft',
            time: 62,
            student: 22,
        },
        {
            _id: '8',
            avatarUrl: 'https://i.pravatar.cc/150?img=8',
            fullName: 'Lê Thị H',
            certificate: 'Teft',
            time: 53,
            student: 33,
        },
        {
            _id: '9',
            avatarUrl: 'https://i.pravatar.cc/150?img=9',
            fullName: 'Phạm Văn I',
            certificate: 'Teft',
            time: 47,
            student: 42,
        },
        {
            _id: '10',
            avatarUrl: 'https://i.pravatar.cc/150?img=10',
            fullName: 'Hoàng Thị K',
            certificate: 'Teft0',
            time: 65,
            student: 28,
        },
    ]
    return (
        <Header
            title="Đội ngũ giảng viên tại UCAM"
            desc="ĐỘI NGŨ GIẢNG DẠY CHUYÊN NGHIỆP"
            styleChild={{
                background: 'var(--bgColor3)',
                color: 'var(--white)',
                padding:
                    isTablet || isMobile ? '50px 0' : '120px 100px 70px 100px',
                borderRadius: isTablet || isMobile ? 0 : 12,
            }}
            background="var(--lighish-white)"
        >
            <img src={point2} alt="point2" className="point2" />
            <img src={book} alt="book" className="book" />
            <div className="mtz-cooperate">
                <div className="mtz-dt">
                    <Slider {...settings} dots className="slider-mentor">
                        {data.map((item) => (
                            <Card key={item._id} className="mentor-introduce">
                                <Space
                                    direction="vertical"
                                    align="center"
                                    className="it-main"
                                >
                                    <div className="image">
                                        <img
                                            src={item.avatarUrl}
                                            alt="mtz cooperate university"
                                            className="logo-img"
                                        />
                                    </div>
                                    <div>
                                        <h2>{item.fullName}</h2>

                                        <div>Chứng chỉ {item.certificate}</div>
                                    </div>

                                    <Space className="it-butt">
                                        <Button size="small" type="primary">
                                            {item.time} giờ
                                        </Button>
                                        <Button size="small">
                                            {item.student} học viên
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
                                                style={{
                                                    margin: '0 0 -3px',
                                                }}
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
