/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { Button, notification, Steps, theme } from 'antd'
import './Register.scss'
import Roles from './Roles/Roles'
import { ROLE } from './Roles/constants'
import MentorForm from './MentorForm/Info/MentorForm'
import StudentForm from './StudentForm/StudentForm'
import Certificate from './MentorForm/Certificate/Certificate'
import authApi from '@/apis/auth.api'
import { useNavigate } from 'react-router-dom'
import { DataFormMentor, MentorForm as TMentorForm } from './constants'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const id = localStorage.getItem('id')
  const [pickRole, setPickRole] = useState('')
  const [checkStep2, setCheckStep2] = useState<TMentorForm | undefined>(undefined)
  const [dataForm, setDataForm] = useState<DataFormMentor>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    birthDay: '',
    certificates: [],
    userId: id as string,
    educationType: '',
    isMentor: false
  })

  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (checkStep2 && current === 1) {
      setCurrent(current + 1)
    }
  }, [checkStep2])

  const handleSubmit = () => {
    if (current === 1) {
      formRef.current!.submit()
    }
    if (checkStep2) {
      if (current === 1) {
        setCurrent(current + 1)
      }
      if (current !== 1) {
        setCheckStep2(undefined)
        setCurrent(current + 1)
      }
    } else {
      if (current !== 1) {
        setCheckStep2(undefined)
        setCurrent(current + 1)
      }
      if (current === 1) {
        setCheckStep2(undefined)
        setCurrent(current)
      }
    }
  }

  const handleChildStateChange = (newState: string) => {
    setPickRole(newState)
  }
  const handleChildSteps2Change = (steps2: TMentorForm) => {
    setCheckStep2(steps2)
    setDataForm({
      ...dataForm,
      fullName: steps2.fullName,
      email: steps2.email,
      password: steps2.password,
      confirmPassword: steps2.confirmPassword,
      phoneNumber: steps2.phoneNumber,
      birthDay: steps2.birthDay,
      isMentor: true
    })
  }

  const dataChild = (steps3: { educationType: string; link: string[] }) => {
    setDataForm({ ...dataForm, certificates: steps3.link, educationType: steps3.educationType })
  }

  const steps = [
    {
      title: 'Chọn vai trò',
      content: <Roles pickRoleChange={handleChildStateChange} />
    },
    {
      title: 'Thông tin cơ bản',
      content:
        pickRole === ROLE.STUDENT ? (
          <StudentForm />
        ) : (
          <MentorForm onFinishs={handleChildSteps2Change} formRef={formRef} />
        )
    },
    {
      title: 'Thông tin bảo mật',
      content: pickRole === ROLE.MENTOR ? <Certificate dataChild={dataChild} /> : ''
    }
  ]

  const prev = () => {
    if (current !== 1) {
      setCheckStep2(undefined)
      setCurrent(current - 1)
    }
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    minHeight: '500px',
    lineHeight: '50px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }
  console.log(dataForm, 'dataFormdataFormdataForm')
  const handleForm = async () => {
    if (!dataForm.educationType || dataForm.certificates.length === 0) {
      notification.open({
        type: 'warning',
        message: 'Thông báo',
        description: 'Vui lòng điền đầy đủ bằng cấp chứng chỉ và trình độ đào tạo'
      })
    } else {
      const data = await authApi.registerMentor(dataForm)
      if (data.status === 201) {
        notification.open({
          type: 'success',
          message: 'Thông báo',
          description: 'Đăng ký thành công,vui lòng đăng nhập!'
        })
        navigate('/')
      } else {
        notification.open({
          type: 'error',
          message: 'Thông báo',
          description: 'Có lỗi xảy ra'
        })
      }
    }
  }

  return (
    <>
      <div className='container-reg'>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={handleSubmit}>
              Tiếp tục
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={handleForm}>
              Hoàn thành
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Quay lại
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Register
