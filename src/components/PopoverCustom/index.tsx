import { UserState } from '@/interface/user'
import { Divider, Popover, Rate, Row, Space } from 'antd'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import Avatar from '../Avatar/Avatar'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

type Props = {
  content?: string | React.ReactNode
  title?: string
  trigger?: 'click' | 'hover' | 'focus' | 'contextMenu'
  defaultOpen?: boolean
  children: React.ReactNode
  type?: 'default' | 'showProfile'
  userData?: UserState
}

const PopoverCustom = (props: Props) => {
  const { content, title, trigger = 'hover', defaultOpen = false, children, type, userData } = props

  if (type === 'showProfile' && userData) {
    const ShowProfile = () => {
      return (
        <Space direction='vertical' style={{ minWidth: 280 }}>
          <Space className='sp100'>
            <Avatar avtUrl={userData.avatarUrl} userData={userData} size={60} />
            <Space direction='vertical' className='sp100'>
              <div>
                <h3>{userData.fullName}</h3>
                <p>{userData.mentorInfo.educationType}</p>
              </div>
            </Space>
          </Space>
          <Divider style={{ margin: 0 }} />
          <Space direction='vertical' className='sp100'>
            <Space>
              <AiOutlinePhone size={20} style={{ marginTop: 5 }} />
              <ButtonCustom type='link' style={{ padding: 0, height: 0 }}>
                {userData.phoneNumber}
              </ButtonCustom>
            </Space>
            <Space>
              <AiOutlineMail size={20} style={{ marginTop: 8 }} />
              <ButtonCustom type='link' style={{ padding: 0, height: 0 }}>
                {userData.email}
              </ButtonCustom>
            </Space>
            <Row justify='space-between' align='middle'>
              <Rate value={4.5} allowHalf style={{ fontSize: 16 }} />
              <ButtonCustom type='link' className='link' style={{ padding: 0 }} href={`/profiles/${userData._id}`}>
                Xem chi tiết {'>'}
              </ButtonCustom>
            </Row>
          </Space>
        </Space>
      )
    }

    return (
      <Popover content={<ShowProfile />} title={title} trigger={[trigger]} defaultOpen={defaultOpen} arrow>
        {children}
      </Popover>
    )
  }

  return (
    <Popover content={content} title={title} trigger={[trigger]} defaultOpen={defaultOpen} arrow>
      {children}
    </Popover>
  )
}

export default PopoverCustom
