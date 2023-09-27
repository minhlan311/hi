/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, Col, Row } from 'antd'
import { DragDropState } from '@/interface/dragDrop'
import { Gutter } from 'antd/lib/grid/row'
import css from './styles.module.scss'
import { reorderQuoteMap } from './reorder'

type Props = {
  data: DragDropState[]
  typeKey: string
  dragWidth?: string | number
  dragMinHeight?: string | number
  gutter?: Gutter | [Gutter, Gutter]
  showLabel?: boolean
  style?: React.CSSProperties
  dragStyle?: React.CSSProperties
  dragClassName?: string
  isCombineEnabled?: boolean
  children?: React.ReactNode
}

type TaskProps = {
  id: string
  index: number
  title: string
}

type ColumnProps = {
  droppableId: string
  list: any[]
  type: string
}

const DragAndDrop = (props: Props) => {
  const {
    data,
    dragWidth,
    dragMinHeight,
    gutter,
    showLabel = false,
    style,
    dragStyle,
    dragClassName,
    isCombineEnabled = false,
    typeKey,
    children,
  } = props
  const fakeData = [
    {
      _id: 'group-1',
      child: [
        {
          _id: '0',
          content: 'item 0',
          id: '0',
        },
        {
          _id: '1',
          content: 'item 1',
          id: '1',
        },
        {
          _id: '2',
          content: 'item 2',
          id: '2',
        },
        {
          _id: '3',
          content: 'item 3',
          id: '3',
        },
        {
          _id: '4',
          content: 'item 4',
          id: '4',
        },
        {
          _id: '5',
          content: 'item 5',
          id: '5',
        },
      ],
    },
    {
      _id: 'group-2',
      child: [
        {
          _id: '6',
          content: 'item 6',
          id: '6',
        },
        {
          _id: '7',
          content: 'item 7',
          id: '7',
        },
        // {
        //   id: '8',
        //   content: 'item 8',
        // },
        // {
        //   id: '9',
        //   content: 'item 9',
        // },
      ],
    },
    {
      _id: 'group-3',
      child: [
        {
          _id: '8',
          content: 'item 8',
          id: '8',
        },
        {
          _id: '9',
          content: 'item 9',
          id: '9',
        },
      ],
    },
  ]
  const [state, setState] = useState<DragDropState[]>(data ? data : fakeData)

  const onDragEnd = (result: any) => {
    console.log(result)

    const { draggableId, source, destination } = result

    if (!result.destination) {
      return
    }

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const newData = reorderQuoteMap({
      quoteMap: state,
      draggableId,
      source,
      destination,
    })

    setState(newData as unknown as DragDropState[])
  }

  const Task = (props: TaskProps) => {
    const { id, index, title } = props

    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <Card
                size='small'
                style={{
                  backgroundColor: (snapshot.isDropAnimating && 'green') || (snapshot.isDragging && 'red') || 'white',
                }}
                {...provided.dragHandleProps}
              >
                {title}
              </Card>
            </div>
          )
        }}
      </Draggable>
    )
  }

  const Column = (props: ColumnProps) => {
    const { droppableId, list, type } = props

    return (
      <Droppable
        droppableId={droppableId}
        type={type}
        isCombineEnabled={isCombineEnabled}
        ignoreContainerClipping={Boolean(dragMinHeight)}
      >
        {(provided, snapshot) => {
          return children ? (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
            </div>
          ) : (
            <Card
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${dragClassName} ${css.colMain}`}
              style={{
                ...dragStyle,
                minHeight: dragMinHeight,
                background:
                  (snapshot.draggingOverWith && 'violet') ||
                  (!snapshot.isDraggingOver && snapshot.isUsingPlaceholder && 'blue') ||
                  'white',
              }}
            >
              {showLabel && <h2>{droppableId}</h2>}
              {list.map((val, index) => {
                return <Task id={val.id} index={index} title={val.content} key={val.id} />
              })}
              {provided.placeholder}
            </Card>
          )
        }}
      </Droppable>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ maxWidth: dragWidth, ...style }} className={css.ddMain}>
        <Row justify='space-evenly' gutter={gutter}>
          {state.map((el, ind) => (
            <Col span={24} md={24 / state.length}>
              <Column key={ind} droppableId={el._id} list={el.child} type={typeKey} />
            </Col>
          ))}
        </Row>
      </div>
    </DragDropContext>
  )
}

export default DragAndDrop
