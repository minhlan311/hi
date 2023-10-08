/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { useContext } from 'react'
import css from './Cart.module.scss'
// import SliderCustom from '@/components/SliderCustom'
// import { coursesData } from '@/fakedata/fakedata'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'

import Header from '@/components/layout/Header/Header'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, List, Row, Space } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import cartApi from '@/apis/cart.api'
import { AppContext } from '@/contexts/app.context'

export default function CartPage() {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['dataCart'],
    queryFn: () =>
      cartApi.getCartList({
        userId: profile?._id,
      }),
    enabled: profile?._id ? true : false,
  })

  const mutate = useMutation({
    mutationFn: (body: any) => cartApi.deleteCourseCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataCart'] })
    },
  })

  const deleteCart = (id: string) => {
    console.log(id, 'ididid')

    mutate.mutate({
      userId: profile?._id,
      courseId: id,
    })
  }

  const [form] = Form.useForm()

  const orderData = data?.data.docs && data?.data.docs

  console.log(orderData, 'orderData')

  return (
    <div className={css.cart}>
      <Header title='Giỏ hàng của bạn' titleSize={40} titleStyle={{ margin: 0 }}>
        {orderData && orderData?.length > 0 ? (
          <Row className={css.renderCart} justify='space-between' gutter={60}>
            <Col span={24} xl={17}>
              <Row className='sp100'>
                <Col className={css.cartLeft} span={24}>
                  {orderData?.length > 0 && (
                    <div className={css.cart}>
                      <h3>{`Ban có ${orderData?.length} khóa học trong giỏ hàng`}</h3>
                      <Divider className={css.divider} />
                    </div>
                  )}
                </Col>
                {orderData?.map((item) => (
                  <>
                    <Col className={css.cartLeft} span={24}>
                      {item?.name}
                      <Button onClick={() => deleteCart(item?._id)}>Xóa sản phẩm</Button>
                    </Col>
                  </>
                ))}
              </Row>
            </Col>
            {orderData?.length > 0 && (
              <Col className={css.cartRight} span={24} xl={7}>
                <div className={css.title}>合計:</div>
                <div className={css.price}>
                  {/* <PriceCalculator priceSize={32} showTotal showDiscount direction='column' /> */}
                </div>
                <ButtonCustom htmlType='submit' size='large' className='sp100' href='/cart/checkout'>
                  精算
                </ButtonCustom>
                <Divider />
                <div className={css.title}>プロモーション</div>
                <List
                  renderItem={(item: any) => (
                    <List.Item style={{ margin: 0 }}>
                      <Space>
                        <ButtonCustom type='text' shape='circle' icon={<CloseOutlined />}></ButtonCustom>
                        <h3 className={css.title} style={{ padding: 0 }}>
                          {item?.code}
                        </h3>
                        <p>-{item?.discount}%</p>
                      </Space>
                    </List.Item>
                  )}
                />
                <Form form={form}>
                  <Space.Compact className='sp100'>
                    <Form.Item
                      name='code'
                      className='sp100'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập code',
                        },
                      ]}
                    >
                      <Input placeholder='クーポンを入力してください' />
                    </Form.Item>
                    <Form.Item>
                      <ButtonCustom htmlType='submit'>適用</ButtonCustom>
                    </Form.Item>
                  </Space.Compact>
                </Form>
              </Col>
            )}
          </Row>
        ) : (
          <div className={css.empty}>
            <EmptyCustom buttonPrimaryText='Mua sắm ngay' buttonHref='/' description='Giỏ hàng hiện đang trống !' />
          </div>
        )}
      </Header>
    </div>
  )
}
