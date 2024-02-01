import courseBanner from '@/assets/images/banner/course_banner.png'
import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import Header from '@/components/layout/Header/Header'
import { Space } from 'antd'
import style from './styles.module.scss'
type Props = {
  name: string
}

const TopCourse = ({ name }: Props) => {
  return (
    <div className={style.topMain}>
      <img src={courseBanner} alt='bg' className={style.bg} />
      <Header size='sm'>
        <Space direction='vertical' className={style.title}>
          <h1>{name}</h1>
          <BreadCrumbsDynamic homeTitle='Trang chủ' separator='>' lastText={name} />
        </Space>
      </Header>
    </div>
  )
}

export default TopCourse
