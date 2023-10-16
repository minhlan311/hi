/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import { formatDate, formatPriceVND } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import './CategoryDetail.scss'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingCustom from '@/components/LoadingCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import courseApi from '@/apis/course.api'
import { Card, Col, Pagination, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import calenderSVG from '@/assets/icons/calendar.svg'
import WrapMore from '@/components/WrapMore/WrapMore'

export default function CategogyDetail() {
  const { categoryDetailSlug } = useParams()

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
      filterQuery: {
        slug: 'trung-hoc-co-so',
      },
    }))
  }, [])

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
    queryFn: () => categoryApi.getCategorieDetail(categoryDetailSlug!),
  })

  const { data: listCourse, isLoading: Loading } = useQuery({
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
    enabled: data?.data?.parentId ? true : false,
  })

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
                {Loading ? (
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
                                          {item?.startDate ? (
                                            <>
                                              {' '}
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
              {listDataCourse && (
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
