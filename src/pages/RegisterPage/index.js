/* eslint-disable no-fallthrough */
import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Form, Input, Col, Row, Space, Typography, message, Modal, Steps, List } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash'
import { clearRegisterUserRequest, registerUserRequest, registerUserSelector } from '../../slices/authentication'
import { getEducationsRequest, educationsSelector, educationDetailSelector } from '../../slices/education'
import registerImg from '../../assets/images/login/img-register.png'
import mtzLogoImg from '../../assets/images/backgrounds/logo.svg'
import mentorImg from '../../assets/images/login/mentor.svg'
import pupilImg from '../../assets/images/login/pupil.svg'
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg'
import checkIconImg from '../../assets/images/login/check-icon.png'
import { getStorage, removeStorage } from '../../services/storage'
import { USER_INFO } from '../../constants/storageKeys'
import { ACCOUNT_TYPE, EDUCATION_TYPE, REGEX_PATTERN } from '../../constants'
import MentorForm from './MentorForm'
// import PupilForm from './PupilForm'
import SpinComponent from '../../components/layout/SpinComponent'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
const { Text } = Typography
const RolesDataSelection = [
  {
    id: uuidv4(),
    prefix: 'mentor',
    title: 'Mentor',
    imgIcon: mentorImg
  },
  {
    id: uuidv4(),
    prefix: 'pupil',
    title: 'Học Sinh',
    imgIcon: pupilImg
  }
]
const RegisterPage = () => {
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const [steps, setSteps] = useState(0)
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  const [roleSelected, setRoleSelected] = useState('')
  const [formValues, setFormValues] = useState({})
  const userRegis = useMemo(() => getStorage('register'), [])
  const educationDetail = useSelector(educationDetailSelector)
  const educationInfo = useSelector(educationsSelector)
  const registerUserInfo = useSelector(registerUserSelector)
  const { data } = educationInfo

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEducationsInfo = (roleSelected) => {
    if (!roleSelected) return
    let body = {
      filterQuery: {},
      options: { pagination: false }
    }
    switch (roleSelected) {
      case 'pupil':
        body.filterQuery = { educationType: EDUCATION_TYPE.HIGH_SCHOOL }
        dispatch(getEducationsRequest(body))
        break
      case 'mentor':
        break
      default:
        break
    }
  }

  useEffect(() => {
    onEducationsInfo(roleSelected)
  }, [roleSelected])

  useEffect(() => {
    if (steps === 0) {
      form.resetFields()
      setFormValues({})
    }
  }, [steps])

  useEffect(() => {
    if (registerUserInfo.error && registerUserInfo.status === 'failed') {
      messageApi
        .open({
          type: 'error',
          content: registerUserInfo.error,
          duration: 0
        })
        .then((r) => {})
      setTimeout(messageApi.destroy, 5000)
      return
    }
    if (registerUserInfo && registerUserInfo.status === 'success') {
      form.resetFields()
      setIsRegisterSuccess(true)
      setFormValues({})
      return
    }
  }, [registerUserInfo])

  const onFinish = (values) => {
    if (!values) return

    if (steps === 3 && roleSelected !== 'mentor') {
      handleRegister(formValues)
      return
    }

    if (steps === 3 && roleSelected === 'mentor') {
      const {
        fullName,
        password,
        phoneNumber,
        email,
        educationType,
        educationId,
        confirmPassword,
        universityDegree,
        certificate
      } = formValues

      const subject = []
      subject.push({
        universityDegree: universityDegree,
        certificate: certificate.map((item) => {
          return item.files.fileList
            .map((c) => {
              return c.response.map((r) => {
                return {
                  url: r.url
                }
              })
            })
            .flat()
        })
      })

      const body = {
        fullName: fullName,
        educationType: educationType,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: phoneNumber,
        educationId: educationId,
        subjects: subject,
        isMentor: true,
        mentorStatus: 'PENDING',
        role: ['USER']
      }

      dispatch(registerUserRequest(body))
    }

    const previousFormValue = cloneDeep(formValues)
    const appendFormValues = Object.assign(previousFormValue, values)
    setFormValues(appendFormValues)
    setSteps((pre) => pre + 1)
  }

  const handleRegister = useCallback(
    (payload) => {
      dispatch(
        registerUserRequest({
          ...payload,
          isMentor: false,
          role: ['USER']
        })
      )
    },
    [dispatch]
  )

  const onFinishFailed = (errorInfo) => {}

  const handleGoBackStep = () => {
    if (steps === 0) {
      return
    }

    const previousFormValue = cloneDeep(formValues)
    const appendFormValues = Object.assign(previousFormValue, form.getFieldsValue())
    form.setFieldsValue(appendFormValues)
    setFormValues(appendFormValues)
    setSteps((pre) => pre - 1)
  }

  const handleSelectRole = useCallback(
    (roleSelected) => {
      setSteps(1)
      setRoleSelected(roleSelected)
      const previousFormValue = cloneDeep(formValues)
      let value = {}
      switch (roleSelected) {
        case 'mentor':
          value = { educationType: EDUCATION_TYPE.UNIVERSITY }
          break
        case 'student':
          value = { educationType: EDUCATION_TYPE.UNIVERSITY }
          break
        case 'pupil':
          value = { educationType: EDUCATION_TYPE.HIGH_SCHOOL }
          break
        default:
          break
      }
      const appendFormValues = Object.assign(previousFormValue, value)
      setFormValues(appendFormValues)
    },
    [formValues]
  )

  const handleLogin = () => {
    dispatch(clearRegisterUserRequest())
    setIsRegisterSuccess(false)
    removeStorage(USER_INFO)
    setTimeout(() => {
      window.location.href = '/login'
    }, 500)
  }

  const renderFooterInfo = () => {
    return (
      <div
        style={
          isMobile || isTablet
            ? {
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'Inter'
              }
            : { display: 'flex', fontSize: 15, fontFamily: 'Inter' }
        }
      >
        <div>Bạn đã có tài khoản?</div>
        <div
          onClick={handleLogin}
          className='text-blue'
          style={isMobile || isTablet ? { marginTop: 10 } : { marginLeft: 5 }}
        >
          Đăng nhập ngay
        </div>
      </div>
    )
  }
  const renderRolesSelection = useMemo(() => {
    return (
      <div
        className='mtz-register-form'
        style={
          (isMobile && { textAlign: 'center', width: '100%' }) ||
          (isTablet && {
            textAlign: 'center',
            width: '80%',
            marginTop: '15%'
          }) || {
            width: '80%'
          }
        }
      >
        <h4 className='title'>Vai trò của bạn</h4>
        <h4 className='title-label'>Chọn vai trò của bạn để đăng ký phù hợp hơn nhé!</h4>
        {RolesDataSelection.map((item) => {
          return (
            <div key={item.id} className='mtz-role-card' onClick={() => handleSelectRole(item.prefix)}>
              <div className='card-left'>
                <img src={item.imgIcon} alt='mentor role images' className='img-mentor-role' />
                <h4 className='title-role'>{item.title}</h4>
              </div>
              <div className='card-right'>
                <ArrowRight />
              </div>
            </div>
          )
        })}
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          }}
        >
          {renderFooterInfo()}
        </Row>
      </div>
    )
  }, [handleSelectRole])

  const renderGroupTitle = useMemo(() => {
    let title = '',
      subTitle = ''
    switch (steps) {
      case 1:
        title = 'Thông tin'
        subTitle = 'Hãy điền thông tin cá nhân cơ bản như họ tên, email, số điện thoại...'
        break
      case 2:
        if (roleSelected === 'mentor') {
          title = 'Chứng chỉ'
          subTitle = 'Điền thông tin chứng chỉ của bản thân, bạn là mentor đại học hay phổ thông?'
        } else {
          title = 'Chọn trường'
          subTitle = 'Điền thông tin trường đại học, ngành học của bản thân'
        }
        break
      case 3:
        title = 'Kiểm tra thông tin'
        subTitle = 'Hãy kiểm tra lại thông tin cá nhân, của mình xem đã chuẩn chưa nhé'
        break
      default:
        break
    }
    return (
      <div style={isMobile || isTablet ? { textAlign: 'center' } : null}>
        <h4 className='title'>{title}</h4>
        <h4 className='title-label'>{subTitle}</h4>
      </div>
    )
  }, [roleSelected, steps])

  const renderActionButtons = useMemo(() => {
    return (
      <>
        {steps !== 3 && (
          <Space
            className='pt-10 pb-10'
            direction='horizontal'
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div className='text-link' onClick={handleGoBackStep}>
              Quay lại
            </div>
            <Button className='background-linear-gradient' type='primary' block size='large' htmlType='submit'>
              Tiếp theo
            </Button>
          </Space>
        )}
        {steps === 3 && (
          <Space
            className='pt-10 pb-10'
            direction='horizontal'
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div
              className='btn-default'
              onClick={() => {
                setSteps(1)
              }}
            >
              Sửa thông tin
            </div>
            <SpinComponent status={registerUserInfo.status}>
              <Button className='background-linear-gradient' type='primary' block size='large' htmlType='submit'>
                Đăng ký
              </Button>
            </SpinComponent>
          </Space>
        )}
        {renderFooterInfo}
      </>
    )
  }, [history, registerUserInfo.status, steps])
  const renderFormContentInformation = useMemo(() => {
    return (
      steps === 1 && (
        <>
          <Form.Item
            label='Họ tên'
            name='fullName'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên'
              }
            ]}
          >
            <Input autoFocus size='large' placeholder='Nhập Họ tên' />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email'
              },
              {
                pattern: REGEX_PATTERN.regexEmail,
                message: `Email hoặc SĐT không hợp lệ!`
              }
            ]}
          >
            <Input type='email' size='large' placeholder='Nhập Email' />
          </Form.Item>
          <Form.Item
            label={roleSelected === 'mentor' ? 'SĐT liên kết với tài khoản Zalo' : 'SĐT'}
            name='phoneNumber'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại'
              },
              {
                pattern: REGEX_PATTERN.regexPhoneNumber,
                message: `SĐT không hợp lệ!`
              }
            ]}
          >
            <Input type='number' size='large' placeholder='Nhập số điện thoại' />
          </Form.Item>
          <Form.Item label='Mã giới thiệu' name='referenceCode'>
            <Input size='large' placeholder='Nhập mã giới thiệu' />
          </Form.Item>
        </>
      )
    )
  }, [steps])
  const renderFormContentBySelectedRole = useMemo(() => {
    if (steps === 2 && roleSelected === 'mentor') {
      return <MentorForm form={form} />
    }
  }, [steps, form, roleSelected])

  const renderFormContentPassword = useMemo(() => {
    return (
      steps === 2 && (
        <>
          <Form.Item
            label='Mật khẩu'
            name='password'
            allowClear
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu'
              },
              {
                min: 8,
                message: 'Mật khẩu phải có ít nhất 8 ký tự'
              },
              {
                pattern: REGEX_PATTERN.regexPassword,
                message: `Mật khẩu bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt`
              }
            ]}
          >
            <Input.Password autoFocus size='large' placeholder='Nhập mật khẩu' />
          </Form.Item>
          <Form.Item
            label='Nhập lại mật khẩu'
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            allowClear
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu'
              },
              {
                min: 8,
                message: 'Mật khẩu phải có ít nhất 8 ký tự'
              },
              {
                pattern: REGEX_PATTERN.regexPassword,
                message: `Mật khẩu bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt`
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp'))
                }
              })
            ]}
          >
            <Input.Password size='large' placeholder='Nhập lại mật khẩu' />
          </Form.Item>
        </>
      )
    )
  }, [steps])
  const renderFormSteps = () => {
    return (
      steps !== 4 &&
      (isMobile ? null : (
        <Steps
          current={steps}
          style={{ width: '90%', margin: '0 auto 15px' }}
          items={[
            {
              title: 'Chọn vai trò'
            },
            {
              title: 'Thông tin cơ bản'
            },
            {
              title: 'Bảo mật'
            }
          ]}
        />
      ))
    )
  }

  const renderPreviewInfor = useMemo(() => {
    return (
      steps === 3 &&
      formValues &&
      data && (
        <div style={{ overflowY: 'auto' }}>
          <Row style={{ height: 'inherit', margin: '10px 0 10px 0' }}>
            <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16'>Họ và tên:</Text>
              </Space>
            </Col>
            <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16 text-bold-600'>{formValues.fullName}</Text>
              </Space>
            </Col>
          </Row>
          <Row style={{ height: 'inherit', margin: '10px 0 10px 0' }}>
            <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16'>Số điện thoại:</Text>
              </Space>
            </Col>
            <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16 text-bold-600'>{formValues.phoneNumber}</Text>
              </Space>
            </Col>
          </Row>
          <Row style={{ height: 'inherit', margin: '10px 0 10px 0' }}>
            <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16'>Email:</Text>
              </Space>
            </Col>
            <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16 text-bold-600'>{formValues.email}</Text>
              </Space>
            </Col>
          </Row>
          <Row style={{ height: 'inherit', margin: '10px 0 10px 0' }}>
            <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16'>Mã giới thiệu:</Text>
              </Space>
            </Col>
            <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16 text-bold-600'>{formValues.referenceCode}</Text>
              </Space>
            </Col>
          </Row>
          <Row style={{ height: 'inherit', margin: '10px 0 10px 0' }}>
            <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16'>{ACCOUNT_TYPE[formValues.accountType || roleSelected]}:</Text>
              </Space>
            </Col>
            <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16 text-bold-600'>
                  {ACCOUNT_TYPE[formValues.accountType || roleSelected]}
                </Text>
              </Space>
            </Col>
          </Row>
          {/* <Row style={{ height: 'inherit', margin: '10px 0 10px 0' }}> */}
          {/* <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
                            <Space direction="vertical">
                                <Text className="title-label f-sz-16">
                                    Trường đại học:
                                </Text>
                            </Space>
                        </Col> */}
          {/* <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
                            <Space direction="vertical">
                                <Text className="title-label f-sz-16 text-bold-600">
                                    {
                                        data?.find(
                                            (f) =>
                                                f._id === formValues.educationId
                                        )?.name
                                    }
                                </Text>
                            </Space>
                        </Col>
                    </Row> */}
          {/* {roleSelected === 'mentor' ? (
                        <>
                            <Row
                                style={{
                                    height: 'inherit',
                                    margin: '10px 0 10px 0',
                                }}
                            > */}
          {/* <Col
                                    xs={24}
                                    xl={8}
                                    style={{ lineHeight: '35px' }}
                                >
                                    <Space direction="vertical">
                                        <Text className="title-label f-sz-16">
                                            Trình độ đào tạo:
                                        </Text>
                                    </Space>
                                </Col> */}
          {/* <Col
                                    xs={24}
                                    xl={16}
                                    style={{ lineHeight: '35px' }}
                                >
                                    <Space direction="vertical">
                                        <Text className="title-label f-sz-16 text-bold-600">
                                            {formValues.universityDegree}
                                        </Text>
                                    </Space>
                                </Col>
                            </Row> */}
          <>
            {roleSelected === 'mentor' && (
              <Row
                style={{
                  height: 'inherit',
                  margin: '10px 0 10px 0'
                }}
              >
                <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
                  <Space direction='vertical'>
                    <Text className='title-label f-sz-16'>Chứng chỉ liên quan:</Text>
                  </Space>
                </Col>
                <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
                  <Space direction='vertical'>
                    <List
                      dataSource={formValues.certificate}
                      renderItem={(sj, id) => (
                        <List.Item
                          style={{
                            padding: '10px 0'
                          }}
                          key={id}
                        >
                          <div
                            style={{
                              width: '100%'
                            }}
                          >
                            <h4>{id === 1 ? 'Bằng cấp - Chứng chỉ khác' : null}</h4>
                            <b>{id === 0 ? 'Bằng cấp - Chứng chỉ Cao nhất' : 'Bằng cấp - Chứng chỉ ' + id}</b>

                            <p
                              style={{
                                fontWeight: 'normal'
                              }}
                            >
                              Bằng cấp liên quan:
                              {sj.files.fileList.map((file, key) => (
                                <div key={key}>
                                  <b>
                                    File:
                                    {key + 1}
                                  </b>
                                  <p>
                                    Tên File:
                                    {file.name}
                                  </p>
                                </div>
                              ))}
                            </p>
                          </div>
                        </List.Item>
                      )}
                    ></List>
                  </Space>
                </Col>
              </Row>
            )}
          </>
          : (
          <Row
            style={{
              height: 'inherit',
              margin: '10px 0 10px 0'
            }}
          >
            <Col xs={24} xl={8} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16'>Ngành học:</Text>
              </Space>
            </Col>
            <Col xs={24} xl={16} style={{ lineHeight: '35px' }}>
              <Space direction='vertical'>
                <Text className='title-label f-sz-16 text-bold-600'>
                  {educationDetail?.data?.majors?.find((f) => f._id === formValues.majorId)?.name}
                </Text>
              </Space>
            </Col>
          </Row>
          )
        </div>
      )
    )
  }, [steps, formValues, data, roleSelected])
  const renderRegisterFormByRoleSelection = () => {
    return (
      <>
        <div className='mtz-register-form' style={{ width: '90%' }}>
          {renderGroupTitle}
          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            initialValues={{
              fullName: userRegis?.fullName,
              email: userRegis?.email
            }}
            style={{ width: '100%' }}
          >
            {renderFormContentInformation}
            {renderFormContentBySelectedRole}
            {renderFormContentPassword}
            {renderPreviewInfor}
            {renderActionButtons}
          </Form>
        </div>
      </>
    )
  }
  return (
    <>
      <div
        className='mtz-register'
        style={
          isMobile || isTablet
            ? { padding: 25 }
            : {
                padding: 50,
                display: 'flex',
                justifyContent: 'space-between'
              }
        }
      >
        {contextHolder}

        <div className='content-box' style={isMobile || isTablet ? { width: '100%' } : { width: '50%' }}>
          <div className='mtz-logo'>
            <img style={{ width: 143, height: 45 }} src={mtzLogoImg} alt='mtz logo' />
          </div>
          <div style={isMobile || isTablet ? { marginTop: 25, textAlign: 'center' } : { marginTop: 25, width: '100%' }}>
            <h4 className='title' style={{ marginBottom: 25 }}>
              <span className='text-blue'>MentorZ</span> - Người bạn đồng hành không thể thiếu trong việc
              <span className='text-blue'>học tập</span> của bạn!
            </h4>
            <h4 className='title-label'>Bắt đầu đăng ký để trải nghiệm MentorZ.</h4>
            <img
              src={registerImg}
              alt='register introduce images'
              className='img-introduce'
              style={
                (isMobile && {
                  width: '100%',
                  margin: '15px 0'
                }) ||
                (isTablet && {
                  width: '50%',
                  margin: 15
                }) || {
                  width: '70%',
                  margin: '0 50px'
                }
              }
            />
          </div>
        </div>
        {steps === 0 && (
          <div
            className='mtz-register-role-select'
            style={
              (isMobile && { height: '100%' }) ||
              (isTablet && { height: '50%' }) || {
                height: '100%',
                width: '50%'
              }
            }
          >
            {renderRolesSelection}
          </div>
        )}
        {steps > 0 && (
          <div className='mtz-register-form-container'>
            {renderFormSteps()}

            <div className='form-body'>{renderRegisterFormByRoleSelection()}</div>
          </div>
        )}
      </div>
      <Modal open={isRegisterSuccess} closeIcon={() => null} onOk={handleLogin} footer={[]}>
        <div className='modal-overlay'>
          <div className='modal'>
            <img className='check' src={checkIconImg} alt='' />
            <h6>Thành công!</h6>
            <p>Tài khoản của bạn đã được đăng ký thành công!</p>
            <Button size='large' className='ml-10' type='default' onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
RegisterPage.propTypes = {}
export default memo(RegisterPage)
