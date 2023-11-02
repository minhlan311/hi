/* eslint-disable @typescript-eslint/no-explicit-any */
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSSProperties, useCallback, useState } from 'react'

import './PageTestTest.scss'

interface DraggableItemProps {
  id: string
  content: string
}

function DraggableItem({ id, content }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  })

  const style: CSSProperties = {
    padding: '8px',
    border: '1px solid black',
    borderRadius: '4px',
    marginRight: '8px',
    cursor: 'grab',
    position: isDragging ? 'fixed' : 'relative',
    zIndex: isDragging ? 1000 : 'auto',
    transform: isDragging ? `translate3d(${transform!.x}px, ${transform!.y}px, 0)` : undefined,
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {content}
    </div>
  )
}

interface DroppableSpaceProps {
  id: string
  content?: string
}

function DroppableSpace({ id, content }: DroppableSpaceProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  const style: CSSProperties = {
    borderBottom: '2px dotted black',
  }

  return (
    <span ref={setNodeRef} style={style}>
      {content ? content : '_____'}
    </span>
  )
}

export default function PageTestTest() {
  const handleReset = () => {
    setAnswers(['company', 'name'])
    setFilledAnswers({})
  }
  const [answers, setAnswers] = useState<string[]>(['company', 'name'])
  const [filledAnswers, setFilledAnswers] = useState<Record<string, string>>({})

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event

    if (over) {
      setFilledAnswers((prevFilledAnswers) => ({
        ...prevFilledAnswers,
        [over.id]: active.id,
      }))
      setAnswers((prevAnswers) => prevAnswers.filter((answer) => answer !== active.id))
    }
  }, [])

  const getResultString = () => {
    return `My ${filledAnswers['space1'] || '_____'} is John and I work at a ${filledAnswers['space2'] || '_____'}.`
  }

  return (
    <div className='container-testtesst'>
      <button
        onClick={() => {
          alert(getResultString())
        }}
      >
        Hiển thị kết quả
      </button>
      <button onClick={handleReset} style={{ marginTop: '20px' }}>
        Reset
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ margin: '20px' }}>
          <p>
            My <DroppableSpace id='space1' content={filledAnswers['space1']} /> is John and I work at a{' '}
            <DroppableSpace id='space2' content={filledAnswers['space2']} />.
          </p>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            {answers.map((answer) => (
              <DraggableItem key={answer} id={answer} content={answer} />
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  )
}
