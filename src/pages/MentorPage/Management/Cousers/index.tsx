/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { Pagination, Row } from 'antd'
import { useContext, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import './index.scss'
import CourseListMentor from './CourseListMentor/CourseListMentor'
import { PaginationProps } from 'antd/lib'
import { useNavigate } from 'react-router-dom'
import PATH from '@/constants/path'
import LoadingCustom from '@/components/LoadingCustom'
import { AppContext } from '@/contexts/app.context'

const MentorCourses = () => {
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [resetFilter, setResetFilter] = useState<boolean>(false)
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
  }

  console.log(data, 'data')

  const resetData = (value: boolean) => {
    setResetFilter(value)
    setTimeout(() => {
      setResetFilter(false)
    }, 200)
  }

  return (
    <div>
      <FilterAction
        limit={10}
        filterQuery={{ mentorId: profile?._id }}
        type='course'
        setLoading={setLoading}
        resetFilter={resetFilter}
        apiFind={courseApi.getCourses}
        callBackData={setData}
        page={current}
        addOnButton={
          <ButtonCustom type='primary' onClick={() => navigate(PATH.MENTOR_COURSES_CREATE)}>
            <Row align='middle'>
              <BiPlus size={22} />
              Thêm khóa học mới
            </Row>
          </ButtonCustom>
        }
      />
      {!loading ? (
        <CourseListMentor data={data} resetDatas={resetData} />
      ) : (
        <LoadingCustom
          style={{
            marginTop: '50px',
          }}
        />
      )}
      <div className='pagination'>
        <Pagination total={data?.totalDocs} current={current} defaultCurrent={1} onChange={onChange} />;
      </div>
    </div>
  )
}

export default MentorCourses
