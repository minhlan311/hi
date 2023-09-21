import Logo from '@/components/Logo/Logo'
import { UserState } from '@/interface/user'
import { CarryOutOutlined, DatabaseOutlined } from '@ant-design/icons'

import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import useResponsives from '@/hooks/useResponsives'
import { Button, Layout, Menu, Row, Space } from 'antd'
import { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { LuLayoutDashboard, LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AvatarDropMenu from '../AvatarDropMenu'
import css from './styles.module.scss'
import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import { AiOutlineCalendar } from 'react-icons/ai'
import AffixCustom from '@/components/AffixCustom'

type Props = {
  user: UserState
  title: string
  children: React.ReactNode
}
interface SiderItem {
  key: string
  icon: React.ReactNode
  children: React.ReactNode
  label: React.ReactNode
  type?: string
  route?: string
}

const { Header, Sider, Content } = Layout

const MentorLayout = (props: Props) => {
  const { user, title, children } = props
  const location = useLocation()
  const navitage = useNavigate()
  window.document.title = title + ' | Ucam'
  const { sm } = useResponsives()
  const [collapsed, setCollapsed] = useState(sm ? true : false)

  const getItem = (
    label: React.ReactNode,
    key: string,
    icon: React.ReactNode,
    children?: React.ReactNode,
    type?: string,
    route?: string,
  ): SiderItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
      route,
    }
  }

  const siderItems: SiderItem[] = [
    getItem(<Link to='/mentor/questions'>Lịch giảng dạy</Link>, '/mentor/calendar', <AiOutlineCalendar />),
    getItem(<Link to='/mentor/courses'>Quản lý khóa học</Link>, '/mentor/courses', <DatabaseOutlined />),
    // getItem(<Link to='/mentor/documents'>Quản lý tài liệu</Link>, '/mentor/documents', <SnippetsOutlined />),
    getItem(<Link to='/mentor/exams'>Quản lý đề thi thử</Link>, '/mentor/exams', <CarryOutOutlined />),
  ]

  return (
    <Layout className={css.layout}>
      <AffixCustom type='fixed' offsetTop={0}>
        <Sider
          trigger={null}
          collapsed={collapsed}
          className={css.navLeft}
          style={{ background: 'var(--white)' }}
          width={sm ? 200 : 240}
          collapsedWidth={sm ? 55 : 80}
        >
          <Logo href='/mentor' className={`${collapsed && css.logoCrop} ${css.logo}`} />
          <Menu
            theme='light'
            mode='inline'
            selectedKeys={[location.pathname]}
            items={siderItems}
            inlineIndent={sm ? 10 : 24}
          />
        </Sider>
      </AffixCustom>
      <Layout className={css.main}>
        <Header className={css.navTop}>
          <Row justify='space-between' align='middle'>
            <Button
              icon={collapsed ? <LuPanelLeftOpen size={22} /> : <LuPanelRightOpen size={22} />}
              onClick={() => setCollapsed(!collapsed)}
              type='text'
              style={{ color: 'var(--white)' }}
            />

            <Row align='middle'>
              <ButtonCustom
                icon={<FiHome size={20} />}
                style={{ marginRight: 15 }}
                size='middle'
                onClick={() => navitage('/')}
              ></ButtonCustom>

              <AvatarDropMenu userData={user} collapsed={sm} />
            </Row>
          </Row>
        </Header>
        <Content className={css.content}>
          <div className={css.children}>
            <Space direction='vertical' className={`sp100`}>
              <h2>{title}</h2>
              <BreadCrumbsDynamic
                homeUrl='/mentor'
                homeTitle='Mentor'
                homeIcon={<LuLayoutDashboard style={{ marginTop: 5 }} />}
              />
              <div className={css.chilItem}>{children}</div>
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MentorLayout
