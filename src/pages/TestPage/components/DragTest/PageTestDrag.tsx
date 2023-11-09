/* eslint-disable @typescript-eslint/no-explicit-any */
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSSProperties, useCallback, useState, useEffect } from 'react'
import './PageTestDrag.scss'
import { Button } from 'antd'
import { Choice } from '@/interface/tests'

interface DraggableItemProps {
  id: string
  content: string
}

function DraggableItem({ id, content }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='drag-item'>
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
    fontWeight: 700,
    fontSize: '16px',
  }

  return (
    <span ref={setNodeRef} style={style}>
      {content ? content : '_____'}
    </span>
  )
}

interface Props {
  questionText?: string
  choices?: Choice[]
}

export default function PageTestDrag({ questionText, choices }: Props) {
  const initialAnswers = choices?.map((choice: any) => choice.answer) || []
  const [answers, setAnswers] = useState<string[]>(initialAnswers)
  const [filledAnswers, setFilledAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    const initialAnswers = choices?.map((choice: any) => choice.answer) || []

    setAnswers(initialAnswers)
  }, [choices])

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

  // const getResultString = () => {
  //   const parts = questionText?.split('______') || []
  //   let result = parts[0]

  //   for (let i = 1; i < parts.length; i++) {
  //     result += filledAnswers[`space${i}`] || '______'
  //     result += parts[i]
  //   }

  //   return result
  // }

  return (
    <div className='container-testtesst'>
      <Button type='primary' onClick={handleReset}>
        Reset
      </Button>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ margin: '20px' }}>
          {questionText?.split('______').map((part: any, index: any) => (
            <>
              <span className='span-drag' key={`text-part-${index}`}>
                {part}
              </span>
              {choices && index < choices.length && (
                <DroppableSpace
                  key={`drop-space-${index}`}
                  id={`space${index + 1}`}
                  content={filledAnswers[`space${index + 1}`]}
                />
              )}
            </>
          ))}

          <div style={{ display: 'flex', padding: '10px', marginTop: '20px' }}>
            {answers?.map((answer, index) => <DraggableItem key={index} id={answer} content={answer} />)}
          </div>
        </div>
      </DndContext>
      {/* <button onClick={() => alert(getResultString())}>Hiển thị kết quả</button> */}
    </div>
  )
}
