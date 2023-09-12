// import React, { useCallback, useEffect, useState } from 'react'
// import { Button } from 'antd'
import { useQuery } from '@tanstack/react-query'
import './CourseCalender.scss'
// import engSVG from '../../../assets/icons/eng_flag.svg'
// import germanySVG from '../../../assets/icons/germany_flag.svg'
// import japanSVG from '../../../assets/icons/japan_flag.svg'
// import koreaSVG from '../../../assets/icons/korea_flag.svg'
// import chinaSVG from '../../../assets/icons/china_flag.svg'

import ListCourse from './components/ListCourse'
import categoryApi from '@/apis/categories.api'
export default function CourseCalender() {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  console.log(categoriesData, 'categoriesDatacategoriesDatacategoriesData')
  //   const [active, setActive] = useState('Tiếng Anh')

  return (
    <div className='courseCalender-container'>
      <div className='container-1200px'>
        <p className='text-xs'>ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
        <h3>Lịch khai giảng khóa học online</h3>
        <div className='groupButton'>
          {/* {ArraySubject.map((item) => (
            <Button
              disabled={dataCourse.status === 'loading' ? true : false}
              className={active === item.name ? 'buttonActive' : 'button'}
              onClick={() => {
                handleActive(item.name, item.id)
              }}
              key={item.name}
            >
              {item.name === 'Tiếng Anh' ? (
                <img src={engSVG} alt='' />
              ) : item.name === 'Tiếng Nhật' ? (
                <img src={japanSVG} alt='' />
              ) : item.name === 'Tiếng Đức' ? (
                <img src={germanySVG} alt='' />
              ) : item.name === 'Tiếng Hàn' ? (
                <img src={koreaSVG} alt='' />
              ) : (
                <img src={chinaSVG} alt='' />
              )}
              {item.name}
            </Button>
          ))} */}
        </div>
        <ListCourse />
      </div>
    </div>
  )
}
