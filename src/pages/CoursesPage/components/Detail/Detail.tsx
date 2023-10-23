import ProductRating from '@/components/ProductRating'
import style from './Detail.module.scss'
import { colorStar } from '@/components/ProductRating/pickColor.enum'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { CreditCardOutlined, GlobalOutlined, WarningFilled } from '@ant-design/icons'
import { TCourse } from '@/types/course.type'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import useResponsives from '@/hooks/useResponsives'

type Props = {
  data?: TCourse
}

export default function Detail({ data }: Props) {
  const items = [
    {
      title: <p className={style.breadCrumbs}>Trang chủ</p>,
      href: '/',
    },
    {
      title: <p className={style.breadCrumbs}>Khóa học</p>,
      href: '#',
    },
    {
      title: <p className={style.breadCrumbs}>-</p>,
      href: '#',
    },
  ]
  const { lg } = useResponsives()

  return (
    <div className={style.col1}>
      <div>
        {lg && (
          <ImageCustom
            width='100%'
            height='320px'
            preview={false}
            src={`${import.meta.env.VITE_FILE_ENDPOINT}/${data?.coverMedia}`}
          />
        )}
      </div>
      <div>
        <Breadcrumb separator={<span className={style.breadCrumbs}>{'>'}</span>} items={items} />
      </div>
      <div className={style.boxStyle}>
        <h2 className={style.title}>{data?.name}</h2>
      </div>
      <div className={style.boxDesc}>
        {/* <Paragraph ellipsis={true} className={style.desc}>
          {data?.descriptions || 'Không có mô tả'}
        </Paragraph> */}
      </div>
      <div className={style.detailPrice} style={{ marginTop: '10px' }}>
        <div className={style.specialPrice}>ベストセラー</div>
        <div className={style.flex}>
          <p className={style.score}>4.5</p>
          <Link to={'#'}>
            <ProductRating color={colorStar.light} rating={4.5} />
          </Link>
          <Link to={'#'}>
            <p className={style.total}>(9999 Đánh giá)</p>
          </Link>
          <p className={style.member}>72,785 Người đăng ký</p>
        </div>
      </div>
      <Link to={'#'}>
        <p className={style.text}>
          Mentor: <span className={style.textSpan}>{data?.mentor?.fullName}</span>
        </p>
      </Link>
      <div className={style.info}>
        <div className={style.flexBoxInfo}>
          <WarningFilled />
          <p>Ngày bắt đầu: 7/2023</p>
        </div>
        <div className={style.flexBoxInfo}>
          <GlobalOutlined />
          <p>Việt Nam</p>
        </div>
        <div className={style.flexBoxInfo}>
          <CreditCardOutlined />
          <p>Tiếng Việt</p>
        </div>
      </div>
    </div>
  )
}
