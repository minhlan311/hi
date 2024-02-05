import skillApi from '@/apis/skill.api'
import PaginationCustom from '@/components/PaginationCustom'
import { ExamState, SkillType } from '@/interface/exam'
import { useQuery } from '@tanstack/react-query'
import { Flex, Space, Tabs } from 'antd'
import { FormInstance } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import RenderSkillItem from './RenderSkillItem'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  form: FormInstance
  examData: ExamState
  packsSelected: string[]
  setSkillSelected: React.Dispatch<React.SetStateAction<string[]>>
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

  const [changeSkill, setChangeSkill] = useState<SkillType | null>(null)
  const [targetSkill, setTargetSkill] = useState<SkillType>('READING')
  const [items, setItems] = useState<any[]>(initSkill)
  const [choosePack, setChoosePack] = useState<string[]>(packsSelected.length > 0 ? packsSelected : [])
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    if (examData?.skillData?.length > 0) {
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

      setChangeSkill(null)
    }
  }, [changeSkill])
  const [search, setSearch] = useState<string>('')
  const { data: skillData, isLoading } = useQuery({
    queryKey: ['skillData', targetSkill, current, search],
    queryFn: () => {
      return skillApi.findSkill({
        filterQuery: {
          skill: targetSkill,
          categoryId: examData.categoryIdDetail,
          search,
        },
        options: {
          limit: 8,
          page: current,
        },
      })
    },

    enabled: Boolean(targetSkill),
  })

  useEffect(() => {
    if (choosePack.length > 0) setSkillSelected(choosePack)
  }, [choosePack])

  return (
    <div>
      <Space direction='vertical' className='sp100'>
        <h3>Kỹ năng:</h3>

        <Tabs onChange={(e) => setTargetSkill(e)} activeKey={targetSkill} type='card'>
          {items.map((tab) => (
            <Tabs.TabPane key={tab.key} tab={tab.label}>
              <Space className='sp100' direction='vertical' size='large'>
                <RenderSkillItem
                  skillName={tab.key}
                  choosePack={choosePack}
                  skillData={skillData && (skillData.data.docs as unknown as any)}
                  categoryId={examData?.categoryIdDetail}
                  testId={examData?._id as string}
                  isLoading={isLoading}
                  setChoosePack={setChoosePack}
                  setSearch={setSearch}
                />
                <Flex justify='space-between' style={{ position: 'absolute', right: 0, bottom: -60 }}>
                  <p></p>{' '}
                  <PaginationCustom
                    callbackCurrent={setCurrent}
                    totalData={skillData?.data.totalDocs}
                    limit={8}
                    align='center'
                  />
                </Flex>
              </Space>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Space>
    </div>
  )
}

export default CreateSkill
