import eventApi from '@/apis/event.api'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { EventObject } from '@/interface/class'
import { EventSchedule } from '@/interface/event'
import { useMutation, useQuery } from '@tanstack/react-query'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { Col, Input, Row, Space } from 'antd'
import moment, { Moment } from 'moment-timezone'
import { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineLeft, AiOutlinePlus, AiOutlineRight } from 'react-icons/ai'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import DropdownCustom from '../DropdownCustom/DropdownCustom'
import SelectCustom from '../SelectCustom/SelectCustom'
import EventActionModal from './EventActionModal'
import EventDetailModal from './EventDetailModal'
import RenderDateOfWeek from './RenderDateOfWeek'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { PiExam } from 'react-icons/pi'
import css from './styles.module.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  calendarType: 'student' | 'mentor'
}

const CalendarCustom = ({ calendarType }: Props) => {
  const calRef = useRef<any>(null)
  const { profile } = useContext(AppContext)
  const { sm, md, xl, xxl } = useResponsives()
  const [modalType, setModalType] = useState<string>('')
  const [openModal, setOpenModal] = useState(false)
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [type, setType] = useState<string>()
  const [events, setEvents] = useState<EventSchedule[]>([])
  const [eventId, setEventId] = useState<string | null>(null)
  const [callBackWeekSelect, setCallBackWeekSelect] = useState<any>()
  const { mutate, data } = useMutation({
    mutationFn: (id: string) => eventApi.getOneEvent(id),
  })

  useEffect(() => {
    if (eventId) mutate(eventId)
  }, [eventId])

  const eventData = data?.data

  const [timeSelect, setTimeSelect] = useState<{ startDate: Moment; endDate: Moment }>()

  const calAction: any = calRef?.current?.calendarInstance

  const getDate = () => {
    if (calAction) {
      const startDate = calAction.getDateRangeStart()
      const endDate = calAction.getDateRangeEnd()

      setTimeSelect({
        startDate: moment(startDate.d.d).startOf(view),
        endDate: moment(endDate.d.d).endOf(view),
      })
    }
  }

  useEffect(() => {
    if (callBackWeekSelect) {
      setTimeSelect({
        startDate: callBackWeekSelect.start ? callBackWeekSelect.start : moment(callBackWeekSelect).startOf('day'),
        endDate: callBackWeekSelect.end ? callBackWeekSelect.end : moment(callBackWeekSelect).endOf('day'),
      })
    }
  }, [callBackWeekSelect])

  const { data: eventsData } = useQuery({
    queryKey: ['eventsData', callBackWeekSelect, timeSelect],
    queryFn: () => {
      const filter =
        calendarType === 'mentor'
          ? {
              start: timeSelect?.startDate,
              end: timeSelect?.endDate,
              mentorId: profile._id,
              type: type,
            }
          : {
              start: timeSelect?.startDate,
              end: timeSelect?.endDate,
              students: [profile._id],
              type: type,
            }

      return eventApi.getEvent({
        filterQuery: filter,

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
          title: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          backgroundColor: (between && '#757575b5') || (item.testId && '#d72831a8') || '#019d44b5',
          color: 'var(--white)',
          isReadOnly: profile._id !== item.classData.createdById,
          type: item.type,
        }
      })

      setEvents(newEvent as unknown as EventSchedule[])
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
          dayNames: sm
            ? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
            : ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
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

  const items = [
    {
      label: (
        <ButtonCustom
          onClick={() => {
            setOpenModal(true)
            setModalType('event')
          }}
          type='link'
          size='small'
        >
          Tạo cuộc họp
        </ButtonCustom>
      ),
      key: 'class',
      icon: <HiOutlineUserGroup size={20} />,
    },
    {
      label: (
        <ButtonCustom
          onClick={() => {
            setOpenModal(true)
            setModalType('test')
          }}
          type='link'
          size='small'
        >
          Tạo lịch thi
        </ButtonCustom>
      ),

      key: 'test',
      icon: <PiExam size={20} />,
    },
  ]

  return (
    <Space direction='vertical' className={'sp100'}>
      {sm && md && <Input.Search placeholder='Tìm kiếm' />}
      <Row justify='space-between' gutter={[12, 12]}>
        {!sm && (
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
              {!md && (
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
              )}
            </Space>
          </Col>
        )}
        <Col>
          <Space>
            {!sm && !md && <Input.Search placeholder='Tìm kiếm' />}
            {!profile.isMentor ? null : !md ? (
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
                  Tạo cuộc họp
                </ButtonCustom>
              </Space.Compact>
            ) : (
              <>
                {!sm && (
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
                )}
                {!sm && (
                  <DropdownCustom items={items} trigger='click'>
                    <ButtonCustom type='primary'>
                      Thêm <AiOutlinePlus />
                    </ButtonCustom>
                  </DropdownCustom>
                )}
              </>
            )}
          </Space>
        </Col>
      </Row>
      {sm ? (
        <RenderDateOfWeek
          events={events}
          selectDate={callBackWeekSelect}
          setCallBackWeekSelect={setCallBackWeekSelect}
          setEventId={setEventId}
          buttonAdd={
            <DropdownCustom items={items} trigger='click'>
              <ButtonCustom type='primary'>
                Thêm <AiOutlinePlus />
              </ButtonCustom>
            </DropdownCustom>
          }
        />
      ) : (
        <Space direction='vertical' className={'sp100'}>
          <Calendar
            ref={calRef}
            height={(xl && '66vh') || (xxl && '74vh') || '20vh'}
            events={events as unknown as any[]}
            view={view}
            week={{
              showTimezoneCollapseButton: true,
              timezonesCollapsed: true,
              taskView: false,
              workweek: false,
              eventView: ['time'],
            }}
            usageStatistics={false}
            disableDblClick={false}
            onClickEvent={(e: { event: EventObject }) => setEventId(e.event.id ? e.event.id : null)}
            onSelectDateTime={handleCreateSelect}
            isReadOnly={!profile.isMentor}
          />
          <Space className={css.hint}>
            <i>* Chú thích:</i>
            <Space>
              <div className={`${css.boxHint} ${css.classEvent}`}></div>
              Lịch học
            </Space>
            <Space>
              <div className={`${css.boxHint} ${css.testEvent}`}></div>
              Lịch thi
            </Space>
            <Space>
              <div className={`${css.boxHint} ${css.endEvnet}`}></div>
              Đã kết thúc
            </Space>
          </Space>
        </Space>
      )}
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
