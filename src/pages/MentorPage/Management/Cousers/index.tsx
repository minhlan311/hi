/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { Col, Divider, Pagination, Row, Skeleton } from 'antd'
import { useContext, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import './index.scss'
import CourseListMentor from './CourseListMentor/CourseListMentor'
import { PaginationProps } from 'antd/lib'
import { useNavigate } from 'react-router-dom'
import PATH from '@/constants/path'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'

const MentorCourses = () => {
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
  }

  const numberOfDivs = 12

  const divs = Array.from({ length: numberOfDivs }, (_, index) => (
    <Col xs={24} lg={6} xxl={4} key={index}>
      <Skeleton paragraph={{ rows: 6 }} />
    </Col>
  ))

  const { sm } = useResponsives()

  return (
    <div>
      <FilterAction
        keyFilter='course'
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

      {!loading ? (
        data && data.docs?.length === 0 ? (
          <EmptyCustom
            style={{
              marginTop: '50px',
            }}
          />
        ) : (
          <CourseListMentor data={data} />
        )
      ) : (
        <Row className='div-row-container' gutter={[16, 32]}>
          {divs}
        </Row>
      )}
      <Divider />
      {data && data?.totalDocs > 0 && (
        <div className='pagination'>
          <Pagination total={data?.totalDocs} current={current} defaultCurrent={1} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

export default MentorCourses
