/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import classApi from '@/apis/class.api'
import courseApi from '@/apis/course.api'
import userApi from '@/apis/user.api'
import CourseCard from '@/components/CourseCard'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import UserCard from '@/components/UserCard'
import WrapMore from '@/components/WrapMore/WrapMore'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { MentorInfo } from '@/types/mentor.type'
import { SuccessResponse } from '@/types/utils.type'
import { useQuery } from '@tanstack/react-query'
import { Col, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChoiceQuestionPage from '../ChoiceQuestionPage'
import CourseListPage from '../CourseListPage'
import OpeningPage from '../OpeningPage'

const CategoryPage = () => {
  const { menuSlug, categorySlug, subCategorySlug } = useParams()

  const navigate = useNavigate()
  const {
    data: categoriesParent,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categoriesParent', menuSlug],
    queryFn: () => {
      return categoryApi.getCategorieDetailSlug(menuSlug!)
    },
    enabled: Boolean(menuSlug),
  })

  useEffect(() => {
    if (error) {
      navigate('/404')
    }
  }, [error])

  const parent = categoriesParent?.data

  const s1 = parent
  const s2 = s1?.children?.find((item) => item.slug === categorySlug!)
  const s3 = s2?.children?.find((item) => item.slug === subCategorySlug!)

  const category = (!s3 && !s2 && s1) || (!s3 && s2 && s2) || (s3 && s2 && s3)

  document.title = category?.name + ' | Ucam'

  const [current, setCurrent] = useState<number>(1)
  const { sm, md } = useResponsives()

  const Api =
    (menuSlug?.includes('lich-khai-giang') && classApi.openingClass) ||
    (menuSlug?.includes('khoa-hoc') && courseApi.getCourses) ||
    null

  const { data: coursesData, isLoading: courseLoad } = useQuery({
    queryKey: ['courseCate', current, menuSlug, category],
    queryFn: () =>
      Api &&
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

  const [mentorData, setMentorData] = useState<SuccessResponse<MentorInfo[]>>()

  function covString(string: string, count: number, direction: 'left' | 'right' = 'right'): string {
    const arrStr = string.split(' ')

    let selectedWords: string[]

    if (direction === 'left') {
      selectedWords = arrStr.slice(0, count)
    } else {
      selectedWords = arrStr.slice(-count)
    }

    const capitalize = selectedWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1))

    const result = capitalize.join(' ')

    return result
  }

  return (
    <LoadingCustom tip='Vui lòng chờ...' loading={isLoading} style={{ minHeight: '50vh' }}>
      {!s2 && !s3 ? (
        (category?.name === 'Trắc nghiệm' && <ChoiceQuestionPage />) ||
        (category?.name === 'Khóa học' && <CourseListPage />) ||
        (category?.name === 'Lịch khai giảng' && <OpeningPage />) ||
        (category?.slug?.includes('giao-vien') && (
          <Header title={category?.name} padding={50}>
            <Space direction='vertical' size='large' className={'sp100'} style={{ marginTop: 80 }}>
              <FilterAction
                type='user'
                keyFilter='mentorData'
                apiFind={userApi.findMentor}
                page={current}
                filterQuery={{
                  categoryName: category?.name === 'Giáo viên' ? undefined : covString(category?.name, 2),
                }}
                callBackData={setMentorData}
                limit={10}
                checkQuery={Boolean(covString(category?.name, 2))}
              />
              <LoadingCustom loading={menuSlug?.includes('khoa-hoc') && courseLoad}>
                {mentorData && mentorData?.totalDocs > 0 ? (
                  <Row gutter={[24, 24]}>
                    {mentorData?.docs?.map((item) => (
                      <Col span={24} md={12} key={item._id}>
                        <UserCard data={item} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <EmptyCustom description='Không có giảng viên nào'></EmptyCustom>
                )}
              </LoadingCustom>

              <PaginationCustom
                page={mentorData?.page}
                limit={mentorData?.limit}
                totalData={mentorData?.totalDocs}
                callbackCurrent={setCurrent}
                align='center'
              />
            </Space>
          </Header>
        )) || <div dangerouslySetInnerHTML={{ __html: category?.content as any }}></div>
      ) : (
        <div>
          <img src={`${import.meta.env.VITE_FILE_ENDPOINT + '/' + category?.coverUrl}`} style={{ width: '100%' }} />
          <Header title={category?.name} padding={50}>
            {category?.content ? (
              <WrapMore
                title=''
                maxWidth='100%'
                children={<div dangerouslySetInnerHTML={{ __html: category?.content as any }}></div>}
                wrapper={'nonBorder'}
              ></WrapMore>
            ) : null}
            {category?.slug?.includes('giao-vien') && (
              <Space direction='vertical' size='large' className={'sp100'} style={{ marginTop: 80 }}>
                <FilterAction
                  type='user'
                  keyFilter='mentorData'
                  apiFind={userApi.findMentor}
                  page={current}
                  callBackData={setMentorData}
                  checkQuery={Boolean(s3) || Boolean(s2)}
                  limit={10}
                />
                <LoadingCustom loading={courseLoad}>
                  {mentorData && mentorData?.totalDocs > 0 ? (
                    <Row gutter={[24, 24]}>
                      {mentorData?.docs?.map((item) => (
                        <Col span={24} md={12} key={item._id}>
                          <UserCard data={item} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <EmptyCustom description='Không có giảng viên nào'></EmptyCustom>
                  )}
                </LoadingCustom>

                <PaginationCustom
                  page={mentorData?.page}
                  limit={mentorData?.limit}
                  totalData={mentorData?.totalDocs}
                  callbackCurrent={setCurrent}
                  align='center'
                />
              </Space>
            )}
            {s3 && s2 && !category?.slug.includes('giao-vien') && (
              <Space direction='vertical' size='large' className={'sp100'} style={{ marginTop: 80 }}>
                <h1>Khóa học {category?.slug.includes('luyen-thi') && ' luyện thi'}</h1>
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

                <PaginationCustom
                  limit={coursesData?.data?.limit}
                  totalData={coursesData?.data?.totalDocs}
                  callbackCurrent={setCurrent}
                  align='center'
                />
              </Space>
            )}
          </Header>
        </div>
      )}
    </LoadingCustom>
  )
}

export default CategoryPage
