import { Link } from 'react-router-dom'

import css from './Banner.module.scss'
import { BannerState } from '~/interface/banner'
import { Carousel } from 'antd'
type Props = {
  bannerData: BannerState[]
}
const Banner = (props: Props) => {
  const { bannerData } = props
  return (
    <Carousel autoplay>
      {bannerData.map((item) => (
        <Link className={css.outerDiv} to={item?.href || '/'} key={item._id}>
          <img src={item?.imageUrl} alt='banner' className={css.img} />
          <div className={css.box}>
            <div className={css.ttl}>{item?.title}</div>
            <div className={css.desc}>{item?.desc}</div>
          </div>
        </Link>
      ))}
    </Carousel>
  )
}

export default Banner
