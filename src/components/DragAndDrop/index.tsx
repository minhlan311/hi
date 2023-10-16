/* eslint-disable @typescript-eslint/no-explicit-any */
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import {
  //   createSnapModifier,
  //   restrictToHorizontalAxis,
  //   restrictToParentElement,
  //   restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableItem from './DraggableItem'

interface DraggableListProps {
  data: any[]
  labelKey: string
  setData: React.Dispatch<React.SetStateAction<any[]>>
}

const DragAndDrop = ({ data, labelKey, setData }: DraggableListProps) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id)
        const overIndex = previous.findIndex((i) => i.id === over?.id)

        return arrayMove(previous, activeIndex, overIndex)
      })
    }
  }

  if (data?.length > 0)
    return (
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={data} strategy={verticalListSortingStrategy}>
          {data.map((val) => (
            <DraggableItem key={labelKey ? val.id : val} id={labelKey ? val.id : val}>
              {labelKey ? val?.[labelKey] : val}
            </DraggableItem>
          ))}
        </SortableContext>
      </DndContext>
    )
}

export default DragAndDrop
