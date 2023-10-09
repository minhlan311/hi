import eventApi from '@/apis/event.api'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { EventObject } from '@/interface/class'
import { useQuery } from '@tanstack/react-query'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { Col, Input, Row, Select, Space } from 'antd'
import moment from 'moment-timezone'
import { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { ISchedule } from 'tui-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import EventActionModal from './EventActionModal'
import EventDetailModal from './EventDetailModal'
/* eslint-disable @typescript-eslint/no-explicit-any */

const CalendarCustom = () => {
  const calRef = useRef<any>(null)
  const { profile } = useContext(AppContext)
  const { xl, xxl } = useResponsives()
  const [openModal, setOpenModal] = useState(false)
  const [view, setView] = useState<string>('week')
  const [events, setEvents] = useState<ISchedule[]>([])
  const [eventId, setEventId] = useState<string | null>(null)

  const { data: eventDetail } = useQuery({
    queryKey: ['eventsDetail', eventId],
    queryFn: () => {
      if (eventId) return eventApi.getOneEvent(eventId)
    },
  })
  const eventData = eventDetail?.data

  const [timeSelect, setTimeSelect] = useState<{ startDate: string; endDate: string }>()

  const calAction: any = calRef?.current?.calendarInstance

  const getDate = () => {
    if (calAction) {
      const startDate = calAction.getDateRangeStart()
      const endDate = calAction.getDateRangeEnd()
      setTimeSelect({
        startDate: moment(startDate.d.d).format('YYYY-MM-DD'),
        endDate: moment(endDate.d.d).format('YYYY-MM-DD'),
      })
    }
  }

  const { data: eventsData } = useQuery({
    queryKey: ['eventsData', timeSelect],
    queryFn: () => {
      return eventApi.getEvent({
        filterQuery: { start: timeSelect?.startDate, end: timeSelect?.endDate },
        options: { pagination: false },
      })
    },
  })
  useEffect(() => {
    getDate()

    if (eventsData?.data?.totalDocs) {
      const newEvent = eventsData?.data?.docs?.map((item) => {
        const currentTime = moment()
        const startTime = moment(item.start)
        const endTime = moment(item.end)
        const between = currentTime.isBetween(startTime, endTime)
        const endClass = currentTime.isAfter(endTime)

        return {
          id: item._id,
          title: item.classData.title,
          body: item.classData.description,
          calendarId: item.classData.courseId,
          start: item.start,
          end: item.end,
          backgroundColor: '#019d44b5',
          color: 'var(--white)',
          location: 'Class online',
          category: 'time',
          attendees: [`Giảng viên: ${item.classData.owner.fullName}`, `Học viên: ${item.classData.students.length}`],
          isReadOnly: profile._id !== item.classData.createdById,
          isPrivate: true,
          recurrenceRule: between ? '1' : '',
          dueDateClass: endClass ? '1' : '',
        }
      })

      setEvents(newEvent as unknown as ISchedule[])
    }
  }, [eventsData, status])

  useEffect(() => {
    if (calAction) {
      calAction.setTheme({
        common: {
          holiday: {
            color: 'var(--red)',
          },
        },
      })
      calAction.setOptions({
        week: {
          dayNames: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        },
        month: {
          dayNames: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        },
      })
    }
  }, [calAction])

  return (
    <Space direction='vertical' className='sp100'>
      <Row justify='space-between'>
        <Col span={10}>
          <Space>
            <ButtonCustom
              onClick={() => {
                calAction.today()
                getDate()
              }}
            >
              Hôm nay
            </ButtonCustom>
            <ButtonCustom
              icon={<AiOutlineLeft />}
              onClick={() => {
                calAction.prev()
                getDate()
              }}
            ></ButtonCustom>
            <ButtonCustom
              icon={<AiOutlineRight />}
              onClick={() => {
                calAction.next()
                getDate()
              }}
            ></ButtonCustom>
            <Select
              onChange={(e) => setView(e)}
              defaultValue='week'
              options={[
                {
                  value: 'day',
                  label: 'Ngày',
                },
                {
                  value: 'week',
                  label: 'Tuần',
                },
                {
                  value: 'month',
                  label: 'Tháng',
                },
              ]}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Input.Search placeholder='Tìm kiếm' />
            {!profile.isMentor ? (
              <></>
            ) : (
              <ButtonCustom type='primary' onClick={() => setOpenModal(true)}>
                Tạo cuộc họp
              </ButtonCustom>
            )}
          </Space>
        </Col>
      </Row>
      <Calendar
        ref={calRef}
        height={(xl && '67vh') || (xxl && '75vh') || '80vh'}
        events={events}
        view={view}
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
          {
            id: '1',
            name: 'Company',
            bgColor: '#00a9ff',
            borderColor: '#00a9ff',
          },
        ]}
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
          taskView: false,
          eventView: ['time'],
        }}
        usageStatistics={false}
        disableDblClick={false}
        onClickEvent={(e: { event: EventObject }) => setEventId(e.event.id ? e.event.id : null)}
        // onSelectDateTime={(e) => console.log(e)}
        isReadOnly={!profile.isMentor}
      />
      <EventDetailModal
        open={Boolean(eventId)}
        setOpen={setEventId}
        eventDetail={eventData ? eventData : null}
        setOpenModal={setOpenModal}
      />
      <EventActionModal open={openModal} setOpen={setOpenModal} eventDetail={eventData ? eventData : null} />
    </Space>
  )
}

export default CalendarCustom
