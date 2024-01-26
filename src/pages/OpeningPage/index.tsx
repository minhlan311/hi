import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import Header from '@/components/layout/Header/Header'
import { Col, Flex, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { HiOutlineBookOpen, HiOutlineUserGroup } from 'react-icons/hi2'
import ScheduleDetail from './Components/ScheduleDetail'
import style from './styles.module.scss'

const OpeningPage = () => {
  return (
    <Header padding={'35px 0 50px 0'}>
      <Space direction='vertical' size='large' className={'sp100'}>
        <div className={style.ads}>
          <h1 className={style.title}>Ưu đãi tháng {moment().format('M')}</h1>
          <Row gutter={40} align='middle'>
            <Col span={24} md={15} className={style.desc}>
              <Space direction='vertical' size='large' className={'sp100'}>
                <Flex align='center' gap={12} className={style.content}>
                  <HiOutlineBookOpen size={24} />
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
                <Flex align='center' gap={12} className={style.content}>
                  <HiOutlineBookOpen size={24} />
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

                <Flex align='center' gap={12} className={style.content}>
                  <HiOutlineUserGroup size={24} />
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
                    type='text'
                    className={style.timer}
                    initCountdown={1440}
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
          <ScheduleDetail type='online' />
          <ScheduleDetail type='offline' />
          <h1>Khóa học trong tháng</h1>
          {/* <MyCourses coursesData={[]} maxLength={3} loading={false} showPagination={false} fullSize /> */}
        </Space>
      </Space>
    </Header>
  )
}

export default OpeningPage
