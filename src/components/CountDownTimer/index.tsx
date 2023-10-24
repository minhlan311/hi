// import { Progress, Space } from 'antd'
// import moment from 'moment-timezone'
// import { useEffect, useState } from 'react'
// import ButtonCustom from '../ButtonCustom/ButtonCustom'
// import css from './styles.module.scss'

// interface Time {
//   showTime: 's' | 'm' | 'h' | 'd'
// }

// type Props = {
//   timeTillDate?: string
//   timeFormat?: string
//   showTime?: Time | [Time, Time]
//   type?: 'countUp' | 'countDown'
//   timeInit?: number
//   size?: number
// }

// const CountDownTimer = (props: Props) => {
//   const { timeTillDate, timeInit = 1, timeFormat = 'HH:mm:ss', size = 255 } = props
//   const now = moment()

//   const minutesInit = timeTillDate ? moment(timeTillDate).diff(now, 'seconds') : timeInit && timeInit * 60
//   const [countdown, setCountdown] = useState(minutesInit || 0)
//   const [isRunning, setIsRunning] = useState(false)

//   const handleCountdown = () => {
//     setIsRunning(!isRunning)
//   }

//   const resetCountdown = () => {
//     setIsRunning(false)
//     setCountdown(minutesInit || 0)
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown((prevCountdown) => prevCountdown - 1)
//     }, 1000)

//     if (!isRunning || countdown === 0) {
//       clearInterval(interval)
//     }

//     return () => {
//       clearInterval(interval)
//     }
//   }, [isRunning, countdown])

//   useEffect(() => {
//     if (timeTillDate) {
//       const targetDate = moment(timeTillDate)

//       const duration = moment.duration(targetDate.diff(now))
//       const secondsRemaining = Math.max(duration.asSeconds(), 0)
//       setCountdown(secondsRemaining)

//       if (secondsRemaining > 0) {
//         setIsRunning(true)
//       }
//     }
//   }, [timeTillDate])

//   const time = moment().startOf('day').seconds(countdown)

//   const CountdownTracker = ({ value, label }) => {
//     return (
//       <span className={css.flipClock__piece}>
//         <b className={css.card} style={{ fontSize: size }}>
//           <b className={css.card__top}>{value}</b>
//           <b className={css.card__bottom}>{value}</b>
//           <div className={value && css.flip}>
//             <b className={css.card__back}>
//               <b className={css.card__bottom}>{value}</b>
//             </b>
//           </div>
//         </b>
//         <span className={css.flipClock__slot}>{label}</span>
//       </span>
//     )
//   }

//   return (
//     <Space>
//       <div className={css.flipClock}>
//         <CountdownTracker value={time.format('ss')} label={'giây'} />
//       </div>
//       {timeInit && minutesInit ? (
//         <>
//           <Progress
//             type='circle'
//             percent={parseInt(((countdown / minutesInit) * 100).toFixed(2))}
//             format={() => (time ? `${time.format('mm')}:${time.format('ss')}` : '00:00')}
//           />
//           <ButtonCustom onClick={handleCountdown}>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</ButtonCustom>
//           <ButtonCustom onClick={resetCountdown} disabled={isRunning}>
//             Đặt lại
//           </ButtonCustom>
//         </>
//       ) : (
//         <p>Thời gian còn lại: {time.format(timeFormat)}</p>
//       )}

//       {/* <Space direction='vertical' align='center'>
//         {days}
//         Ngày
//       </Space>
//       <Space direction='vertical' align='center'>
//         {hours}
//         Giờ
//       </Space>
//       <Space direction='vertical' align='center'>
//         {minutes}
//         Phút
//       </Space>
//       <Space direction='vertical' align='center'>
//         {seconds}
//         Giây
//       </Space> */}
//     </Space>
//   )
// }

// export default CountDownTimer
