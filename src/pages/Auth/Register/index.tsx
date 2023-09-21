/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { Button, Steps, theme } from 'antd'
import './Register.scss'
import Roles from './Roles/Roles'
import MentorForm from './MentorForm/Info/MentorForm'
import { Link } from 'react-router-dom'
import { DataFormMentor, MentorForm as TMentorForm } from './constants'

const Register: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [pickRole, setPickRole] = useState<string | undefined>(undefined)
  const [checkStep2, setCheckStep2] = useState<TMentorForm | undefined>(undefined)
  const [dataForm, setDataForm] = useState<DataFormMentor>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    birthday: '',
    certificates: [],
    userId: '',
    educationType: '',
  })
  const formRef = useRef<HTMLFormElement>(null)
  const { token } = theme.useToken()

  useEffect(() => {
    if (checkStep2 && current === 1) {
      setCurrent(current + 1)
    }

    return
  }, [checkStep2])

  useEffect(() => {
    if (pickRole && current === 0) {
      setCurrent(current + 1)
    }

    return
  }, [pickRole])

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
      birthday: steps2.birthday,
    })
  }

  const ids = (idRole: string) => {
    setDataForm({ ...dataForm, userId: idRole })
  }

  const steps = [
    {
      title: 'Chọn vai trò',
      content: <Roles pickRoleChange={handleChildStateChange} />,
    },
    {
      title: 'Thông tin cơ bản',
      content: <MentorForm onFinishs={handleChildSteps2Change} formRef={formRef} roles={pickRole} ids={ids} />,
    },
  ]

  const prev = () => {
    if (current === 1) {
      setPickRole('')
    }

    if (current !== 1) {
      setCheckStep2(undefined)
      setCurrent(current - 1)

      return
    }

    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    minHeight: '300px',
    lineHeight: '50px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    marginTop: 16,
  }

  return (
    <>
      <div className='container-reg'>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current === steps.length - 1 && (
            <div className='dix-flex'>
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Quay lại
              </Button>
              <Button type='primary' onClick={handleSubmit}>
                Hoàn thành
              </Button>
            </div>
          )}

          <p className='res'>
            Bạn đã có tài khoản ?{' '}
            <Link className='link' to={'/login'}>
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
