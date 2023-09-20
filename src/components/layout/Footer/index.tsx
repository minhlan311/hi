import ucamFooter from '@/assets/icons/ucamFooter.png'
import { Col, Row, Space, Typography } from 'antd'
import './styles.scss'
const { Text } = Typography

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='footer-col'>
          {/* <div className='grid '> */}
          <Row justify={'center'} gutter={[20, 20]}>
            <Col className='' style={{ textAlign: 'start' }}>
              <div className='col-footer-left'>
                <Space
                  direction='vertical'
                  style={{
                    position: 'relative',
                  }}
                >
                  <div className='mtz-footer-logo'>
                    <img src={ucamFooter} />
                  </div>

                  <Space className='social-group'>
                    <div style={{ textAlign: 'start' }}>{/* <DCMASVG /> */}</div>
                  </Space>
                </Space>
              </div>
            </Col>
            <Col className=''>
              <div className='col-footer-right max-w'>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-yellow-heading'>VĂN PHÒNG TP HCM</Text>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#FFFFFF',
                    }}
                  >
                    <ul className='ul-fff'>
                      <li>Địa chỉ: 699 Nguyễn Kiệm, Phường 3, Quận Gò Vấp, TP Hồ Chí Minh</li>
                      <li>Hotline: 0769.340.340</li>
                    </ul>
                  </div>
                </Space>
              </div>
            </Col>
            <Col className=''>
              <div className='col-footer-left max-w'>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-yellow-heading'>CHI NHÁNH QUẢNG NGÃI</Text>
                  <ul className='ul-fff'>
                    <li>Địa chỉ: 116 Hai Bà Trưng , P.Lê Hồng Phong, TP. Quảng Ngãi</li>
                    <li>Hotline: 0769.340.340</li>
                  </ul>
                </Space>
              </div>
            </Col>
            <Col className=''>
              <div className='col-footer-right max-w'>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-yellow-heading'>CHI NHÁNH BÌNH PHƯỚC</Text>
                  <ul className='ul-fff'>
                    <li>Địa chỉ: 922/10 QL14, Phường Tiến Thành,TP Đồng Xoài, Tỉnh Bình Phước</li>
                    <li>Hotline: 0769.340.340</li>
                  </ul>
                </Space>
              </div>
            </Col>
          </Row>
          {/* </div> */}

          <Row className='' justify={'center'} gutter={[10, 10]}>
            <Col className='' style={{ textAlign: 'start' }}>
              <div className='col-footer-left max-w'>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-white-heading'>Giới thiệu</Text>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <ul className='ul-fff'>
                      <li>Về chúng tôi</li>
                      <li>Đội ngũ giáo viên</li>
                      <li>Khách hàng và đối tác</li>
                      <li>Tin tức</li>
                    </ul>
                  </div>
                </Space>
              </div>
            </Col>
            <Col className=''>
              <div className='col-footer-right max-w' style={{ textAlign: 'start' }}>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-white-heading'>Tuyển dụng</Text>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <ul className='ul-fff'>
                      <li>Become a Teacher</li>
                      <li>Cơ hội việc làm</li>
                      <li>Sổ tay nhân viên</li>
                      <li>Góc học tập</li>
                    </ul>
                  </div>
                </Space>
              </div>
            </Col>
            <Col className=''>
              <div className='col-footer-left max-w' style={{ textAlign: 'start' }}>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-white-heading'>Cung cấp giáo viên bản ngữ</Text>
                  <ul className='ul-fff'>
                    <li>Mầm non & Tiểu học</li>
                    <li>Trường THCS-THPT</li>
                    <li>Đại học và sau đại học</li>
                    <li>Trung tâm Anh Ngữ</li>
                  </ul>
                </Space>
              </div>
            </Col>
            <Col className=''>
              <div className='col-footer-right max-w' style={{ textAlign: 'start' }}>
                <Space direction='vertical' style={{ textAlign: 'start' }}>
                  <Text className='footer-heading text-white-heading'>Khóa học tiếng Anh</Text>
                  <ul className='ul-fff'>
                    <li>Tiếng anh 1 kèm 1</li>
                    <li>Tiếng Anh cho trẻ em </li>
                    <li>Tiếng Anh cho người đi làm</li>
                    <li>Tiếng Anh Doanh nghiệp</li>
                  </ul>
                </Space>
              </div>
            </Col>
          </Row>

          <hr className='hr-footer' />
          <div className='grid '>
            <div className='rowM flex-col-footer-bottom'>
              <div className='white-color-link container-link' style={{ textAlign: 'start' }}>
                {/* <Link className='white-color-link hover-link-white'>Quyền riêng tư</Link>
                <Link className='white-color-link hover-link-white'>Chính sách bảo mật</Link>
                <Link className='white-color-link hover-link-white'>Điều khoản</Link>
                <Link className='white-color-link hover-link-white'>Bản quyền</Link>
                <Link className='white-color-link hover-link-white'>Hình thức thanh toán</Link>
                <Link className='white-color-link hover-link-white'>Chính sách đổi/ Hủy hoàn tiền</Link> */}
              </div>
              <div className='div-icons'>
                {/* <FbSVG className='icon-link-footer' />
                <BeSVG className='icon-link-footer' />
                <LinkInSVG className='icon-link-footer' /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
