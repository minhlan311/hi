// import React, { useEffect, useState } from 'react'
// import './styles.scss'
// import { Avatar, Button, Dropdown, Layout, Menu, Result, Tooltip, Typography } from 'antd'
// import { Link, useLocation } from 'react-router-dom'
// import {
//   ContainerOutlined,
//   CarryOutOutlined,
//   DatabaseOutlined,
//   SnippetsOutlined,
//   MenuOutlined,
//   DownOutlined,
//   UserOutlined,
//   RollbackOutlined
// } from '@ant-design/icons'
// import mtzLogoImg from '../../../assets/images/backgrounds/logo.svg'
// import { TbLock } from 'react-icons/tb'
// import { BsFillPersonFill, BsQuestionCircle, BsFillStarFill } from 'react-icons/bs'
// import { MdLogout } from 'react-icons/md'
// import { useHistory } from 'react-router-dom'
// import { getStorage, removeStorage, setStorage } from '../../../services/storage'
// import { USER_INFO } from '../../../constants/storageKeys'
// import { useMediaQuery } from 'react-responsive'
// import Navigation from '../Navigation'
// import Footer from '../Footer'
// import noAvt from '../../../assets/images/navigation/No-avt.jpg'
// import Notifications from '../Navigation/Notifications'
// import { userDetailRequest, userDetailSelector } from '../../../slices/user'
// import { useDispatch, useSelector } from 'react-redux'

// export default function MentorLayout({ children }) {
//   const dispatch = useDispatch()
//   const userDetail = useSelector(userDetailSelector)
//   const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
//   const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
//   const location = useLocation()
//   const history = useHistory()
//   const [collapsed, setCollapsed] = useState(true)

//   const { Header, Content, Sider } = Layout
//   const { Text } = Typography
//   const user = getStorage(USER_INFO)
//   useEffect(() => {
//     // dispatch(userDetailRequest(user?._id))
//   }, [])
//   const collaps = getStorage('sjklbhdjk3trfgyagvhq31s')

//   useEffect(() => {
//     if (!collaps) {
//       setCollapsed(collaps)
//     }
//   }, [collaps])

//   const getItem = (label, key, icon, children, type, route) => {
//     return {
//       key,
//       icon,
//       children,
//       label,
//       type,
//       route
//     }
//   }
//   const siderItems = [
//     getItem(<Link to='/mentor'>Danh sách câu hỏi</Link>, '/mentor', <ContainerOutlined />),
//     getItem(<Link to='/mentor/courses'>Quản lý khóa học</Link>, '/mentor/courses', <DatabaseOutlined />),
//     getItem(<Link to='/mentor/documents'>Quản lý tài liệu</Link>, '/mentor/documents', <SnippetsOutlined />),
//     getItem(<Link to='/mentor/exams'>Quản lý đề thi thử</Link>, '/mentor/exams', <CarryOutOutlined />)
//   ]

//   const handleLogout = () => {
//     removeStorage(USER_INFO)
//     history.push('/login')
//   }

//   const items = [
//     {
//       label: (
//         <Link to='/profiles' className='menu-content'>
//           <Text>Trang cá nhân</Text>
//         </Link>
//       ),
//       key: '1',
//       icon: <BsFillPersonFill size={20} style={{ marginLeft: 0 }} />
//     },
//     {
//       label: (
//         <Link to='/point-management' className='menu-content'>
//           <Text>Quản lý điểm A+</Text>
//         </Link>
//       ),
//       key: '2',
//       icon: <BsFillStarFill size={19} style={{ marginLeft: 0 }} />
//     },
//     {
//       label: (
//         <Link to='/pedagogys' className='menu-content'>
//           <Text>Các câu hỏi</Text>
//         </Link>
//       ),
//       key: '3',
//       icon: <BsQuestionCircle size={18} style={{ marginLeft: 1 }} />
//     },
//     {
//       label: (
//         <Link to='/change-password' className='menu-content'>
//           <Text>Đổi mật khẩu</Text>
//         </Link>
//       ),
//       key: '4',
//       icon: <TbLock size={20} style={{ marginLeft: 0 }} />
//     },
//     {
//       type: 'divider'
//     },
//     {
//       label: (
//         <div className='menu-content' onClick={handleLogout}>
//           <Text>Đăng xuất</Text>
//         </div>
//       ),
//       key: '5',
//       icon: <MdLogout size={20} style={{ marginLeft: 2 }} />
//     }
//   ]

//   return !user.isMentor || (user.isMentor && (user.mentorStatus === 'PENDING' || !user.mentorStatus)) ? (
//     <>
//       <Navigation />
//       <div style={{ marginTop: 80 }}>
//         <Result
//           style={{ height: '100vh' }}
//           status='403'
//           title='403'
//           subTitle='Xin lỗi, bạn cần đăng ký làm Mentor để truy cập vào trang này!'
//           extra={
//             <div>
//               <Button style={{ marginRight: 15 }} onClick={() => history.push('/regis-is-mentor')}>
//                 Đăng ký làm Mentor
//               </Button>
//               <Button type='primary' onClick={() => (window.location.href = '/')}>
//                 Trở về trang chủ
//               </Button>
//             </div>
//           }
//         />
//       </div>
//       <Footer />
//     </>
//   ) : (
//     <Layout className='mtz-layout'>
//       {collapsed && isMobile ? null : (
//         <Sider trigger={null} collapsible collapsed={collapsed}>
//           <div
//             className='mtz-trigger'
//             style={
//               collapsed
//                 ? {
//                     width: 120
//                   }
//                 : {
//                     width: 200
//                   }
//             }
//           >
//             <a className='logo' href={'/'}>
//               <img
//                 src={mtzLogoImg}
//                 alt='mtz logo'
//                 style={
//                   collapsed
//                     ? {
//                         height: 38,
//                         width: 32,
//                         objectFit: 'cover',
//                         objectPosition: 0,
//                         marginLeft: 5
//                       }
//                     : {
//                         height: 38,
//                         width: '100%',
//                         objectFit: 'fill'
//                       }
//                 }
//               />
//             </a>
//             <MenuOutlined
//               className='trigger'
//               onClick={() => {
//                 setCollapsed(!collapsed)
//                 setStorage({
//                   key: 'sjklbhdjk3trfgyagvhq31s',
//                   val: !collapsed
//                 })
//               }}
//               style={
//                 collapsed
//                   ? {
//                       marginLeft: 37,
//                       color: 'black'
//                     }
//                   : {
//                       marginLeft: 18,
//                       color: 'white'
//                     }
//               }
//             />
//           </div>
//           <Menu theme='dark' mode='inline' defaultSelectedKeys={location.pathname} items={siderItems} />
//         </Sider>
//       )}

//       <Layout style={{ maxHeight: '100vh' }}>
//         <Header
//           className='site-layout'
//           style={
//             isMobile || isTablet
//               ? {
//                   paddingInline: 15,
//                   width: '100%',
//                   position: !collapsed ? 'absolute' : null
//                 }
//               : null
//           }
//         >
//           {collapsed && isMobile ? (
//             <Button
//               type='text'
//               className='trigger'
//               style={{
//                 color: 'black'
//               }}
//               onClick={() => {
//                 setCollapsed(!collapsed)
//                 setStorage({
//                   key: 'sjklbhdjk3trfgyagvhq31s',
//                   val: !collapsed
//                 })
//               }}
//               icon={<MenuOutlined />}
//             ></Button>
//           ) : null}
//           {isMobile ? (
//             <div style={{ width: '79%' }}></div>
//           ) : (
//             <div>
//               {/* <Input
//                                 placeholder="Tìm kiếm..."
//                                 prefix={<SearchOutlined />}
//                                 allowClear
//                             /> */}
//             </div>
//           )}

//           <div className='site-right'>
//             {isMobile ? (
//               <Tooltip title='Trang chủ'>
//                 <Button
//                   style={{ marginRight: 15 }}
//                   type='primary'
//                   onClick={() => (window.location.href = '/')}
//                   icon={<RollbackOutlined />}
//                 />
//               </Tooltip>
//             ) : (
//               <Button style={{ marginRight: 20 }} type='primary' onClick={() => (window.location.href = '/')}>
//                 Trang chủ
//               </Button>
//             )}

//             <Notifications />

//             <Dropdown
//               menu={{
//                 items
//               }}
//               autoAdjustOverflow
//             >
//               <div style={{ marginLeft: 15 }}>
//                 <Avatar src={user?.avatarUrl ? user?.avatarUrl : noAvt} size={32} icon={<UserOutlined />} />
//                 {isMobile ? null : (
//                   <Text
//                     style={{
//                       fontWeight: 'bold',
//                       marginLeft: 5
//                     }}
//                   >
//                     {user.fullName}
//                   </Text>
//                 )}
//                 <DownOutlined style={{ marginLeft: 5, fontSize: 14 }} />
//               </div>
//             </Dropdown>
//           </div>
//         </Header>
//         <Content
//           className='content'
//           style={(isMobile || isTablet) && !collapsed ? { position: 'absolute', marginTop: 63 } : null}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   )
// }
