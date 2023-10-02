import { Button, Col, Image, Row, Tooltip, Typography } from 'antd'
import './News.scss'
import { useQuery } from '@tanstack/react-query'
import newsApi from '@/apis/news.api'
import { Link, useNavigate } from 'react-router-dom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import LoadingCustom from '@/components/LoadingCustom'

export default function News() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () =>
      newsApi.getNews({
        filterQuery: {},
        options: {
          limit: 4,
          sort: { createdAt: -1 },
        },
      }),
  })

  const { Paragraph } = Typography

  return (
    <div className='news-container'>
      <div className='container-1200px'>
        <p className='text-xs'>ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
        <h3>Tin tức và Góc học tập</h3>
        <Row justify={'center'} gutter={[64, 32]}>
          {isLoading ? (
            <LoadingCustom />
          ) : (
            data?.data?.docs &&
            data?.data?.docs?.map((item) => (
              <>
                <Col md={12} span={24} className='col'>
                  <div className='imgBox'>
                    <Image
                      width='280px'
                      height='160px'
                      className='imgIn'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                    />
                  </div>
                  <div className='content'>
                    <Tooltip title={item?.title}>
                      <Paragraph
                        style={{
                          maxWidth: '280px',
                        }}
                        className='titleNews'
                        ellipsis={true}
                      >
                        <Link
                          style={{
                            maxWidth: '300px',
                          }}
                          to={`/news/${item?.id}`}
                        >
                          {item?.title}
                        </Link>
                      </Paragraph>
                    </Tooltip>

                    <TextWithTooltip rows={3} className='text' children={item?.description} />
                  </div>
                </Col>
              </>
            ))
          )}
        </Row>
        <Button className='buttonMore' onClick={() => navigate('/news')}>
          Xem tất cả
        </Button>
      </div>
    </div>
  )
}
