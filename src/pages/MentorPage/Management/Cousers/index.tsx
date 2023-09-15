import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { Pagination, Row } from 'antd'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import './index.scss'
import CourseListMentor from './CourseListMentor/CourseListMentor'
import { PaginationProps } from 'antd/lib'

/* eslint-disable @typescript-eslint/no-explicit-any */
const MentorCourses = () => {
  const [data, setData] = useState<any[]>([])
  const [current, setCurrent] = useState(1)

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
  }

  return (
    <div>
      <FilterAction
        page={current}
        addOnButton={
          <ButtonCustom
            type='primary'
            //  onClick={onPressCreate}
          >
            <Row align='middle'>
              <BiPlus size={22} />
              Thêm khóa học mới
            </Row>
          </ButtonCustom>
        }
        apiFind={courseApi.getCourses}
        callBackData={setData}
      />
      <CourseListMentor data={data?.data?.docs} />
      <div className='pagination'>
        <Pagination current={current} defaultCurrent={1} total={50} onChange={onChange} />;
      </div>
    </div>
  )
}

export default MentorCourses
