import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd'
import './Register.scss'
import Roles from './Roles/Roles'

const Register: React.FC = () => {
  // const [pickRole, setPickRole] = useState()

  const steps = [
    {
      title: 'Chọn vai trò',
      content: <Roles />
    },
    {
      title: 'Thông tin cơ bản',
      content: 'Second-content'
    },
    {
      title: 'Thông tin bảo mật',
      content: 'Last-content'
    }
  ]

  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    lineHeight: '50px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }

  return (
    <>
      <div className='container-reg'>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={() => next()}>
              Tiếp tục
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={() => message.success('Processing complete!')}>
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
