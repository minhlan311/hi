declare module '@toast-ui/react-calendar' {
  import { HTMLAttributes, Component } from 'react'

  import TuiCalendar, { ISchedule, IEvents, IOptions, IWeekOptions } from 'tui-calendar'

  type EventNameMapping = {
    useFormPopup: 'useFormPopup'
    onBeforeCreateEvent: 'beforeCreateEvent'
    onBeforeUpdateEvent: 'beforeUpdateEvent'
    onBeforeDeleteEvent: 'beforeDeleteEvent'
    onAfterRenderEvent: 'afterRenderEvent'
    onClickDayname: 'clickDayname'
    onClickMore: 'clickMore'
    onClickSchedule: 'clickSchedule'
    onClickTimezonesCollapseBtn: 'clickTimezonesCollapseBtn'
  }

  type EventMaps = {
    [K in keyof EventNameMapping]?: IEvents[EventNameMapping[K]]
  }

  type Props = IOptions &
    EventMaps & {
      height: string
      view?: 'year' | 'month' | 'week' | 'day' | string
      events?: ISchedule[]
      week?: IWeekOptions & {
        taskView?: boolean
        eventView?: string[]
      }
    } & HTMLAttributes<HTMLElement>

  export default class Calendar extends Component<Props> {
    public getInstance(): TuiCalendar {
      return super.getInstance() as TuiCalendar
    }

    public getRootElement(): HTMLElement
  }
}
