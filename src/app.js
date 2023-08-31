import React, { useCallback, useMemo, useState, memo, useEffect } from 'react'
import axios from './services/api'
import useAxiosInterceptor from './hooks/useAxiosInterceptor'
import { useHistory } from 'react-router-dom'
import ToastContext from './context/ToastContext'
import routes from './routes'

import ScrollToTop from './components/core/ScrollToTop'
import ToastNotification from './components/layout/Toast'
import RoutesPage from './components/router/RoutesPage'
import GlobalLoading from './components/core/GlobalLoading'
import './global-styles.scss'
import './app.scss'
import { getStorage } from './services/storage'
import { USER_INFO } from './constants/storageKeys'
import { ROUTERS_URL } from './constants/routerUrl'
import { socket } from './socket'
import { FloatButton } from 'antd'
import zaloLogo from './assets/icons/zalo.png'

const App = () => {
    const userInfo = useMemo(() => getStorage(USER_INFO), [])
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [events, setEvents] = useState([])
    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        function onEvent(value) {
            setEvents((previous) => [...previous, value])
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('foo', onEvent)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('foo', onEvent)
        }
    }, [])

    const history = useHistory()
    const [toast, setToast] = useState({
        show: false,
        title: '',
        description: '',
    })

    const onShowToast = useCallback(({ title, description }) => {
        setToast({
            show: true,
            title,
            description,
        })
    }, [])

    const onHideToast = useCallback(() => {
        setToast({
            show: false,
            title: '',
            description: '',
        })
    }, [])

    const toastValue = useMemo(
        () => ({
            toast,
            onShowToast,
            onHideToast,
        }),
        [toast, onShowToast, onHideToast]
    )

    useAxiosInterceptor(axios)
    // useEffect(() => {
    //     if (userInfo) {
    //         if (
    //             [
    //                 ROUTERS_URL.LOGIN,
    //                 ROUTERS_URL.FORGOT_PASS,
    //                 ROUTERS_URL.REGISTER,
    //             ].includes(history.location.pathname)
    //         ) {
    //             history.push('/')
    //         } else {
    //             history.push(history.location.pathname)
    //         }
    //     } else {
    //         history.push(history.location.pathname)
    //     }
    // }, [history, userInfo])

    return (
        <ToastContext.Provider value={toastValue}>
            <ScrollToTop />
            <>
                <main className="app-main">
                    <div className="app-main__body">
                        <RoutesPage
                            routesItem={routes}
                            isAuthenticated={!!userInfo}
                        />
                    </div>
                    <ToastNotification {...toast} onHide={onHideToast} />
                    <FloatButton.Group
                        tooltip="Liên hệ với chúng tôi"
                        trigger="hover"
                        style={{
                            right: 24,
                            background: 'transparent',
                        }}
                        className="zalo"
                        icon={
                            <img
                                src={zaloLogo}
                                alt="zalo"
                                style={{ width: '100%' }}
                            />
                        }
                        onClick={() =>
                            window.open(
                                'http://www.zalo.me/0966282828',
                                '_blank'
                            )
                        }
                    >
                        <FloatButton
                            icon={
                                <img
                                    src={zaloLogo}
                                    alt="zalo"
                                    style={{ width: '100%' }}
                                />
                            }
                        />
                        <FloatButton
                            icon={
                                <img
                                    src={zaloLogo}
                                    alt="zalo"
                                    style={{ width: '100%' }}
                                />
                            }
                        />
                    </FloatButton.Group>
                </main>
                <GlobalLoading />
            </>
        </ToastContext.Provider>
    )
}

export default memo(App)
