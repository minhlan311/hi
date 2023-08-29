import { Button, Result } from 'antd'
import Footer from '../../components/layout/Footer'
import Navigation from '../../components/layout/Navigation'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        if (!timeLeft) return

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft === 0) {
            window.location.href = '/'
        }
    }, [timeLeft])
    return (
        <>
            <Navigation />
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang không tồn tại hoặc đã bị xóa!"
                extra={
                    <Link to={'/'}>
                        <Button type="primary">Trở về trang chủ</Button>
                    </Link>
                }
                style={{ marginTop: 80 }}
            />
            <div style={{ textAlign: 'center', margin: '-25px 0 60px 0' }}>
                <p style={{ color: '#a2a2a2' }}>Hoặc vui lòng chờ sau</p>
                <h1>{timeLeft} giây</h1>
            </div>
            <Footer />
        </>
    )
}
