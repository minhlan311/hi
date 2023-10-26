import { Space } from 'antd'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import FlipCountdown from './FlipCountdown'
import TextCountdown from './TextCountdown'

interface Time {
  showTime: 's' | 'm' | 'h' | 'd'
}

type Props = {
  timeTillDate?: string
  timeFormat?: string
  showTime?: Time | [Time, Time]
  count?: 'countUp' | 'countDown'
  type: 'text' | 'number' | 'flip' | 'progress'
  initTime?: number
  size?: number
  action?: boolean
}

const CountDownTimer = (props: Props) => {
  const { timeTillDate, initTime = 1, timeFormat = 'HH:mm:ss', size = 150, action = false, type = 'text' } = props
  const now = moment()

  const minutesInit = timeTillDate ? moment(timeTillDate).diff(now, 'seconds') : initTime && initTime * 60
  const [countdown, setCountdown] = useState(minutesInit || 0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
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

  return (
    <Space>
      {(type === 'flip' && (
        <>
          <FlipCountdown number={countdown} size={size} getTime='hours' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='hours' numRender='secondNumber' />

          <FlipCountdown number={countdown} size={size} getTime='minutes' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='minutes' numRender='secondNumber' />

          <FlipCountdown number={countdown} size={size} getTime='seconds' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='seconds' numRender='secondNumber' />
        </>
      )) || (
        <TextCountdown countdown={countdown} type={type} timeFormat={timeFormat} initTime={initTime}></TextCountdown>
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
