import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import './ButtonShake.scss'

export default function ButtonShake() {
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShake((prevShake) => !prevShake)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Button className={`button-in ${shake ? 'shake' : ''}`}>
      <DoubleRightOutlined /> ĐĂNG KÝ NGAY
      <DoubleLeftOutlined />
    </Button>
  )
}
