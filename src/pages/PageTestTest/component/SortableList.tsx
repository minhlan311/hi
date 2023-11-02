/* eslint-disable @typescript-eslint/no-explicit-any */
// SortableList.js
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import SortableItem from './SortableItem'

function SortableList({ items, setItems }: any) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id: any) => (
          <SortableItem key={id} id={id}>
            Item {id}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id)
      const newIndex = items.indexOf(over.id)

      setItems(arrayMove(items, oldIndex, newIndex))
    }
  }
}

export default SortableList
