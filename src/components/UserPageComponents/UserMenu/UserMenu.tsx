import { Row, Space } from 'antd'

import Avatar from '~/components/Avatar/Avatar'
import { UserState } from '~/interface/user'
import css from './UserMenu.module.scss'
import MenuCustom from '~/components/MenuCustom/MenuCustom'

type Props = {
  user: UserState | null
}

const UserMenu = ({ user }: Props) => {
  const menuItems = [
    {
      label: '公開プロフィールを表示',
      key: `/user/${user?._id}`
    },
    {
      label: 'プロフィール',
      key: '/user/edit-profile'
    },
    {
      label: '写真',
      key: '/user/edit-photo'
    },
    {
      label: 'アカウントセキュリティ',
      key: '/user/edit-account'
    },

    {
      label: '支払い方法',
      key: '/user/edit-payment-methods'
    },

    {
      label: 'お知らせ',
      key: '/user/edit-notifications'
    },
    {
      label: 'アカウントを閉鎖',
      key: '/user/close-account'
    }
  ]
  return (
    <Row justify='center' className={css.menu}>
      <Space direction='vertical' align='center' className={css.user}>
        <Avatar userData={user} size={120} />
        <h3>{user?.fullName}</h3>
      </Space>
      <MenuCustom items={menuItems} activeKey size='small' />
    </Row>
  )
}

export default UserMenu
