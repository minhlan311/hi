/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import { getIdFromUrl } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import './CategorySub.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'

export default function CategorySub() {
  const location = useLocation()
  const currentPath = location.pathname
  const id = getIdFromUrl(currentPath)

  console.log('currentPath')

  const { data } = useQuery({
    queryKey: ['cateSub', currentPath],
    queryFn: () =>
      categoryApi.getCategories({
        parentId: id,
      }),
    enabled: id ? true : false,
  })

  const { data: detailData, isLoading } = useQuery({
    queryKey: ['cateDetail', currentPath],
    queryFn: () => categoryApi.getCategorieDetail(id!),
    enabled: id ? true : false,
  })
  const navigate = useNavigate()
  console.log(data?.data, '-----------------')

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
