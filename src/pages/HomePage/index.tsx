import configApi from '@/apis/config.api'
import { AppContext } from '@/contexts/app.context'
import Mentor from '@/pages/HomePage/Mentor'
import { setConfigFromLS } from '@/utils/auth'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef } from 'react'
import Banner from './Banner'
import ContactForm from './ContactForm'
import CourseCalender from './CourseCalender/CourseCalender'
import Gift from './Gift/Gift'
import Intro from './Intro'
import Mission from './Mission'
import News from './News'
import TopCourses from './TopCourses'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'

export default function HomePage() {
  const { setConfigs } = useContext(AppContext)

  const { data } = useQuery({
    queryKey: ['config'],
    queryFn: () => configApi.getConfig(),
  })

  useEffect(() => {
    if (data) {
      setConfigFromLS(data?.data)
      setConfigs(data.data)
    }
  }, [data])

  const scrollRef = useRef<null | HTMLDivElement>(null)

  const scrollRefFc = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='mtz-homepage'>
      <Banner />
      <Intro />
      <Mentor />
      <TopCourses />
      <Mission />
      <VideoContent scrollRefFc={scrollRefFc} />
      <div
        style={{
          margin: '60px 0',
        }}
      ></div>
      <Gift />
      <CourseCalender />
      <News />
      <div ref={scrollRef} style={{ marginBottom: 24 }}>
        {' '}
      </div>
      <ContactForm />
    </div>
  )
}
