import AffixCustom from '@/components/AffixCustom'
import facebook from '../../../assets/icons/facebook-logo.svg'
import Header from '../Header/Header'
import LanguageChange from '@/components/LanguageChange'
import Logo from '@/components/Logo/Logo'
import MenuNav from './MenuNav'
import tiktok from '../../../assets/icons/tiktok-icon.svg'
import useResponsives from '@/hooks/useResponsives'
import youtube from '../../../assets/icons/youtube-logo.svg'
import zalo from '../../../assets/icons/zalo.png'
import { BiSolidDashboard } from 'react-icons/bi'
import { BsFillCartFill, BsFillTelephoneFill } from 'react-icons/bs'
import { Badge, Button, Col, Row, Space, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserState } from '@/interface/user'
import './styles.scss'
import { useQuery } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import cartApi from '@/apis/cart.api'

type Props = {
  user?: UserState
}

export default function Navigation({ user }: Props) {
  const navigate = useNavigate()
  const { sm, md, xl, xxl } = useResponsives()
  useQuery({ queryKey: ['userDetail'], queryFn: () => userApi.getUserDetail(user ? user._id : '') })
  const { profile } = useContext(AppContext)

  const { data } = useQuery({
    queryKey: ['dataCart'],
    queryFn: () =>
      cartApi.getCartList({
        userId: profile?._id,
      }),
    enabled: profile?._id ? true : false,
  })

  return (
    <div>
      <div className='uc-nav-main'>
        <Header type='fullsize'>
          <div className='uc-container'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Link to='/'>
                  <Logo size={sm ? 115 : undefined} />
                </Link>
              </Col>

              {md ? (
                user?.isMentor && (
                  // user?.mentorStatus === 'APPROVED'
                  <Tooltip title='Chuyển qua màn Mentor'>
                    <Link to='/mentor'>
                      <ButtonCustom icon={<BiSolidDashboard />}>Mentor</ButtonCustom>
                    </Link>
                  </Tooltip>
                )
              ) : (
                <>
                  {(xl || xxl) && (
                    <Col>
                      <Space size='large'>
                        <Button type='primary' size='small'>
                          Tiếng Anh Offline
                        </Button>
                        <Button type='primary' size='small'>
                          Tiếng Anh trực tuyến 1 kèm 1
                        </Button>
                        <Button type='primary' size='small'>
                          Tiếng Anh trực tuyến
                        </Button>
                      </Space>
                    </Col>
                  )}
                  <Col>
                    <div className='menu-bar'>
                      <Space size='large'>
                        <Space size='small'>
                          <Link to='https://www.facebook.com/' target='_blank'>
                            <img src={facebook} alt='facebook' width={20} />
                          </Link>
                          <Link to='https://www.youtube.com/' target='_blank'>
                            <img src={youtube} alt='youtube' width={26} />
                          </Link>
                          <Link to='https://www.tiktok.com/' target='_blank'>
                            <img src={tiktok} alt='tiktok' width={20} />
                          </Link>
                          <Link to='https://zalo.me/' target='_blank'>
                            <img src={zalo} alt='zalo' width={20} />
                          </Link>
                        </Space>

                        <Space
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          {user
                            ? user?.isMentor && (
                                // user?.mentorStatus === 'APPROVED'
                                <Tooltip title='Chuyển qua màn Mentor'>
                                  <Link to='/mentor'>
                                    <div className='cartIcon'>
                                      <BiSolidDashboard />
                                    </div>
                                  </Link>
                                </Tooltip>
                              )
                            : null}
                          <Badge color='#D72831' count={data?.data?.totalDocs}>
                            <div className='cartIcon' onClick={() => navigate('/cart-page')}>
                              <BsFillCartFill />
                            </div>
                          </Badge>
                          <div className='phoneIcon'>
                            <BsFillTelephoneFill />
                          </div>
                          <div>
                            <p className='mb-5 hotline'>Hotline</p>
                            <b>0769.340.340</b>
                          </div>
                        </Space>
                        <LanguageChange />
                      </Space>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Header>
      </div>

      {md ? (
        <AffixCustom type='fixed-bottom' zIndex={9999} style={{ left: 0, right: 0 }}>
          <MenuNav user={user} />
        </AffixCustom>
      ) : (
        <AffixCustom type='down-hidden' hiddenOffsetTop={150}>
          <MenuNav user={user} />
        </AffixCustom>
      )}
    </div>
  )
}
