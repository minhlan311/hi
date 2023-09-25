import { DragDropState } from '@/interface/dragDrop'
import { List } from 'immutable'

interface Droppable {
  droppableId: string
  index: number
}

export interface ReorderResult {
  quoteMap: DragDropState[]
  draggableId: string
  source: Droppable
  destination: Droppable
}

interface MoveBetweenResult {
  list1: {
    id: string
    values: Array<string>
  }
  list2: {
    id: string
    values: Array<string>
  }
}

const reorder = (list: Array<string>, startIndex: number, endIndex: number): Array<string> => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default reorder

export const reorderQuoteMap = ({ quoteMap, draggableId, source, destination }: ReorderResult) => {
  const sourceGroupIndex = quoteMap.findIndex((group) => group._id === source.droppableId)
  const destinationGroupIndex = quoteMap.findIndex((group) => group._id === destination.droppableId)

  const [sourceGroup] = quoteMap.filter((group) => group._id === source.droppableId)
  const [destinationGroup] = quoteMap.filter((group) => group._id === destination.droppableId)

  if (source.droppableId === destination.droppableId && source.index === destination.index) {
    return
  }

  if (!sourceGroup || !destinationGroup) {
    // Invalid source or destination
    return quoteMap
  }

  const itemToMove = sourceGroup.child.find((item) => item.id === draggableId)

  if (!itemToMove) {
    // Draggable item not found in source group
    return quoteMap
  }

  // Remove item from source group
  const newSourceGroup = (sourceGroup.child = sourceGroup.child.filter((item) => item.id !== draggableId))

  // Insert item into destination group at the specified index
  const newDestinationGroup = destinationGroup.child.splice(destination.index, 0, itemToMove)
  console.log(newSourceGroup, newDestinationGroup)

  // Update the modified groups in the quoteMap
  const updatedQuoteMap = [...quoteMap]
  updatedQuoteMap[sourceGroupIndex] = sourceGroup
  updatedQuoteMap[destinationGroupIndex] = destinationGroup

  return [...quoteMap]
}

export function moveBetween({
  list1,
  list2,
  source,
  destination,
}: {
  list1: { id: string; values: List<string> }
  list2: { id: string; values: List<string> }
  source: Droppable
  destination: Droppable
}): MoveBetweenResult {
  const newFirst = Array.from(list1.values)
  const newSecond = Array.from(list2.values)

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond
  const moveTo = moveFrom === newFirst ? newSecond : newFirst

  const [moved] = moveFrom.splice(source.index, 1)
  moveTo.splice(destination.index, 0, moved)

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  }
}
