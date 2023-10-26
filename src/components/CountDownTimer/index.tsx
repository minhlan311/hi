import ButtonCustom from '../ButtonCustom/ButtonCustom'
import FlipCountdown from './FlipCountdown'
import moment from 'moment-timezone'
import TextCountdown from './TextCountdown'
import { Space } from 'antd'
import { useEffect, useState } from 'react'

type Props = {
  timeTillDate?: string
  timeFormat?: string
  count?: 'countUp' | 'countDown'
  type: 'text' | 'number' | 'flip' | 'progress'
  initTime?: number
  initCountdown?: number
  size?: number
  action?: boolean
  start?: boolean
  localId?: string
}

const CountDownTimer = (props: Props) => {
  const {
    timeTillDate,
    initTime = 1,
    initCountdown,
    timeFormat = 'HH:mm:ss',
    count = 'countDown',
    size = 50,
    action = false,
    type = 'text',
    start = false,
    localId,
  } = props
  const now = moment()

  const minutesInit = timeTillDate ? moment(timeTillDate).diff(now, 'seconds') : initTime && initTime * 60
  const [countdown, setCountdown] = useState(minutesInit || 0)
  const [isRunning, setIsRunning] = useState(false)

  const [stopedTime, setStopedTime] = useState<number>(0)
  useEffect(() => {
    window.onbeforeunload = (e) => {
      e.preventDefault()
      e.returnValue =
        'Bạn đang làm bài kiểm tra. Bạn có chắc chắn muốn rời khỏi trang này? Mọi thay đổi chưa được lưu sẽ bị mất.'

      if (localId)
        localStorage.setItem(localId as string, JSON.stringify(moment.duration(stopedTime, 'seconds').asMinutes()))
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [stopedTime])

  useEffect(() => {
    setIsRunning(start)
  }, [start])

  useEffect(() => {
    if (initCountdown && initCountdown > 0) setCountdown(initCountdown * 60)
  }, [initCountdown])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => (count === 'countDown' ? prevCountdown - 1 : prevCountdown + 1))
    }, 1000)

    if (!isRunning || countdown === 0) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, countdown])

  const resetCountdown = () => {
    setIsRunning(false)
    setCountdown(minutesInit || 0)
  }

  const handleCountdown = () => {
    setIsRunning(!isRunning)
  }

  useEffect(() => {
    setStopedTime(countdown)
  }, [countdown])

  return (
    <Space>
      {(type === 'flip' && (
        <>
          <FlipCountdown number={countdown} size={size} getTime='hours' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='hours' numRender='secondNumber' />
          <p style={{ fontSize: size }}>:</p>
          <FlipCountdown number={countdown} size={size} getTime='minutes' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='minutes' numRender='secondNumber' />
          <p style={{ fontSize: size }}>:</p>
          <FlipCountdown number={countdown} size={size} getTime='seconds' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='seconds' numRender='secondNumber' />
        </>
      )) || (
        <TextCountdown
          countdown={countdown}
          size={size}
          type={type}
          timeFormat={timeFormat}
          initTime={initTime}
        ></TextCountdown>
      )}

      {action && (
        <>
          <ButtonCustom onClick={handleCountdown}>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</ButtonCustom>
          <ButtonCustom onClick={resetCountdown} disabled={isRunning}>
            Đặt lại
          </ButtonCustom>
        </>
      )}
    </Space>
  )
}

export default CountDownTimer
