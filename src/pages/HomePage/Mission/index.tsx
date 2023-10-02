import { Col, Row, Space } from 'antd'
import sixstep from '../../../assets/images/backgrounds/6step.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
import useResponsives from '@/hooks/useResponsives'

export default function Mission() {
  const { sm } = useResponsives()

  return (
    <Header background='var(--lighish-white)'>
      <Space direction='vertical' className='sp100 ms-main'>
        <Row justify='space-between' gutter={[24, 24]}>
          <Col span={24} md={12}>
            <div className='ms-item'>
              <img
                src='https://mondo.com/wp-content/uploads/2023/02/ways-to-find-a-job-you-love-when-youre-feeling-stuck-2023-768x403.jpg'
                alt=''
                className='ms-bg'
              />
              <Space direction='vertical' size='large' style={{ float: 'right' }} className='ms-content'>
                <h1 style={{ float: 'right' }}>TẦM NHÌN</h1>
                <p>
                  Trở thành hệ sinh thái đào tạo tiếng Anh giao tiếp & tạo môi trường chuyển hoá toàn diện cho nhiều học
                  viên nhất tại Việt Nam
                </p>
              </Space>
            </div>
          </Col>
          <Col span={24} md={12}>
            <div className='ms-item'>
              <img
                src='https://taylorsmithconsulting.com/wp-content/uploads/2017/02/job-seeker-d.jpg'
                alt=''
                className='ms-bg'
              />
              <Space direction='vertical' size='large' className='ms-content'>
                <h1>SỨ MỆNH</h1>
                <p>Chuyển hóa người khác bằng việc thay đổi chính mình</p>
              </Space>
            </div>
          </Col>
        </Row>
        <div className='ms-6-step'>
          <div className='step-shape'>
            <img
              src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/office-background-videos-design-template-ff44603e798c049277e976edd55418cf_screen.jpg?ts=1618565651'
              alt=''
              className='ms-bg'
            />
            <div className='ms-content'>
              <h1>6 GIÁ TRỊ CỐT LÕI</h1>
              <div className='step'>
                <img src={sixstep} alt='' className='sixstep' />

                <div className='ms-step'>
                  <Row justify='space-between' gutter={sm ? [30, 30] : [0, 55]}>
                    <Col span={24} md={10}>
                      <h2>Tập trung vào khách hàng</h2>
                    </Col>
                    <Col span={24} md={10} offset={sm ? 0 : 4}>
                      <h2>Hiệu suất và Hiệu quả</h2>
                    </Col>
                    <Col span={24} md={10}>
                      <h2>Cảm kết và Trách nhiệm</h2>
                    </Col>
                    <Col span={24} md={8} offset={sm ? 0 : 2}>
                      <h2>Học hỏi, Sáng tạo và Đổi mới</h2>
                    </Col>
                    <Col span={24} md={11}>
                      <h2>Tính chính trực</h2>
                    </Col>
                    <Col span={24} md={11} offset={sm ? 0 : 2}>
                      <h2>Kỷ luật và sức mạnh</h2>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Space>
    </Header>
  )
}
