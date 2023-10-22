import { Button, Col, Image, Row } from 'antd'
import './LanguageSystem.scss'

export default function LanguageSystem() {
  return (
    <div className='container-languge'>
      <p className='title-languge'>Hệ thống đào tạo ngoại ngữ giao tiếp & môi trường chuyển hóa toàn diện</p>
      <Row className='row-antd-grid' gutter={[16, 16]} justify='center'>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC OFFLINE</p>
            <Image
              className='img-learn'
              preview={false}
              height={200}
              width={200}
              src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.2.1251102529.1695866662&semt=sph'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC TRỰC TUYẾN</p>
            <Image
              height={200}
              width={200}
              className='img-learn'
              preview={false}
              src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.2.1251102529.1695866662&semt=sph'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC TRỰC TUYẾN 1 KÈM 1</p>
            <Image
              height={200}
              width={200}
              className='img-learn'
              preview={false}
              src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.2.1251102529.1695866662&semt=sph'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6}>
          <div className='div-card'>
            <p className='title-row'>KHÓA HỌC ONLINE</p>
            <Image
              height={200}
              width={200}
              className='img-learn'
              preview={false}
              src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.2.1251102529.1695866662&semt=sph'
            />
            <Button className='button-row'>Xem chi tiết</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
