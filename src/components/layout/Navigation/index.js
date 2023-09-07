import { Affix, Row, Select, Space } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { ReactComponent as ChinaSVG } from '../../../assets/icons/china_flag.svg'
import { ReactComponent as EngSVG } from '../../../assets/icons/eng_flag.svg'
import { ReactComponent as GermanySVG } from '../../../assets/icons/germany_flag.svg'
import { ReactComponent as JapanSVG } from '../../../assets/icons/japan_flag.svg'
import { ReactComponent as KoreaSVG } from '../../../assets/icons/korea_flag.svg'
import { ReactComponent as VieSVG } from '../../../assets/icons/vi_flag.svg'
import logoImg from '../../../assets/images/backgrounds/logo.svg'
import { USER_INFO } from '../../../constants/storageKeys'
import { onMessageListener } from '../../../firebases'
import { getStorage, setStorage } from '../../../services/storage'
import { userDetailSelector } from '../../../slices/user'
import Header from '../Header/Header'
import MenuPc from './MenuPc'
import './styles.scss'
const Navigation = () => {
    const dispatch = useDispatch()
    const userDetail = useSelector(userDetailSelector)
    const [educationId, setEducationId] = useState('')
    const user = getStorage(USER_INFO)
    useEffect(() => {
        // dispatch(userDetailRequest(user?._id))
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
                    currentScrollPosition < 130
            )
            prevScrollPosition = currentScrollPosition
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isMobile, isTablet])

    return (
        <div>
            {!isMobile && !isTablet && (
                <div className="mtz-nav-main">
                    <Header type="fullsize">
                        <div className="uc-container">
                            <Row justify="space-between" align="middle">
                                <Link to={'/'}>
                                    <img
                                        src={logoImg}
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
                                                <p className="mb-5 hotline">
                                                    Hotline
                                                </p>
                                                <b>1900 10328</b>
                                            </div>
                                        </Space>
                                        <Select
                                            className="lang-change"
                                            popupClassName="select-pop"
                                            defaultValue="VIE"
                                            options={[
                                                {
                                                    value: 'ENG',
                                                    label: (
                                                        <div className="d-space-c">
                                                            <EngSVG />{' '}
                                                            <p className="ml-5">
                                                                ENG
                                                            </p>
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    value: 'VIE',
                                                    label: (
                                                        <div className="d-space-c">
                                                            <VieSVG />
                                                            <p className="ml-10">
                                                                VIE
                                                            </p>
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    value: 'CHN',
                                                    label: (
                                                        <div className="d-space-c">
                                                            <ChinaSVG />
                                                            <p className="ml-5">
                                                                CHN
                                                            </p>
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    value: 'JPN',
                                                    label: (
                                                        <div className="d-space-c">
                                                            <JapanSVG />
                                                            <p className="ml-5">
                                                                JPN
                                                            </p>
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    value: 'KOR',
                                                    label: (
                                                        <div className="d-space-c">
                                                            <KoreaSVG />
                                                            <p className="ml-5">
                                                                KOR
                                                            </p>
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    value: 'GER',
                                                    label: (
                                                        <div className="d-space-c">
                                                            <GermanySVG />{' '}
                                                            <p className="ml-5">
                                                                GER
                                                            </p>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                            suffixIcon={false}
                                        />
                                    </Space>
                                </div>
                            </Row>
                        </div>
                    </Header>
                </div>
            )}
            <Affix className="affix-main">
                <div
                    className={`${
                        visible ? 'nav-fixed' : 'navn-fixed'
                    } mtz-nav-main`}
                >
                    <MenuPc open={open} setOpen={setOpen} />
                </div>
            </Affix>
        </div>
    )
}

export default memo(Navigation)
