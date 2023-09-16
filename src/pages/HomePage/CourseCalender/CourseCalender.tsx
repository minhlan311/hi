import { Button } from 'antd'
import { useQuery } from '@tanstack/react-query'
import './CourseCalender.scss'
import engSVG from '../../../assets/icons/eng_flag.svg'
import germanySVG from '../../../assets/icons/germany_flag.svg'
import japanSVG from '../../../assets/icons/japan_flag.svg'
import koreaSVG from '../../../assets/icons/korea_flag.svg'
import chinaSVG from '../../../assets/icons/china_flag.svg'
import { useState } from 'react'
import ListCourse from './components/ListCourse'
import categoryApi from '@/apis/categories.api'
import courseApi from '@/apis/course.api'
export default function CourseCalender() {
  const [active, setActive] = useState('')
  const [id, setId] = useState<string>('')

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af'
      })
    }
  })

  const ArraySubject = categoriesData?.data?.docs

  const { data: listData, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => {
      return courseApi.getCourses({
        filterQuery: {
          categoryId: id || (categoriesData?.data?.docs && categoriesData?.data?.docs[0]?.id)
        }
      })
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
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
          {ArraySubject?.map((item) => (
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
