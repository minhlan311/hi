import AffixCustom from '@/components/AffixCustom'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import cartApi from '@/apis/cart.api'
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import facebook from '../../../assets/icons/facebook-logo.svg'
import Header from '../Header/Header'
import LanguageChange from '@/components/LanguageChange'
import Logo from '@/components/Logo/Logo'
import MenuNav from './MenuNav'
import tiktok from '../../../assets/icons/tiktok-icon.svg'
import userApi from '@/apis/user.api'
import useResponsives from '@/hooks/useResponsives'
import youtube from '../../../assets/icons/youtube-logo.svg'
import zalo from '../../../assets/icons/zalo.png'
import { AiOutlineMenu } from 'react-icons/ai'
import { AppContext } from '@/contexts/app.context'
import { Badge, Button, Col, Row, Space } from 'antd'
import { BiSolidDashboard } from 'react-icons/bi'
import { BsFillCartFill, BsFillTelephoneFill } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setProfileFromLS } from '@/utils/auth'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserState } from '@/interface/user'
import './styles.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  user?: UserState
}

export default function Navigation({ user }: Props) {
  const navigate = useNavigate()
  const { sm, md, lg, xl, xxl } = useResponsives()
  const users = useQuery({ queryKey: ['userDetail'], queryFn: () => userApi.getUserDetail(user ? user._id : '') })

  const { configs } = useContext(AppContext)

  useEffect(() => {
    if (user?._id && users?.data?.data?._id) setProfileFromLS(users?.data?.data as unknown as UserState)
  }, [user, users])

  const changeFavicon = (faviconUrl: string) => {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null

    if (!link) {
      link = document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }

    link.href = import.meta.env.VITE_FILE_ENDPOINT + '/' + faviconUrl
  }

  useEffect(() => {
    const faviconUrl = configs?.favicon

    if (configs && faviconUrl) {
      changeFavicon(faviconUrl)
    }
  }, [configs])

  const { data } = useQuery({
    queryKey: ['dataCart'],
    queryFn: () =>
      cartApi.getCartList({
        filterQuery: {
          userId: user?._id,
        },
      }),
    enabled: user?._id ? true : false,
  })

  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [location])

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
                <Space>
                  {user?.isMentor && user?.mentorStatus === 'APPROVED' && (
                    <Link to='/mentor'>
                      <ButtonCustom icon={<BiSolidDashboard />} tooltip='Chuyển qua màn Mentor'>
                        Mentor
                      </ButtonCustom>
                    </Link>
                  )}
                  <ButtonCustom icon={<AiOutlineMenu />} type='text' onClick={() => setOpen(!open)}></ButtonCustom>
                </Space>
              ) : (
                <>
                  {(xl || xxl) && !lg && (
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
                          {configs?.socials?.map((item) => (
                            <>
                              {item?.type === 'ZALO' && (
                                <Link to={item?.url} target='_blank'>
                                  <img src={zalo} alt='zalo' width={20} />
                                </Link>
                              )}
                              {item?.type === 'FACEBOOK' && (
                                <Link to={item?.url} target='_blank'>
                                  <img src={facebook} alt='facebook' width={20} />
                                </Link>
                              )}
                              {item?.type === 'YOUTUBE' && (
                                <Link to={item?.url} target='_blank'>
                                  <img src={youtube} alt='youtube' width={26} />
                                </Link>
                              )}
                              {item?.type === 'TIKTOK' && (
                                <Link to={item?.url} target='_blank'>
                                  <img src={tiktok} alt='tiktok' width={20} />
                                </Link>
                              )}
                            </>
                          ))}
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

                                <ButtonCustom
                                  icon={<BiSolidDashboard />}
                                  tooltip='Chuyển qua màn Mentor'
                                  href='/mentor'
                                  className='cartIcon'
                                ></ButtonCustom>
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
                            <b>{configs?.hotline}</b>
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
      <DrawerCustom open={open} onClose={() => setOpen(false)} placement='left' width={sm ? '80vw' : '30vw'}>
        <MenuNav user={user} type='subMenu' />
      </DrawerCustom>
    </div>
  )
}
