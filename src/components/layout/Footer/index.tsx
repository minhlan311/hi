import { formatNumber } from '@/common'
import { AppContext } from '@/contexts/app.context'
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

  if (configs)
    return (
      <Header padding='50px 0' background='var(--green)'>
        <Row gutter={[48, 48]}>
          <Col span={24} md={12} lg={6}>
            <Flex vertical gap={12}>
              <img height={50} src={import.meta.env.VITE_FILE_ENDPOINT + '/' + configs?.logo} className='logo-footer' />
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
            {configs.footer?.contents?.map((item) => (
              <Flex gap={12} vertical key={item.name}>
                <Title level={4} style={{ color: 'var(--white)' }}>
                  {item?.name}
                </Title>
                {item.children.map((child) => (
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
            ))}
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

export default Footer
