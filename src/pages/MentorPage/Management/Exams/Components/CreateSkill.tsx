import skillApi from '@/apis/skill.api'
import { ExamState, SkillType } from '@/interface/exam'
import { DndContext, DragEndEvent, PointerSensor, useSensor } from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQuery } from '@tanstack/react-query'
import { Modal, Select, Space, Tabs } from 'antd'
import { FormInstance } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import RenderSkillItem from './RenderSkillItem'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  form: FormInstance
  examData: ExamState
  packsSelected: string[]
  setSkillSelected: React.Dispatch<React.SetStateAction<string[]>>
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

const DraggableTabNode = ({ ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: 'move',
    position: 'relative',
  }

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

const CreateSkill = (props: Props) => {
  const { examData, packsSelected, setSkillSelected } = props

  const initSkill = [
    {
      value: 'READING',
      key: 'READING',
      label: 'Đọc',
    },
    {
      value: 'LISTENING',
      key: 'LISTENING',
      label: 'Nghe',
    },
    {
      value: 'WRITING',
      key: 'WRITING',
      label: 'Viết',
    },
    {
      value: 'SPEAKING',
      key: 'SPEAKING',
      label: 'Nói',
    },
  ]

  const [open, setOpen] = useState(false)
  const [skillOption, setSkillOption] = useState(initSkill)
  const [changeSkill, setChangeSkill] = useState<SkillType | null>(null)
  const [targetSkill, setTargetSkill] = useState<SkillType>()
  const [items, setItems] = useState<any[]>([])
  const [choosePack, setChoosePack] = useState<string[]>(packsSelected.length > 0 ? packsSelected : [])

  useEffect(() => {
    if (examData.skillData?.length > 0) {
      const skillData = initSkill.filter((skill) => examData.skillData.some((sk) => sk.skill === skill.value))

      if (skillData) {
        setItems(skillData)
        setTargetSkill(skillData[0].value)
      }
    }
  }, [examData])

  useEffect(() => {
    if (changeSkill !== null) {
      const newSkill = initSkill.find((item) => item.value === changeSkill)
      setItems([...items, newSkill])

      setTargetSkill(changeSkill)

      setSkillOption((prev) => prev.filter((skill) => skill.value !== changeSkill))
      setOpen(false)
      setChangeSkill(null)
    }
  }, [changeSkill])

  const removeTab = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey)
    const newPanes = items.filter((pane) => pane.key !== targetKey)

    if (newPanes.length && targetKey === targetSkill) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      setTargetSkill(key)
    }

    const newSkill = initSkill.find((item) => item.value === targetKey)
    setSkillOption((prev: any) => [...prev, newSkill])
    setItems(newPanes)
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      setOpen(!open)
    } else {
      removeTab(targetKey)
    }
  }

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)

        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  const {
    data: skillData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['skillData', examData, targetSkill],
    queryFn: () => {
      return skillApi.findSkill({
        filterQuery: {
          skill: targetSkill,
        },
      })
    },

    enabled: Boolean(targetSkill),
  })

  useEffect(() => {
    if (isSuccess) {
      setSkillOption((prev) => prev.filter((skill) => !examData?.skillData.some((item) => item.skill === skill.value)))
    }
  }, [isSuccess])

  useEffect(() => {
    if (choosePack.length > 0) setSkillSelected(choosePack)
  }, [choosePack])

  return (
    <div>
      <Space direction='vertical' className='sp100'>
        <h3>Kỹ năng:</h3>

        <Tabs
          onChange={(e) => setTargetSkill(e)}
          activeKey={targetSkill}
          type='editable-card'
          onEdit={(e, action) => {
            onEdit(e, action)
          }}
          addIcon={
            <div style={{ display: 'flex' }}>
              <AiOutlinePlus size={13} />
              <p style={{ fontSize: 13 }}>Thêm kỹ năng</p>
            </div>
          }
          renderTabBar={(tabBarProps, DefaultTabBar) => (
            <DndContext sensors={[sensor]} modifiers={[restrictToHorizontalAxis]} onDragEnd={onDragEnd}>
              <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                <DefaultTabBar {...tabBarProps}>
                  {(node) => (
                    <DraggableTabNode {...node.props} key={node.key}>
                      {node}
                    </DraggableTabNode>
                  )}
                </DefaultTabBar>
              </SortableContext>
            </DndContext>
          )}
        >
          {items.map((tab) => (
            <Tabs.TabPane key={tab.key} tab={tab.label}>
              <RenderSkillItem
                skillName={tab.key}
                choosePack={choosePack}
                skillData={skillData && (skillData.data.docs as unknown as any)}
                categoryId={examData?.categoryId}
                testId={examData?._id as string}
                isLoading={isLoading}
                setChoosePack={setChoosePack}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Space>

      <Modal
        title='Chọn kỹ năng thêm mới'
        open={open}
        onCancel={() => {
          setOpen(!open)
        }}
        footer={null}
      >
        <Select
          className='sp100'
          placeholder='Chọn loại kỹ năng'
          value={changeSkill}
          options={skillOption}
          onChange={(e) => setChangeSkill(e)}
        />
      </Modal>
    </div>
  )
}

export default CreateSkill
