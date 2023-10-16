import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { useState } from 'react'
import './NewsPage.scss'

import newsApi from '@/apis/news.api'
import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { useNavigate } from 'react-router-dom'
import LoadingCustom from '@/components/LoadingCustom'

export default function NewsPage() {
  const [current, setCurrent] = useState<number>(1)

  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryFn: () => {
      return newsApi.getNews({
        filterQuery: {},
        options: {
          limit: 6,
          page: current,
        },
      })
    },
    queryKey: ['newALL', current],
  })

  const { data: dataLimit } = useQuery({
    queryFn: () => {
      return newsApi.getNews({
        filterQuery: {},
        options: { sort: { createdAt: -1 }, limit: 4 },
      })
    },
    queryKey: ['newLimit'],
  })

  const onchange = (page: number) => {
    setCurrent(page)
  }

  return (
    <div className='news-page-container'>
      <div className='fixed'>
        <div className=''>
          <h2 className='h2'>Bài viết mới nhất</h2>
          {isLoading ? (
            <LoadingCustom tip='Vui lòng chờ ...' />
          ) : (
            dataLimit?.data?.docs &&
            dataLimit?.data?.docs?.map((item) => (
              <>
                <div className='flex-col-fixed'>
                  <div>
                    <ImageCustom
                      height='150px'
                      width='360px'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                    />
                  </div>
                  <div className='title-ellipsis-fixed'>
                    <Paragraph ellipsis={true} onClick={() => navigate(`/tin-tuc/${item?.id}`)} className='title-new'>
                      {item?.title}
                    </Paragraph>
                    <Paragraph ellipsis={{ rows: 2 }}>{item?.description}</Paragraph>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
      <h2 className='h2-title'>Tin tức</h2>
      {isLoading ? (
        <LoadingCustom tip='Vui lòng chờ ...' />
      ) : (
        data?.data?.docs &&
        data?.data?.docs?.map((item) => (
          <>
            <div className='flex-col'>
              <div>
                <ImageCustom
                  height='150px'
                  width='250px'
                  src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                />
              </div>
              <div className='title-ellipsis'>
                <h3 onClick={() => navigate(`/tin-tuc/${item?.id}`)} className='title-new'>
                  {item?.title}
                </h3>
                <Paragraph ellipsis={{ rows: 3 }}>{item?.description}</Paragraph>
              </div>
            </div>
          </>
        ))
      )}

      <div className='pagi'>
        <Pagination
          onChange={onchange}
          current={current}
          pageSize={6}
          defaultCurrent={1}
          total={data?.data?.totalDocs}
        />
      </div>
    </div>
  )
}
