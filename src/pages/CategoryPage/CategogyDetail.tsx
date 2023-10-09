/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import { formatDate, formatDaysOfWeek, formatHour, formatPriceVND, getIdFromUrl } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import './CategoryDetail.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingCustom from '@/components/LoadingCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import courseApi from '@/apis/course.api'
import { getIdLetter } from '@/constants/menuCalendar'
import { Card, Col, Pagination, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import calenderSVG from '@/assets/icons/calendar.svg'
import WrapMore from '@/components/WrapMore/WrapMore'

export default function CategogyDetail() {
  const location = useLocation()
  const currentPath = location.pathname
  const [page, setPage] = useState(1)
  const id = getIdFromUrl(currentPath)
  const idc = getIdLetter(id!)

  const navigate = useNavigate()

  const [filter, setFilter] = useState({
    filterQuery: {
      categoryId: id,
    },
    options: {
      limit: 6,
      page: page,
      pagination: true,
    },
  })

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      filterQuery: {
        categoryId: id,
      },
    }))
  }, [id, idc])

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      options: {
        limit: 6,
        page: page,
        pagination: true,
      },
    }))
  }, [page])

  const onChange = (page: number) => {
    setPage(page)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['cateDetail', currentPath],
    queryFn: () => categoryApi.getCategorieDetail(id!),
    enabled: id ? true : false,
  })

  const { data: listCourse, isLoading: Loading } = useQuery({
    queryKey: ['courseCate', id, filter],
    queryFn: () => {
      return courseApi.getCourses(filter)
    },
    enabled: id ? true : false,
  })

  console.log(listCourse, 'listCourselistCourse')

  const handleClickCourse = (id: string) => {
    navigate({
      pathname: `/courses/` + id,
    })
  }

  const listDataCourse = listCourse?.data?.docs
  // const listDataCourse = listCourse?.data?.docs?.filter((obj) => obj?.class && obj?.class?.length > 0)

  return (
    <>
      {isLoading ? (
        <LoadingCustom
          tip='Đang tải thông tin Khóa học'
          style={{
            marginTop: '100px',
          }}
        />
      ) : (
        <>
          <ImageCustom
            styles={{
              objectFit: 'cover',
            }}
            width='100%'
            height='500px'
            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + data?.data?.coverUrl}
          />

          <div className='h2'>
            <div className='div-cate'>
              <h2>{data?.data?.name}</h2>
              <WrapMore
                title=''
                maxWidth='100%'
                children={
                  <div className='box-desc' dangerouslySetInnerHTML={{ __html: data?.data?.content as any }}></div>
                }
                wrapper={'nonBorder'}
              ></WrapMore>

              <Row style={{ marginTop: '100px' }} justify={'center'} gutter={{ xs: 0, sm: 0, md: 24, lg: 32 }}>
                {Loading && id ? (
                  <LoadingCustom />
                ) : (
                  listDataCourse?.map((item) => (
                    <Col className='col'>
                      <Card
                        onClick={() => handleClickCourse(item?._id as string)}
                        hoverable
                        style={{ width: 340, height: 410 }}
                        cover={
                          <ImageCustom
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
                              <TextWithTooltip rows={1} children={item?.name} className='link-h4-config' />
                              {item?.class?.map((item) => (
                                <>
                                  <div className='flex'>
                                    <img src={calenderSVG} className='icons' alt='' />
                                    <TextWithTooltip
                                      rows={1}
                                      children={
                                        <>
                                          {item?.startDate && item?.schedules ? (
                                            <>
                                              {' '}
                                              Khai giảng {''}
                                              {formatDate(item?.startDate)}
                                              {''} - Thứ {''}
                                              {formatDaysOfWeek(item?.schedules).join('-')}
                                              {''} Từ {''} {formatHour(item?.startAt)} - {formatHour(item?.endAt)}{' '}
                                            </>
                                          ) : (
                                            'Đang cập nhật'
                                          )}
                                        </>
                                      }
                                      className='text-date'
                                    />
                                  </div>
                                </>
                              ))}
                              <div className='flexPrice'>
                                <span className='name'>Chi phí: </span>
                                <span className='price'>{item?.cost ? formatPriceVND(item?.cost) : 'Free'}</span>
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
              {id && listDataCourse && (
                <div className='pagi'>
                  <Pagination pageSize={6} onChange={onChange} current={page} total={listCourse?.data?.totalDocs} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
