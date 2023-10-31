import { Tooltip } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'

type Props = {
  children: JSX.Element | string
  color?: string
  classNameTooltip?: string
  className?: string
  rows: number
  onClick?: () => void
}

export default function TextWithTooltip({ children, classNameTooltip, color, className, rows, onClick }: Props) {
  return (
    <Tooltip
      arrow
      color={color}
      className={classNameTooltip}
      title={
        <>
          <p>{children}</p>
        </>
      }
    >
      <Paragraph onClick={onClick} ellipsis={{ rows: rows }} className={className}>
        {children}
      </Paragraph>
    </Tooltip>
  )
}
