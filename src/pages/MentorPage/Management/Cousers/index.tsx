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
import { AppContext } from '@/contexts/app.context'

const MentorCourses = () => {
  const [data, setData] = useState<any>([])
  const { profile } = useContext(AppContext)
  const [current, setCurrent] = useState(1)
  const navigate = useNavigate()

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
  }

  console.log(data, '===========')

  return (
    <div>
      <FilterAction
        apiFind={courseApi.getCourses({
          filterQuery: {
            mentorId: profile?._id,
          },
        })}
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
      <CourseListMentor data={data} />
      <div className='pagination'>
        <Pagination current={current} defaultCurrent={1} onChange={onChange} />;
      </div>
    </div>
  )
}

export default MentorCourses
