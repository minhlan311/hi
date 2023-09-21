import { Spin } from 'antd'

type Props = {
  icon?: React.ReactElement<HTMLElement>
  size?: 'small' | 'default' | 'large'
  delay?: number
  tip?: string | React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const LoadingCustom = (props: Props) => {
  const { icon, size, delay, tip, style, className } = props

  return (
    <Spin indicator={icon} tip={tip} delay={delay} size={size} style={style} className={className}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.05)',
        }}
      />
    </Spin>
  )
}

export default LoadingCustom
