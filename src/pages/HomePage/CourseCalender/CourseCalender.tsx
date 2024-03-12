/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import courseApi from '@/apis/course.api'
import CourseCard from '@/components/CourseCard'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { CategoryState } from '@/interface/category'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Row, Skeleton } from 'antd'
import { useState } from 'react'
import chinaSVG from '../../../assets/icons/china_flag.svg'
import engSVG from '../../../assets/icons/eng_flag.svg'
import germanySVG from '../../../assets/icons/germany_flag.svg'
import japanSVG from '../../../assets/icons/japan_flag.svg'
import koreaSVG from '../../../assets/icons/korea_flag.svg'
import './CourseCalender.scss'

export default function CourseCalender() {
  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parent: null })
    },
  })
  const [active, setActive] = useState('Tiếng Anh')
  const [id, setId] = useState<string>()

  const courses = categoriesData?.data?.docs?.find((item: CategoryState) => item.name === 'Khóa học')

  const { lg, sm } = useResponsives()

  const { data: listData, isLoading } = useQuery({
    queryKey: ['course', id, categoriesData],
    queryFn: () => {
      return courseApi.getCourses({
        filterQuery: {
          categoryId: id ? id : courses?.children[0]?._id,
        },
        options: {
          limit: (sm && 5) || (lg && 6) || 8,
          sort: { createdAt: -1 },
        },
      })
    },
  })

  const handleActive = (name: string, id: string) => {
    setActive(name)
    setId(id)
  }

  const numberOfDivs = 6

  const divs = Array.from({ length: numberOfDivs }, (_, index) => (
    <Col span={24} md={6} key={index}>
      <Skeleton paragraph={{ rows: 8 }} />
    </Col>
  ))

  return (
    <Header desc='Lịch khai giảng khóa học online' title='ĐÀO TẠO NHIỀU NGÔN NGỮ'>
      <div className='groupButton'>
        {courses?.children &&
          courses?.children?.map((item: any) => (
            <Button
              disabled={isLoading}
              className={active === item.name ? 'buttonActive' : 'button'}
              onClick={() => {
                handleActive(item.name, item.id)
              }}
              key={item.name}
            >
              {item.name === 'Tiếng Anh' ? (
                <img src={engSVG} alt='Tiếng Anh' />
              ) : item.name === 'Tiếng Nhật' ? (
                <img src={japanSVG} alt='Tiếng Nhật' />
              ) : item.name === 'Tiếng Đức' ? (
                <img src={germanySVG} alt='Tiếng Đức' />
              ) : item.name === 'Tiếng Hàn' ? (
                <img src={koreaSVG} alt='Tiếng Hàn' />
              ) : (
                <img src={chinaSVG} alt='Tieengs chung' />
              )}
              {item.name}
            </Button>
          ))}
      </div>

      <Row justify='center' gutter={[12, 12]}>
        {isLoading
          ? divs
          : listData?.data?.docs?.map((item) => (
              <Col span={24} md={12} lg={8} xl={6} key={item._id}>
                <CourseCard item={item} />
              </Col>
            ))}
      </Row>
    </Header>
  )
}
