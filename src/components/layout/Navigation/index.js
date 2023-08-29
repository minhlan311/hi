import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mtzLogoImg from '../../../assets/images/backgrounds/logo-full.png'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import MenuMb from './MenuMb'
import MenuPc from './MenuPc'
import { onMessageListener } from '../../../firebases'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, setStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import { userDetailRequest, userDetailSelector } from '../../../slices/user'
import { Button, Col, Divider, Row, Space } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

const Navigation = () => {
    const dispatch = useDispatch()
    const userDetail = useSelector(userDetailSelector)
    const [educationId, setEducationId] = useState('')
    const user = getStorage(USER_INFO)
    useEffect(() => {
        dispatch(userDetailRequest(user._id))
    }, [])
    useEffect(() => {
        if (userDetail.status === 'success') {
            setEducationId(userDetail.data.educationId)
        }
    }, [userDetail])

    useEffect(() => {
        if (educationId) {
            setStorage({ key: 'educationId', val: educationId })
        }
    }, [educationId])
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    onMessageListener()
        .then((payload) => {
            //save notification to local storage
            let notifications =
                JSON.parse(localStorage.getItem('notifications')) || []
            notifications.push(payload.notification)
            localStorage.setItem('notifications', JSON.stringify(notifications))
        })
        .catch((err) => console.log('failed: ', err))

    // const [visible, setVisible] = useState(true)
    // const [open, setOpen] = useState(false)
    // useEffect(() => {
    //     if (!isMobile || !isTablet) setOpen(false)
    //     let prevScrollPosition = window.pageYOffset
    //     const handleScroll = () => {
    //         const currentScrollPosition = window.pageYOffset
    //         setVisible(
    //             prevScrollPosition > currentScrollPosition ||
    //                 currentScrollPosition < 150
    //         )
    //         prevScrollPosition = currentScrollPosition
    //     }
    //     window.addEventListener('scroll', handleScroll)

    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [isMobile, isTablet])

    return (
        <div>
            <div className={` mtz-nav-main`}>
                <Row
                    justify="space-between"
                    align="middle"
                    className={`${
                        isMobile || isTablet
                            ? 'mtz-container-m'
                            : 'mtz-container'
                    }`}
                    style={isMobile || isTablet ? { height: 70 } : null}
                >
                    <Col>
                        <Link to={'/'}>
                            <img
                                src={mtzLogoImg}
                                className="logo"
                                alt="mtz logo"
                            />
                        </Link>
                    </Col>
                    <div className="menu-bar">
                        <div className="avatar-action">
                            <Space>
                                <Button type="text">
                                    <b>Hotline: 028 7309 9959 (Phím 3)</b>
                                </Button>
                                <Button icon={<GlobalOutlined />}></Button>
                                <Button>Đăng ký</Button>
                                <Divider
                                    type="vertical"
                                    style={{ margin: '0 5px', height: 35 }}
                                ></Divider>
                                <Button type="primary">Đăng nhập</Button>
                            </Space>
                        </div>
                    </div>
                </Row>
            </div>

            <MenuPc></MenuPc>
        </div>
    )
}

export default memo(Navigation)
