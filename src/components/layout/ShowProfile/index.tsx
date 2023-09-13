// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { resetUserState, userDetailRequest, userDetailSelector } from '../../../slices/user'
// import { Avatar, Rate, Skeleton, Space, message } from 'antd'
// import './styles.scss'
// import noAvt from '../../../assets/images/navigation/No-avt.jpg'
// import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
// import {
//   assessmentUserSelector,
//   createAssessmentRequest,
//   createAssessmentSelector,
//   getAssessmentRequest
// } from '../../../slices/assessment'

// export default function ShowProfile({ id }) {
//   const dispatch = useDispatch()
//   const userDetail = useSelector(userDetailSelector)
//   const assessmentsUser = useSelector(assessmentUserSelector)
//   const createAssessment = useSelector(createAssessmentSelector)

//   useEffect(() => {
//     if (id) dispatch(userDetailRequest(id))
//   }, [id])
//   const [user, setUser] = useState()
//   const [evaluate, setEvaluate] = useState(5)
//   const [checkEvaluate, setCheckEvaluate] = useState(false)
//   useEffect(() => {
//     if (userDetail.status === 'success') {
//       setUser(userDetail?.data)
//       dispatch(resetUserState())
//     }
//     if (!id) {
//       setUser()
//     }
//   }, [userDetail, id])
//   useEffect(() => {
//     if (user) {
//       const payload = {
//         filterQuery: { targetModel: 'MENTOR', targetId: user?._id }
//       }
//       dispatch(getAssessmentRequest(payload))
//     }
//   }, [createAssessment])

//   useEffect(() => {
//     if (assessmentsUser.status === 'success') {
//       const totalEvaluate = assessmentsUser?.data?.reduce((sum, person) => sum + person.evaluate, 0)

//       setEvaluate(totalEvaluate / assessmentsUser.data?.length)
//       assessmentsUser.data?.find((item) => setCheckEvaluate(item.createdById.includes(user?._id)))
//     }
//   }, [assessmentsUser])

//   useEffect(() => {
//     if (createAssessment.status === 'success') {
//       message.success('Đã gửi đánh giá')
//       setCheckEvaluate(true)
//     }
//   }, [createAssessment])
//   const handleChangeRate = (val) => {
//     if (user) {
//       const payload = {
//         targetModel: 'MENTOR',
//         targetId: user?._id,
//         evaluate: parseInt(val)
//       }

//       dispatch(createAssessmentRequest(payload))
//     }
//   }

//   return (
//     <div className='popover-main'>
//       {userDetail.status === 'loading' ? (
//         <div style={{ width: 250 }}>
//           <div style={{ padding: '0 10px' }}>
//             <Skeleton
//               avatar
//               active
//               paragraph={{
//                 rows: 3
//               }}
//             />
//           </div>
//         </div>
//       ) : (
//         <div className='d-col-c'>
//           <div className='popover-bg'>
//             <img src={user?.coverImgUrl ? user?.coverImgUrl : 'https://picsum.photos/seed/picsum/250/100'} alt='bg' />
//           </div>
//           <div className='popover-avt'>
//             <Avatar className='avt' style={{ background: 'white' }} src={user?.avatarUrl ? user?.avatarUrl : noAvt} />
//             <div className='info'>
//               <h4>
//                 <a>{user?.fullName}</a>
//               </h4>
//               <p></p>
//               <div className='social'>
//                 <Space>
//                   {user?.social?.map(
//                     (url) =>
//                       (url.type === 'Facebook' && (
//                         <div
//                           className='s-i'
//                           key={url.type}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             window.open(url.url, '_blank').focus()
//                           }}
//                         >
//                           <FaFacebookF color='#4267B2' />
//                         </div>
//                       )) ||
//                       (url.type === 'Instagram' && (
//                         <div
//                           className='s-i'
//                           key={url.type}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             window.open(url.url, '_blank').focus()
//                           }}
//                         >
//                           <FaInstagram
//                             style={{
//                               color: '#E4405F'
//                             }}
//                           />
//                         </div>
//                       )) ||
//                       (url.type === 'Youtube' && (
//                         <div
//                           className='s-i'
//                           key={url.type}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             window.open(url.url, '_blank').focus()
//                           }}
//                         >
//                           <FaYoutube color='#FF0000' />
//                         </div>
//                       )) ||
//                       (url.type === 'TikTok' && (
//                         <div
//                           className='s-i'
//                           key={url.type}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             window.open(url.url, '_blank').focus()
//                           }}
//                         >
//                           <FaTiktok />
//                         </div>
//                       ))
//                   )}
//                 </Space>
//               </div>
//             </div>
//           </div>
//           <div className='info-user'>
//             <p style={{ marginBottom: 5 }}>
//               Số điện thoại: <b>{user?.phoneNumber}</b>
//             </p>
//             <p style={{ marginBottom: 5 }}>
//               Email: <b>{user?.email}</b>
//             </p>
//             {/* <p style={{ margin: 0 }}>
//                             Tài liệu đã đăng: <b>5</b>
//                         </p> */}
//           </div>
//           <div>
//             <Rate
//               allowHalf
//               style={{ fontSize: 14 }}
//               defaultValue={evaluate}
//               disabled={checkEvaluate}
//               onChange={handleChangeRate}
//             />
//             <b>{user?.countAssessment}</b>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
