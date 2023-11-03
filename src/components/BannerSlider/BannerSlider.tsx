import { Link } from 'react-router-dom'
import css from './BannerSlider.module.scss'
// import { BannerState } from '@/interface/banner'
import { Carousel } from 'antd'
type Props = {
  bannerData: string[]
  dots?: boolean
  effect?: 'scrollx' | 'fade'
}

const BannerSlider = (props: Props) => {
  const bannerData = props?.bannerData

  return (
    <Carousel autoplay draggable speed={1500} slidesToShow={1} autoplaySpeed={5000}>
      {bannerData?.map((item) => (
        <>
          <Link className={css.outerDiv} to={'#'}>
            <img src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item} alt='banner' className={css.img} />
          </Link>
        </>
      ))}
    </Carousel>
  )
}

export default BannerSlider
