import { Button } from 'antd'
import { useEffect, useState } from 'react'
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
  return <Button className={`button-in ${shake ? 'shake' : ''}`}>ĐĂNG KÝ NGAY</Button>
}
