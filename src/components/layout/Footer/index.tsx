/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { Col, Flex, Row, Typography, Image } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './style.scss'
import { UsergroupDeleteOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'

const { Title } = Typography

const Footer = () => {
  const { configs } = useContext(AppContext)
  const { sm, md, lg } = useResponsives()
  if (configs)
    return (
      <Header padding='50px 0' background='var(--green)'>
        {/* <Flex vertical gap={24}>
          <Row justify={'center'} align={'middle'} gutter={[sm || md ? 0 : 24, 24]}>
            <Col>
              <img width={120} src={import.meta.env.VITE_FILE_ENDPOINT + '/' + configs?.logoFooter} />
            </Col>
            {configs.branch.map((item) => (
              <Col span={24} md={configs.branch.length === 1 ? 8 : 5} key={item.name}>
                <Title level={5} style={{ color: '#fcb408' }}>
                  {item?.name}
                </Title>
                <Flex vertical gap={3} style={{ lineHeight: 1.6 }}>
                  <p className='link' style={{ color: 'var(--light-gray)' }}>
                    Hotline: {item?.phoneNumber}
                  </p>
                  <p className='link' style={{ color: 'var(--light-gray)' }}>
                    Địa chỉ: {item?.address}
                  </p>
                </Flex>
              </Col>
            ))}
          </Row>
          <Row justify={'center'} gutter={[sm || md || lg ? 0 : 24, 24]}>
            {configs.footer?.map((item) => (
              <Col span={24} md={6} key={item.name}>
                <Flex gap={12} vertical>
                  <Title level={4} style={{ color: 'var(--white)' }}>
                    {item?.name}
                  </Title>
                  {item.children.map((child) => (
                    <Link to={child.href} key={child.href} className='link' style={{ color: 'var(--light-gray)' }}>
                      {child?.content}
                    </Link>
                  ))}
                </Flex>
              </Col>
            ))}
          </Row>
        </Flex> */}
        <div className='footer'>
          <Row gutter={[16, 16]}>
            <Col span={6} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Image
                width={300}
                src='https://trungcapbachkhoa.edu.vn/wp-content/uploads/2023/12/bct-2-1.png'
                preview={false}
              />
              <div className='qr-section'>
                <Image
                  width={100}
                  src='https://trungcapbachkhoa.edu.vn/wp-content/uploads/2023/12/QR-BKS.jpg'
                  preview={false}
                />
                <Image
                  width={100}
                  src='https://trungcapbachkhoa.edu.vn/wp-content/uploads/2023/12/qrcode_bks.png'
                  preview={false}
                />
              </div>
            </Col>
            <Col span={6} xs={24} sm={12} md={8} lg={6} xl={6}>
              <div className='introduce-section'>
                <h2>GIỚI THIỆU</h2>
                <h3>
                  <a>Về chúng tôi</a>
                </h3>
                <h3>
                  <a>Tuyển sinh</a>
                </h3>
                <h3>
                  <a>Khoá học sơ cấp</a>
                </h3>
                <h3>
                  <a>Tin tức</a>
                </h3>
              </div>
              <div className='detail-section'>
                <h3>
                  <UsergroupDeleteOutlined style={{ marginRight: '5px' }} />
                  Số lượt truy cập: 1203 lượt
                </h3>
                <h3>
                  <UserOutlined style={{ marginRight: '5px' }} />
                  Hôm nay: 700 lượt{' '}
                </h3>
                <h3>
                  <UsergroupAddOutlined style={{ marginRight: '5px' }} />
                  Đang xem: 0 lượt
                </h3>
              </div>
            </Col >
            <Col span={6} xs={24} sm={12} md={8} lg={6} xl={6}>
              <div className='fanpage-section'>
                <h2>FANPAGE</h2>
                <iframe
                  src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhighlandscoffeevietnam&tabs&width=250&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
                  width='250'
                  height='300'
                  style={{ border: 'none', overflow: 'hidden' }}
                  allowFullScreen={true}
                  allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                ></iframe>
              </div>
            </Col>
            <Col span={6} xs={24} sm={12} md={8} lg={6} xl={6}>
              <div className='map-section'>
                <h2>BẢN ĐỒ</h2>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5399005810123!2d105.844617740442!3d21.01107263862931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab45b3007ee5%3A0xe4a265c210c5a7e!2sHighland%20Coffee!5e0!3m2!1svi!2s!4v1709729118139!5m2!1svi!2s'

                  width='300'
                  height='200'
                  allowFullScreen={false}
                ></iframe>
              </div>
            </Col>
          </Row>
        </div>
      </Header>
    )
}

export default Footer
