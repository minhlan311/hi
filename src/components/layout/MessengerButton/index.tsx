import { FloatButton } from 'antd'
import './styles.scss'

export default function MessengerButton() {
  return (
    <FloatButton
      className='messenger-button'
      icon={
        <img
          className='icon-button'
          src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-messenger-icon.svg'
        />
      }
      type='default'
    />
  )
}
