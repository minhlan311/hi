// import css from './CategoryTabsBox.module.scss'
// import { Card, Space } from 'antd'
// import { CategoryState } from '@/interface/categoryTab'
// import SliderCustom from '@/components/SliderCustom'
// import TabsCustom from '@/components/TabsCustom/TabsCustom'
// import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'

// type Props = {
//   data: any[]
// }

// const CategoryTabsBox = (props: Props) => {
//   const { data } = props

//   const RenderChildren = (props: CategoryState) => {
//     const { title, href, desc, buttonText, courses } = props

//     return (
//       <Card className={css.cardMain}>
//         <Space direction='vertical' style={{ display: 'flex' }}>
//           <h3 className={css.title}>{title}</h3>
//           <p className={css.desc}>{desc}</p>

//           <ButtonCustom href={href}> {buttonText}</ButtonCustom>

//           <SliderCustom data={courses} />
//         </Space>
//       </Card>
//     )
//   }

//   const getItem = (dataArr: CategoryState[]) => {
//     return dataArr.map((item) => {
//       return {
//         id: item.id,
//         name: item.name,
//         children: (
//           <RenderChildren
//             id={item.id}
//             title={item.title}
//             href={item.href}
//             desc={item.desc}
//             buttonText={item.buttonText}
//             active={item.active}
//             courses={item.courses}
//           />
//         )
//       }
//     })
//   }

//   const items = getItem(data)
//   return <TabsCustom data={items} borderBottom={false} />
// }

// export default CategoryTabsBox
