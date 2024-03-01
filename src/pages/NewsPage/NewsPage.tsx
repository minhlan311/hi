import categoryApi from '@/apis/categories.api'
import newsApi from '@/apis/news.api'
import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import Header from '@/components/layout/Header/Header'
import { useQuery } from '@tanstack/react-query'
import { Col, Row, Space } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './NewsPage.scss'

const RenderNews = ({ subCateId }: { subCateId?: string }) => {
  const { menuSlug } = useParams()
  const [current, setCurrent] = useState<number>(1)
  const { data, isLoading } = useQuery({
    queryKey: ['newALL', current, subCateId],
    queryFn: () => {
      return newsApi.findNew({
        filterQuery: { categoryId: subCateId },
        options: {
          limit: 6,
          page: current,
        },
      })
    },
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 300)
  }, [location, current])

  return (
    <Space direction='vertical' className='sp100' size='large'>
      <LoadingCustom loading={isLoading} tip='Vui lòng chờ ...' style={{ minHeight: '40vh' }}>
        <Space direction='vertical' className='sp100'>
          {data?.data?.docs &&
            data?.data?.docs?.map((item) => (
              <Link to={`/${menuSlug}/${item?.category?.slug}/${item?.slug}`} key={item._id}>
                <Row gutter={[24, 12]}>
                  <Col span={24} lg={8}>
                    <ImageCustom
                      height='150px'
                      width='100%'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                    />
                  </Col>
                  <Col span={24} lg={16}>
                    <h3 className='title-new'>{item?.title}</h3>
                    <Paragraph ellipsis={{ rows: 3 }}>{item?.description}</Paragraph>
                  </Col>
                </Row>
              </Link>
            ))}
        </Space>
      </LoadingCustom>
      <PaginationCustom
        callbackCurrent={setCurrent}
        page={data?.data.page}
        limit={data?.data.limit}
        totalData={data?.data?.totalDocs}
        align='center'
      />
    </Space>
  )
}

export default function NewsPage() {
  const { menuSlug, categorySlug } = useParams()

  const { data: categoriesParent } = useQuery({
    queryKey: ['categoriesParent', categorySlug],
    queryFn: () => {
      return categoryApi.getCategorieDetailSlug(categorySlug!)
    },
    enabled: Boolean(categorySlug),
  })

  const { data: dataLimit, isLoading } = useQuery({
    queryKey: ['newLimit'],
    queryFn: () => {
      return newsApi.findNew({
        filterQuery: {},
        options: { sort: { createdAt: -1 }, limit: 4 },
      })
    },
  })

  return (
    <Header padding={'50px 0'}>
      <BreadCrumbsDynamic homeTitle='Trang chủ' separator='>' style={{ marginBottom: 8 }} />
      <Row gutter={[24, 24]}>
        <Col span={24} md={14} lg={16}>
          <Space direction='vertical' size='large' className='sp100'>
            <h1>{categoriesParent ? categoriesParent.data.name : 'Tin tức'}</h1>

            <RenderNews subCateId={categoriesParent?.data._id} />
          </Space>
        </Col>
        <Col span={24} md={10} lg={8}>
          <Space direction='vertical' size='large' className='fixed sp100'>
            <h1>Bài viết mới nhất</h1>

            {isLoading ? (
              <LoadingCustom tip='Vui lòng chờ ...' style={{ minHeight: '40vh' }} />
            ) : (
              dataLimit?.data?.docs &&
              dataLimit?.data?.docs?.map((item) => (
                <Link to={`/${menuSlug}/${item?.category?.slug}/${item?.slug}`} key={item._id}>
                  <div>
                    <ImageCustom
                      height='150px'
                      width='100%'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                    />
                  </div>
                  <div>
                    <Paragraph ellipsis={true} className='title-new'>
                      {item?.title}
                    </Paragraph>
                    <Paragraph ellipsis={{ rows: 2 }}>{item?.description}</Paragraph>
                  </div>
                </Link>
              ))
            )}
          </Space>
        </Col>
      </Row>
    </Header>
  )
}
