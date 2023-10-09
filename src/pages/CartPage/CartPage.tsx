/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { useContext } from 'react'
import css from './Cart.module.scss'
// import SliderCustom from '@/components/SliderCustom'
// import { coursesData } from '@/fakedata/fakedata'

import cartApi from '@/apis/cart.api'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Divider, Row } from 'antd'
import MenuCourses from './MenuCourses/MenuCourses'
import LoadingCustom from '@/components/LoadingCustom'

export default function CartPage() {
  const { profile } = useContext(AppContext)
  const { data, isLoading } = useQuery({
    queryKey: ['dataCart'],
    queryFn: () =>
      cartApi.getCartList({
        filterQuery: {
          userId: profile?._id,
        },
        options: {
          paginate: false,
        },
      }),
    enabled: profile?._id ? true : false,
  })

  const orderData = data?.data.docs && data?.data.docs

  const totalCost = orderData?.reduce((acc, product) => {
    if (product?.cost) {
      return acc + product?.cost
    }

    return acc
  }, 0)

  return (
    <div className={css.cart}>
      <Header title='Giỏ hàng của bạn' titleSize={40} titleStyle={{ margin: 0 }}>
        {!isLoading ? (
          orderData && data?.data.totalDocs > 0 ? (
            <Row className={css.renderCart} justify='space-between' gutter={60}>
              <Col span={24} xl={17}>
                <Row className='sp100'>
                  <Col className={css.cartLeft} span={24}>
                    {data?.data.totalDocs > 0 && (
                      <div>
                        <h3>{`Bạn có ${data?.data.totalDocs} khóa học trong giỏ hàng`}</h3>
                        <Divider className={css.divider} />
                      </div>
                    )}
                  </Col>

                  <>
                    <Col className={css.cartLeft} span={24}>
                      <MenuCourses coursesData={orderData as any} />
                    </Col>
                  </>
                  {/* ))} */}
                </Row>
              </Col>
              {data?.data.totalDocs > 0 && (
                <Col className={css.cartRight} span={24} xl={7}>
                  <div className={css.title}>Thành tiền :</div>
                  <div className={css.price}>
                    <PriceCalculator price={totalCost!} priceSize={32} showTotal showDiscount direction='column' />
                  </div>
                  <Button type='primary'>Thanh toán ngay</Button>
                </Col>
              )}
            </Row>
          ) : (
            <div className={css.empty}>
              <EmptyCustom buttonPrimaryText='Mua sắm ngay' buttonHref='/' description='Giỏ hàng hiện đang trống !' />
            </div>
          )
        ) : (
          <LoadingCustom
            style={{
              marginTop: '20vh',
            }}
          />
        )}
      </Header>
    </div>
  )
}
