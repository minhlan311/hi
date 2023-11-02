/* eslint-disable @typescript-eslint/no-explicit-any */
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSSProperties, useCallback, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import questionApi from '@/apis/question.api'

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
  const { data } = useQuery({
    queryKey: ['keyadkaljshda'],
    queryFn: () => questionApi.getQuestionDetail('65434591b972956a12555aff'),
  })

  const initialAnswers = data?.data?.choices.map((choice) => choice.answer) || []
  const [answers, setAnswers] = useState<string[]>([])
  const [filledAnswers, setFilledAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    const initialAnswers = data?.data?.choices.map((choice) => choice.answer) || []
    setAnswers(initialAnswers)
  }, [data])

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

  const handleReset = () => {
    setAnswers(initialAnswers)
    setFilledAnswers({})
  }

  const getResultString = () => {
    const parts = data?.data?.questionText?.split('______') || []
    let result = parts[0]

    for (let i = 1; i < parts.length; i++) {
      result += filledAnswers[`space${i}`] || '______'
      result += parts[i]
    }

    return result
  }

  return (
    <div className='container-testtesst'>
      <button onClick={() => alert(getResultString())}>Hiển thị kết quả</button>
      <button onClick={handleReset} style={{ marginTop: '20px' }}>
        Reset
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ margin: '20px' }}>
          {data?.data?.questionText?.split('______').map((part: any, index: any) => (
            <>
              <span key={`text-part-${index}`}>{part}</span>
              {index < data?.data?.choices.length && (
                <DroppableSpace
                  key={`drop-space-${index}`}
                  id={`space${index + 1}`}
                  content={filledAnswers[`space${index + 1}`]}
                />
              )}
            </>
          ))}
          <div style={{ display: 'flex', marginTop: '20px' }}>
            {answers.map((answer, index) => (
              <DraggableItem key={index} id={answer} content={answer} />
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  )
}
