import newsApi from '@/apis/news.api'
import LoadingCustom from '@/components/LoadingCustom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Image, Row, Tooltip, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './News.scss'

export default function News() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () =>
      newsApi.findNew({
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
        <Row justify={'center'} gutter={[32, 32]}>
          {isLoading ? (
            <LoadingCustom />
          ) : (
            data?.data?.docs &&
            data?.data?.docs?.map((item) => (
              <>
                <Col xs={24} xl={12} className='col'>
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
                          to={`/tin-tuc/${item?.id}`}
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
        <Button className='buttonMore' onClick={() => navigate('/tin-tuc')}>
          Xem tất cả
        </Button>
      </div>
    </div>
  )
}
