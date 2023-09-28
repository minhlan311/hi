import React, { useState } from 'react'
import './NewsPage.scss'
import ImageCustom from '@/components/ImageCustom/ImageCustom'

import { useQuery } from '@tanstack/react-query'
import newsApi from '@/apis/news.api'
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'

export default function NewsPage() {
  const [filter, setFilter] = useState({
    filterQuery: {},
    options: { sort: { createdAt: -1 }, limit: 10 },
  })

  const navigate = useNavigate()

  const { data } = useQuery({
    queryFn: () => {
      return newsApi.getNews(filter)
    },
    queryKey: ['newALL', filter],
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

  const onchange = (page: number, limit: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      options: {
        ...prevFilter.options,
        page: page!,
        limit: limit!,
      },
    }))
  }

  return (
    <div className='news-page-container'>
      <div className='fixed'>
        <div className=''>
          <h2 className='h2'>Bài viết xem nhiều</h2>
          {dataLimit?.data?.docs &&
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
                    <Paragraph ellipsis={true} onClick={() => navigate(`/news/${item?.id}`)} className='title-new'>
                      {item?.title}
                    </Paragraph>
                    <Paragraph ellipsis={{ rows: 2 }}>{item?.description}</Paragraph>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
      <h2 className='h2-title'>Tin túc</h2>
      {data?.data?.docs &&
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
                <h3 onClick={() => navigate(`/news/${item?.id}`)} className='title-new'>
                  {item?.title}
                </h3>
                <Paragraph ellipsis={{ rows: 3 }}>{item?.description}</Paragraph>
              </div>
            </div>
          </>
        ))}
      <div className='pagi'>
        <Pagination onChange={onchange} current={data?.data?.page} defaultCurrent={1} total={data?.data?.totalDocs} />
      </div>
    </div>
  )
}
