import Mentor from '@/components/layout/Mentor'
import Banner from './Banner'
import Intro from './Intro'
import './styles.scss'
import TopCourses from './TopCourses'
import Mission from './Mission'

export default function HomePage() {
  return (
    <div className='mtz-homepage'>
      <Banner />
      <Intro />
      <Mentor />
      <TopCourses />
      <Mission />
      {/* <VideoContent />
      <LanguageSystem />
      <Gift />
      <CourseCalender />
      <News /> */}
    </div>
  )
}
