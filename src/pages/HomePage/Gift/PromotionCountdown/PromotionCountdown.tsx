import moment from 'moment'
import { useEffect, useState } from 'react'
import './PromotionCountdown.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PromotionCountdown = ({ endDateProps }: any) => {
  const [days, setDays] = useState<number | string>('')
  const [hours, setHours] = useState<number | string>('')
  const [minutes, setMinutes] = useState<number | string>('')
  const [seconds, setSeconds] = useState<number | string>('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment() // Lấy thời gian hiện tại
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const startDate = moment(startDateProps || '2023-09-07 07:00:00')

      // Mốc thời gian bắt đầu khuyến mãi
      const endDate = moment(endDateProps || '2024-12-30 07:00:00') // Mốc thời gian kết thúc khuyến mãi

      // Kiểm tra nếu thời gian hiện tại đã vượt quá thời gian kết thúc khuyến mãi
      if (now.isAfter(endDate)) {
        setDays('Khuyến mãi đã kết thúc')
        setHours('')
        setMinutes('')
        setSeconds('')

        return
      }

      // Tính toán khoảng cách thời gian còn lại từ thời gian hiện tại đến thời gian kết thúc khuyến mãi
      const duration = moment.duration(endDate.diff(now))
      const days = Math.floor(duration.asDays())
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()

      // Cập nhật giá trị của state tương ứng với từng phần tử thời gian
      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)
    }

    const timer = setInterval(() => {
      calculateTimeLeft()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='container-time'>
      <div className='day'>
        <p>{days} </p>
        <span>Ngày</span>
      </div>
      <span className='dot'>:</span>
      <div className='hour'>
        <p>{hours} </p>
        <span>Giờ</span>
      </div>
      <span className='dot'>:</span>
      <div className='min'>
        <p>{minutes} </p>
        <span>Phút</span>
      </div>
      <span className='dot'>:</span>
      <div className='secon'>
        <p>{seconds} </p>
        <span>Giây</span>
      </div>
    </div>
  )
}

export default PromotionCountdown
