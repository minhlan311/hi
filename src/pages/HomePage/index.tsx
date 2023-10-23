import Mentor from '@/pages/HomePage/Mentor'
import Banner from './Banner'
import CourseCalender from './CourseCalender/CourseCalender'
import Gift from './Gift/Gift'
import Intro from './Intro'
import LanguageSystem from './LanguageSystem/LanguageSystem'
import Mission from './Mission'
import News from './News/News'
import TopCourses from './TopCourses'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'

export default function HomePage() {
  return (
    <div className='mtz-homepage'>
      {/* <CountDownTimer
      // timeTillDate='2023-10-23T09:51:35.527Z'
      /> */}
      <Banner />
      <Intro />
      <Mentor />
      <TopCourses />
      <Mission />
      <VideoContent />
      <LanguageSystem />
      <Gift />
      <CourseCalender />
      <News />
    </div>
  )
}
