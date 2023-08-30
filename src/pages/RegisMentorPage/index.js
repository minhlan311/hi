import React, { useMemo, useState, useEffect } from 'react'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { Button, Form, Result } from 'antd'
import imgBg from '../../assets/images/subject/banner.svg'
import { USER_INFO } from '../../constants/storageKeys'
import { getStorage, removeStorage, setStorage } from '../../services/storage'
import { useHistory } from 'react-router-dom'
import FormRegis from './FormRegis'
import { SmileOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { useDispatch } from 'react-redux'
import { updateUserRequest } from '../../slices/user'

const RegisMentorPage = () => {
    const history = useHistory()
    // const dispatch = useDispatch()
    const userInfo = useMemo(() => getStorage(USER_INFO), [])
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)

    const [form] = Form.useForm()
    const getData = getStorage('sendRegis')
    const [dataLocal, setDataLocal] = useState(getData ? getData : [])

    const onFinish = (values) => {
        const subjects = []

        const data = {
            ...values,
        }

        subjects.push({
            universityDegree: data.universityDegree,
            certificate: data.certificate.map((item) => {
                return item.files.fileList
                    .map((c) => {
                        return c.response.map((r) => {
                            return {
                                url: r.url,
                            }
                        })
                    })
                    .flat()
            }),
        })

        data.subjects = subjects

        const payload = {
            subjects: subjects,
            isMentor: true,
            mentorStatus: 'PENDING',
        }

        dispatch(updateUserRequest(payload))
        setSuccess(true)
        setDataLocal([...dataLocal, userInfo._id])
    }

    useEffect(() => {
        if (dataLocal.length > 0) {
            setStorage({
                key: 'sendRegis',
                val: dataLocal,
            })
        }
        if (dataLocal.length > 0 && userInfo.mentorStatus === 'APPROVED') {
            const newdata = dataLocal?.filter((item) => {
                return item !== userInfo._id
            })
            setStorage({
                key: 'sendRegis',
                val: newdata,
            })
        }
    }, [dataLocal])

    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const check = getData?.find((item) => item === userInfo._id)
    const RederPage = () => {
        return (
            <div
                style={
                    isMobile || isTablet
                        ? {
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'column',
                          }
                        : {
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                          }
                }
                className={`${
                    isMobile || isTablet ? 'uc-container-m' : 'uc-container'
                }`}
            >
                <img
                    src={imgBg}
                    alt=""
                    width={isMobile || isTablet ? '95%' : null}
                />
                <div
                    style={
                        isMobile || isTablet
                            ? { width: '86%' }
                            : { width: '50%' }
                    }
                >
                    <h2 style={{ textAlign: 'center' }}>Đăng ký làm Mentor</h2>

                    {success && (
                        <Result
                            status="success"
                            title="Gửi yêu cầu thành công!"
                            subTitle="Yêu cầu đăng ký Mentor của bạn đã được gửi tới phía Admin, vui lòng chờ xét duyệt sau 24 giờ!"
                            extra={
                                <Button
                                    type="primary"
                                    onClick={() => history.push('/')}
                                >
                                    Trở về trang chủ
                                </Button>
                            }
                        />
                    )}
                    {!success &&
                        (getData ? (
                            !check ? (
                                <Form
                                    form={form}
                                    name="regis-metor"
                                    onFinish={onFinish}
                                    layout={
                                        isMobile || isTablet ? 'vertical' : null
                                    }
                                >
                                    <div
                                        style={
                                            isMobile || isTablet
                                                ? null
                                                : {
                                                      maxHeight: '75vh',
                                                      overflowY: 'auto',
                                                  }
                                        }
                                    >
                                        <FormRegis />
                                    </div>

                                    <Form.Item
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Gửi yêu cầu
                                        </Button>
                                    </Form.Item>
                                </Form>
                            ) : null
                        ) : (
                            <Form
                                form={form}
                                name="regis-metor"
                                onFinish={onFinish}
                                layout={
                                    isMobile || isTablet ? 'vertical' : null
                                }
                            >
                                <div
                                    style={
                                        isMobile || isTablet
                                            ? null
                                            : {
                                                  maxHeight: '75vh',
                                                  overflowY: 'auto',
                                              }
                                    }
                                >
                                    <FormRegis />
                                </div>

                                <Form.Item
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Gửi yêu cầu
                                    </Button>
                                </Form.Item>
                            </Form>
                        ))}

                    {!success && check && (
                        <Result
                            icon={<SmileOutlined />}
                            title="Đã gửi yêu cầu đăng ký làm Mentor"
                            subTitle="Yêu cầu đăng ký Mentor của bạn đã được gửi tới phía Admin! Vui lòng chờ xét duyệt sau 24 giờ! Nếu sau thời gian trên, chưa có phản hồi tới bạn vui lòng phản hồi tới chúng tôi!"
                            extra={
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button>Gửi phản hồi</Button>{' '}
                                    <div style={{ margin: 10 }}>Hoặc</div>
                                    <Button
                                        type="primary"
                                        onClick={() => history.push('/')}
                                    >
                                        Trở về trang chủ
                                    </Button>
                                </div>
                            }
                        />
                    )}
                </div>
            </div>
        )
    }
    return (
        <div>
            <Navigation />
            <div style={{ marginTop: 100 }}>
                {userInfo.mentorStatus === 'APPROVED' ? (
                    <Result
                        icon={<SmileOutlined />}
                        title="Bạn đã là Mentor!"
                        subTitle="Giờ đây bạn có thể đăng khóa học, đăng bài test, và nhiều điều khác... !"
                        extra={
                            <Button
                                type="primary"
                                onClick={() => history.push('/')}
                            >
                                Trở về trang chủ
                            </Button>
                        }
                    />
                ) : (
                    <RederPage />
                )}
            </div>
            <Footer />
        </div>
    )
}

export default RegisMentorPage
