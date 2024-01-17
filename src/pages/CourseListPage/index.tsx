import courseApi from '@/apis/course.api'
import CourseCard from '@/components/CourseCard'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { CoursesState } from '@/interface/courses'
import { SuccessResponse } from '@/types/utils.type'
import { Col, Row } from 'antd'
import { useState } from 'react'

const CourseListPage = () => {
  const [current, setCurrent] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<SuccessResponse<CoursesState[]>>()
  const { sm, md } = useResponsives()

  return (
    <Header padding={'24px 0 50px'} title='Danh sách khóa học' titleSize={35}>
      <FilterAction
        keyFilter='course'
        limit={(sm && 10) || (md && 9) || 12}
        type='course'
        setLoading={setLoading}
        apiFind={courseApi.getCourses}
        callBackData={setCourses}
        page={current}
      />
      <LoadingCustom loading={loading}>
        {courses && courses.totalDocs > 0 ? (
          <Row gutter={[24, 24]}>
            {courses.docs?.map((item) => (
              <Col span={24} md={8} lg={6} key={item._id}>
                <CourseCard item={item} />
              </Col>
            ))}
          </Row>
        ) : (
          <EmptyCustom description='Không có khóa học nào'></EmptyCustom>
        )}
      </LoadingCustom>

      <div className='pagination'>
        <PaginationCustom limit={courses?.limit} totalData={courses?.totalDocs} callbackCurrent={setCurrent} />
      </div>
    </Header>
  )
}

export default CourseListPage
