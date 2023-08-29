import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mtzLogoImg from '../../../assets/images/backgrounds/mtz-logo.svg'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import MenuMb from './MenuMb'
import MenuPc from './MenuPc'
import { onMessageListener } from '../../../firebases'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, setStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import { userDetailRequest, userDetailSelector } from '../../../slices/user'

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
        <>
            <div
                className={`${
                    visible ? 'nav-fixed' : 'navn-fixed'
                } mtz-nav-main`}
            >
                <div
                    className={`${
                        isMobile || isTablet
                            ? 'mtz-container-m'
                            : 'mtz-container'
                    } d-space-flex`}
                    style={isMobile || isTablet ? { height: 70 } : null}
                >
                    <Link className="logo" to={'/'}>
                        <img src={mtzLogoImg} alt="mtz logo" />
                    </Link>
                    {isMobile || isTablet ? (
                        <MenuMb setOpen={setOpen} open={open} />
                    ) : (
                        <MenuPc />
                    )}
                </div>
            </div>
        </>
    )
}

export default memo(Navigation)
