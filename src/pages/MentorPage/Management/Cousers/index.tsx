import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { Row } from 'antd'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import CourseListMentor from './CourseListMentor/CourseListMentor'

/* eslint-disable @typescript-eslint/no-explicit-any */
const MentorCourses = () => {
  const [data, setData] = useState<any[]>([])
  console.log(data)

  return (
    <div>
      <FilterAction
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
      <CourseListMentor />
    </div>
  )
}

export default MentorCourses
