/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import { Pagination, Row } from 'antd'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import './index.scss'
import CourseListMentor from './CourseListMentor/CourseListMentor'
import { PaginationProps } from 'antd/lib'

const MentorCourses = () => {
  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(1)
  const [resetData, setResetData] = useState<boolean>(false)

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
  }
  const reset = (check: boolean) => {
    setResetData(check)
  }
  return (
    <div>
      <FilterAction
        resetFilter={resetData}
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
      <CourseListMentor data={data?.data?.docs} reset={reset} />
      <div className='pagination'>
        <Pagination current={current} defaultCurrent={1} total={50} onChange={onChange} />;
      </div>
    </div>
  )
}

export default MentorCourses
