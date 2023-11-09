/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import calenderSVG from '@/assets/icons/calendar.svg'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import SliderCustom from '@/components/SliderCustom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import WrapMore from '@/components/WrapMore/WrapMore'
import { formatDate, formatPriceVND } from '@/helpers/common'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Card, Col, Pagination, Row, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CategoryDetail.scss'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'

export default function CategogyDetail() {
  const { categoryDetailSlug, menuSlug } = useParams()
  const { lg } = useResponsives()
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const [filter, setFilter] = useState({
    filterQuery: {
      slug: categoryDetailSlug,
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
      options: {
        limit: 6,
        page: page,
        pagination: true,
        sort: { createdAt: -1 },
      },
    }))
  }, [page])

  const onChange = (page: number) => {
    setPage(page)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['cateDetail', categoryDetailSlug],
    queryFn: () => categoryApi.getCategorieDetailSlug(categoryDetailSlug!),
    onError: (error: any) => {
      if (error?.response && error?.response?.status === 404) {
        navigate('/404')
      }
    },
  })

  const { data: listCourse, isLoading: Loading } = useQuery({
    queryKey: ['courseCate', filter, data],
    queryFn: () => {
      return classApi.openingClass({
        filterQuery: {
          categoryId: data?.data?._id,
        },
        options: {
          limit: 9,
          page: page,
          sort: { createdAt: -1 },
        },
      })
    },
    enabled: data?.data?._id && menuSlug?.includes('lich-khai-giang') ? true : false,
  })

  useQuery({
    queryKey: ['courseCate', filter, data],
    queryFn: () => {
      return courseApi.getCourses({
        filterQuery: {
          categoryId: data?.data?._id,
        },
        options: {
          limit: 9,
          page: page,
          sort: { createdAt: -1 },
        },
      })
    },
    enabled: data?.data?._id && menuSlug?.includes('luyen-thi') ? true : false,
  })

  const handleClickCourse = (id: string) => {
    navigate({
      pathname: `/courses/` + id,
    })
  }

  const listDataCourse = listCourse?.data?.docs

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
          <div className='banner'>
            <img src={`${import.meta.env.VITE_FILE_ENDPOINT + '/' + data?.data?.coverUrl}`} />
          </div>

          <div className='h2'>
            <div className='div-cate'>
              <h2>{data?.data?.name}</h2>
              {data?.data?.content ? (
                <WrapMore
                  title=''
                  maxWidth='100%'
                  children={
                    <div className='box-desc' dangerouslySetInnerHTML={{ __html: data?.data?.content as any }}></div>
                  }
                  wrapper={'nonBorder'}
                ></WrapMore>
              ) : (
                ''
              )}

              {!lg ? (
                <Row style={{ marginTop: '100px' }} justify={'center'} gutter={{ xs: 0, md: 24, lg: 32 }}>
                  {Loading ? (
                    menuSlug === 'lich-khai-giang-blbah' && <LoadingCustom />
                  ) : listDataCourse?.length ? (
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
                                <Tooltip
                                  color='white'
                                  placement='right'
                                  title={
                                    <>
                                      <h3
                                        style={{
                                          color: 'black',
                                        }}
                                      >
                                        Tất cả lịch khai giảng
                                      </h3>
                                      {item?.class?.map((item, index) => (
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
                                      ))}{' '}
                                    </>
                                  }
                                >
                                  {item?.class && item?.class?.length > 2 && (
                                    <p
                                      style={{
                                        color: '#f2184f',
                                        textAlign: 'start',
                                      }}
                                    >
                                      Xem tất cả lịch khai giảng
                                    </p>
                                  )}
                                </Tooltip>

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
                  ) : (
                    <EmptyCustom />
                  )}
                </Row>
              ) : (
                <div
                  style={{
                    marginTop: '80px',
                  }}
                >
                  <SliderCustom slidesToShow={1} infinite={true} dataLength={listDataCourse?.length as number}>
                    {Loading
                      ? menuSlug === 'lich-khai-giang-blbah' && <LoadingCustom />
                      : listDataCourse?.map((item) => (
                          <Col className='col'>
                            <Card
                              style={{ height: 420 }}
                              cover={
                                <ImageCustom
                                  onClick={() => handleClickCourse(item?._id as string)}
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
                                      onClick={() => handleClickCourse(item?._id as string)}
                                      rows={1}
                                      children={item?.name}
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
                                    <Tooltip
                                      color='white'
                                      title={
                                        <>
                                          <h3
                                            style={{
                                              color: 'black',
                                              marginBottom: '10px',
                                            }}
                                          >
                                            Tất cả lịch khai giảng
                                          </h3>
                                          {item?.class?.map((item, index) => (
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
                                          ))}{' '}
                                        </>
                                      }
                                    >
                                      {item?.class && item?.class?.length > 2 && (
                                        <p
                                          style={{
                                            color: '#f2184f',
                                            textAlign: 'start',
                                          }}
                                        >
                                          Xem tất cả lịch khai giảng
                                        </p>
                                      )}
                                    </Tooltip>

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
                  </SliderCustom>
                </div>
              )}

              {listDataCourse && listDataCourse?.length > 0 && (
                <div className='pagi'>
                  <Pagination pageSize={9} onChange={onChange} current={page} total={listCourse?.data?.totalDocs} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
