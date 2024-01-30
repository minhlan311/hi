import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { useState } from 'react'
import './NewsPage.scss'

import newsApi from '@/apis/news.api'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import Header from '@/components/layout/Header/Header'
import { useQuery } from '@tanstack/react-query'
import { Col, Row, Space } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { useNavigate } from 'react-router-dom'

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

  return (
    <Header padding={'50px 0'}>
      <Row gutter={48}>
        <Col span={24} md={16}>
          <h1>Tin tức</h1>
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
            <PaginationCustom callbackCurrent={setCurrent} limit={8} totalData={data?.data?.totalDocs} />
          </div>
        </Col>

        <Col span={0} md={7}>
          <Space direction='vertical' size='large' className='fixed sp100'>
            <h1>Bài viết mới nhất</h1>
            {isLoading ? (
              <LoadingCustom tip='Vui lòng chờ ...' />
            ) : (
              dataLimit?.data?.docs &&
              dataLimit?.data?.docs?.map((item) => (
                <div className='flex-col-fixed'>
                  <div>
                    <ImageCustom
                      height='150px'
                      width='100%'
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
              ))
            )}
          </Space>
        </Col>
      </Row>
    </Header>
  )
}
