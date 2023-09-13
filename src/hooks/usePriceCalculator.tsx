import { TagOutlined } from '@ant-design/icons'
import { Space } from 'antd'

const usePriceCalculator = (originalPrice: number, discountPercentage?: number) => {
  if (!discountPercentage) {
    return (
      <h3 style={{ float: 'right' }}>
        {new Intl.NumberFormat('ja-JP', {
          style: 'currency',
          currency: 'JPY'
        }).format(originalPrice)}
      </h3>
    )
  }

  const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100

  return (
    <div>
      <Space style={{ color: 'var(--purple)', float: 'right' }}>
        <h3>
          {new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
          }).format(discountedPrice)}
        </h3>
        <TagOutlined style={{ transform: 'scaleX(-1)' }} />
      </Space>
      <span style={{ textDecoration: 'line-through', marginRight: 22, float: 'right' }}>
        {new Intl.NumberFormat('ja-JP', {
          style: 'currency',
          currency: 'JPY'
        }).format(originalPrice)}
      </span>
    </div>
  )
}

export default usePriceCalculator
