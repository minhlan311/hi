import { useSortable } from '@dnd-kit/sortable'

interface DraggableItemProps {
  children: React.ReactNode
  id: string
}

const DraggableItem: React.FC<DraggableItemProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition: transition ? 'transform 0.2s' : undefined,
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 9999 : undefined,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
      <div ref={setActivatorNodeRef}>#</div>
    </div>
  )
}

export default DraggableItem
