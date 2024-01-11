import { useTotalCalculator } from '@/hooks/useTotalCalculator'
import { CoursesState } from '@/interface/courses'
import { TagFilled } from '@ant-design/icons'
import { Space } from 'antd'
import css from './PriceCalculator.module.scss'

interface Discount {
  discount: number
}

type Props = {
  price: number | CoursesState[]
  priceSize?: number
  priceColor?: string
  discount?: number | Discount[]
  showDiscount?: boolean
  showDiscountTag?: boolean
  showTotal?: boolean
  direction?: 'right' | 'center' | 'column' | 'column-right' | 'column-center'
  showDiscountFromCode?: boolean
  showTotalDiscount?: boolean
}

const PriceCalculator = (props: Props) => {
  const {
    price,
    priceSize,
    priceColor,
    discount,
    showDiscount = false,
    showDiscountTag = false,
    showTotal = false,
    showDiscountFromCode = false,
    showTotalDiscount = false,
    direction,
  } = props

  const total = useTotalCalculator(price, discount ? discount : 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  if (showDiscountFromCode) {
    return <p>-{formatPrice(total.totalDiscountFromCode)}</p>
  }

  if (showTotalDiscount) {
    return <p>-{formatPrice(total.totalDiscount)}</p>
  } else
    return discount ? (
      <Space
        className={css.price}
        style={direction === 'right' || direction === 'column-right' ? { justifyContent: 'flex-end' } : {}}
      >
        <Space
          direction={
            direction === 'column' || direction === 'column-center' || direction === 'column-right'
              ? 'vertical'
              : 'horizontal'
          }
          className={css.sp100}
        >
          <Space style={{ color: priceColor }}>
            <div className={css.title} style={{ fontSize: priceSize }}>
              {total.lastPrice === 0 ? 'Miễn phí' : formatPrice(total.lastPrice)}
            </div>
            {showDiscountTag && <TagFilled style={{ transform: 'scaleX(-1)' }} />}
          </Space>
          {showTotal && total.totalDiscountFromCode > 0 && (
            <div className={css.discount} style={direction === 'column-right' ? { marginLeft: 12 } : {}}>
              {formatPrice(total.initialPrice)}
            </div>
          )}
          {showDiscount && total.totalDiscount > 0 && <p>{total.discountPercentage}% OFF</p>}
        </Space>
      </Space>
    ) : (
      <Space
        className={css.price}
        style={direction === 'right' || direction === 'column-right' ? { justifyContent: 'flex-end' } : {}}
      >
        <div className={css.title} style={{ fontSize: priceSize }}>
          {total.lastPrice === 0 ? (
            <h2 className={css.free} style={{ fontSize: priceSize }}>
              Miễn phí
            </h2>
          ) : (
            formatPrice(total.lastPrice)
          )}
        </div>
      </Space>
    )
}

export default PriceCalculator
