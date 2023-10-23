import { Spin } from 'antd'

type Props = {
  icon?: React.ReactElement<HTMLElement>
  size?: 'small' | 'default' | 'large'
  delay?: number
  tip?: string | React.ReactNode
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  loading?: boolean
}

const LoadingCustom = (props: Props) => {
  const { icon, size, delay, tip, style, className, children, loading = true } = props

  return loading ? (
    <Spin indicator={icon} tip={tip} delay={delay} size={size} style={style} className={className}>
      {children ? (
        children
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.05)',
          }}
        />
      )}
    </Spin>
  ) : (
    children
  )
}

export default LoadingCustom
