/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import promotionApi from '@/apis/promotions.api'
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

  const { data: promotionData } = useQuery({
    queryKey: ['promotionData'],
    queryFn: () => {
      return promotionApi.getPromotion()
    },
  })

  const promotion = promotionData?.data

  return (
    <Header padding={'35px 0 50px 0'}>
      <Space direction='vertical' size='large' className={'sp100'}>
        {promotion && (
          <div className={style.ads}>
            <h1 className={style.title}>Ưu đãi tháng {moment().format('M')}</h1>
            <Row gutter={40} align='middle'>
              <Col span={24} md={15} className={style.desc}>
                <Space direction='vertical' size='large' className={'sp100'}>
                  {promotion.promotions?.map((item) => (
                    <Flex align='center' gap={12} vertical={sm} className={style.content} key={item._id}>
                      {item.icon ? item.icon : <HiOutlineBookOpen size={sm || md ? 35 : 24} />}
                      <p>
                        Khóa
                        <b>{item.centificateName}</b>
                        còn
                        <b>{item.length}</b>
                        suất học bổng lên đến
                        <b>
                          <PriceCalculator price={item.scholarship} />
                        </b>
                      </p>
                    </Flex>
                  ))}
                  <Flex align='center' gap={12} vertical={sm} className={style.content}>
                    <HiOutlineUserGroup size={(sm && 32) || (md && 28) || 24} />
                    <p>
                      Có
                      <b>5925</b>
                      người đang quan tâm khóa học
                    </p>
                  </Flex>
                  <Flex align='center' gap={12} className={style.content}>
                    <div dangerouslySetInnerHTML={{ __html: promotion.description }}></div>
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
                      initCountdown={moment(promotion.dateEnd).diff(moment(), 'minutes')}
                      space=':'
                      spaceStyle={{ color: 'var(--white)' }}
                      showAlex={false}
                    />
                    {promotion.href && (
                      <ButtonCustom type='primary' href={promotion.href}>
                        <h1 style={{ padding: '0 50px' }}>Đăng ký</h1>
                      </ButtonCustom>
                    )}
                  </Flex>
                </Space>
              </Col>
            </Row>
          </div>
        )}

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
