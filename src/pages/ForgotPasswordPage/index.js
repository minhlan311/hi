/* eslint-disable no-useless-escape */
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button, Form, Input, Row, Space, message } from 'antd'

import loginIntroduceImg from '../../assets/images/login/login-introduce-image.png'
import mtzLogoImg from '../../assets/images/backgrounds/mtz-logo.svg'

import { ROUTERS_URL } from '../../constants/routerUrl'
import { REGEX_PATTERN } from '../../constants'

import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import {
    resetPasswordRequest,
    resetPasswordSelector,
} from '../../slices/authentication'

const ForgotPasswordPage = () => {
    const [form] = Form.useForm()
    const changePass = useSelector(resetPasswordSelector)

    const dispatch = useDispatch()
    const history = useHistory()
    const [messageApi, contextHolder] = message.useMessage()
    const onFinish = (values) => {
        dispatch(resetPasswordRequest(values))
    }

    useEffect(() => {
        if (changePass.status === 'success') {
            form.resetFields()
            messageApi.open({
                type: 'success',
                content:
                    'Mật khẩu mới đã được gửi tới Email của bạn, vui lòng kiểm tra rồi đăng nhập!',
                duration: 5,
            })
            setTimeout(() => {
                history.push('/login')
            }, 5000)
        }
    }, [changePass])

    const onFinishFailed = (errorInfo) => {}
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isTablet = useMediaQuery({ maxWidth: 1366, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    return (
        <div
            className="mtz-forgot-password"
            style={
                isMobile || isTablet
                    ? { padding: 25, marginBottom: 50 }
                    : { padding: 50 }
            }
        >
            {contextHolder}
            <Row>
                <div className="mtz-logo">
                    <img src={mtzLogoImg} alt="mtz logo" />
                </div>
            </Row>
            <div style={isMobile || isTablet ? null : { display: 'flex' }}>
                <img
                    src={loginIntroduceImg}
                    alt="forgot-password introduce images"
                    className="img-introduce"
                    style={
                        isMobile || isTablet
                            ? { width: '100%' }
                            : {
                                  position: 'absolute',
                                  bottom: 0,
                                  height: '87vh',
                              }
                    }
                />

                <div className="mtz-forgot-password-form-container">
                    <div
                        className="mtz-forgot-password-form"
                        style={
                            (isDesktop && {
                                margin: '10% 0',
                                position: ' absolute',
                                right: 50,
                                width: '40%',
                            }) ||
                            (isMobile || isTablet
                                ? { width: '100%', textAlign: 'center' }
                                : {
                                      position: ' absolute',
                                      right: 50,
                                  })
                        }
                    >
                        <h4 className="title">Quên mật khẩu</h4>

                        <h4 className="title-label">
                            Nhập email đã đăng ký của bạn bên dưới để nhận hướng
                            dẫn lấy lại mật khẩu
                        </h4>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email hoặc SĐT"
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Email hoặc SĐT',
                                    },

                                    {
                                        pattern:
                                            REGEX_PATTERN.regexCombineEmailPhoneNumber,
                                        message: `Email hoặc SĐT không hợp lệ!`,
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Nhập Email hoặc SĐT"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Space
                                    direction="vertical"
                                    style={{ width: '100%' }}
                                >
                                    <Button
                                        className="background-linear-gradient"
                                        type="primary"
                                        block
                                        size="large"
                                        htmlType="submit"
                                        loading={
                                            changePass.status === 'loading'
                                        }
                                    >
                                        Gửi yêu cầu
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ display: 'flex', textAlign: 'center' }}
                        >
                            <p style={{ fontSize: 15, fontFamily: 'Inter' }}>
                                Bạn đã có tài khoản? &nbsp;
                                <span
                                    className="text-blue"
                                    onClick={() =>
                                        history.push(ROUTERS_URL.LOGIN)
                                    }
                                >
                                    Đăng nhập ngay
                                </span>
                            </p>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    )
}

ForgotPasswordPage.propTypes = {}

export default memo(ForgotPasswordPage)
