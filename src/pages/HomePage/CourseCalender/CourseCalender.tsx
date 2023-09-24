/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'antd'
import { useState } from 'react'
import chinaSVG from '../../../assets/icons/china_flag.svg'
import engSVG from '../../../assets/icons/eng_flag.svg'
import germanySVG from '../../../assets/icons/germany_flag.svg'
import japanSVG from '../../../assets/icons/japan_flag.svg'
import koreaSVG from '../../../assets/icons/korea_flag.svg'
import './CourseCalender.scss'
import ListCourse from './components/ListCourse'

export default function CourseCalender() {
  const queryClient = useQueryClient()
  const categoriesData = queryClient.getQueryData<any>(['categories'])
  const [active, setActive] = useState('')
  const [id, setId] = useState<string>('')

  const ArraySubject = categoriesData?.data?.docs

  const { data: listData, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => {
      return courseApi.getCourses({
        filterQuery: {
          categoryId: id || (categoriesData?.data?.docs && categoriesData?.data?.docs[0]?.id),
        },
        option: {
          limit: 6,
        },
      })
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  })
  console.log(isLoading)

  const handleActive = (name: string, id: string) => {
    setActive(name)
    setId(id)
  }

  return (
    <div className='courseCalender-container'>
      <div className='container-1200px'>
        <p className='text-xs'>ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
        <h3>Lịch khai giảng khóa học online</h3>
        <div className='groupButton'>
          {ArraySubject?.map((item: any) => (
            <Button
              disabled={isLoading}
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
          ))}
        </div>
        <ListCourse listData={listData?.data?.docs} />
      </div>
    </div>
  )
}
