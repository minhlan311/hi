import { Button, Col, Row, Space } from 'antd'
import { useState } from 'react'
import { BsFillCartFill, BsFillTelephoneFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import AffixCustom from '@/components/AffixCustom'
import Logo from '@/components/Logo/Logo'
import SelectCustom from '@/components/SelectCustom/SelectCustom'
import chn from '../../../assets/icons/china_flag.svg'
import eng from '../../../assets/icons/eng_flag.svg'
import ger from '../../../assets/icons/germany_flag.svg'
import jpn from '../../../assets/icons/japan_flag.svg'
import kor from '../../../assets/icons/korea_flag.svg'
import vie from '../../../assets/icons/vi_flag.svg'
import facebook from '../../../assets/icons/facebook-logo.svg'
import tiktok from '../../../assets/icons/tiktok-icon.svg'
import youtube from '../../../assets/icons/youtube-logo.svg'
import zalo from '../../../assets/icons/zalo.png'
import Header from '../Header/Header'

import './styles.scss'
import { UserState } from '@/interface/user'
import MenuPc from './MenuPc'
type Props = {
  user: UserState | null
}
export default function Navigation({ user }: Props) {
  // const [educationId, setEducationId] = useState('')

  // useEffect(() => {
  //   if (educationId) {
  //     setStorage({ key: 'educationId', val: educationId })
  //   }
  // }, [educationId])

  const [open, setOpen] = useState<boolean>(false)
  const flagList = [
    { value: 'ENG', label: 'ENG', icon: <img src={eng} alt='flag' /> },
    { value: 'VIE', label: 'VIE', icon: <img src={vie} alt='flag' /> },
    { value: 'CHN', label: 'CHN', icon: <img src={chn} alt='flag' /> },
    { value: 'JPN', label: 'JPN', icon: <img src={jpn} alt='flag' /> },
    { value: 'KOR', label: 'KOR', icon: <img src={kor} alt='flag' /> },
    { value: 'GER', label: 'GER', icon: <img src={ger} alt='flag' /> }
  ]
  return (
    <div>
      <div className='uc-nav-main'>
        <Header type='fullsize'>
          <div className='uc-container'>
            <Row justify='space-between' align='middle'>
              <Col>
                <Link to='/'>
                  <Logo />
                </Link>
              </Col>
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
                        height: '100%'
                      }}
                    >
                      <div className='cartIcon'>
                        <BsFillCartFill />
                      </div>
                      <div className='phoneIcon'>
                        <BsFillTelephoneFill />
                      </div>
                      <div>
                        <p className='mb-5 hotline'>Hotline</p>
                        <b>1900 10328</b>
                      </div>
                    </Space>
                    <SelectCustom className='lang-change' defaultValue='VIE' options={flagList} suffixIcon={false} />
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
        </Header>
      </div>

      <AffixCustom type='down-hidden' hiddenOffsetTop={150}>
        <MenuPc open={open} setOpen={setOpen} user={user} />
      </AffixCustom>
    </div>
  )
}
