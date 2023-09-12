import Banner from './Banner'
import VideoContent from './VideoContent/VideoContent'
import './styles.scss'

export default function HomePage() {
  return (
    <div className='mtz-homepage'>
      <Banner />
      {/* <Intro />
      <Mentor />
      <TopCourses />
      <Mission /> */}
      <VideoContent />
      {/* <LanguageSystem />
      <Gift />
      <CourseCalender />
      <News />  */}
    </div>
  )
}
