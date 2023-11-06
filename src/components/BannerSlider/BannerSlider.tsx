import { Link } from 'react-router-dom'
import css from './BannerSlider.module.scss'
import { BannerState } from '@/interface/banner'
import { Carousel } from 'antd'
type Props = {
  bannerData: BannerState[]
  dots?: boolean
  effect?: 'scrollx' | 'fade'
}

const BannerSlider = (props: Props) => {
  const { bannerData, dots = true, effect } = props

  return (
    <Carousel autoplay dots={dots} effect={effect} draggable speed={1500} autoplaySpeed={5000}>
      {bannerData.map((item) => (
        <Link className={css.banner} to={item?.href || '/'} key={item._id}>
          <img src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.imageUrl} alt='banner' />
        </Link>
      ))}
    </Carousel>
  )
}

export default BannerSlider
