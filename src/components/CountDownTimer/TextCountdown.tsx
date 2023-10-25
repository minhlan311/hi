import { Progress, Space } from 'antd'
import moment, { Moment } from 'moment-timezone'

type Props = {
  type: 'text' | 'number' | 'flip' | 'progress'
  countdown: number
  initTime: number
  timeFormat?: string
}

const TextCountdown = ({ type, countdown, initTime }: Props) => {
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

  return (
    <div>
      {(type === 'text' && (
        <Space>
          <Space direction='vertical' align='center'>
            {time.days}
            Ngày
          </Space>
          <Space direction='vertical' align='center'>
            {time.hours}
            Giờ
          </Space>
          <Space direction='vertical' align='center'>
            {time.minutes}
            Phút
          </Space>
          <Space direction='vertical' align='center'>
            {time.seconds}
            Giây
          </Space>
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
                  {time.seconds === 0 && time.hours > 0 && time.minutes === 0 && <span>{time.hours} giờ</span>}
                  {time.seconds === 0 && time.hours === 0 && time.minutes > 0 && <span>{time.minutes} phút</span>}
                  {time.seconds > 0 && time.hours === 0 && time.minutes === 0 && <span>{time.seconds} giây</span>}

                  {time.hours > 0 && time.minutes > 0 && (
                    <span>
                      {time.hours}:{time.minutes}
                    </span>
                  )}

                  {time.hours > 0 && time.minutes > 0 && time.seconds > 0 && (
                    <span>
                      {time.hours}:{time.minutes}:{time.seconds}
                    </span>
                  )}
                </p>
              ) : (
                <span>
                  {time.hours > 0 && <span>{time.hours}:</span>}
                  {time.minutes > 0 && <span>{time.minutes}:</span>}
                  {time.seconds > 0 && time.minutes > 0 ? (
                    <span>{time.seconds}</span>
                  ) : (
                    <span>{time.seconds} giây</span>
                  )}
                </span>
              )
            }
          />
        ))}
    </div>
  )
}

export default TextCountdown
