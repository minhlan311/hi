/* eslint-disable @typescript-eslint/no-explicit-any */
import style from './courses.module.scss'
import Detail from './components/Detail/Detail'

import { useContext } from 'react'
// import FixedElement from './components/FixedElement/FixedElement'
import VideoContent from './components/VideoContent/VideoContent'
// import { LayoutGrid } from './components/LayoutGrid/LayoutGrid'
import MenuCourses from './components/MenuCourses/MenuCourses'
import WrapMoreDetail from './components/WrapMore/WrapMoreDetail'
import CommentDetail from './components/Comment/CommentDetail'
import Feedback from './components/Feedback/Feedback'
import { useQuery } from '@tanstack/react-query'
import courseApi from '@/apis/course.api'
import { useParams } from 'react-router-dom'
import { AppContext } from '@/contexts/app.context'
import enrollsApi from '@/apis/enrolls.api'
import useResponsives from '@/hooks/useResponsives'
import { Col, Row } from 'antd'

export default function Courses() {
  const { id } = useParams()
  const { profile } = useContext(AppContext)

  const { data: dataCourse } = useQuery({
    queryKey: ['products', id],
    queryFn: () => {
      return courseApi.getOneCourse(id!)
    },
  })

  const { data: checkEnrolls } = useQuery({
    queryKey: ['enrolls', id],
    queryFn: () => {
      return enrollsApi.getEnroll({
        filterQuery: {
          userId: profile._id,
          targetId: id,
          targetModel: 'COURSE',
        },
      })
    },
  })
  const { lg } = useResponsives()

  console.log(checkEnrolls, 'checkEnrollscheckEnrolls')

  return (
    <>
      {/* Thanh màu đen   */}
      {/* <FixedElement /> */}
      {/* Container box toàn bộ */}
      <div className={style.boxContaier}>
        {/* container bg black  */}
        <div className={style.container}>
          {/* grid 2/1 black */}
          <Row className={style.content}>
            {/* cột bên trái */}
            <Col xs={24} xl={18}>
              <Detail data={dataCourse?.data} />
            </Col>
            {/* cột bên phải  */}
            {!lg ? (
              <Col xl={6}>
                <VideoContent data={dataCourse?.data} checkEnrolls={checkEnrolls} />{' '}
              </Col>
            ) : (
              ''
            )}
            {/* end cột bên phải  */}
          </Row>
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
            <div
              style={{
                margin: '40px 10px',
              }}
            >
              <div className={style.titleText}>Khóa học liên quan</div>
              <WrapMoreDetail>
                <MenuCourses dataCourses={dataCourse as any} />
              </WrapMoreDetail>
            </div>

            <WrapMoreDetail>
              <CommentDetail data={dataCourse?.data as any} />
            </WrapMoreDetail>
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
