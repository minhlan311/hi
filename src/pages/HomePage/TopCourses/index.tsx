/* eslint-disable @typescript-eslint/no-explicit-any */
import useResponsives from '@/hooks/useResponsives'
import { CategoryState } from '@/interface/category'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Card, Col, Row, Space, Tooltip } from 'antd'
import { BsArrowRightCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ball from '../../../assets/icons/ball.svg'
import bird from '../../../assets/icons/bird.svg'
import courseBn from '../../../assets/images/backgrounds/course-banner.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'

export default function TopCourses() {
  const queryClient = useQueryClient()
  const categories: any = queryClient.getQueryData(['categoriesList'])

  const courses = categories?.data?.docs?.find((item: CategoryState) => item.name === 'Khóa học')

  const { xl } = useResponsives()

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
          {courses?.children?.map((item: CategoryState, id: number) => (
            <Col span={24} md={12} xl={8} key={id}>
              <Link to={`${courses.slug}/${item?.slug}`}>
                <Card
                  size='small'
                  cover={
                    <img
                      src={`${import.meta.env.VITE_FILE_ENDPOINT}/${item.coverUrl}`}
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
                            <img
                              src={`${import.meta.env.VITE_FILE_ENDPOINT}/${item.icon}`}
                              alt={item.icon}
                              width={35}
                            />
                          </div>
                          <h2>{item.name}</h2>
                        </Space>
                      </Row>
                      <Button size='small' type='primary' className='course-count'>
                        {item.countCourse > 0 ? `${item.countCourse}+ Khóa` : 'Chưa có khóa học nào'}
                      </Button>
                    </div>
                    <Tooltip title={item.description}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                        className={xl ? undefined : 'dangerHTMLThreeLine'}
                      ></div>
                    </Tooltip>
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
