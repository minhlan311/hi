import Mentor from '@/pages/HomePage/Mentor'
import Banner from './Banner'
import Gift from './Gift/Gift'
import LanguageSystem from './LanguageSystem/LanguageSystem'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'
import TopCourses from './TopCourses'
import Mission from './Mission'
import Intro from './Intro'
import CourseCalender from './CourseCalender/CourseCalender'
import News from './News/News'

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
