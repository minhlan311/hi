import { Carousel, Popover, Spin } from 'antd'
import { Card } from 'antd'
import { LeftOutlined, RightOutlined, LoadingOutlined, CheckOutlined, HeartOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import Paragraph from 'antd/es/typography/Paragraph'
import ProductRating from '../ProductRating'
import style from './sliderCustom.module.scss'
// import ImageCustom from '../ImageCustom/ImageCustom'
import { Link } from 'react-router-dom'
import { CoursesState } from '~/interface/coursesData'
import EmptyCustom from '../EmptyCustom/EmptyCustom'
import { responsiveSlider } from './responsiveSlider'
import { colorStar } from '../ProductRating/pickColor.enum'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import PriceCalculator from '../PriceCalculator/PriceCalculator'
import TagCustom from '../TagCustom/TagCustom'
import { AppContext } from '~/contexts/app.context'

type Props = {
  data: CoursesState[] | any
}

export default function SliderCustom(props: Props) {
  const { setOrder, setFavorite } = useContext(AppContext)
  const { data } = props
  const [dataArray, setDataArray] = useState<CoursesState[]>()
  const [buttonAction, setButtonAction] = useState<boolean>(false)
  const [buttonNext, setButtonNext] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setDataArray(data)
      setLoading(false)
    }, 2000)
  }, [data])

  const onChange = (currentSlide: number) => {
    if (currentSlide > 0 || currentSlide === dataArray?.length! - 5) {
      setButtonAction(true)
    }
    if (currentSlide === 0) {
      setButtonAction(false)
    }

    if (currentSlide < dataArray?.length! - 5) {
      setButtonNext(true)
    }
    if (currentSlide === dataArray?.length! - 5) {
      setButtonNext(false)
    }
  }

  return (
    <div className={style.containerModule}>
      <div className={style.containerSlider}>
        {dataArray && dataArray.length > 0 ? (
          <Carousel
            responsive={responsiveSlider}
            slidesToScroll={5}
            infinite={false}
            afterChange={onChange}
            dots={false}
            slidesToShow={5}
            arrows={true}
            nextArrow={buttonNext ? <RightOutlined /> : <></>}
            prevArrow={buttonAction ? <LeftOutlined /> : <></>}
          >
            {dataArray.map((item) => (
              <div key={item._id}>
                <Popover
                  showArrow={true}
                  color='white'
                  title={
                    <div className={style.containerTooltip}>
                      <p className={style.titleTooltip}>{item.name}</p>
                      <div className={style.flexTime}>
                        {item.type && (
                          <TagCustom
                            intArrType={['BESS SELLER', 'REVISION', 'NEW']}
                            intColor={['var(--yellowish-green)', 'var(--teal)', 'var(--red)']}
                            intAlternativeType={['ベストセラー', '改訂', '話題・新着']}
                            content={item.type}
                            colorText='var(--black)'
                          />
                        )}
                        <div>
                          <p className={style.time}>更新済み 2023年4月</p>
                        </div>
                      </div>

                      <p className={style.totalTime}>合計47.5時間初級レベル</p>
                      <p className={style.decs}>
                        03版の新試験対応！アソシエイト試験突破に必要な経験と知識を1000ページ以上の理論学習、40サービス以上のハンズオン、3回分の模擬テストで獲得していきます！　網羅的にAWSを利用していく基礎力を身に着けることが可能です！
                      </p>
                      <ul className={style.ulCheck}>
                        <li className={style.flexCheck}>
                          <CheckOutlined />
                          <div>Python3の基本の習得できます。</div>
                        </li>

                        <li className={style.flexCheck}>
                          <CheckOutlined />
                          <div>ビジネス上必要な人工知能の基礎知識が身につきます。</div>
                        </li>

                        <li className={style.flexCheck}>
                          <CheckOutlined />
                          <div>Python3の基本の習得できます。</div>
                        </li>
                      </ul>
                      <div className={style.flexTooltip}>
                        <ButtonCustom
                          htmlType='submit'
                          size='large'
                          style={{ minWidth: 220 }}
                          onClick={() => {
                            setOrder([item])
                          }}
                        >
                          カートに入れる
                        </ButtonCustom>
                        <ButtonCustom
                          shape='circle'
                          icon={<HeartOutlined />}
                          size='large'
                          onClick={() => {
                            setFavorite([item])
                          }}
                        ></ButtonCustom>
                      </div>
                    </div>
                  }
                  placement='right'
                >
                  <Link className={style.link} to={`/course/${item._id}`}>
                    <h3 className={style.contentStyle}>
                      <Card bordered={false} cover={<img src={item.coverUrl} height={137} />}>
                        <Paragraph className={style.title} ellipsis={{ rows: 2 }}>
                          {item.name}
                        </Paragraph>
                        <Paragraph className={style.configText} ellipsis={{ rows: 1 }}>
                          {item.mentor}
                        </Paragraph>
                        <div className={style.flex}>
                          <p className={style.score}>{item.avgRating}</p>
                          <ProductRating color={colorStar.dark} rating={item.avgRating} />
                          <p className={style.total}>({item.countRating})</p>
                        </div>

                        <PriceCalculator price={item.cost} discount={item.discount} showTotal />

                        {item.type && (
                          <TagCustom
                            intArrType={['BESS SELLER', 'REVISION', 'NEW']}
                            intColor={['var(--yellowish-green)', 'var(--teal)', 'var(--red)']}
                            intAlternativeType={['ベストセラー', '改訂', '話題・新着']}
                            content={item.type}
                            colorText='var(--black)'
                          />
                        )}
                      </Card>
                    </h3>
                  </Link>
                </Popover>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className={style.spin}>
            {loading ? (
              <Spin tip='読み込み中...' indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <div className='content' />
              </Spin>
            ) : (
              <EmptyCustom />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
