export interface Child {
  _id: string
  id: string
  content: string
}

export interface DragDropState {
  _id: string
  child: Child[]
}
