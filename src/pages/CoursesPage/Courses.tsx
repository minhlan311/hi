/* eslint-disable @typescript-eslint/no-explicit-any */
import style from './courses.module.scss'
import Detail from './components/Detail/Detail'
// import FixedElement from './components/FixedElement/FixedElement'
import VideoContent from './components/VideoContent/VideoContent'
// import { LayoutGrid } from './components/LayoutGrid/LayoutGrid'
import MenuCourses from './components/MenuCourses/MenuCourses'
import WrapMore from '@/components/WrapMore/WrapMore'
import WrapMoreDetail from './components/WrapMore/WrapMoreDetail'
import Request from './components/Request/Request'
import CommentDetail from './components/Comment/CommentDetail'
import Feedback from './components/Feedback/Feedback'
import { useQuery } from '@tanstack/react-query'
import courseApi from '@/apis/course.api'
import { useParams } from 'react-router-dom'

export default function Courses() {
  const { id } = useParams()

  const { data: dataCourse } = useQuery({
    queryKey: ['products', id],
    queryFn: () => {
      return courseApi.getOneCourse(id!)
    },
  })

  return (
    <>
      {/* Thanh màu đen   */}
      {/* <FixedElement /> */}
      {/* Container box toàn bộ */}
      <div className={style.boxContaier}>
        {/* container bg black  */}
        <div className={style.container}>
          {/* grid 2/1 black */}
          <div className={style.content}>
            {/* cột bên trái */}
            <Detail data={dataCourse?.data} />
            {/* cột bên phải  */}
            <VideoContent data={dataCourse?.data} />
            {/* end cột bên phải  */}
          </div>
          {/* end grid 2/1 */}
        </div>
        {/* end container bg black  */}
        {/* phần trắng bên dưới  */}
        <div className={style.body}>
          <div className={style.col11}>
            {/* <WrapMore
              wrapper='border'
              title='学習内容'
              titleStyle={{ fontWeight: '600', fontSize: '24px', padding: '10px 20px 30px 10px', margin: ' 0' }}
            >
              <LayoutGrid item={items} />
            </WrapMore> */}
            <div className={style.titleText}>Khóa học liên quan</div>
            <WrapMoreDetail>
              <MenuCourses dataCourses={dataCourse as any} />
            </WrapMoreDetail>
            <Request />

            <WrapMore
              padding={0}
              wrapper='nonBorder'
              title='解説'
              titleStyle={{ fontWeight: '600', fontSize: '24px', padding: '20px 20px 10px 0', margin: '0' }}
            >
              {' '}
              <CommentDetail />
            </WrapMore>
            <Feedback />
          </div>
          <div className={style.col22}>
            {/* <Header title='学習内容' titleStyle={{ fontSize: '24px' }}>
              <div></div>
            </Header> */}
          </div>
        </div>
        {/*end phần trắng bên dưới  */}
      </div>
      {/* end container box  */}
    </>
  )
}
