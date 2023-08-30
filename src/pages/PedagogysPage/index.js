import React from 'react'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { useMediaQuery } from 'react-responsive'
import Pedagogies from '../MentorPage/Management/Pedagogies'

import { Button, Result } from 'antd'
import { useHistory } from 'react-router-dom'
import { getStorage } from '../../services/storage'
import { USER_INFO } from '../../constants/storageKeys'

export default function PedagogysPage() {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 769 })
    const isMobile = useMediaQuery({ maxWidth: 768, minWidth: 280 })
    const user = getStorage(USER_INFO)
    const history = useHistory()
    return (
        <>
            <Navigation />
            {!user.isMentor ||
            (user.isMentor &&
                (user.mentorStatus === 'PENDING' || !user.mentorStatus)) ? (
                <div style={{ marginTop: 80 }}>
                    <Result
                        style={{ height: '100vh' }}
                        status="403"
                        title="403"
                        subTitle="Xin lỗi, bạn cần đăng ký làm Mentor để truy cập vào trang này!"
                        extra={
                            <div>
                                <Button
                                    style={{ marginRight: 15 }}
                                    onClick={() =>
                                        history.push('/regis-is-mentor')
                                    }
                                >
                                    Đăng ký làm Mentor
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => (window.location.href = '/')}
                                >
                                    Trở về trang chủ
                                </Button>
                            </div>
                        }
                    />
                </div>
            ) : (
                <div
                    className={`${
                        isMobile || isTablet ? 'uc-container-m' : 'uc-container'
                    } mtz-profilepage`}
                    style={{ margin: '100px auto 30px' }}
                >
                    <h2>Quản lý câu hỏi</h2>

                    <Pedagogies />
                </div>
            )}

            <Footer />
        </>
    )
}
