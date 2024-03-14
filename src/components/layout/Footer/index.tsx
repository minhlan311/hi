import { formatNumber } from '@/common'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { Col, Flex, QRCode, Row, Space, Typography } from 'antd'
import GoogleMapReact from 'google-map-react'
import { useContext } from 'react'
import { FacebookProvider, Page } from 'react-facebook'
import { FaUser, FaUserPlus } from 'react-icons/fa6'
import { HiUserGroup } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './style.scss'
const { Title } = Typography

const Footer = () => {
  const { configs } = useContext(AppContext)
  const { sm, md, lg } = useResponsives()

  if (configs) {
    const footerArr = configs?.footer?.contents?.slice(1)
    const info = configs?.footer?.contents?.[0]

    return (
      <Header padding='50px 0' background='var(--green)'>
        <Row gutter={[48, 48]}>
          <Col span={24}>
            <Flex vertical gap={24}>
              <Row justify={'center'} align={'middle'} gutter={[sm || md ? 0 : 24, 24]}>
                <Col>
                  <img width={120} src={import.meta.env.VITE_FILE_ENDPOINT + '/' + configs?.logoFooter} />
                </Col>
                {configs?.branch?.map((item) => (
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
                {footerArr?.map((item) => (
                  <Col span={24} md={6} key={item?.name}>
                    <Flex gap={12} vertical>
                      <Title level={4} style={{ color: 'var(--white)' }}>
                        {item?.name}
                      </Title>
                      {item?.children?.map((child) => (
                        <Link to={child.href} key={child.href} className='link' style={{ color: 'var(--light-gray)' }}>
                          {child?.content}
                        </Link>
                      ))}
                    </Flex>
                  </Col>
                ))}
              </Row>
            </Flex>
          </Col>

          <Col span={24} md={12} lg={6}>
            <Flex vertical gap={12}>
              <Row gutter={12} align='middle'>
                <Col span={10} md={11}>
                  <img width='100%' src='https://images.dmca.com/Badges/dmca-badge-w250-2x1-04.png' alt='dmca' />
                </Col>
                <Col span={11} md={13}>
                  <img
                    width='100%'
                    src='https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png'
                    alt='bct'
                  />
                </Col>
              </Row>
              <Space>
                {configs.footer?.zaloLink && (
                  <QRCode
                    errorLevel='H'
                    value={configs.footer?.zaloLink}
                    icon='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png'
                    size={120}
                    iconSize={20}
                    bordered={false}
                    className='qrcode'
                  />
                )}
                {configs.footer?.facebookLink && (
                  <QRCode
                    errorLevel='H'
                    value={configs.footer?.facebookLink}
                    icon='https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg'
                    size={120}
                    iconSize={20}
                    bordered={false}
                    className='qrcode'
                  />
                )}
              </Space>
            </Flex>
          </Col>

          <Col span={24} md={12} lg={6}>
            <Flex gap={12} vertical key={info?.name}>
              <Title level={4} style={{ color: 'var(--white)' }}>
                {info?.name}
              </Title>
              {info?.children?.map((child) => (
                <Link to={child.href} key={child.href} className='link' style={{ color: 'var(--lighish-white)' }}>
                  {child?.content}
                </Link>
              ))}
              <Space direction='vertical' style={{ marginTop: 32, color: 'var(--white)' }}>
                <Flex align='center' gap={8}>
                  <HiUserGroup />
                  <p>Số lượt truy cập:</p>
                  <b>{formatNumber(6452142, 'number', 'lượt')}</b>
                </Flex>
                <Flex align='center' gap={8}>
                  <FaUser size={12} style={{ marginRight: 2 }} />
                  <p>Hôm nay:</p>
                  <b>{formatNumber(5235, 'number', 'lượt')}</b>
                </Flex>
                <Flex align='center' gap={8}>
                  <FaUserPlus /> <p>Đang xem:</p>
                  <b>{formatNumber(355, 'number', 'lượt')}</b>
                </Flex>
              </Space>
            </Flex>
          </Col>
          {configs.footer?.facebookAppId && (
            <Col span={24} md={12} lg={6}>
              <Title level={4} style={{ color: 'var(--white)' }}>
                FANPAGE
              </Title>
              <FacebookProvider appId={configs.footer?.facebookAppId}>
                <Page href={configs.footer?.facebookLink} height={500} />
              </FacebookProvider>
            </Col>
          )}
          {configs.footer?.googleMapKey && configs.footer?.coordinates?.lat && (
            <Col span={24} md={12} lg={6}>
              <Title level={4} style={{ color: 'var(--white)' }}>
                BẢN ĐỒ
              </Title>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: configs.footer?.googleMapKey,
                }}
                zoom={16}
                center={{
                  lat: parseFloat(configs.footer?.coordinates?.lat),
                  lng: parseFloat(configs.footer?.coordinates?.lng),
                }}
              ></GoogleMapReact>
            </Col>
          )}
        </Row>
      </Header>
    )
  }
}

export default Footer
