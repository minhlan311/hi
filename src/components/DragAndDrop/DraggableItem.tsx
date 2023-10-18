import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import css from './styles.module.scss'

interface DraggableItemProps {
  children: React.ReactNode
  id: string
}

const DraggableItem: React.FC<DraggableItemProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging)
    return (
      <div ref={setNodeRef} style={style} className={css.move} {...attributes} {...listeners}>
        {children}
      </div>
    )

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
      <div ref={setActivatorNodeRef}></div>
    </div>
  )
}

export default DraggableItem
