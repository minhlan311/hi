import { Tooltip } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'

type Props = {
  children: JSX.Element | string
  color?: string
  classNameTooltip?: string
  className?: string
  rows: number
}

export default function TextWithTooltip({ children, classNameTooltip, color, className, rows }: Props) {
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
      <Paragraph ellipsis={{ rows: rows }} className={className}>
        {children}
      </Paragraph>
    </Tooltip>
  )
}
