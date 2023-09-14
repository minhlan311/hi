import { Button, Card, Col, Row, Space } from 'antd'
import { BsArrowRightCircle } from 'react-icons/bs'
import ball from '../../../assets/icons/ball.svg'
import bird from '../../../assets/icons/bird.svg'
import chn from '../../../assets/icons/china_flag.svg'
import eng from '../../../assets/icons/eng_flag.svg'
import ger from '../../../assets/icons/germany_flag.svg'
import jpn from '../../../assets/icons/japan_flag.svg'
import kor from '../../../assets/icons/korea_flag.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'

import categoryApi from '@/apis/categories.api'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import courseBn from '../../../assets/images/backgrounds/course-banner.svg'
export default function TopCourses() {
  const { data: categoriesData } = useQuery({
    queryKey: ['topCategories'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af'
      })
    }
  })

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
          {categoriesData?.data?.docs?.map((item, id) => (
            <Col span={24} md={12} xl={8} key={id}>
              <Link to={`/${item?.slug}`}>
                <Card
                  size='small'
                  cover={
                    <img
                      src={
                        (item.name === 'Tiếng Trung' &&
                          'https://littlestepsasia.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2021/08/06153111/Best_Mandarin_Classes_Kuala_Lumpur.jpg') ||
                        (item.name === 'Tiếng Anh' &&
                          'https://www.englishexplorer.com.sg/wp-content/uploads/2017/02/english-course.jpg') ||
                        (item.name === 'Tiếng Nhật' &&
                          'https://www.classcentral.com/report/wp-content/uploads/2023/02/ASL-BCG-Banner.png') ||
                        (item.name === 'Tiếng Đức' &&
                          'https://www.studying-in-germany.org/wp-content/uploads/2018/08/learn-german-language-with-online-courses.jpg') ||
                        'https://www.90daykorean.com/wp-content/uploads/2020/10/Online-Korean-Course-min-1.png'
                      }
                      alt={item.name}
                      className='cover'
                    />
                  }
                  hoverable
                  className='intro-card'
                >
                  <Space direction='vertical'>
                    <div className='d-space-c'>
                      <Row align='middle'>
                        <Space align='center'>
                          <div style={{ marginTop: 5 }}>
                            {(item.name === 'Tiếng Trung' && <img src={chn} alt='chn' />) ||
                              (item.name === 'Tiếng Anh' && <img src={eng} alt='eng' />) ||
                              (item.name === 'Tiếng Nhật' && <img src={jpn} alt='jpn' />) ||
                              (item.name === 'Tiếng Đức' && <img src={ger} alt='ger' />) ||
                              (item.name === 'Tiếng Hàn' && <img src={kor} alt='kor' />)}
                          </div>
                          <h2>{item.name}</h2>
                        </Space>
                      </Row>
                      <Button size='small' type='primary' className='course-count'>
                        {item.countCourse > 0 ? `${item.countCourse}+ Khóa` : 'Chưa có khóa học nào'}
                      </Button>
                    </div>
                    <div>{item.description}</div>
                    <Button type='link' size='small'>
                      <Space>
                        <p>Xem thêm</p>
                        <BsArrowRightCircle style={{ marginTop: 7 }} />
                      </Space>
                    </Button>
                  </Space>
                </Card>
              </Link>
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
