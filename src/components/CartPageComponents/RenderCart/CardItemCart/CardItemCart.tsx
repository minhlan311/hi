// import { useContext } from 'react'
// import { CoursesState } from '@/interface/coursesData'
// import css from './CardItemCart.module.scss'
// import { Col, Row, Space } from 'antd'
// import TagCustom from '@/components/TagCustom/TagCustom'
// import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
// import ProductRating from '@/components/ProductRating'
// import { AppContext } from '@/contexts/app.context'
// import { handleLocalAction } from '@/common'

// interface CardItemCartProps {
//   type: 'order' | 'favorite' | 'white-list'
//   data: CoursesState
//   setOrderData?: React.Dispatch<React.SetStateAction<CoursesState[]>>
//   setFavoriteData?: React.Dispatch<React.SetStateAction<CoursesState[]>>
//   setWhiteListData?: React.Dispatch<React.SetStateAction<CoursesState[]>>
// }

// const CardItemCart = ({ type, data, setOrderData, setFavoriteData, setWhiteListData }: CardItemCartProps) => {
//   const { setOrder, setFavorite, setWhiteList } = useContext(AppContext)

//   return (
//     <div>
//       <Row justify='space-between' className={css.card}>
//         <Col span={24} md={4} className={css.image}>
//           <img src={data.coverUrl} alt={data.name} />
//         </Col>
//         <Col span={24} md={11} className={css.infor}>
//           <h3 className={css.title}>{data.name}</h3>
//           <div className={css.mentor}>講師{data.mentor}による</div>
//           <Space>
//             {data.type && (
//               <TagCustom
//                 intArrType={['BESS SELLER', 'REVISION', 'NEW']}
//                 intColor={['var(--yellowish-green)', 'var(--teal)', 'var(--red)']}
//                 intAlternativeType={['ベストセラー', '改訂', '話題・新着']}
//                 content={data.type}
//                 colorText='var(--black)'
//               />
//             )}
//             <Space align='center' className={css.rate}>
//               <b>{data.avgRating}</b>
//               <ProductRating rating={data.avgRating} />
//               <span>({data.countRating}件の評価)</span>
//             </Space>
//           </Space>
//           <div className={css.aboutCourse}>
//             合計{data.countTime}時間 <span className={css.dot}>•</span> レクチャーの数:{data.countCourses}
//             <span className={css.dot}>•</span> {data.educationType}
//           </div>
//         </Col>
//         <Col span={24} md={5} className={css.actions}>
//           {type === 'order' ? (
//             <Space direction='vertical' className='sp100'>
//               <button
//                 className={css.buttonCustom}
//                 onClick={() => {
//                   if (setOrderData) handleLocalAction(setOrderData, data._id, 'remove', 'order')
//                 }}
//               >
//                 削除
//               </button>
//               <button
//                 className={css.buttonCustom}
//                 onClick={() => {
//                   setWhiteList([data])
//                   if (setOrderData) handleLocalAction(setOrderData, data._id, 'remove', 'order')
//                 }}
//               >
//                 とっておく
//               </button>
//               <button
//                 className={css.buttonCustom}
//                 onClick={() => {
//                   setFavorite([data])
//                   if (setOrderData) handleLocalAction(setOrderData, data._id, 'remove', 'order')
//                 }}
//               >
//                 ほしい物リストに移動
//               </button>
//             </Space>
//           ) : (
//             <Space direction='vertical' className='sp100'>
//               <button
//                 className={css.buttonCustom}
//                 onClick={() => {
//                   if (type === 'favorite' && setFavoriteData)
//                     handleLocalAction(setFavoriteData, data._id, 'remove', 'favorite')
//                   else if (type === 'white-list' && setWhiteListData)
//                     handleLocalAction(setWhiteListData, data._id, 'remove', 'whiteList')
//                 }}
//               >
//                 削除
//               </button>
//               <button
//                 className={css.buttonCustom}
//                 onClick={() => {
//                   setOrder([data])
//                   if (type === 'favorite' && setFavoriteData)
//                     handleLocalAction(setFavoriteData, data._id, 'remove', 'favorite')
//                   else if (type === 'white-list' && setWhiteListData)
//                     handleLocalAction(setWhiteListData, data._id, 'remove', 'whiteList')
//                 }}
//               >
//                 カートに入れる
//               </button>
//             </Space>
//           )}
//         </Col>
//         <Col span={24} md={4} className={css.cost}>
//           <PriceCalculator
//             price={data.cost}
//             priceSize={16}
//             priceColor='var(--purple)'
//             discount={data.discount}
//             showDiscountTag
//             showTotal
//             direction='column-right'
//           />
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default CardItemCart
