/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import DropdownCustom from '@/components/DropdownCustom/DropdownCustom'
import { UserState } from '@/interface/user'
import { clearLS } from '@/utils/auth'
import { Space } from 'antd'
import { Link } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'

type Props = {
  userData: UserState
  collapsed?: boolean
  renderMenu?: boolean
}

const AvatarDropMenu = (props: Props) => {
  const { userData, collapsed = false, renderMenu = false } = props

  const handleLogout = () => {
    clearLS()
    window.location.href = '/'
  }

  const items: any[] = [
    {
      key: 'profiles',
      label: <Link to={'/profiles/' + userData._id}>Trang cá nhân</Link>,
    },
    !userData.isMentor && {
      key: 'schedule',
      label: <Link to='/schedule'>Lịch học của tôi</Link>,
    },
    {
      key: 'myCourse',
      label: <Link to='/myCourse'>Khóa học đã mua</Link>,
    },
    {
      key: 'change-password',
      label: <Link to='/change-password'>Đổi mật khẩu</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <div>Đăng xuất</div>,
      clickEvent: handleLogout,
    },
  ]

  return renderMenu ? (
    items.map(
      (item) =>
        !item.type && (
          <ButtonCustom type='text' key={item._id} size='small' onClick={() => item.clickEvent && item.clickEvent()}>
            {item.label}
          </ButtonCustom>
        ),
    )
  ) : (
    <>
      <DropdownCustom items={items} placement='bottomRight'>
        <Space className='avtDrop'>
          <Avatar avtUrl={userData?.avatarUrl} userData={userData}></Avatar>
          {!collapsed && (
            <Space style={{ color: 'var(--white)' }}>
              <b>{userData?.fullName}</b>
              <FiChevronDown style={{ fontSize: 20 }} />
            </Space>
          )}
        </Space>
      </DropdownCustom>
    </>
  )
}

export default AvatarDropMenu
