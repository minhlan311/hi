/* eslint-disable @typescript-eslint/no-explicit-any */
import newsApi from '@/apis/news.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import SliderCustom from '@/components/SliderCustom'
import { useQuery } from '@tanstack/react-query'
import { Card, Space } from 'antd'
import Meta from 'antd/es/card/Meta'
import Paragraph from 'antd/es/typography/Paragraph'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './NewsPageDetail.scss'
// import { News } from '@/types/news.type'
import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import LoadingCustom from '@/components/LoadingCustom'
import Header from '@/components/layout/Header/Header'
import { useEffect } from 'react'

export default function NewsPageDetail({ slug }: { slug: string }) {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['newDetail', slug],
    queryFn: () => newsApi.getDetailSlug(slug),
  })

  const { menuSlug } = useParams()

  const { data: dataNewsAll } = useQuery({
    queryKey: ['dataNewsAll'],
    queryFn: () => {
      return newsApi.findNew({
        filterQuery: {},
        options: {
          limit: 10,
        },
      })
    },
  })

  useEffect(() => {
    if (isError) navigate('/404')
  }, [isError])

  return (
    <Header padding={'50px 0'}>
      <Space direction='vertical' className='sp100 new-detail-main' size='large'>
        <BreadCrumbsDynamic homeTitle='Trang chủ' separator='>' />
        <LoadingCustom tip='Vui lòng chờ ...' loading={isLoading}>
          <h1 className='title-box'>{data?.data?.title}</h1>

          <div className='dangerHTML p-block' dangerouslySetInnerHTML={{ __html: data?.data?.content }}></div>
          <div className='other-news'>
            <h3 className='other-news-title '>Bài viết liên quan</h3>
            <SliderCustom infinite={true} arrows dataLength={dataNewsAll?.data?.totalDocs as number}>
              {dataNewsAll?.data?.docs?.map((item) => (
                <Link className='h3-newpage' to={`/${menuSlug}/${item?.category?.slug}/${item?.slug}`}>
                  <Card
                    style={{
                      height: '320px',
                      margin: '0 8px',
                    }}
                    cover={
                      <ImageCustom
                        width='100%'
                        height='150px'
                        src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                      />
                    }
                  >
                    <Meta
                      title={item?.title}
                      description={<Paragraph ellipsis={{ rows: 4 }}>{item?.description}</Paragraph>}
                    />
                  </Card>
                </Link>
              ))}
            </SliderCustom>
          </div>
        </LoadingCustom>
      </Space>
    </Header>
  )
}
