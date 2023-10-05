/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'
import { getIdFromUrl } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TeacherPage() {
  const location = useLocation()
  const currentPath = location.pathname
  const id = getIdFromUrl(currentPath)

  const { data, isLoading } = useQuery({
    queryKey: ['cateSub', currentPath],
    queryFn: () =>
      categoryApi.getCategories({
        parentId: '650002b9dffb95727e9cb9e6',
      }),
    enabled: id ? true : false,
  })

  const { data: detailData } = useQuery({
    queryKey: ['cateDetail', currentPath],
    queryFn: () => categoryApi.getCategorieDetail('650002b9dffb95727e9cb9e6'),
    enabled: id ? true : false,
  })
  const navigate = useNavigate()

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
            height='500px'
            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + detailData?.data?.coverUrl}
          />
          <div className='h2'>
            <div className='div-cate'>
              <h2>{detailData?.data?.name}</h2>
              <div className='box-desc' dangerouslySetInnerHTML={{ __html: detailData?.data?.content as any }}></div>
              <div>
                <Row gutter={[32, 32]} justify={'center'}>
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
                              {' '}
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
