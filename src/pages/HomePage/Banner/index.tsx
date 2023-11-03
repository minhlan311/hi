import BannerSlider from '@/components/BannerSlider/BannerSlider'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'

const Banner = () => {
  const { configs } = useContext(AppContext)

  return (
    <Header type='fullsize'>
      <BannerSlider bannerData={configs?.banners} />
    </Header>
  )
}

export default Banner
