import eventApi from '@/apis/event.api'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { EventObject } from '@/interface/class'
import { useMutation, useQuery } from '@tanstack/react-query'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { Col, Input, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { ISchedule } from 'tui-calendar'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import SelectCustom from '../SelectCustom/SelectCustom'
import EventActionModal from './EventActionModal'
import EventDetailModal from './EventDetailModal'
/* eslint-disable @typescript-eslint/no-explicit-any */

const CalendarCustom = () => {
  const calRef = useRef<any>(null)
  const { profile } = useContext(AppContext)
  const { xl, xxl } = useResponsives()
  const [modalType, setModalType] = useState<string>('')
  const [openModal, setOpenModal] = useState(false)
  const [view, setView] = useState<string>('week')
  const [type, setType] = useState<string>()
  const [events, setEvents] = useState<ISchedule[]>([])
  const [eventId, setEventId] = useState<string | null>(null)

  const { mutate, data } = useMutation({
    mutationFn: (id: string) => eventApi.getOneEvent(id),
  })

  useEffect(() => {
    if (eventId) mutate(eventId)
  }, [eventId])

  const eventData = data?.data

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
    queryKey: ['eventsData', timeSelect, type],
    queryFn: () => {
      return eventApi.getEvent({
        filterQuery: { start: timeSelect?.startDate, end: timeSelect?.endDate, type: type },
        options: { pagination: false },
      })
    },
  })

  useEffect(() => {
    getDate()

    if (eventsData?.data?.totalDocs) {
      const newEvent = eventsData?.data?.docs?.map((item) => {
        const between = moment().isAfter(item.end)

        return {
          id: item._id,
          title: item.testId ? 'Buổi thi ' + item.classData.title : item.classData.title,
          start: item.start,
          end: item.end,
          backgroundColor: (item.testId && '#d72831a8') || (between && '#757575b5') || '#019d44b5',
          color: 'var(--white)',
          isReadOnly: profile._id !== item.classData.createdById,
        }
      })

      setEvents(newEvent as unknown as ISchedule[])
    }
  }, [eventsData])

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

  const [selectTime, setSelectTime] = useState<{ start: Date; end: Date } | null>(null)

  const handleCreateSelect = (e: { start: Date; end: Date }) => {
    setSelectTime({ start: e.start, end: e.end })
    setModalType('event')
    setOpenModal(true)
  }
  console.log(selectTime)

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
            <SelectCustom
              onChange={(e) => {
                setView(e)
                getDate()
              }}
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
            <SelectCustom
              onChange={(e) => {
                setType(e)
                getDate()
              }}
              placeholder='Loại sự kiện'
              options={[
                {
                  value: 'CLASS',
                  label: 'Cuộc họp',
                },
                {
                  value: 'TEST',
                  label: 'Lịch thi',
                },
              ]}
              allowClear
              style={{ width: 115 }}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Input.Search placeholder='Tìm kiếm' />
            {!profile.isMentor ? (
              <></>
            ) : (
              <Space.Compact>
                <ButtonCustom
                  onClick={() => {
                    setOpenModal(true)
                    setModalType('test')
                  }}
                  type='primary'
                >
                  Tạo lịch thi
                </ButtonCustom>
                <ButtonCustom
                  type='primary'
                  onClick={() => {
                    setOpenModal(true)
                    setModalType('event')
                  }}
                >
                  Tạo sự kiện
                </ButtonCustom>
              </Space.Compact>
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
        onSelectDateTime={handleCreateSelect}
        isReadOnly={!profile.isMentor}
      />
      <EventDetailModal open={Boolean(eventId)} setOpen={setEventId} eventDetail={eventData ? eventData : null} />
      <EventActionModal
        open={openModal}
        setOpen={setOpenModal}
        setType={setModalType}
        type={modalType}
        eventDetail={null}
        selectTime={selectTime}
        setSelectTime={setSelectTime}
      />
    </Space>
  )
}

export default CalendarCustom
