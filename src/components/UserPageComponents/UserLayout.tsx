// import { Col, Divider, Row } from 'antd'
// import React, { useContext } from 'react'

// import css from './UserLayout.module.scss'
// import { AppContext } from '@/contexts/app.context'
// import Header from '../layout/Header/Header'

// type Props = {
//   title: string
//   desc?: string
//   children: React.ReactNode
// }

// const UserLayout = ({ title, desc, children }: Props) => {
//   const { profile } = useContext(AppContext)

//   return (
//     <Header size='xl' padding={'30px'} style={{ margin: '0px 25px' }}>
//       <Row className={css.userLayout}>
//         <Col className={css.userMenu} span={24} md={5}>
//           <UserMenu user={profile} />
//         </Col>
//         <Col className={css.userHeader} span={24} md={19}>
//           <div className={`${css.title} ${css.main}`}>
//             <h2>{title}</h2>
//             {desc ? <p className={css.desc}>{desc}</p> : null}
//           </div>
//           <Divider style={{ margin: '15px 0' }} />
//           <div>{children}</div>
//         </Col>
//       </Row>
//     </Header>
//   )
// }

// export default UserLayout
