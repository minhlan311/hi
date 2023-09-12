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
    <Carousel autoplay dots={dots} effect={effect}>
      {bannerData.map((item) => (
        <Link className={css.outerDiv} to={item?.href || '/'} key={item._id}>
          <img src={item?.imageUrl} alt='banner' className={css.img} />
          {item?.title && item?.desc && (
            <div className={css.box}>
              <div className={css.ttl}>{item?.title}</div>
              <div className={css.desc}>{item?.desc}</div>
            </div>
          )}
        </Link>
      ))}
    </Carousel>
  )
}

export default BannerSlider
