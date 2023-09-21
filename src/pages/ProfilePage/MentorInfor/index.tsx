import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { useState } from 'react'
import { Button, Card, Col, Divider, Image, Row, Space } from 'antd'
import { FaBirthdayCake, FaUserAlt } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import famalePic from '../../../assets/images/examimg/famale-teacher.png'
import malePic from '../../../assets/images/examimg/male-teacher.png'
import css from './styles.module.scss'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import SliderCustom from '@/components/SliderCustom'
import UpdateMentor from './UpdateMentor'
import { formatDate } from '@/helpers/common'
import Paragraph from 'antd/es/typography/Paragraph'
type Props = { user: UserState }

const MentorInfor = ({ user }: Props) => {
  const [update, setUpdate] = useState(false)
  const gender = 'male'
  const data = [
    { title: 'Thông tin về tôi', desc: 'Nội dung thông tin' },
    { title: 'Thành tích', desc: 'Thành tích...' },
    { title: 'Phong cách giảng dạy', desc: 'Phong cách...' },
  ]

  return (
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
      <div className={css.card}>
        <Row>
          <Col span={24} md={7} xl={10} className={css.avt}>
            <Image
              height={'520px'}
              src={
                user.avatarUrl
                  ? import.meta.env.VITE_FILE_ENDPOINT + '/' + user.avatarUrl
                  : gender === 'male'
                  ? malePic
                  : famalePic
              }
              alt='avt'
            />
          </Col>
          <Col span={24} md={17} xl={14}>
            {!update ? (
              <div className={css.infor}>
                <Space direction='vertical' className={'sp100'}>
                  <Row justify='space-between'>
                    <Col span={24} md={8}>
                      <Space>
                        <div className={css.icon}>
                          <FaUserAlt />
                        </div>
                        <Space direction='vertical'>
                          <b>Giảng viên</b>
                          <Paragraph style={{ width: '150px' }} ellipsis={true} className={css.data}>
                            {user.fullName}
                          </Paragraph>
                        </Space>
                      </Space>
                    </Col>
                    <Col span={24} md={12}></Col>
                  </Row>
                  <Divider />
                  <Row justify='space-between'>
                    <Col span={24} md={8}>
                      <Space>
                        <div className={css.icon}>
                          <MdEmail />
                        </div>
                        <Space direction='vertical'>
                          <b>Email</b>

                          <Paragraph style={{ width: '150px' }} ellipsis={true} className={css.data}>
                            <Link to={'#'}>{user.email}</Link>
                          </Paragraph>
                        </Space>
                      </Space>
                    </Col>
                    <Col span={24} md={12}>
                      <Space>
                        <div className={css.icon}>
                          <FaEarthAsia />
                        </div>
                        <Space direction='vertical'>
                          <b>Mạng xã hội</b>
                          <div className={css.data}>
                            <Paragraph style={{ width: '150px' }} ellipsis={true} className={css.data}>
                              <Link to={'#'}>https://www.facebook.com/</Link>
                            </Paragraph>
                          </div>
                        </Space>
                      </Space>
                    </Col>
                  </Row>
                  <Divider />
                  <Row justify='space-between'>
                    <Col span={24} md={8}>
                      <Space>
                        <div className={css.icon}>
                          <BsFillTelephoneFill />
                        </div>
                        <Space direction='vertical'>
                          <b>Điện thoại liên hệ</b>
                          <div className={css.data}>
                            <div>{user.phoneNumber}</div>
                          </div>
                        </Space>
                      </Space>
                    </Col>
                    <Col span={24} md={12}>
                      <Space>
                        <div className={css.icon}>
                          <FaBirthdayCake />
                        </div>
                        <Space direction='vertical'>
                          <b>Ngày sinh</b>
                          <div className={css.data}>
                            <div>{formatDate(user?.birthday)}</div>
                          </div>
                        </Space>
                      </Space>
                    </Col>
                  </Row>
                </Space>
              </div>
            ) : (
              <UpdateMentor user={user} checkOk={setUpdate} />
            )}
            {!update && (
              <div
                style={{
                  margin: ' 0 10px  10px 0',
                  textAlign: 'end',
                }}
              >
                <Button
                  type='primary'
                  onClick={() => {
                    setUpdate(!update)
                  }}
                  style={{
                    marginRight: '10px',
                  }}
                >
                  Thay đổi thông tin
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>{' '}
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
  )
}

export default MentorInfor
