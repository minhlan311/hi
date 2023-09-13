import { Button, Card, Col, Row, Space } from 'antd'
import { BsArrowRightCircle } from 'react-icons/bs'
import ball from '../../../assets/icons/ball.svg'
import bird from '../../../assets/icons/bird.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
import chn from '../../../assets/icons/china_flag.svg'
import eng from '../../../assets/icons/eng_flag.svg'
import ger from '../../../assets/icons/germany_flag.svg'
import jpn from '../../../assets/icons/japan_flag.svg'
import kor from '../../../assets/icons/korea_flag.svg'

import courseBn from '../../../assets/images/backgrounds/course-banner.svg'
export default function TopCourses() {
  const courseData = [
    {
      name: 'Tiếng Trung',
      desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
      cover:
        'https://littlestepsasia.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2021/08/06153111/Best_Mandarin_Classes_Kuala_Lumpur.jpg',
      flag: <img src={chn} alt='chn' />
    },
    {
      name: 'Tiếng Anh',
      desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
      cover: 'https://www.englishexplorer.com.sg/wp-content/uploads/2017/02/english-course.jpg',
      flag: <img src={eng} alt='eng' />
    },
    {
      name: 'Tiếng Nhật',
      desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
      cover: 'https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png',
      flag: <img src={jpn} alt='jpn' />
    },
    {
      name: 'Tiếng Đức',
      desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
      cover:
        'https://www.studying-in-germany.org/wp-content/uploads/2018/08/learn-german-language-with-online-courses.jpg',
      flag: <img src={ger} alt='ger' />
    },
    {
      name: 'Tiếng Hàn',
      desc: 'Tiếng Anh là ngôn ngữ  phổ biến của toàn cầu, ngôn ngữ này là lợi thế giúp bạn mở rộng cánh cửa tương lai của bạn',
      cover: 'https://www.90daykorean.com/wp-content/uploads/2020/10/Online-Korean-Course-min-1.png',
      flag: <img src={kor} alt='kor' />
    }
  ]
  return (
    <Header size='sm' title='' desc='' padding='60px 0' background='var(--lighish-white)'>
      <img src={ball} alt='ball' className='ball' />
      <img src={bird} alt='bird' className='point3' />
      <div className='list-course'>
        <div className='ls-title'>
          <p className='desc'>ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
          <h2 className='title'>Các khóa học tiêu biểu</h2>
        </div>
        <Row gutter={[24, 24]} justify='space-between'>
          {courseData.map((item, id) => (
            <Col span={24} md={12} xl={8} key={id}>
              <Card
                size='small'
                cover={<img src={item.cover} alt={item.cover} className='cover' />}
                className='intro-card'
              >
                <Space direction='vertical'>
                  <div className='d-space-c'>
                    <Row align='middle'>
                      <Space align='center'>
                        <div style={{ marginTop: 5 }}> {item.flag}</div>
                        <h2>{item.name}</h2>
                      </Space>
                    </Row>
                    <Button size='small' type='primary' className='course-count'>
                      28+ Khóa
                    </Button>
                  </div>
                  <div>{item.desc}</div>
                  <Button type='link' size='small'>
                    <Space>
                      <p>Xem thêm</p>
                      <BsArrowRightCircle style={{ marginTop: 7 }} />
                    </Space>
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
          <Col md={12} xl={8}>
            <img src={courseBn} alt='banner' className='courseBn' />
          </Col>
        </Row>
      </div>
    </Header>
  )
}
