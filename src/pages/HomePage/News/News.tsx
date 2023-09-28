import { Button, Image, Typography } from 'antd'
import './News.scss'
import { useQuery } from '@tanstack/react-query'
import newsApi from '@/apis/news.api'
import { Link, useNavigate } from 'react-router-dom'

export default function News() {
  const navigate = useNavigate()
  const { data } = useQuery({
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
        <div className='title-container'>
          {data?.data?.docs &&
            data?.data?.docs?.map((item) => (
              <>
                <div className='col'>
                  <div className='imgBox'>
                    <Image
                      width='280px'
                      height='150px'
                      className='imgIn'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                    />
                  </div>
                  <div className='content'>
                    <Paragraph
                      style={{
                        width: '300px',
                      }}
                      className='titleNews'
                      ellipsis={true}
                    >
                      <Link to={`/news/${item?.id}`}>{item?.title}</Link>
                    </Paragraph>
                    <Paragraph
                      style={{
                        width: '300px',
                      }}
                      className='text'
                      ellipsis={{ rows: 3 }}
                    >
                      {item?.description}
                    </Paragraph>
                  </div>
                </div>
              </>
            ))}
        </div>
        <Button className='buttonMore' onClick={() => navigate('/news')}>
          Xem tất cả
        </Button>
      </div>
    </div>
  )
}
