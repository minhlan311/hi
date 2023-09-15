import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
type Props = {
  status: 'success' | 'info' | 'warning' | 'error'
  message: string | React.ReactNode
  description?: string | React.ReactNode
  placement?: NotificationPlacement
}

const openNotification = (props: Props) => {
  const { status, message, description, placement } = props

  notification.open({
    message: message,
    description: description,
    type: status,
    placement: placement || 'topRight'
  })
}

export default openNotification
