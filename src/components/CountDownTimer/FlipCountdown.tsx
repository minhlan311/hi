import { useEffect, useState } from 'react'
import css from './styles.module.scss'
import moment, { Moment } from 'moment-timezone'

type Props = {
  number: number
  size: number
  getTime: 'seconds' | 'minutes' | 'hours'
  numRender: 'firstNumber' | 'secondNumber'
}

const FlipCountdown = ({ number, size, getTime = 'seconds', numRender = 'secondNumber' }: Props) => {
  const [count, setCount] = useState<number>()

  useEffect(() => {
    setCount(number)
  }, [number])

  const getTimeRemaining = (targetDateTime: Moment | null, minutesRemaining?: number) => {
    const nowTime = moment()
    const targetMinutes = nowTime.clone().add(minutesRemaining, 'seconds')
    const targetData = targetDateTime ? targetDateTime : targetMinutes
    const complete = nowTime.isSameOrAfter(targetData)

    if (complete) {
      return {
        complete: true,
        seconds: 0,
        minutes: 0,
        hours: 0,
      }
    }

    const duration = moment.duration(targetData.diff(nowTime))
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    return {
      complete: false,
      seconds,
      minutes,
      hours,
    }
  }

  const time = getTimeRemaining(null, count)

  const updateTimeSection = (timeValue: number) => {
    const firstNumber = Math.floor(timeValue / 10) || 0
    const secondNumber = timeValue % 10 || 0

    return {
      firstNumber,
      secondNumber,
    }
  }

  const [num, setNum] = useState(0)
  const [oldNum, setOld] = useState(0)

  useEffect(() => {
    setNum(updateTimeSection(time?.[getTime])?.[numRender])
  }, [time])

  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(true)
    setTimeout(() => {
      setOld(num)
    }, 750)
    setTimeout(() => {
      setIsFlipped(false)
    }, 800)
  }, [num])

  return (
    <div className={css.timer}>
      <div className={css.timeSegment} style={{ fontSize: size }}>
        <div className={css.segmentDisplay}>
          <div className={css.segmentDisplay__top}>{num}</div>
          <div className={css.segmentDisplay__bottom}>{oldNum}</div>
          <div className={`${css.segmentOverlay} ${isFlipped ? css.flip : ''}`}>
            <div className={css.segmentOverlay__top}>{oldNum}</div>
            <div className={css.segmentOverlay__bottom}>{num}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCountdown
