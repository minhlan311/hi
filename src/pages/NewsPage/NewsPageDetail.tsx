/* eslint-disable @typescript-eslint/no-explicit-any */
import newsApi from '@/apis/news.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import './NewsPageDetail.scss'
import SliderCustom from '@/components/SliderCustom'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Paragraph from 'antd/es/typography/Paragraph'
import { News } from '@/types/news.type'

export default function NewsPageDetail() {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const dataAllNews = queryClient.getQueryData<News>(['news'])

  const { data } = useQuery({
    queryKey: ['oneNew', id],
    queryFn: () => newsApi.getOneNews(id!),
  })

  const { data: dataNewsAll } = useQuery({
    queryKey: ['newsAll'],
    queryFn: () =>
      newsApi.getNews({
        filterQuery: {},
        options: {
          limit: 10,
          pagination: false,
          sort: { createdAt: -1 },
        },
      }),
  })

  console.log(dataAllNews, 'dataAllNews')

  return (
    <div className='container-news'>
      <div className='title-box'>
        <h1>{data?.data?.title}</h1>
      </div>
      <div className='box-desc' dangerouslySetInnerHTML={{ __html: data?.data?.content }}></div>
      <div className='other-news'>
        <h3 className='other-news-title'>Bài viết liên quan</h3>
        <SliderCustom infinite={true} arrows dataLength={dataNewsAll?.data?.totalDocs as number}>
          {dataNewsAll?.data?.docs?.map((item) => (
            <>
              {' '}
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
                    <Link className='dt-link' to={`/news/${item?.id}`}>
                      {item?.title}
                    </Link>
                  }
                  description={<Paragraph ellipsis={{ rows: 4 }}>{item?.description}</Paragraph>}
                />
              </Card>
            </>
          ))}
        </SliderCustom>{' '}
      </div>
    </div>
  )
}
