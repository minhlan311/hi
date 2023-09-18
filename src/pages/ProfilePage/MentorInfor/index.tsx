import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { Card, Col, Divider, Row, Space } from 'antd'
import { FaSchool } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import { MdEmail, MdSchool } from 'react-icons/md'
import { Link } from 'react-router-dom'
import famalePic from '../../../assets/images/examimg/famale-teacher.png'
import malePic from '../../../assets/images/examimg/male-teacher.png'
import css from './styles.module.scss'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import SliderCustom from '@/components/SliderCustom'
type Props = { user: UserState }

const MentorInfor = ({ user }: Props) => {
  const gender = 'male'
  const data = [
    { title: 'Thông tin về tôi', desc: 'Nội dung thông tin' },
    { title: 'Thành tích', desc: 'Thành tích...' },
    { title: 'Phong cách giảng dạy', desc: 'Phong cách...' }
  ]
  return (
    <Header padding={'25px 0 50px 0'}>
      <div className={css.card}>
        <Row>
          <Col span={24} md={10} className={css.avt}>
            <img src={user.avatarUrl ? user.avatarUrl : gender === 'male' ? malePic : famalePic} alt='avt' />
          </Col>
          <Col span={24} md={14}>
            <div className={css.infor}>
              <Space direction='vertical' className={'sp100'}>
                <Row justify='space-between'>
                  <Col span={24} md={8}>
                    <Space size='large'>
                      <div className={css.icon}>
                        <FaSchool />
                      </div>
                      <Space direction='vertical'>
                        <b>Giảng viên</b>
                        <div className={css.data}>Ielts</div>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={24} md={12}>
                    <Space size='large'>
                      <div className={css.icon}>
                        <MdSchool />
                      </div>
                      <Space direction='vertical'>
                        <b>Học vị</b>
                        <div className={css.data}>Thạc sĩ</div>
                      </Space>
                    </Space>
                  </Col>
                </Row>
                <Divider />
                <Row justify='space-between'>
                  <Col span={24} md={8}>
                    <Space size='large'>
                      <div className={css.icon}>
                        <MdEmail />
                      </div>
                      <Space direction='vertical'>
                        <b>Email:</b>
                        <div className={css.data}>
                          <Link to='/'>{user.email}</Link>
                        </div>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={24} md={12}>
                    <Space size='large'>
                      <div className={css.icon}>
                        <FaEarthAsia />
                      </div>
                      <Space direction='vertical'>
                        <b>Mạng xã hội</b>
                        <div className={css.data}>
                          <Link to='/'>https://www.facebook.com/</Link>
                        </div>
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </Space>
            </div>
          </Col>
        </Row>
      </div>{' '}
      <Header
        title={
          <Divider>
            <VscDebugBreakpointLog />
          </Divider>
        }
        desc={<h3>GIỚI THIỆU CHUNG</h3>}
        padding={'30px 0 50px 0'}
        size='sm'
      >
        <SliderCustom dataLength={data.length} arrows autoHitdenArrow slidesToScroll={1} slidesToShow={1}>
          {data.map((item, id) => (
            <Card key={id}>
              <Space direction='vertical'>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Space>
            </Card>
          ))}
        </SliderCustom>
      </Header>
    </Header>
  )
}

export default MentorInfor
