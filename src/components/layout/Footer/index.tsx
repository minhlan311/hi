import { AppContext } from '@/contexts/app.context'
import { Col, Flex, Row, Typography } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
const { Title } = Typography

const Footer = () => {
  const { configs } = useContext(AppContext)

  if (configs)
    return (
      <Header padding='50px 0' background='var(--green)'>
        <Flex vertical gap={24}>
          <Row justify={'center'} align={'middle'} gutter={[24, 24]}>
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
          <Row justify={'center'} gutter={[24, 24]}>
            {configs.footer.map((item) => (
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
        </Flex>
      </Header>
    )
}

export default Footer
