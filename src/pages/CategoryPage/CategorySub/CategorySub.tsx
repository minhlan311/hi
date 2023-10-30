/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import { useQuery } from '@tanstack/react-query'
import './CategorySub.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import WrapMore from '@/components/WrapMore/WrapMore'

export default function CategorySub() {
  const { categorySlug } = useParams()
  const navigate = useNavigate()
  const { data: detailData, isLoading } = useQuery({
    queryKey: ['cateDetail', categorySlug],
    queryFn: () => categoryApi.getCategorieDetailSlug(categorySlug!),
    enabled: categorySlug ? true : false,
    onError: (error: any) => {
      if (error?.response && error?.response?.status === 404) {
        navigate('/404')
      }
    },
  })

  const { data } = useQuery({
    queryKey: ['cateSub', categorySlug],
    queryFn: () =>
      categoryApi.getCategories({
        parentId: detailData?.data?._id,
      }),
    enabled: detailData?.data?._id ? true : false,
  })

  return (
    <>
      {isLoading ? (
        <LoadingCustom
          tip='Vui lòng chờ ...'
          style={{
            marginTop: '300px',
          }}
        />
      ) : (
        <>
          <ImageCustom
            styles={{
              objectFit: 'cover',
            }}
            width='100%'
            height='100%'
            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + detailData?.data?.coverUrl}
          />
          <div className='h2'>
            <div className='div-cate'>
              <h2>{detailData?.data?.name}</h2>

              <WrapMore
                title=''
                maxWidth='100%'
                children={
                  <div
                    className='box-desc'
                    dangerouslySetInnerHTML={{ __html: detailData?.data?.content as any }}
                  ></div>
                }
                wrapper={'nonBorder'}
              ></WrapMore>
              <div>
                <Row style={{ marginTop: '100px' }} gutter={[32, 32]} justify={'center'}>
                  {data?.data?.docs?.map((item) => (
                    <Col>
                      <Card
                        hoverable
                        onClick={() => navigate(`${item?.slug + '-i-' + item?._id}`)}
                        style={{ width: 340, height: 410 }}
                        cover={
                          <ImageCustom
                            styles={{
                              objectFit: 'cover',
                            }}
                            preview={false}
                            height='160px'
                            width='100%'
                            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverUrl}
                          />
                        }
                      >
                        <Meta
                          description={
                            <>
                              <TextWithTooltip rows={1} children={item?.name} className='link-h4-config' />
                              <TextWithTooltip rows={5} children={item?.description} className='p-config' />
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
