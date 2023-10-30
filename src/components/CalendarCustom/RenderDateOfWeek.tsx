/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventSchedule } from '@/interface/event'
import { Card, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import CalendarWeek from '../CalendarWeek'
import EmptyCustom from '../EmptyCustom/EmptyCustom'

type Props = {
  events: EventSchedule[]
  buttonAdd?: React.ReactNode
  selectDate: any
  setCallBackWeekSelect: React.Dispatch<React.SetStateAction<any>>
  setEventId: React.Dispatch<React.SetStateAction<string | null>>
}

const RenderDateOfWeek = (props: Props) => {
  const { events, buttonAdd, selectDate, setCallBackWeekSelect, setEventId } = props
  const [dateOfWeek, setDateOfWeek] = useState<Dayjs[]>([])

  const MapData = ({ event, date }: { event: EventSchedule; date: any }) => {
    if (event) {
      const between = dayjs().isAfter(event.end)
      console.log(date)

      return (
        <div>
          <Card
            size='small'
            hoverable
            onClick={() => setEventId(event.id as unknown as string)}
            style={{
              backgroundColor: between ? '#7575751a' : (event.type === 'TEST' && '#d7283133') || '#019d4429',
              color: 'var(--light-gray-3)',
              textDecorationLine: between ? 'line-through' : undefined,
            }}
          >
            <h4>{event.title}</h4>
            <Space
              style={{
                color: 'var(--light-gray-2)',
                textDecorationLine: between ? 'line-through' : undefined,
              }}
            >
              <AiOutlineClockCircle size='18' style={{ marginTop: 5 }} />
              <div>{dayjs(event.start).format('HH:mmA') + ' - ' + dayjs(event.end).format('HH:mmA')}</div>
            </Space>
          </Card>
        </div>
      )
    }
  }

  return (
    <Space direction='vertical' size='large' className='sp100'>
      <CalendarWeek
        callBackWeekSelect={setCallBackWeekSelect}
        callBackDateOfWeek={setDateOfWeek}
        showCurrent
        buttonAdd={buttonAdd}
      />
      {!events.length && !selectDate ? (
        <EmptyCustom description='Không có sự kiện nào!' />
      ) : selectDate && !selectDate?.start ? (
        <Space direction='vertical' className='sp100'>
          <b style={{ textTransform: 'capitalize' }}>{dayjs(selectDate).locale('vi').format('dddd - DD/MM/YYYY')}</b>
          {events.filter((ev) => dayjs(ev.start).format('YYYY/MM/DD') === dayjs(selectDate).format('YYYY/MM/DD'))
            .length > 0 ? (
            <Space direction='vertical' className='sp100'>
              {events.map((event) => (
                <MapData event={event} date={selectDate} key={event.id} />
              ))}
            </Space>
          ) : (
            <EmptyCustom description='Không có sự kiện nào!' />
          )}
        </Space>
      ) : (
        dateOfWeek.map((d) => (
          <Space direction='vertical' className='sp100'>
            <b style={{ textTransform: 'capitalize' }}>{dayjs(d).locale('vi').format('dddd - DD/MM/YYYY')}</b>
            {events.filter((ev) => dayjs(ev.start).format('YYYY/MM/DD') === dayjs(d).format('YYYY/MM/DD')).length >
            0 ? (
              <Space direction='vertical' className='sp100'>
                {events.map((event) => (
                  <MapData event={event} date={selectDate} key={event.id} />
                ))}
              </Space>
            ) : (
              <EmptyCustom description='Không có sự kiện nào!' />
            )}
          </Space>
        ))
      )}
    </Space>
  )
}

export default RenderDateOfWeek
