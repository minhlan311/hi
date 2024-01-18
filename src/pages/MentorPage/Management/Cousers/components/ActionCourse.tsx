import { Space, Steps } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ActionTopic from './ActionTopic'
import CourseForm from './CourseForm'

const ActionCourse = () => {
  const [current, setCurrent] = useState<number>(0)
  const [courseId, setCourseId] = useState<string>('')
  const { id } = useParams()
  const steps = [
    {
      title: 'Thông tin cơ bản',
      content: <CourseForm setCourseId={setCourseId} setCurrent={setCurrent} />,
    },
    {
      title: 'Lộ trình học',
      content: <ActionTopic courseId={courseId || id!} />,
    },
  ]

  return (
    <Space direction='vertical' className='sp100'>
      <Steps items={steps} current={current} />
      <div style={{ marginTop: 24 }}>{steps[current].content}</div>
    </Space>
  )
}

export default ActionCourse
