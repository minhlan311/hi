import { Affix, Button, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Logo from '~/components/Logo/Logo'
import facebook from '../../../assets/icons/facebook-logo.svg'
import tiktok from '../../../assets/icons/tiktok-icon.svg'
import youtube from '../../../assets/icons/youtube-logo.svg'
import zalo from '../../../assets/icons/zalo.png'
import { setStorage } from '../../../services/storage'
import Header from '../Header/Header'
import MenuPc from './MenuPc'
import './styles.scss'

export default function Navigation() {
  const [educationId, setEducationId] = useState('')

  useEffect(() => {
    if (educationId) {
      setStorage({ key: 'educationId', val: educationId })
    }
  }, [educationId])

  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let prevScrollPosition = window.pageYOffset
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset
      setVisible(prevScrollPosition > currentScrollPosition || currentScrollPosition < 130)
      prevScrollPosition = currentScrollPosition
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <div className='mtz-nav-main'>
        <Header type='fullsize'>
          <div className='uc-container'>
            <Row justify='space-between' align='middle'>
              <Link to={'/'}>
                <Logo />
              </Link>
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
                      height: '100%'
                    }}
                  >
                    <div className='phoneIcon'>
                      <BsFillTelephoneFill />
                    </div>
                    <div>
                      <p className='mb-5 hotline'>Hotline</p>
                      <b>1900 10328</b>
                    </div>
                  </Space>
                  <Select
                    className='lang-change'
                    popupClassName='select-pop'
                    defaultValue='VIE'
                    options={[
                      {
                        value: 'ENG',
                        label: (
                          <div className='d-space-c'>
                            {/* <EngSVG />  */}
                            <p className='ml-5'>ENG</p>
                          </div>
                        )
                      },
                      {
                        value: 'VIE',
                        label: (
                          <div className='d-space-c'>
                            {/* <VieSVG /> */}
                            <p className='ml-10'>VIE</p>
                          </div>
                        )
                      },
                      {
                        value: 'CHN',
                        label: (
                          <div className='d-space-c'>
                            {/* <ChinaSVG /> */}
                            <p className='ml-5'>CHN</p>
                          </div>
                        )
                      },
                      {
                        value: 'JPN',
                        label: (
                          <div className='d-space-c'>
                            {/* <JapanSVG /> */}
                            <p className='ml-5'>JPN</p>
                          </div>
                        )
                      },
                      {
                        value: 'KOR',
                        label: (
                          <div className='d-space-c'>
                            {/* <KoreaSVG /> */}
                            <p className='ml-5'>KOR</p>
                          </div>
                        )
                      },
                      {
                        value: 'GER',
                        label: (
                          <div className='d-space-c'>
                            {/* <GermanySVG />  */}
                            <p className='ml-5'>GER</p>
                          </div>
                        )
                      }
                    ]}
                    suffixIcon={false}
                  />
                </Space>
              </div>
            </Row>
          </div>
        </Header>
      </div>

      <Affix className='affix-main'>
        <div className={`${visible ? 'nav-fixed' : 'navn-fixed'} mtz-nav-main`}>
          {/* <MenuPc open={open} setOpen={setOpen} /> */}
        </div>
      </Affix>
    </div>
  )
}
