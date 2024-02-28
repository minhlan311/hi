/* eslint-disable @typescript-eslint/no-explicit-any */
import newsApi from '@/apis/news.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import SliderCustom from '@/components/SliderCustom'
import { useQuery } from '@tanstack/react-query'
import { Card, Space } from 'antd'
import Meta from 'antd/es/card/Meta'
import Paragraph from 'antd/es/typography/Paragraph'
import { Link, useNavigate } from 'react-router-dom'
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

  const { data: dataNewsAll } = useQuery({
    queryKey: ['newsAll'],
    queryFn: () =>
      newsApi.findNew({
        filterQuery: {},
        options: {
          limit: 10,
          pagination: false,
          sort: { createdAt: -1 },
        },
      }),
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

          <div className='dangerHTML' dangerouslySetInnerHTML={{ __html: data?.data?.content }}></div>
          <div className='other-news'>
            <h3 className='other-news-title '>Bài viết liên quan</h3>
            <SliderCustom infinite={true} arrows dataLength={dataNewsAll?.data?.totalDocs as number}>
              {dataNewsAll?.data?.docs?.map((item) => (
                <>
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
                      title={
                        <Link className='dt-link' to={`/tin-tuc/${item?.id}`}>
                          {item?.title}
                        </Link>
                      }
                      description={<Paragraph ellipsis={{ rows: 4 }}>{item?.description}</Paragraph>}
                    />
                  </Card>
                </>
              ))}
            </SliderCustom>
          </div>
        </LoadingCustom>
      </Space>
    </Header>
  )
}
