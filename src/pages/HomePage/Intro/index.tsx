import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { Card, Space } from 'antd'
import { useContext } from 'react'
import { BsBookFill, BsFillPauseBtnFill, BsFillPencilFill } from 'react-icons/bs'
import { RiEmotionLaughFill } from 'react-icons/ri'
import point from '../../../assets/icons/place.svg'
import place from '../../../assets/icons/point.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'

export default function Intro() {
  const { configs } = useContext(AppContext)

  const introIcon = [
    {
      icon: <BsBookFill fontSize={24} />,
      keyId: '',
    },
    {
      icon: <RiEmotionLaughFill fontSize={24} />,
      keyId: '2',
    },
    {
      icon: <BsFillPauseBtnFill fontSize={24} />,
      keyId: '3',
    },
    {
      icon: <BsFillPencilFill fontSize={18} />,
      keyId: '4',
    },
  ]

  const { md } = useResponsives()

  return (
    <Header
      size='sm'
      title='UCAM là trung tâm Ngoại ngữ chất lượng, uy tín, tận tình'
      desc='VÌ SAO NÊN CHỌN CHÚNG TÔI?'
      padding={md ? '25px 0' : '60px 0'}
      background='var(--lighish-white)'
    >
      <img src={place} alt='place' className='place' />
      <img src={point} alt='point' className='point' />

      <div className='mb-scroll'>
        <div className='intor-main'>
          {configs.introductions?.map((item, id) => (
            <Card className='intro-card' key={id}>
              <Space direction='vertical'>
                <Space>
                  <div className={`i-bg${introIcon[id % introIcon.length].keyId} icon-bg`}>
                    {introIcon[id % introIcon.length].icon}
                  </div>
                  <h3 style={{ margin: 0 }}>{item.label}</h3>
                </Space>
                <div style={{ margin: 0 }}>{item.content}</div>
              </Space>
            </Card>
          ))}
        </div>
        {configs.linkIntroduction && (
          <div className='buttTest'>
            <ButtonCustom href={configs.linkIntroduction} type='primary' size='large'>
              KIỂM TRA TRÌNH ĐỘ MIỄN PHÍ
            </ButtonCustom>
          </div>
        )}
      </div>
    </Header>
  )
}
