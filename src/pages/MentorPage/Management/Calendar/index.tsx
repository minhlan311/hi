/* eslint-disable @typescript-eslint/no-explicit-any */
import CalendarCustom from '@/components/CalendarCustom'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import { Col, Input, Row, Space } from 'antd'

const MentorCalendar = () => {
  // const [selectedDate, setSelectedDate] = useState()
  // const [date, setDate] = useState(new Date())
  // const [openModal, setOpenModal] = useState(false)
  // const [form] = Form.useForm()

  // const handleSubmit = () => {
  //   setOpenModal(!openModal)
  //   form.submit()
  // }

  // const handleFinish = (values: any) => {
  //   console.log(values)
  // }
  // console.log(selectedDate)

  // useEffect(() => {
  //   if (selectedDate) {
  //     setOpenModal(true)
  //     form.setFieldsValue({ time: moment(selectedDate), date: moment(selectedDate) })
  //   }

  //   if (!selectedDate) {
  //     form.setFieldsValue({ time: moment(date), date: moment(date) })
  //   }
  // }, [selectedDate])
  // const [disabledDates, setDisabledDates] = useState([new Date(2023, 9, 21), new Date(2023, 9, 22)])
  // const [selectedDates, setSelectedDates] = useState([new Date(2023, 9, 23), new Date(2023, 9, 24)])
  // const [events, setEvents] = useState([
  //   {
  //     date: new Date('20-09-2023'),
  //     title: 'Sự kiện 1',
  //   },
  //   {
  //     date: new Date('21-09-2023'),
  //     title: 'Sự kiện 2',
  //   },
  // ])

  return <CalendarCustom />
}

export default MentorCalendar
