/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import CourseCard from '@/components/CourseCard'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import WrapMore from '@/components/WrapMore/WrapMore'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Col, Row, Space } from 'antd'
import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import ChoiceQuestionPage from '../ChoiceQuestionPage'
import CourseListPage from '../CourseListPage'

const CategoryPage = () => {
  const { menuSlug, categorySlug, subCategorySlug } = useParams()

  const navigate = useNavigate()
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null }, { sort: { createdAt: -1 } })
    },
  })

  const s1 = categories?.data.docs?.find((item) => item.slug === menuSlug!)
  const s2 = s1?.children?.find((item) => item.slug === categorySlug!)
  const s3 = s2?.children?.find((item) => item.slug === subCategorySlug!)

  const category = (!s3 && !s2 && s1) || (!s3 && s2 && s2) || (s3 && s2 && s3)
  if (!category) navigate('/404')

  document.title = category?.name + ' | Ucam'

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList', category],
    queryFn: () => {
      return categoryApi.getCategorieDetail(category?._id as string)
    },
    enabled: Boolean(category?._id),
  })

  const [current, setCurrent] = useState<number>(1)
  const { sm, md } = useResponsives()

  const Api = menuSlug?.includes('lich-khai-giang') ? classApi.openingClass : courseApi.getCourses

  const { data: coursesData, isLoading: courseLoad } = useQuery({
    queryKey: ['courseCate', current, menuSlug, category],
    queryFn: () =>
      Api({
        filterQuery: {
          categoryId: category?._id,
          typeCourse:
            (menuSlug?.includes('luyen-thi') && 'TEST') || (menuSlug?.includes('khoa-hoc') && 'NORMAL') || undefined,
        },
        options: {
          limit: (sm && 5) || (md && 9) || 8,
          page: current,
          sort: { createdAt: -1 },
        },
      }),

    enabled: Boolean(category?._id) && (Boolean(s3) || Boolean(s2)),
  })

  return (
    <LoadingCustom tip='Vui lòng chờ...' loading={isLoading}>
      {!s2 && !s3 ? (
        (category?.name === 'Trắc nghiệm' && <ChoiceQuestionPage />) ||
        (category?.name === 'Khóa học' && <CourseListPage />) || (
          <div className='box-desc' dangerouslySetInnerHTML={{ __html: categoriesData?.data?.content as any }}></div>
        )
      ) : (
        <div>
          <img src={`${import.meta.env.VITE_FILE_ENDPOINT + '/' + category?.coverUrl}`} style={{ width: '100%' }} />
          <Header title={category?.name} padding={50}>
            {categoriesData?.data?.content ? (
              <WrapMore
                title=''
                maxWidth='100%'
                children={
                  <div
                    className='box-desc'
                    dangerouslySetInnerHTML={{ __html: categoriesData?.data?.content as any }}
                  ></div>
                }
                wrapper={'nonBorder'}
              ></WrapMore>
            ) : null}

            {s3 && s2 && !menuSlug?.includes('giao-vien') && (
              <Space direction='vertical' size='large' className='sp100' style={{ marginTop: 80 }}>
                <h1>Khóa học {menuSlug?.includes('luyen-thi') && ' luyện thi'}</h1>
                <LoadingCustom loading={courseLoad}>
                  {coursesData && coursesData?.data?.totalDocs > 0 ? (
                    <Row gutter={[24, 24]}>
                      {coursesData?.data?.docs?.map((item) => (
                        <Col span={24} md={8} lg={6} key={item._id}>
                          <CourseCard item={item} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <EmptyCustom description='Không có khóa học nào'></EmptyCustom>
                  )}
                </LoadingCustom>
                <div className='pagination'>
                  <PaginationCustom
                    limit={coursesData?.data?.limit}
                    totalData={coursesData?.data?.totalDocs}
                    callbackCurrent={setCurrent}
                  />
                </div>
              </Space>
            )}
          </Header>
        </div>
      )}
    </LoadingCustom>
  )
}

export default CategoryPage
