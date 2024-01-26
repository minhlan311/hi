/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Col, Flex, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { HiOutlineBookOpen, HiOutlineUserGroup } from 'react-icons/hi2'
import MyCourses from '../ProfilePage/MyCourses'
import ScheduleDetail from './Components/ScheduleDetail'
import style from './styles.module.scss'

const OpeningPage = () => {
  const { sm, md } = useResponsives()

  const { data: courseData } = useQuery({
    queryKey: ['courseData'],
    queryFn: () => {
      return courseApi.getCourses({ options: { sort: { createdAt: -1 }, limit: 3 } })
    },
  })

  return (
    <Header padding={'35px 0 50px 0'}>
      <Space direction='vertical' size='large' className={'sp100'}>
        <div className={style.ads}>
          <h1 className={style.title}>Ưu đãi tháng {moment().format('M')}</h1>
          <Row gutter={40} align='middle'>
            <Col span={24} md={15} className={style.desc}>
              <Space direction='vertical' size='large' className={'sp100'}>
                <Flex align='center' gap={12} vertical={sm} className={style.content}>
                  <HiOutlineBookOpen size={sm || md ? 35 : 24} />
                  <p>
                    Khóa
                    <b>IELTS</b>
                    còn
                    <b>0</b>
                    suất học bổng lên đến
                    <b>
                      <PriceCalculator price={2000000} />
                    </b>
                  </p>
                </Flex>
                <Flex align='center' gap={12} vertical={sm} className={style.content}>
                  <HiOutlineBookOpen size={sm || md ? 35 : 24} />
                  <p>
                    Khóa
                    <b>TOEIC/SAT</b>
                    còn
                    <b>0</b>
                    suất học bổng lên đến
                    <b>
                      <PriceCalculator price={2500000} />
                    </b>
                  </p>
                </Flex>

                <Flex align='center' gap={12} vertical={sm} className={style.content}>
                  <HiOutlineUserGroup size={(sm && 32) || (md && 28) || 24} />
                  <p>
                    Có
                    <b>5925</b>
                    người đang quan tâm khóa học ở DOL
                  </p>
                </Flex>
                <Flex align='center' gap={12} className={style.content}>
                  <p>* Ưu đãi chỉ áp dụng duy nhất cho dịp TẾT trước 26/01/2024</p>
                </Flex>
              </Space>
            </Col>
            <Col span={24} md={9}>
              <Space direction='vertical' size='large' className={'sp100'}>
                <p className={style.desc}>Kết thúc sau:</p>
                <Flex align='center' vertical gap={55}>
                  <CountDownTimer
                    size={((sm || md) && 25) || 50}
                    type='text'
                    className={style.timer}
                    initCountdown={moment().endOf('day').diff(moment(), 'minutes')}
                    space=':'
                    spaceStyle={{ color: 'var(--white)' }}
                    showAlex={false}
                  />
                  <ButtonCustom type='primary'>
                    <h1 style={{ padding: '0 50px' }}>Đăng ký</h1>
                  </ButtonCustom>
                </Flex>
              </Space>
            </Col>
          </Row>
        </div>

        <Space direction='vertical' className={'sp100'}>
          <h1>Lịch học</h1>
          <BreadCrumbsDynamic />
          <ScheduleDetail type='Online' />
          <ScheduleDetail type='Offline' />
          <h1>Khóa học trong tháng</h1>
          <MyCourses coursesData={courseData?.data as any} maxLength={3} loading={false} showMore={false} fullSize />
        </Space>
      </Space>
    </Header>
  )
}

export default OpeningPage
