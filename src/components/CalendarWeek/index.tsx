/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContext } from '@/contexts/app.context'
import { Row, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/vi'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import css from './styles.module.scss'
type Props = {
  callBackWeekSelect?: React.Dispatch<React.SetStateAction<string | object>>
  callBackDateOfWeek?: React.Dispatch<React.SetStateAction<Dayjs[]>>
  showCurrent?: boolean
  buttonAdd?: React.ReactNode
}

interface Date {
  date: Dayjs
  selected: string | null
  onSelectDate: React.Dispatch<React.SetStateAction<string | null>>
}

const CalendarWeek = ({ callBackWeekSelect, callBackDateOfWeek, showCurrent, buttonAdd }: Props) => {
  const [currentWeek, setCurrentWeek] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const { profile } = useContext(AppContext)

  const nowWeek = () => {
    setCurrentWeek(dayjs())
    setSelectedDate(dayjs().format('YYYY/MM/DD'))
  }

  const prevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, 'week'))
  }

  const nextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'))
  }

  const [dateOfWeek, setDateOfWeek] = useState<Dayjs[]>([])

  useEffect(() => {
    const dates = []

    for (let i = 0; i < 7; i++) {
      dates.push(currentWeek.add(i, 'day'))
    }

    setDateOfWeek(dates as unknown as any[])
    callBackWeekSelect &&
      callBackWeekSelect({
        start: dayjs(dates[0]).format('YYYY/MM/DD'),
        end: dayjs(dates[6]).format('YYYY/MM/DD'),
      })
    callBackDateOfWeek && callBackDateOfWeek(dates)
  }, [currentWeek])

  useEffect(() => {
    if (callBackWeekSelect) {
      if (selectedDate) {
        return callBackWeekSelect(selectedDate)
      }

      callBackWeekSelect(dayjs().format('YYYY/MM/DD'))
    }
  }, [selectedDate])

  const Date = ({ date, onSelectDate, selected }: Date) => {
    const dayName = dayjs(date).locale('vi').format('ddd')
    const today = dayjs(date).format('YYYY/MM/DD') === dayjs().format('YYYY/MM/DD')
    const dayNumber = dayjs(date).format('D')
    const select = dayjs(date).format('YYYY/MM/DD') === selected

    return (
      <ButtonCustom
        type='text'
        className={`${css.days} ${
          (today && !selected && css.selectDay) ||
          (!today && select && css.selectDay) ||
          (today && select && css.selectDay) ||
          (today && selected && css.today) ||
          undefined
        }`}
        onClick={() => onSelectDate(dayjs(date).format('YYYY/MM/DD'))}
      >
        <div>
          <div className={`${css.dayName} ${date.day() === 0 && css.weekend}`}>{dayName}</div>
          <div className={`${css.dayNum} ${date.day() === 0 && css.weekend}`}>{dayNumber}</div>
        </div>
      </ButtonCustom>
    )
  }

  return (
    <Space direction='vertical' className={'sp100'}>
      {showCurrent && (
        <Row justify='space-between'>
          <Space className={css.currentButt}>
            <ButtonCustom onClick={nowWeek}>Bây giờ</ButtonCustom>
            <ButtonCustom onClick={prevWeek} icon={<AiOutlineLeft />} style={{ height: 40 }}></ButtonCustom>
            <ButtonCustom onClick={nextWeek} icon={<AiOutlineRight />} style={{ height: 40 }}></ButtonCustom>
          </Space>
          {profile.isMentor && buttonAdd}
        </Row>
      )}
      <Space className={css.week}>
        {dateOfWeek.map((d, id) => (
          <Date date={d} selected={selectedDate} onSelectDate={setSelectedDate} key={id} />
        ))}
      </Space>
    </Space>
  )
}

export default CalendarWeek
