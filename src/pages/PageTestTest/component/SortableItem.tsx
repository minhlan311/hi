// SortableItem.js
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

function SortableItem({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
