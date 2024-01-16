/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import calenderSVG from '@/assets/icons/calendar.svg'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import { formatDate, formatPriceVND } from '@/helpers/common'
import { CategoryState } from '@/interface/category'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Card, Col, Row, Skeleton, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import chinaSVG from '../../../assets/icons/china_flag.svg'
import engSVG from '../../../assets/icons/eng_flag.svg'
import germanySVG from '../../../assets/icons/germany_flag.svg'
import japanSVG from '../../../assets/icons/japan_flag.svg'
import koreaSVG from '../../../assets/icons/korea_flag.svg'
import './CourseCalender.scss'

export default function CourseCalender() {
  const queryClient = useQueryClient()
  const categoriesData = queryClient.getQueryData<any>(['categoriesList'])
  const [active, setActive] = useState('Tiếng Anh')
  const [id, setId] = useState<string>()

  const courses = categoriesData?.data?.docs?.find((item: CategoryState) => item.name === 'Khóa học')

  const { data: listData, isLoading } = useQuery({
    queryKey: ['course', id, categoriesData],
    queryFn: () => {
      return courseApi.getCourses({
        filterQuery: {
          categoryId: id ? id : courses?.children[0]?._id,
        },
        options: {
          limit: 6,
          sort: { createdAt: -1 },
        },
      })
    },
  })
  const navigate = useNavigate()

  const handleActive = (name: string, id: string) => {
    setActive(name)
    setId(id)
  }

  const handleClickCourse = (id: string) => {
    navigate({
      pathname: `/courses/` + id,
    })
  }

  const numberOfDivs = 6

  const divs = Array.from({ length: numberOfDivs }, (_, index) => (
    <Col xs={24} lg={6} xxl={8} key={index}>
      <Skeleton paragraph={{ rows: 6 }} />
    </Col>
  ))

  return (
    <div className='courseCalender-container'>
      <div className='container-1200px'>
        <p className='text-xs'>ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
        <h3>Lịch khai giảng khóa học online</h3>
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

        <Row justify={'center'} gutter={{ xs: 0, sm: 0, md: 24, lg: 32 }}>
          {isLoading
            ? divs
            : listData?.data?.docs?.map((item) => (
                <Col className='col'>
                  <Card
                    hoverable
                    style={{ width: 340, height: 410 }}
                    cover={
                      <ImageCustom
                        onClick={() => handleClickCourse(item._id!)}
                        preview={false}
                        height='160px'
                        width='100%'
                        src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverMedia}
                      />
                    }
                  >
                    <Meta
                      description={
                        <>
                          <TextWithTooltip
                            rows={1}
                            children={item?.name}
                            onClick={() => handleClickCourse(item._id!)}
                            className='link-h4-config'
                          />
                          {item?.class?.slice(0, 2).map((item, index) => (
                            <div key={index} className='flex'>
                              <img src={calenderSVG} className='icons' alt='' />
                              <TextWithTooltip
                                rows={1}
                                children={
                                  <>
                                    {item?.startDate ? (
                                      <>
                                        Khai giảng {''}
                                        {formatDate(item?.startDate)}
                                      </>
                                    ) : (
                                      'Đang cập nhật'
                                    )}
                                  </>
                                }
                                className='text-date'
                              />
                            </div>
                          ))}

                          {item?.class && item?.class?.length > 2 && (
                            <Tooltip
                              color='white'
                              title={
                                <>
                                  {item?.class && item?.class?.length > 0 && (
                                    <h3
                                      style={{
                                        color: 'black',
                                      }}
                                    >
                                      Tất cả lịch khải giảng
                                    </h3>
                                  )}
                                  {item?.class && item?.class?.length > 0
                                    ? item?.class?.map((item, index) => (
                                        <div key={index} className='flex'>
                                          <img src={calenderSVG} className='icons' alt='' />
                                          <TextWithTooltip
                                            rows={1}
                                            children={
                                              <div>
                                                {item?.startDate ? (
                                                  <>
                                                    Khai giảng {''}
                                                    {formatDate(item?.startDate)}
                                                  </>
                                                ) : (
                                                  'Đang cập nhật'
                                                )}
                                              </div>
                                            }
                                            className='text-date'
                                          />
                                        </div>
                                      ))
                                    : 'Khóa học này chưa có lịch khai giảng'}
                                </>
                              }
                            >
                              <p
                                style={{
                                  color: '#f2184f',
                                  textAlign: 'start',
                                }}
                              >
                                Xem tất cả lịch khai giảng
                              </p>
                            </Tooltip>
                          )}

                          <div className='flexPrice'>
                            <span className='name'>Chi phí: </span>
                            <span className='price'>{item?.cost ? formatPriceVND(item?.cost) : 'Free'}</span>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </div>
  )
}
