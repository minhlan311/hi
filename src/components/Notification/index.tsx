import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
type Props = {
  status: 'success' | 'info' | 'warning' | 'error'
  message: string | React.ReactNode
  description?: string | React.ReactNode
  placement?: NotificationPlacement
  duration?: number
}

const openNotification = (props: Props) => {
  const { status, message, description, placement, duration = 2 } = props

  notification.open({
    message: message,
    description: description,
    type: status,
    placement: placement || 'topRight',
    duration: duration,
  })
}

export default openNotification
