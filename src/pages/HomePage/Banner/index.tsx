import BannerSlider from '@/components/BannerSlider/BannerSlider'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
const banner = [
  {
    _id: 'asdhg21',
    imageUrl: 'https://newsky.edu.vn/wp-content/uploads/khoa-hoc-tieng-anh-tre-em-newsky.png',
  },
  {
    _id: 'g21yujh',
    imageUrl: 'https://newsky.edu.vn/wp-content/uploads/khoa-hoc-tieng-trung-tai-newsky.png',
  },
  {
    _id: 'dsffew3',
    imageUrl: 'https://newsky.edu.vn/wp-content/uploads/khoa-hoc-tieng-han-tai-newsky.png',
  },
  {
    _id: 'wqedasd',
    imageUrl: 'https://newsky.edu.vn/wp-content/uploads/khoa-tieng-anh-giao-tiep-newsky.png',
  },
]

const Banner = () => {
  return (
    <Header type='fullsize'>
      <BannerSlider bannerData={banner} />
    </Header>
  )
}

export default Banner
