import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Carousel, Empty, Spin } from 'antd'
import { useState } from 'react'
import { responsiveSlider } from './responsiveSlider'
import style from './sliderCustom.module.scss'

type Props = {
  dataLength: number
  children: React.ReactNode
  loading?: boolean
  slidesToScroll?: number
  infinite?: boolean
  dots?: boolean
  slidesToShow?: number
  arrows?: boolean
  nextArrow?: React.ReactNode
  prevArrow?: React.ReactNode
  autoHitdenArrow?: boolean
  className?: string
  emptyDesc?: string
  emptyContent?: React.ReactNode
  autoplay?: boolean
  buttonStyle?: React.CSSProperties
  buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed'
}

export default function SliderCustom(props: Props) {
  const {
    dataLength,
    children,
    loading = false,
    slidesToScroll = 4,
    infinite = false,
    dots = false,
    slidesToShow = 4,
    arrows = false,
    nextArrow = <RightOutlined />,
    prevArrow = <LeftOutlined />,
    autoHitdenArrow = false,
    className,
    emptyDesc,
    emptyContent,
    autoplay,
    buttonStyle,
    buttonType,
  } = props
  const [buttonPrev, setButtonPrev] = useState<boolean>(true)
  const [buttonNext, setButtonNext] = useState<boolean>(true)

  const onChange = (slideCount: number) => {
    if (slideCount > 0 || slideCount === dataLength! - slidesToShow) {
      setButtonPrev(true)
    }

    if (slideCount === 0) {
      setButtonPrev(false)
    }

    if (slideCount < dataLength! - slidesToShow) {
      setButtonNext(true)
    }

    if (slideCount === dataLength! - slidesToShow) {
      setButtonNext(false)
    }
  }

  const nextButt = () => {
    return <Button style={buttonStyle} icon={nextArrow} type={buttonType} shape='circle'></Button>
  }

  const prevButt = () => {
    return <Button style={buttonStyle} icon={prevArrow} type={buttonType} shape='circle'></Button>
  }

  const checkArr = dataLength - slidesToShow

  const NullArr = Array.from({ length: Math.abs(checkArr) }, (_, index) => index + 1)

  return (
    <div className={style.containerModule}>
      <div className={style.containerSlider}>
        {children && dataLength > 0 ? (
          <Carousel
            autoplay={autoplay}
            responsive={responsiveSlider}
            slidesToScroll={slidesToScroll}
            infinite={infinite}
            afterChange={autoHitdenArrow ? onChange : () => {}}
            dots={dots}
            slidesToShow={slidesToShow}
            arrows={arrows}
            nextArrow={buttonNext ? <div>{nextButt()}</div> : <></>}
            prevArrow={buttonPrev ? <div>{prevButt()}</div> : <></>}
            className={`${className} ${style.carousel} carousel-cuttom`}
            draggable
            speed={1500}
            autoplaySpeed={5000}
          >
            {children}
            {NullArr?.map((item) => <p key={item}></p>)}
          </Carousel>
        ) : (
          <div className={style.spin}>
            {loading ? (
              <Spin tip='Loading...' indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <div className={style.content} />
              </Spin>
            ) : (
              <Empty description={emptyDesc}>{emptyContent}</Empty>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
