import './Introduce.scss'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Button, Col, Input, Row } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import SliderCustom from '@/components/SliderCustom'

export default function Introduce() {
  return (
    <>
      <ImageCustom
        preview={false}
        width='100%'
        src='https://langmaster.edu.vn/storage/images/2023/08/21/banner-01-1.webp'
      />
      <div className='div-intro-container'>
        <Row justify={'center'} gutter={[64, 32]} className='row-div'>
          <Col md={12} span={24}>
            <h3 className='intro'>GIỚI THIỆU</h3>
            <p className='title-UCAM'>Trung tâm anh ngữ UCAM</p>
            <p className='desc-UCAM'>
              UCAM tự hào là đơn vị đào tạo Anh ngữ hàng đầu tại Việt Nam với sự tận tâm, chân thành và trách nhiệm.
              Được thành lập từ năm 2014, UCAM đã trở thành nơi trao gửi niềm tin học tiếng Anh cho hàng ngàn học viên
              chuyên sâu trong 3 mảng đào tạo: Luyện thi TOEIC, IELTS, cho học viên trên khắp cả nước thông qua các lớp
              học offline, online và sách.
              <br />
              Hơn 8 năm hình thành và phát triển, UCAM đã chắp cánh ước mơ Anh Ngữ, tạo tiền đề cho hơn 30.000 ngàn học
              viên tốt nghiệp và có được nhiều cơ hội mới trong sự nghiệp. Đạt được những thành tựu đó, UCAM đã luôn đi
              theo triết lý “Tinh - Gọn - Nhẹ” trong từng bài giảng, rèn luyện cho học viên tinh thần tự giác và trách
              nhiệm trong học tập.
              <br />
              Với Slogan "Dare To Change" được lấy cảm hứng từ câu chuyện thật của CEO Vân Anh, đã dám thay đổi để thực
              hiện ước mơ của riêng mình. Giờ đây, UCAM không chỉ giúp học viên nuôi dưỡng tình yêu học tiếng Anh cháy
              bỏng, mà còn truyền cảm hứng sống tích cực cho từng học viên.
            </p>
          </Col>
          <Col md={12} span={24}>
            <ImageCustom preview={false} width='100%' src='https://anhnguAthena.vn/themes/default/img/img-22.png' />
          </Col>
        </Row>
        <Row justify={'center'} gutter={[64, 32]} className='row-div'>
          <Col md={12} span={24}>
            <ImageCustom preview={false} width='100%' src='https://anhnguathena.vn/themes/default/img/img-23.png' />
          </Col>
          <Col md={12} span={24}>
            <p className='title-UCAM'>Tầm nhìn</p>
            <p className='desc-UCAM'>Đến năm 2025 là đơn vị top 1 về phát triển ngôn ngữ tiếng Anh cho người trẻ.</p>
            <p className='title-UCAM'>Sứ mệnh</p>
            <p className='desc-UCAM'>Giúp 1 triệu người trẻ xóa mất gốc tiếng Anh</p>
            <p className='title-UCAM'>Giá trị cốt lõi.</p>
            <p className='desc-UCAM'>Tạo ra trải nghiệm tốt nhất cho khách hàng, cho nhân viên và cho cộng đồng.</p>
          </Col>
        </Row>
        <div className='group'>
          <h3 className='intro'>ĐỐI TÁC CỦA</h3>
          <p className='title-UCAM mb'>Trung Tâm Anh Ngữ UCAM</p>
          <SliderCustom autoplay infinite dataLength={4}>
            <div className='div-slider'>
              <ImageCustom
                height='60px'
                preview={false}
                width='100%'
                src='https://anhnguathena.vn/themes/default//img/kyna.png'
              />
            </div>
            <div className='div-slider'>
              <ImageCustom
                height='60px'
                preview={false}
                width='100%'
                src='https://anhnguathena.vn/themes/default//img/Unica.png'
              />
            </div>
            <div className='div-slider'>
              <ImageCustom
                preview={false}
                height='60px'
                width='100%'
                src='https://anhnguathena.vn/themes/default//img/logo%20edumall.png'
              />
            </div>
            <div className='div-slider'>
              <ImageCustom
                height='60px'
                preview={false}
                width='100%'
                src='https://anhnguathena.vn/themes/default//img/TMS-education%201.png'
              />
            </div>
            <div className='div-slider'>
              <ImageCustom
                height='60px'
                preview={false}
                width='100%'
                src='https://anhnguathena.vn/themes/default//img/logo%20edumall.png'
              />
            </div>
            <div className='div-slider'>
              <ImageCustom
                height='60px'
                preview={false}
                width='100%'
                src='https://anhnguathena.vn/themes/default//img/logo-moon-white-background.jpg'
              />
            </div>
          </SliderCustom>
        </div>
      </div>
      <div className='res-introduce'>
        <div className='res-box-1200'>
          <p className='res'>Đăng ký nhận tư vấn từ ANH NGỮ UCAM</p>
          <div className='div-input'>
            <Input placeholder='HỌ TÊN CỦA BẠN' />
            <Input placeholder='SỐ ĐIỆN THOẠI CỦA BẠN' />
            <Input placeholder='EMAIL CỦA BẠN' />
            <Button type='primary' className='btn-pri'>
              <SendOutlined />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
