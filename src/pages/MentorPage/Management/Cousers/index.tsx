/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import FilterAction from '@/components/FilterAction'
import PaginationCustom from '@/components/PaginationCustom'
import PATH from '@/constants/path'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { CoursesState } from '@/interface/courses'
import { SuccessResponse } from '@/types/utils.type'
import { Col, Row, Skeleton, Space } from 'antd'
import { useContext, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import CourseCard from './components/CourseCard'

const MentorCourses = () => {
  const [data, setData] = useState<SuccessResponse<CoursesState[]>>()
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)

  const skeletonData = Array.from({ length: 12 }, (_, index) => (
    <Col xs={24} lg={6} xxl={4} key={index}>
      <Skeleton paragraph={{ rows: 6 }} />
    </Col>
  ))

  const { sm } = useResponsives()

  return (
    <Space direction='vertical' className='sp100'>
      <FilterAction
        keyFilter='courseData'
        limit={12}
        filterQuery={{ mentorId: profile?._id }}
        type='course'
        setLoading={setLoading}
        apiFind={courseApi.getCourses}
        callBackData={setData}
        page={current}
        addOnButton={
          <ButtonCustom
            type='primary'
            onClick={() => navigate(PATH.MENTOR_COURSES_CREATE)}
            tooltip={sm ? 'Thêm khóa học mới' : undefined}
          >
            <Row align='middle'>
              <BiPlus size={22} />
              {!sm && 'Thêm khóa học mới'}
            </Row>
          </ButtonCustom>
        }
      />

      <Row gutter={[24, 24]}>
        {loading ? (
          skeletonData
        ) : data?.totalDocs === 0 ? (
          <EmptyCustom description='Không có khóa học nào' />
        ) : (
          data?.docs?.map((item) => (
            <Col span={24} md={8} lg={6} key={item._id}>
              <CourseCard data={item} />
            </Col>
          ))
        )}
      </Row>

      <div className='pagination'>
        <PaginationCustom callbackCurrent={setCurrent} totalData={data?.totalDocs} limit={data?.limit} />
      </div>
    </Space>
  )
}

export default MentorCourses
