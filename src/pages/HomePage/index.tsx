import Mentor from '@/pages/HomePage/Mentor'
import Banner from './Banner'
import CourseCalender from './CourseCalender/CourseCalender'
import Gift from './Gift/Gift'
import Intro from './Intro'
import Mission from './Mission'
import News from './News/News'
import TopCourses from './TopCourses'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'
import { useQuery } from '@tanstack/react-query'
import configApi from '@/apis/config.api'
import { useEffect } from 'react'
import { setConfigFromLS } from '@/utils/auth'

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['config'],
    queryFn: () => configApi.getConfig(),
  })

  useEffect(() => {
    if (data) {
      setConfigFromLS(data?.data)
    }
  }, [data?.data])

  return (
    <div className='mtz-homepage'>
      <Banner />
      <Intro />
      <Mentor />
      <TopCourses />
      <Mission />
      <VideoContent />
      {/* <LanguageSystem /> */}
      <div
        style={{
          margin: '60px 0',
        }}
      ></div>
      <Gift />
      <CourseCalender />
      <News />
    </div>
  )
}
