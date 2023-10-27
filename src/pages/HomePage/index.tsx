import Banner from './Banner'
import CourseCalender from './CourseCalender/CourseCalender'
import Gift from './Gift/Gift'
import Intro from './Intro'
import LanguageSystem from './LanguageSystem/LanguageSystem'
import Mentor from '@/pages/HomePage/Mentor'
import Mission from './Mission'
import News from './News/News'
import TopCourses from './TopCourses'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'

export default function HomePage() {
  return (
    <div className='mtz-homepage'>
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
