// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useCallback, useState } from 'react'

// import { Card, Col, Row } from 'antd'
// import { DragDropState } from '@/interface/dragDrop'
// import { Gutter } from 'antd/lib/grid/row'
// import css from './styles.module.scss'
// import { reorderQuoteMap } from './reorder'
// import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

// type Props = {
//   data?: DragDropState[]
//   typeKey: string
//   dragWidth?: string | number
//   dragMinHeight?: string | number
//   gutter?: Gutter | [Gutter, Gutter]
//   showLabel?: boolean
//   style?: React.CSSProperties
//   dragStyle?: React.CSSProperties
//   dragClassName?: string
//   isCombineEnabled?: boolean
//   children?: React.ReactNode
// }

// type TaskProps = {
//   id: string
//   index: number
//   title: string
// }

// type ColumnProps = {
//   droppableId: string
//   list: any[]
//   type: string
// }

// const DragAndDrop = (props: Props) => {
//   const {
//     data,
//     dragWidth,
//     dragMinHeight,
//     gutter,
//     showLabel = false,
//     style,
//     dragStyle,
//     dragClassName,
//     isCombineEnabled = false,
//     typeKey,
//     children,
//   } = props
//   const fakeData = [
//     {
//       _id: 'group-1',
//       child: [
//         {
//           _id: '0',
//           content: 'item 0',
//           id: '0',
//         },
//         {
//           _id: '1',
//           content: 'item 1',
//           id: '1',
//         },
//         {
//           _id: '2',
//           content: 'item 2',
//           id: '2',
//         },
//         {
//           _id: '3',
//           content: 'item 3',
//           id: '3',
//         },
//         {
//           _id: '4',
//           content: 'item 4',
//           id: '4',
//         },
//         {
//           _id: '5',
//           content: 'item 5',
//           id: '5',
//         },
//       ],
//     },
//     {
//       _id: 'group-2',
//       child: [
//         {
//           _id: '6',
//           content: 'item 6',
//           id: '6',
//         },
//         {
//           _id: '7',
//           content: 'item 7',
//           id: '7',
//         },
//         // {
//         //   id: '8',
//         //   content: 'item 8',
//         // },
//         // {
//         //   id: '9',
//         //   content: 'item 9',
//         // },
//       ],
//     },
//     {
//       _id: 'group-3',
//       child: [
//         {
//           _id: '8',
//           content: 'item 8',
//           id: '8',
//         },
//         {
//           _id: '9',
//           content: 'item 9',
//           id: '9',
//         },
//       ],
//     },
//   ]
//    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => (i + 1).toString()))
//    const [activeId, setActiveId] = useState<string | null>(null)
//    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

//    const handleDragStart = useCallback((event: DragStartEvent) => {
//      setActiveId(event.active.id)
//    }, [])
//    const handleDragEnd = useCallback((event: DragEndEvent) => {
//      const { active, over } = event

//      if (active.id !== over?.id) {
//        setItems((items) => {
//          const oldIndex = items.indexOf(active.id)
//          const newIndex = items.indexOf(over!.id)

//          return arrayMove(items, oldIndex, newIndex)
//        })
//      }

//      setActiveId(null)
//    }, [])
//    const handleDragCancel = useCallback(() => {
//      setActiveId(null)
//    }, [])

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragCancel={handleDragCancel}
//     >
//       <div style={{ maxWidth: dragWidth, ...style }} className={css.ddMain}>
//         <Row justify='space-evenly' gutter={gutter}>
//           {state.map((el, ind) => (
//             <Col span={24} md={24 / state.length}>
//               <Column key={ind} droppableId={el._id} list={el.child} type={typeKey} />
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </DndContext>
//   )
// }

// export default DragAndDrop
