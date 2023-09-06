/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react'
import { Space, Button, Avatar } from 'antd'
import { useHistory } from 'react-router-dom'
import { AntDesignOutlined } from '@ant-design/icons'

import './styles.scss'
import {
    getMentorIntroducesRequest,
    mentorIntroducesSelector,
} from '../../../slices/mentorIntroduce'
import { useDispatch, useSelector } from 'react-redux'
import settings from '../../../settings/index'
import Slider from 'react-slick'
import { useMediaQuery } from 'react-responsive'
import Link from 'antd/es/typography/Link'
import bannerImg from '../../../assets/images/banner/banner.png'
import Header from '../../../components/layout/Header/Header'

const Banner = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const history = useHistory()
    const dispatch = useDispatch()
    const mentorIntroduce = useSelector(mentorIntroducesSelector)
    useEffect(() => {
        dispatch(getMentorIntroducesRequest())
    }, [])
    const settingSlide = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    }
    const banner = mentorIntroduce?.data?.filter((bn) => {
        return bn.status === 'ACTIVE'
    })
    return (
        <Header type="fullsize">
            <Slider {...settingSlide}>
                <div className="mtz-banner">
                    {banner?.length > 0 ? (
                        banner.map((item, id) => (
                            <div
                                className={
                                    isMobile || isTablet ? null : 'd-space-c'
                                }
                                style={{
                                    flexDirection:
                                        id % 2 !== 0 ? 'row-reverse' : null,
                                    padding:
                                        isMobile || isTablet ? null : '0 2%',

                                    height: '100%',
                                }}
                                key={id}
                            >
                                {isMobile || isTablet ? (
                                    <img
                                        className="img-info"
                                        style={{
                                            width: '100%',
                                            marginBottom: 20,
                                            maxHeight: '50vh',
                                            objectFit: 'contain',
                                        }}
                                        src={
                                            settings.FILE_URL +
                                            '/' +
                                            item.mentorImage
                                        }
                                        alt="mtz home banner"
                                    />
                                ) : null}
                                <div
                                    className={
                                        isMobile || isTablet
                                            ? 'uc-container-m banner-info'
                                            : 'banner-info'
                                    }
                                    style={
                                        isMobile || isTablet
                                            ? null
                                            : {
                                                  width: '45%',
                                              }
                                    }
                                >
                                    {isMobile || isTablet ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <div className="tag-title">
                                                mentor
                                            </div>
                                            <p
                                                className="title"
                                                style={
                                                    isMobile
                                                        ? { fontSize: 20 }
                                                        : { fontSize: 25 }
                                                }
                                            >
                                                {item?.mentor?.fullName}
                                            </p>{' '}
                                            <div className="title-label">
                                                {item?.subjectId?.name}
                                            </div>
                                        </div>
                                    ) : (
                                        <Space direction="vertical">
                                            <div className="tag-title">
                                                mentor
                                            </div>
                                            <div
                                                className="title"
                                                style={{ fontSize: 25 }}
                                            >
                                                {item?.mentor?.fullName}
                                            </div>{' '}
                                            <div className="title-label">
                                                {item?.subjectId?.name}
                                            </div>
                                        </Space>
                                    )}

                                    <div
                                        className="title-description"
                                        style={
                                            isMobile || isTablet
                                                ? {
                                                      textAlign: 'center',
                                                      marginTop: 10,
                                                  }
                                                : null
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: `${item?.descriptions}`,
                                        }}
                                    ></div>

                                    {isMobile || isTablet ? null : (
                                        <p
                                            style={
                                                isMobile
                                                    ? {
                                                          textAlign: 'center',
                                                      }
                                                    : null
                                            }
                                        >
                                            Đăng ký ngay hôm nay để nhận nhiều
                                            ưu đãi từ <b>MentorZ</b>
                                        </p>
                                    )}

                                    <div
                                        style={
                                            isMobile || isTablet
                                                ? {
                                                      width: '100%',
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      alignItems: 'center',
                                                  }
                                                : {
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      width: 400,
                                                      margin: '30px 0',
                                                  }
                                        }
                                    >
                                        <Button
                                            className="background-linear-gradient"
                                            type="primary"
                                            block
                                            size="large"
                                            onClick={() =>
                                                history.push('/regis-is-mentor')
                                            }
                                            style={
                                                isMobile || isTablet
                                                    ? { margin: '15px 0' }
                                                    : { width: 200 }
                                            }
                                        >
                                            Đăng ký làm Mentor
                                        </Button>

                                        {isMobile || isTablet ? null : (
                                            <>
                                                <div className="line"></div>
                                                <div>
                                                    Đã có hàng nghìn Mentor tin
                                                    tưởng và sử dụng!
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <p
                                        style={
                                            isMobile || isTablet
                                                ? { textAlign: 'center' }
                                                : null
                                        }
                                    >
                                        Bạn cần hỗ trợ?{' '}
                                        <Link>Liên hệ với chúng tôi.</Link>
                                    </p>
                                </div>

                                {isMobile || isTablet ? null : (
                                    <div
                                        className="mentor-img"
                                        style={
                                            isMobile || isTablet
                                                ? null
                                                : {
                                                      maxWidth: '54%',
                                                      maxHeight: '50vh',
                                                  }
                                        }
                                    >
                                        <img
                                            className="img-info"
                                            src={
                                                settings.FILE_URL +
                                                '/' +
                                                item.mentorImage
                                            }
                                            alt="mtz home banner"
                                        />

                                        <div
                                            className="mentor-box"
                                            style={
                                                id % 2 !== 0
                                                    ? {
                                                          left: '3%',
                                                          top: '8%',
                                                      }
                                                    : {
                                                          right: '3%',
                                                          bottom: '5%',
                                                      }
                                            }
                                        >
                                            <div className="mb-10">
                                                Kết nối với các Mentor
                                            </div>
                                            <div>
                                                <Avatar.Group
                                                    maxCount={2}
                                                    maxPopoverTrigger="click"
                                                    size="large"
                                                    maxStyle={{
                                                        color: '#f56a00',
                                                        backgroundColor:
                                                            '#fde3cf',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    <Avatar
                                                        style={{
                                                            backgroundColor:
                                                                '#f56a00',
                                                        }}
                                                    >
                                                        K
                                                    </Avatar>
                                                    <Avatar
                                                        style={{
                                                            backgroundColor:
                                                                '#1890ff',
                                                        }}
                                                        icon={
                                                            <AntDesignOutlined />
                                                        }
                                                    />
                                                </Avatar.Group>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div
                            className="mentor-img"
                            style={
                                !isMobile || !isTablet
                                    ? { height: '100%' }
                                    : { height: '30vh' }
                            }
                        >
                            <img
                                className="img-info"
                                src={bannerImg}
                                alt="mtz home banner"
                            />
                        </div>
                    )}
                </div>
            </Slider>
        </Header>
    )
}

export default memo(Banner)
