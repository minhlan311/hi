import { Space } from 'antd'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import FlipCountdown from './FlipCountdown'
import TextCountdown from './TextCountdown'

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
  localData?: any
  className?: string
  space?: string
  spaceStyle?: React.CSSProperties
  showAlex?: boolean
  callbackTimeEnd?: React.Dispatch<React.SetStateAction<number>>
  callbackCoudown?: React.Dispatch<React.SetStateAction<number>>
  onListenEvent?: () => void
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
    start = true,
    localId,
    localData,
    className,
    space = type === 'flip' && ':',
    spaceStyle,
    showAlex = true,
    callbackTimeEnd,
    callbackCoudown,
    onListenEvent,
  } = props
  const now = moment()

  const minutesInit = timeTillDate ? moment(timeTillDate).diff(now, 'seconds') : initTime && initTime * 60
  const [countdown, setCountdown] = useState<number>(minutesInit || 0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [stopedTime, setStopedTime] = useState<number>(0)
  useEffect(() => {
    if (showAlex) {
      window.onbeforeunload = (e) => {
        e.preventDefault()
        e.returnValue =
          'Bạn đang làm bài kiểm tra. Bạn có chắc chắn muốn rời khỏi trang này? Mọi thay đổi chưa được lưu sẽ bị mất.'

        if (localId) {
          localStorage.setItem(localId as string, JSON.stringify(moment.duration(stopedTime, 'seconds').asMinutes()))
        }
        if (localData) {
          localStorage.setItem((localId + 'data') as string, JSON.stringify(localData))
        }
      }
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [stopedTime, showAlex])

  useEffect(() => {
    setIsRunning(start)
    if (!start && callbackTimeEnd) callbackTimeEnd(stopedTime / 60)
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
    callbackCoudown && callbackCoudown(countdown)

    if (countdown === 0) {
      onListenEvent && onListenEvent()
      callbackTimeEnd && callbackTimeEnd(0)
    }
  }, [countdown])

  return (
    <Space>
      {(type === 'flip' && (
        <>
          <FlipCountdown number={countdown} size={size} getTime='hours' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='hours' numRender='secondNumber' />
          <p style={{ fontSize: size, ...spaceStyle }}>{space}</p>
          <FlipCountdown number={countdown} size={size} getTime='minutes' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='minutes' numRender='secondNumber' />
          <p style={{ fontSize: size, ...spaceStyle }}>{space}</p>
          <FlipCountdown number={countdown} size={size} getTime='seconds' numRender='firstNumber' />
          <FlipCountdown number={countdown} size={size} getTime='seconds' numRender='secondNumber' />
        </>
      )) || (
        <TextCountdown
          className={className}
          countdown={countdown}
          size={size}
          type={type}
          timeFormat={timeFormat}
          initTime={initTime}
          space={space ? space : undefined}
          spaceStyle={spaceStyle}
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
