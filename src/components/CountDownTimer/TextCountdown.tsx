import { Card, Flex, Progress, Space } from 'antd'
import moment, { Moment } from 'moment-timezone'
import { BsClockHistory } from 'react-icons/bs'
import css from './styles.module.scss'

type Props = {
  type: 'text' | 'number' | 'flip' | 'progress'
  countdown: number
  size: number
  initTime: number
  timeFormat?: string
  className?: string
  space?: string
  spaceStyle?: React.CSSProperties
}

const nowTime = moment()

const TextCountdown = ({ type, countdown, size, initTime, className, space, spaceStyle }: Props) => {
  const getTimeRemaining = (targetDateTime: Moment | null, minutesRemaining?: number) => {
    const targetMinutes = nowTime.clone().add(minutesRemaining, 'seconds')
    const targetData = targetDateTime ? targetDateTime : targetMinutes
    const complete = nowTime.isSameOrAfter(targetData)

    if (complete) {
      return {
        complete: true,
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
      }
    }

    const duration = moment.duration(targetData.diff(nowTime))
    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    return {
      complete: false,
      seconds,
      minutes,
      hours,
      days,
    }
  }

  const time = getTimeRemaining(null, countdown)
  const duration = moment.duration(countdown, 'seconds')
  const showTime = moment.utc(duration.asMilliseconds())

  return (
    <div className={css.textCountdown}>
      {(type === 'text' && (
        <Space align='center'>
          <Card size='small' className={className}>
            <div className={css.item} style={{ fontSize: size }}>
              <b className={css.number}>{time.days}</b>
              <p className={css.label}>Ngày</p>
            </div>
          </Card>
          {space && (
            <p style={{ ...spaceStyle, fontSize: size }} className={css.space}>
              {space}
            </p>
          )}
          <Card size='small' className={className}>
            <div className={css.item} style={{ fontSize: size }}>
              <b className={css.number}>{time.hours}</b>
              <p className={css.label}>Giờ</p>
            </div>
          </Card>
          {space && (
            <p style={{ ...spaceStyle, fontSize: size }} className={css.space}>
              {space}
            </p>
          )}
          <Card size='small' className={className}>
            <div className={css.item} style={{ fontSize: size }}>
              <b className={css.number}>{time.minutes}</b>
              <p className={css.label}>Phút</p>
            </div>
          </Card>
          {space && (
            <p style={{ ...spaceStyle, fontSize: size }} className={css.space}>
              {space}
            </p>
          )}
          <Card size='small' className={className}>
            <div className={css.item} style={{ fontSize: size }}>
              <b className={css.number}>{time.seconds}</b>
              <p className={css.label}>Giây</p>
            </div>
          </Card>
        </Space>
      )) ||
        (type === 'progress' && (
          <Progress
            type='circle'
            percent={parseInt(((countdown / (initTime * 60)) * 100).toFixed(2))}
            status={(countdown / (initTime * 60)) * 100 <= 10 ? 'exception' : undefined}
            format={() =>
              countdown === initTime * 60 ? (
                <p>
                  {time.hours > 0 && time.minutes === 0 && time.seconds === 0 && (
                    <span>{showTime.format('HH')} giờ</span>
                  )}
                  {time.hours === 0 && time.minutes > 0 && time.seconds === 0 && (
                    <span>{showTime.format('mm')} phút</span>
                  )}
                  {time.hours === 0 && time.minutes === 0 && time.seconds > 0 && (
                    <span>{showTime.format('ss')} giây</span>
                  )}

                  {time.hours > 0 && time.minutes > 0 && time.seconds > 0 && (
                    <span>{time.hours === 0 ? showTime.format('mm:ss') : showTime.format('HH:mm:ss')}</span>
                  )}
                </p>
              ) : (
                <span>
                  {time.minutes > 0 || time.hours > 0 ? (
                    <span>{time.hours === 0 ? showTime.format('mm:ss') : showTime.format('HH:mm:ss')}</span>
                  ) : (
                    <span>{showTime.format('ss')} giây</span>
                  )}
                </span>
              )
            }
          />
        )) || (
          <div className={css.countdownNumber}>
            <Flex align='center' style={{ fontSize: size - (size * 25) / 100 }} gap={5}>
              <BsClockHistory />
              <div style={{ fontSize: size, fontWeight: 'bold' }}>
                {duration.asMilliseconds() === 0
                  ? 'Hết thời gian'
                  : time.hours === 0
                  ? showTime.format('mm:ss')
                  : showTime.format('HH:mm:ss')}
              </div>
            </Flex>
          </div>
        )}
    </div>
  )
}

export default TextCountdown
