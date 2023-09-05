/* eslint-disable no-useless-escape */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Row, Space, message, Modal } from 'antd'
import {
    // FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'

import loginIntroduceImg from '../../assets/images/login/login-introduce-image.png'
import mtzLogoImg from '../../assets/images/backgrounds/logo.svg'
import googleLogo from '../../assets/images/login/google-logo.svg'
import sadIcon from '../../assets/images/login/sad-icon.png'
import { ROUTERS_URL } from '../../constants/routerUrl'
import { REGEX_PATTERN, STATUS_REQUEST } from '../../constants'

import {
    loginRequest,
    googleLoginRequest,
    loginSelector,
} from '../../slices/authentication'

import SpinComponent from '../../components/layout/SpinComponent'
import { BsFacebook } from 'react-icons/bs'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import { getStorage, removeStorage, setStorage } from '../../services/storage'
import { auth } from '../../firebases'
import { DeviceUUID } from 'device-uuid'
//Google singin provider
const ggProvider = new GoogleAuthProvider()
// const fbProvider = new FacebookAuthProvider()

const LoginPage = () => {
    const device = new DeviceUUID().parse()
    const duaDevice = [
        device.language,
        device.platform,
        device.os,
        device.cpuCores,
        device.isAuthoritative,
        device.silkAccelerated,
        device.isKindleFire,
        device.isDesktop,
        device.isMobile,
        device.isTablet,
        device.isWindows,
        device.isLinux,
        device.isLinux64,
        device.isMac,
        device.isiPad,
        device.isiPhone,
        device.isiPod,
        device.isSmartTV,
        device.pixelDepth,
        device.isTouchScreen,
    ]
    const uuid = device.hashMD5(duaDevice.join(':'))

    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const isTablet = useMediaQuery({ maxWidth: 1366, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const history = useHistory()
    const [messageApi, contextHolder] = message.useMessage()

    const [isRegister, setRegister] = useState(false)
    const loginInfo = useSelector(loginSelector)
    const { status } = loginInfo

    const onFinish = async (values) => {
        if (values.remember === true) {
            setStorage({ key: 'remember', val: values })
        } else {
            removeStorage('remember')
        }
        const { browser, os } = device

        values.device = {
            id: uuid,
            browser: browser,
            os: os,
        }
        handleLoginUser(values)
        // question window notification
        // values.fcmToken = await fetchToken(setTokenFound)
    }

    useEffect(() => {
        const data = getStorage('remember')
        form.setFieldsValue({
            account: data?.account,
            password: data?.password,
            remember: data?.remember,
        })
    }, [form])

    const onFinishFailed = (errorInfo) => {}

    const handleRegisterWithGoogle = () => {
        setRegister(false)
        history.push('/register')
    }

    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, ggProvider)
            .then(function (result) {
                dispatch(
                    googleLoginRequest({
                        email: result.user.email,
                        fullName: result.user.displayName,
                    })
                )
            })
            .catch(function (error) {
                console.error('Error: hande error here>>>', error.code)
            })
    }

    // const handleLoginWithFacebook = () => {
    //     signInWithPopup(auth, fbProvider)
    //         .then(function (result) {
    //
    //         })
    //         .catch(function (error) {
    //             console.error('Error: hande error here>>>', error.code)
    //         })
    // }

    const handleLoginUser = useCallback(
        (payload) => {
            dispatch(loginRequest(payload))
        },
        [dispatch]
    )

    useEffect(() => {
        if (
            loginInfo &&
            loginInfo.error &&
            loginInfo.status === STATUS_REQUEST.FAILED
        ) {
            messageApi.open({
                type: 'error',
                content: loginInfo.error,
                duration: 0,
            })
            setTimeout(messageApi.destroy, 5000)
            return
        }

        if (loginInfo && loginInfo.status === STATUS_REQUEST.success) {
            if (loginInfo.data.notRegister) {
                setRegister(true)
            } else if (loginInfo.data.accessToken) {
                return history.push('/')
            }
        }
    }, [loginInfo, messageApi])

    return (
        <>
            <div
                className="mtz-login"
                style={
                    isMobile || isTablet
                        ? { padding: 25, marginBottom: 50 }
                        : { padding: 50, height: '100vh' }
                }
            >
                {contextHolder}
                <Row>
                    <div className="mtz-logo">
                        <img src={mtzLogoImg} alt="mtz logo" />
                    </div>
                </Row>

                <div
                    className="mtz-login-form-container"
                    style={
                        isMobile || isTablet
                            ? {
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                              }
                            : { display: 'flex' }
                    }
                >
                    <img
                        src={loginIntroduceImg}
                        alt="login introduce images"
                        className="img-introduce"
                        style={
                            (isMobile && { width: '100%' }) ||
                            (isTablet && { width: '50%' }) || {
                                position: 'absolute',
                                bottom: 0,
                                height: '87vh',
                            }
                        }
                    />

                    <div
                        className="mtz-login-form"
                        style={
                            (isDesktop && {
                                margin: '7% 0',
                                position: ' absolute',
                                right: 50,
                            }) ||
                            (isMobile || isTablet
                                ? { width: '100%', textAlign: 'center' }
                                : { position: ' absolute', right: 50 })
                        }
                    >
                        <h4 className="title">Đăng nhập ngay!</h4>

                        <h4 className="title-label">
                            Học tập là công việc của cả cuộc đời, hãy để MentorZ
                            là người bạn đồng hành cùng bạn, trải nghiệm ngay!
                        </h4>

                        <Form
                            form={form}
                            initialValues={{ remember: true }}
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
                                    placeholder="Nhập Email hoặc Số điện thoại"
                                    value="test123@gmail.com"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Mật khẩu',
                                    },
                                    {
                                        min: 8,
                                        message:
                                            'Mật khẩu phải có ít nhất 8 ký tự',
                                    },
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Nhập mật khẩu"
                                    value="Test123@"
                                    // allowClear
                                />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Space
                                    direction="vertical"
                                    style={{ width: '100%' }}
                                >
                                    <SpinComponent status={status}>
                                        {' '}
                                        <Button
                                            className="background-linear-gradient"
                                            type="primary"
                                            block
                                            size="large"
                                            htmlType="submit"
                                        >
                                            Đăng nhập
                                        </Button>{' '}
                                    </SpinComponent>
                                </Space>
                            </Form.Item>
                            <Form.Item>
                                <SpinComponent status={status}>
                                    {' '}
                                    {/*or*/}
                                    <div className="or-separator">
                                        <span className="or-text">Hoặc</span>
                                    </div>
                                    <Button
                                        onClick={handleLoginWithGoogle}
                                        style={{
                                            width: '100%',
                                            marginTop: 15,
                                            padding: 0,
                                        }}
                                        size="large"
                                    >
                                        <img
                                            src={googleLogo}
                                            alt="google logo"
                                            style={{
                                                margin: '-12px 0',
                                            }}
                                            width={35}
                                        />{' '}
                                        Đăng nhập bằng Google
                                    </Button>
                                    <Button
                                        style={{
                                            width: '100%',
                                            background: '#5B7BD5',
                                            color: 'white',
                                            marginTop: 15,
                                            padding: 0,
                                        }}
                                        size="large"
                                    >
                                        <div>
                                            <BsFacebook
                                                size={22}
                                                style={{
                                                    margin: '-5px 5px',
                                                }}
                                            />{' '}
                                            Đăng nhập bằng Facebook
                                        </div>
                                    </Button>{' '}
                                </SpinComponent>
                            </Form.Item>
                            {/* <Form.Item>
                                        <Space
                                            direction="vertical"
                                            style={{ width: '100%' }}
                                        >
                                            <SpinComponent status={status}>
                                                {' '}
                                                <Button
                                                    className="background-linear-gradient"
                                                    type="primary"
                                                    block
                                                    onClick={
                                                        handleLoginWithFacebook
                                                    }
                                                    size="large"
                                                >
                                                    Đăng nhập bằng tài khoản
                                                    Facebook
                                                </Button>{' '}
                                            </SpinComponent>
                                        </Space>
                                    </Form.Item> */}
                        </Form>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ display: 'flex', textAlign: 'center' }}
                        >
                            <p>
                                Bạn chưa có tài khoản?{' '}
                                <span
                                    style={{
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                    }}
                                    onClick={() =>
                                        history.push(ROUTERS_URL.REGISTER)
                                    }
                                    className="text-blue"
                                >
                                    Đăng ký ngay
                                </span>
                            </p>
                            <p
                                onClick={() =>
                                    history.push(ROUTERS_URL.FORGOT_PASS)
                                }
                                className="text-large text-blue"
                            >
                                Quên mật khẩu?
                            </p>
                        </Space>

                        {/* <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                    textAlign: "center",
                    marginTop: "16px",
                  }}
                >
                  <img src={qrCodeImg} alt="qr-code" />
                </Space> */}
                    </div>
                </div>
            </div>
            <Modal
                open={isRegister}
                closeIcon={() => null}
                onOk={() => history.push('/register')}
                footer={[]}
            >
                <div className="modal-overlay">
                    <div className="modal">
                        <img className="check" src={sadIcon} alt="" />
                        <h6>Tài khoản không tồn tại!</h6>
                        <p>
                            Tài khoản của bạn chưa tồn tại, bạn có muốn đăng ký
                            ngay?
                        </p>
                        <Button
                            size="large"
                            className="ml-10"
                            type="default"
                            onClick={() => setRegister(false)}
                        >
                            Huỷ
                        </Button>
                        <Button
                            size="large"
                            className="ml-10"
                            type="primary"
                            onClick={handleRegisterWithGoogle}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

LoginPage.propTypes = {}

export default memo(LoginPage)
