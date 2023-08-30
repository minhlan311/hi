import { GlobalOutlined } from '@ant-design/icons'
import { Affix, Button, Col, Divider, Row, Space } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import mtzLogoImg from '../../../assets/images/backgrounds/logo.svg'
import { USER_INFO } from '../../../constants/storageKeys'
import { onMessageListener } from '../../../firebases'
import { getStorage, setStorage } from '../../../services/storage'
import { userDetailRequest, userDetailSelector } from '../../../slices/user'
import MenuPc from './MenuPc'
import './styles.scss'
import Header from '../Header/Header'
import { BsFillTelephoneFill } from 'react-icons/bs'
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

    const [visible, setVisible] = useState(true)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (!isMobile || !isTablet) setOpen(false)
        let prevScrollPosition = window.pageYOffset
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset
            setVisible(
                prevScrollPosition > currentScrollPosition ||
                    currentScrollPosition < 150
            )
            prevScrollPosition = currentScrollPosition
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isMobile, isTablet])

    return (
        <div>
            <div className="mtz-nav-main">
                <Header>
                    <div
                        className={`${
                            isMobile || isTablet
                                ? 'uc-container-m'
                                : 'uc-container'
                        } d-space-c`}
                        style={isMobile || isTablet ? { height: 70 } : null}
                    >
                        <Link to={'/'}>
                            <img
                                src={mtzLogoImg}
                                className="logo"
                                alt="mtz logo"
                            />
                        </Link>

                        <div className="menu-bar">
                            <Space size="large">
                                <Space
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <div className="phoneIcon">
                                        <BsFillTelephoneFill />
                                    </div>
                                    <div>
                                        <p className="mb-5 hotline">Hotline</p>
                                        <b>1900 10328</b>
                                    </div>
                                </Space>

                                <Button
                                    icon={<GlobalOutlined />}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    VIE
                                </Button>
                            </Space>
                        </div>
                    </div>
                </Header>
            </div>
            <Affix className="affix-main">
                <div
                    className={`${
                        visible ? 'nav-fixed' : 'navn-fixed'
                    } mtz-nav-main`}
                >
                    <MenuPc />
                </div>
            </Affix>
        </div>
    )
}

export default memo(Navigation)
