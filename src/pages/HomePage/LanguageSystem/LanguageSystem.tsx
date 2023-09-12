import { Button, Col, Image, Row, Typography } from 'antd'
import './LanguageSystem.scss'

export default function LanguageSystem() {
  return (
    <div className='container-languge'>
      <p className='title-languge'>Hệ thống đào tạo ngoại ngữ giao tiếp & môi trường chuyển hóa toàn diện</p>
      <Row className='row-antd-grid' gutter={[16, 16]} justify='center'>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <Typography className='title-row'>KHÓA HỌC OFFLINE</Typography>
            <Image
              className='img-learn'
              preview={false}
              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/373353651_3549756531940240_3759955053989404732_n.jpg?stp=dst-jpg_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_ohc=MlD-yJ3LnuoAX8kYULo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRSFPCOSN7Cn_emH06HMTUeM4m3e3BuFV7yWb5bLmDa4w&oe=6520C657'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC TRỰC TUYẾN</p>
            <Image
              className='img-learn'
              preview={false}
              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/373353651_3549756531940240_3759955053989404732_n.jpg?stp=dst-jpg_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_ohc=MlD-yJ3LnuoAX8kYULo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRSFPCOSN7Cn_emH06HMTUeM4m3e3BuFV7yWb5bLmDa4w&oe=6520C657'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC TRỰC TUYẾN 1 KÈM 1</p>
            <Image
              className='img-learn'
              preview={false}
              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/373353651_3549756531940240_3759955053989404732_n.jpg?stp=dst-jpg_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_ohc=MlD-yJ3LnuoAX8kYULo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRSFPCOSN7Cn_emH06HMTUeM4m3e3BuFV7yWb5bLmDa4w&oe=6520C657'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC ONLINE</p>
            <Image
              className='img-learn'
              preview={false}
              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/373353651_3549756531940240_3759955053989404732_n.jpg?stp=dst-jpg_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_ohc=MlD-yJ3LnuoAX8kYULo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRSFPCOSN7Cn_emH06HMTUeM4m3e3BuFV7yWb5bLmDa4w&oe=6520C657'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
