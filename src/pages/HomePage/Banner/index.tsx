import BannerSlider from '@/components/BannerSlider/BannerSlider'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'

const Banner = () => {
  const { configs } = useContext(AppContext)

  const banner = configs?.banners?.map((bn) => {
    return {
      imageUrl: bn,
      _id: bn,
    }
  })

  return (
    <Header type='fullsize'>
      <BannerSlider bannerData={banner} />
    </Header>
  )
}

export default Banner
