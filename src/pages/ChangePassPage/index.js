import React, { useEffect, useState } from 'react'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { Button, Card, Form, Input, Space, message } from 'antd'
import { REGEX_PATTERN } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { USER_INFO } from '../../constants/storageKeys'
import { getStorage } from '../../services/storage'
import resetIntroduceImg from '../../assets/images/login/reset-password.png'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import {
    changePasswordRequest,
    changePasswordSelector,
} from '../../slices/authentication'

export default function ChangePassPage() {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const history = useHistory()
    const [form] = Form.useForm()

    const user = getStorage(USER_INFO)
    const dispatch = useDispatch()
    const changePass = useSelector(changePasswordSelector)

    const handleSubmit = (values) => {
        const payload = {
            ...values,
            account: user.email,
        }
        dispatch(changePasswordRequest(payload))
    }

    useEffect(() => {
        if (changePass.status === 'success') {
            form.resetFields()
            message.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại')
        }
    }, [changePass])

    return (
        <>
            <Navigation />
            <div
                className={
                    isMobile || isTablet
                        ? 'mtz-container-m d-col-center'
                        : 'mtz-container d-space-flex'
                }
                style={{ marginTop: 80, padding: '50px 0' }}
            >
                <img
                    src={resetIntroduceImg}
                    alt=""
                    width={isMobile || isTablet ? '80%' : '45%'}
                />
                <div
                    style={
                        isMobile || isTablet
                            ? { textAlign: 'center' }
                            : { width: '48%' }
                    }
                    className="mtz-container-m"
                >
                    <h2 style={{ textAlign: 'center', margin: '35px auto' }}>
                        Đổi mật khẩu
                    </h2>
                    <Form
                        labelCol={
                            isMobile || isTablet
                                ? null
                                : {
                                      span: 8,
                                  }
                        }
                        wrapperCol={
                            isMobile || isTablet
                                ? null
                                : {
                                      span: 16,
                                  }
                        }
                        form={form}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="oldPassword"
                            label="Mật khẩu cũ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu cũ!',
                                },
                                {
                                    min: 8,
                                    message:
                                        'Mật khẩu phải chứa ít nhất 8 ký tự!',
                                },
                                {
                                    pattern: REGEX_PATTERN.regexPassword,
                                    message: `Mật khẩu phải bao gồm ký tự viết HOA, thường(a-z, A-Z) và ký tự số (0-9)`,
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu mới"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu mới!',
                                },
                                {
                                    min: 8,
                                    message:
                                        'Mật khẩu phải chứa ít nhất 8 ký tự!',
                                },
                                {
                                    pattern: REGEX_PATTERN.regexPassword,
                                    message: `Mật khẩu phải bao gồm ký tự viết HOA, thường(a-z, A-Z) và ký tự số (0-9)`,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            getFieldValue('oldPassword') ===
                                            value
                                        )
                                            return Promise.reject(
                                                new Error(
                                                    'Mật khẩu mới không được trùng với mật khẩu cũ!'
                                                )
                                            )
                                        else return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu mới"
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu mới!',
                                },
                                {
                                    min: 8,
                                    message:
                                        'Mật khẩu phải chứa ít nhất 8 ký tự!',
                                },
                                {
                                    pattern: REGEX_PATTERN.regexPassword,
                                    message: `Mật khẩu phải bao gồm ký tự viết HOA, thường(a-z, A-Z) và ký tự số (0-9)`,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'Mật khẩu xác nhận không khớp!'
                                            )
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Nhập lại mật khẩu mới" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={
                                isMobile || isTablet
                                    ? null
                                    : {
                                          offset: 8,
                                          span: 16,
                                      }
                            }
                            style={
                                isMobile || isTablet
                                    ? { width: '90%' }
                                    : { width: '100%' }
                            }
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={changePass.status === 'loading'}
                            >
                                Đổi mật khẩu
                            </Button>{' '}
                            <Button
                                loading={changePass.status === 'loading'}
                                onClick={() => history.push('/')}
                                style={{ marginLeft: 10 }}
                            >
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}
