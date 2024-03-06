import newsApi from '@/apis/news.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import Header from '@/components/layout/Header/Header'
import { CategoryState } from '@/interface/category'
import { SuccessResponse } from '@/types/utils.type'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Col, Row, Space } from 'antd'
import { Link } from 'react-router-dom'

const News = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['newsData'],
    queryFn: () =>
      newsApi.findNew({
        filterQuery: {},
        options: {
          limit: 4,
        },
      }),
  })
  const category = queryClient.getQueryData<{ data: SuccessResponse<CategoryState[]> }>(['categoriesMenu'])
  const newsSlug = category?.data?.docs?.find((i) => i.name == 'Tin tức')?.slug
  const newsData = data?.data.docs

  return (
    <Header size='sm' desc='ĐÀO TẠO NHIỀU NGÔN NGỮ' title='Tin tức và Góc học tập' padding='50px 0'>
      <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
        <Row gutter={[48, 48]}>
          {newsData?.map((item) => (
            <Col span={24} md={12} key={item._id}>
              <Link to={`/${newsSlug}/${item.category?.slug}/${item.slug}`}>
                <Row gutter={[12, 12]} align='middle'>
                  <Col span={24} md={12}>
                    <ImageCustom
                      src={`${import.meta.env.VITE_FILE_ENDPOINT}/${item.coverUrl}`}
                      height='160px'
                      width='100%'
                      styles={{ borderRadius: 24, objectFit: 'cover' }}
                      preview={false}
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <Space direction='vertical' size='middle'>
                      <h2 className='dangerHTMLTwoLine'>{item.title}</h2>
                      <div className='dangerHTMLTwoLine'>{item.description}</div>
                    </Space>
                  </Col>
                </Row>
              </Link>
            </Col>
          ))}
        </Row>
      </LoadingCustom>
    </Header>
  )
}

export default News
