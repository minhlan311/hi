import { Button, Col, Row } from 'antd'
import ballSVG from '../../../assets/icons/ball.svg'
import birdSVG from '../../../assets/icons/bird.svg'
import pencilSVG from '../../../assets/icons/pencil.svg'
import './Gift.scss'
import PromotionCountdown from './PromotionCountdown/PromotionCountdown'

export default function Gift() {
  return (
    <div className='container-gift'>
      <div className='max-w-1200'>
        <div className='pencilSVG'>
          <img src={pencilSVG} alt='' />
        </div>
        <div className='ballSVG'>
          <img src={ballSVG} alt='' />
        </div>
        <div className='birdSVG'>
          <img src={birdSVG} alt='' />
        </div>
        <div className='gradient'>
          <h3>QUÀ TẶNG KHUYẾN MẠI</h3>
        </div>
        <Row className='row-center-antd-gift' gutter={[16, 16]} justify='center'>
          <Col className='col-left' xs={24} sm={24} md={12} lg={12}>
            <div className='col-left-in'>
              <div className='top'>
                {' '}
                <p>THỜI GIAN CHỈ CÒN</p>
              </div>

              <div className='bot'>
                <PromotionCountdown />
              </div>
            </div>
          </Col>
          <Col className='col-right' xs={24} sm={24} md={12} lg={12}>
            <div className='title'>
              <h4>KÈM NHỮNG QUÀ TẶNG HẤP DẪN</h4>
            </div>
            <div className='list'>
              <ul>
                <li>Giảm - 40% HỌC PHÍ</li>
                <li>FREE Giác trình & tài liệu + VIDEO bài giảng bổ trợ kiến thức gửi SHIP tận nhà</li>
                <li>Tặng học bổng tiền mặt 800.000đ - 1.000.000đ trừ vào học phí</li>
                <li>Hỗ trợ MIỄN PHÍ học phí cho HSSV và người mới học từ đầu</li>
              </ul>
            </div>
            <div className='button'>
              <Button className='button-in'>GỬI NGAY</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
