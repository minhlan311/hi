import ProductRating from '@/components/ProductRating'
import style from './Detail.module.scss'
import { colorStar } from '@/components/ProductRating/pickColor.enum'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { CreditCardOutlined, GlobalOutlined, WarningFilled } from '@ant-design/icons'

export default function Detail() {
  const items = [
    {
      title: <p className={style.breadCrumbs}>開発</p>,
      href: '/'
    },
    {
      title: <p className={style.breadCrumbs}>データサイエンス</p>,
      href: ''
    },
    {
      title: <p className={style.breadCrumbs}>Python</p>,
      href: ''
    }
  ]

  return (
    <div className={style.col1}>
      <div>
        {' '}
        <Breadcrumb separator={<span className={style.breadCrumbs}>{'>'}</span>} items={items} />
      </div>
      <div className={style.boxStyle}>
        <h2 className={style.title}>【ゼロから始めるデータ分析】 ビジネスケースで学ぶPythonデータサイエンス入門</h2>
      </div>
      <div className={style.boxDesc}>
        <p className={style.desc}>
          分析コンペティションに参加しながら回帰分析による売上予測、機械学習での顧客ターゲティングなど実践的なビジネス課題でデータ分析の一連の流れを身に着けよう。
          プログラミング初心者にもおすすめ。
        </p>
      </div>
      <div className={style.detailPrice} style={{ marginTop: '10px' }}>
        <div className={style.specialPrice}>ベストセラー</div>
        <div className={style.flex}>
          <p className={style.score}>4.5</p>
          <Link to={'#'}>
            <ProductRating color={colorStar.light} rating={4.5} />
          </Link>
          <Link to={'#'}>
            <p className={style.total}>(9999 件の評価)</p>
          </Link>
          <p className={style.member}>72,785人の受講生</p>
        </div>
      </div>
      <Link to={'#'}>
        <p className={style.text}>
          作成者: <span className={style.textSpan}>我妻 幸長 Yukinaga Azuma</span>
        </p>
      </Link>
      <div className={style.info}>
        <div className={style.flexBoxInfo}>
          {' '}
          <WarningFilled />
          <p>最終更新日: 7/2023</p>
        </div>
        <div className={style.flexBoxInfo}>
          {' '}
          <GlobalOutlined />
          <p>日本語</p>
        </div>
        <div className={style.flexBoxInfo}>
          {' '}
          <CreditCardOutlined />
          <p>日本語 [自動]</p>
        </div>
      </div>
    </div>
  )
}
