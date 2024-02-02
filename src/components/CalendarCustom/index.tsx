import eventApi from '@/apis/event.api'
import { AppContext } from '@/contexts/app.context'
import { debounce } from '@/helpers/common'
import useResponsives from '@/hooks/useResponsives'
import { EventObject } from '@/interface/class'
import { EventSchedule } from '@/interface/event'
import { useMutation, useQuery } from '@tanstack/react-query'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import Calendar from '@toast-ui/react-calendar'
import { Card, Col, Input, Row, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import moment, { Moment } from 'moment-timezone'
import { useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineLeft, AiOutlinePlus, AiOutlineRight } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { PiExam } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import CalendarWeek from '../CalendarWeek'
import DropdownCustom from '../DropdownCustom/DropdownCustom'
import EmptyCustom from '../EmptyCustom/EmptyCustom'
import LoadingCustom from '../LoadingCustom'
import SelectCustom from '../SelectCustom/SelectCustom'
import EventActionModal from './EventActionModal'
import EventDetailModal from './EventDetailModal'
import css from './styles.module.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  calendarType: 'student' | 'mentor'
}

const CalendarCustom = ({ calendarType }: Props) => {
  const location = useLocation()
  const calRef = useRef<any>(null)
  const { profile } = useContext(AppContext)
  const { sm, md, xl, xxl } = useResponsives()
  const [modalType, setModalType] = useState<string>('')
  const [openModal, setOpenModal] = useState(false || Boolean(location?.state?.classId))
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [type, setType] = useState<string>()
  const [events, setEvents] = useState<EventSchedule[]>([])
  const [eventId, setEventId] = useState<string | null>(null)
  const [callBackWeekSelect, setCallBackWeekSelect] = useState<any>()
  const [callBackDateOfWeek, setCallBackDateOfWeek] = useState<Dayjs[]>([])
  const { mutate, data } = useMutation({
    mutationFn: (id: string) => eventApi.getOneEvent(id),
  })

  const searchParams = new URLSearchParams(location.search)
  const classId = searchParams.get('classId')

  useEffect(() => {
    if (eventId) mutate(eventId)
  }, [eventId])

  const eventData = data?.data

  const [timeSelect, setTimeSelect] = useState<{ startDate: Moment; endDate: Moment }>()
  const [search, setSearch] = useState<string>('')

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

  const filter =
    calendarType === 'mentor'
      ? {
          start: timeSelect?.startDate,
          end: timeSelect?.endDate,
          mentorId: profile._id,
          type: type,
          classId: classId ? classId : undefined,
        }
      : {
          start: timeSelect?.startDate,
          end: timeSelect?.endDate,
          students: [profile._id],
          type: type,
          classId: classId ? classId : undefined,
        }

  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['eventsData', timeSelect, type, search],
    queryFn: () => {
      return eventApi.getEvent({
        filterQuery: { ...filter, search },

        options: { pagination: false },
      })
    },
  })

  useEffect(() => {
    if (callBackWeekSelect) {
      setTimeSelect({
        startDate: callBackWeekSelect.start ? callBackWeekSelect.start : moment(callBackWeekSelect).startOf('day'),
        endDate: callBackWeekSelect.end ? callBackWeekSelect.end : moment(callBackWeekSelect).endOf('day'),
      })
    }
  }, [callBackWeekSelect])

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
          backgroundColor:
            (between && '#757575b5') ||
            (item.testId && '#d72831a8') ||
            (item.type === 'OVERTIME' && '#be22be73') ||
            '#019d44b5',
          color: 'var(--white)',
          isReadOnly: profile._id !== item.mentorId,
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
    setTimeout(() => {
      calAction.clearGridSelections()
    }, 300)
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

  const MapData = ({ event }: { event: EventSchedule }) => {
    if (event) {
      const between = dayjs().isAfter(event.end)

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

  const sortedData = events.sort((a, b) => {
    const isPastEnd = (item: any) => dayjs().isAfter(item.end)

    if (isPastEnd(a) && !isPastEnd(b)) {
      return 1
    } else if (!isPastEnd(a) && isPastEnd(b)) {
      return -1
    } else if (a.type === 'TEST' && b.type !== 'TEST') {
      return -1
    } else if (a.type !== 'TEST' && b.type === 'TEST') {
      return 1
    } else {
      return dayjs(a.start).diff(dayjs(b.start))
    }
  })
  // const [datas, setDatas] = useState([
  //   {
  //     id: 'root',
  //     name: 'root',
  //     children: [
  //       { id: '1', name: '1' },
  //       { id: '2', name: '2' },
  //       { id: '3', name: '3' },
  //     ],
  //   },
  //   {
  //     id: 'col1',
  //     name: 'col1',
  //     children: [
  //       { id: '4', name: '4' },
  //       { id: '5', name: '5' },
  //     ],
  //   },
  //   {
  //     id: 'col2',
  //     name: 'col2',
  //     children: [
  //       { id: '6', name: '6' },
  //       { id: '7', name: '7' },
  //       { id: '8', name: '8' },
  //     ],
  //   },
  //   { id: 'col3', name: 'col3', children: [] },
  // ])

  return (
    <Space direction='vertical' className={'sp100'}>
      {/* <DragAndDrop
        data={datas}
        setData={setDatas}
        renderType='card'
        dndType='dnd'
        labelKey='name'
        columnLabelKey='name'
        direction='vertical'
      /> */}

      {sm && md && (
        <Input.Search
          placeholder='Tìm kiếm'
          onChange={debounce((e: any) => setSearch(e.target.value), 500)}
          allowClear
        />
      )}
      {sm ? (
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <CalendarWeek
              callBackWeekSelect={setCallBackWeekSelect}
              callBackDateOfWeek={setCallBackDateOfWeek}
              showCurrent
              buttonAdd={
                <DropdownCustom items={items} trigger='click'>
                  <ButtonCustom type='primary'>
                    Thêm <AiOutlinePlus />
                  </ButtonCustom>
                </DropdownCustom>
              }
            />
          </Col>
          <Col span={24}>
            <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
              {!events.length ? (
                <EmptyCustom description='Không có sự kiện nào!' />
              ) : callBackWeekSelect && typeof callBackWeekSelect === 'string' ? (
                <Space direction='vertical' className={'sp100'}>
                  <b style={{ textTransform: 'capitalize' }}>
                    {dayjs(callBackWeekSelect).locale('vi').format('dddd - DD/MM/YYYY')}
                  </b>
                  {events.filter(
                    (ev) => dayjs(ev.start).format('YYYY/MM/DD') === dayjs(callBackWeekSelect).format('YYYY/MM/DD'),
                  ).length > 0 ? (
                    <Space direction='vertical' className={'sp100'}>
                      {sortedData.map((event) => (
                        <MapData event={event} key={event.id} />
                      ))}
                    </Space>
                  ) : (
                    <EmptyCustom description='Không có sự kiện nào!' />
                  )}
                </Space>
              ) : (
                <Space direction='vertical' className={'sp100'} size='large'>
                  {callBackDateOfWeek.map((d) => (
                    <Space direction='vertical' className={'sp100'}>
                      <b style={{ textTransform: 'capitalize' }} className={`${css.title} sticky`}>
                        {dayjs(d).locale('vi').format('dddd - DD/MM/YYYY')}
                      </b>

                      {events.some((ev) => dayjs(ev.start).format('YYYY/MM/DD') === dayjs(d).format('YYYY/MM/DD')) ? (
                        sortedData.map((event) =>
                          dayjs(event.start).format('YYYY/MM/DD') === dayjs(d).format('YYYY/MM/DD') ? (
                            <MapData event={event} key={event.id} />
                          ) : null,
                        )
                      ) : (
                        <EmptyCustom description='Không có sự kiện nào!' />
                      )}
                    </Space>
                  ))}
                </Space>
              )}
            </LoadingCustom>
          </Col>
        </Row>
      ) : (
        <>
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
                    style={{ height: 40 }}
                    onClick={() => {
                      calAction.prev()
                      getDate()
                    }}
                  ></ButtonCustom>
                  <ButtonCustom
                    icon={<AiOutlineRight />}
                    style={{ height: 40 }}
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
                {!sm && !md && (
                  <Input.Search
                    placeholder='Tìm kiếm'
                    onChange={debounce((e: any) => setSearch(e.target.value), 500)}
                    allowClear
                  />
                )}
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
                <div className={`${css.boxHint} ${css.otEvent}`}></div>
                Học bù
              </Space>
              <Space>
                <div className={`${css.boxHint} ${css.endEvent}`}></div>
                Đã kết thúc
              </Space>
            </Space>
          </Space>
        </>
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
        state={location?.state}
      />
    </Space>
  )
}

export default CalendarCustom
