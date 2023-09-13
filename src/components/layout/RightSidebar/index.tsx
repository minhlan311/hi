// import React, { memo, useState, useRef } from 'react'
// import PropTypes from 'prop-types'
// import { FaRegBell, FaRegClock } from 'react-icons/fa'

// import useClickOutside from '../../../hooks/useClickOutside'

// import './styles.scss'

// const RightSidebar = () => {
//     const [isSideBarExpand, setSideBarExpand] = useState(false)

//     const rightSidebarRef = useRef()

//     const onSetSideBarExpand = () => {
//         setSideBarExpand(!isSideBarExpand)
//     }

//     useClickOutside(rightSidebarRef, () => setSideBarExpand(false))

//     return (
//         <div
//             ref={rightSidebarRef}
//             className={`mtz-right-sidebar mtz-right-sidebar--${
//                 isSideBarExpand ? 'expand' : 'default'
//             }`}
//         >
//             <div className="mtz-right-sidebar__left">
//                 <div
//                     role="presentation"
//                     style={{ position: 'relative' }}
//                     onClick={() => onSetSideBarExpand()}
//                 >
//                     <FaRegBell size={18} color="#463E78" />
//                     <sup
//                         style={{
//                             position: 'absolute',
//                             top: 20,
//                             right: 20,
//                         }}
//                     >
//                         <div
//                             style={{
//                                 width: 10,
//                                 height: 10,
//                                 borderRadius: '50%',
//                                 border: '2px solid #FFFFFF',
//                                 background: '#26AFAB',
//                             }}
//                         />
//                     </sup>
//                 </div>
//                 <div role="presentation" onClick={() => onSetSideBarExpand()}>
//                     <FaRegClock size={18} color="#463E78" />
//                 </div>
//             </div>
//             <div className="mtz-right-sidebar__right"></div>
//         </div>
//     )
// }

// RightSidebar.propTypes = {}

// RightSidebar.defaultProps = {}

// export default memo(RightSidebar)
