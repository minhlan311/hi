/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import { Row } from 'antd'
import { useEffect, useState } from 'react'
import ColumnDnd from './ColumnDnd'
import DroppableItem from './DroppableItem'

type DraggableListProps = {
  data: any[]
  labelKey?: string
  dndType: 'sort' | 'dnd' | 'sort-dnd' | 'matching'
  renderType?: 'text' | 'card'
  columnLabelKey?: string
  direction?: 'vertical'
}

const DragAndDrop = ({
  data,
  labelKey,
  columnLabelKey,
  renderType = 'text',
  dndType,
  direction,
}: DraggableListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const [activeData, setActiveData] = useState<any | null>(null)
  const [columns, setColumns] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])

  // const correctAnswers = tasks.filter((choice) => choice.isCorrect).map((choice) => choice.id)

  useEffect(() => {
    if (dndType === 'sort') {
      setTasks(data)
    } else {
      const newColumns: any[] = []
      const newTasks: any[] = []

      data.forEach((item) => {
        const { id, name, children } = item

        const column = { id, name }
        children.forEach((child: any) => {
          newTasks.push({
            id: child.id,
            name: child.name,
            columnId: item.id,
          })
        })

        newTasks.push({
          id: Math.random(),
          columnId: id,
        })

        newColumns.push(column)
      })

      setColumns(newColumns)
      setTasks(newTasks)
    }
  }, [])

  const onDragStart = (event: DragStartEvent) => {
    const taskData = tasks.find((t) => t.id === event.active.id)
    setActiveData(taskData)

    return
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    if (!overId) return

    setTasks((t) => {
      const activeIndex = t.findIndex((t) => t.id === activeId)
      const overIndex = t.findIndex((t) => t.id === overId)

      // t[activeIndex].columnId = t[overIndex].columnId

      if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId

        return arrayMove(tasks, activeIndex, overIndex - 1)
      }

      return arrayMove(t, activeIndex, overIndex)
    })
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveData(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    if (!overId) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  if (data?.length > 0)
    return (
      <DndContext
        modifiers={
          dndType === 'sort'
            ? [direction === 'vertical' ? restrictToVerticalAxis : restrictToHorizontalAxis]
            : undefined
        }
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        {(dndType === 'matching' && <p></p>) ||
          (dndType === 'sort' && (
            <DroppableItem
              data={tasks}
              type='sort'
              renderType={`${renderType}`}
              columnLabelKey={`${labelKey}`}
              direction={direction}
            />
          )) ||
          ((dndType === 'sort-dnd' || dndType === 'dnd') && (
            <Row gutter={12}>
              {columns.map((col) => (
                <ColumnDnd
                  id={col.id}
                  columnData={col}
                  dataLength={data.length}
                  tasks={tasks}
                  labelKey={labelKey}
                  dndType={dndType}
                  renderType={renderType}
                  columnLabelKey={columnLabelKey}
                  direction={direction}
                />
              ))}
            </Row>
          ))}
        {(dndType === 'dnd' || dndType === 'sort-dnd') && (
          <DragOverlay modifiers={[restrictToWindowEdges]}>
            {activeData ? (
              <DroppableItem
                data={activeData}
                type='grab'
                renderType={`${renderType}`}
                columnLabelKey={`${columnLabelKey}`}
              />
            ) : null}
          </DragOverlay>
        )}
      </DndContext>
    )
}

export default DragAndDrop
