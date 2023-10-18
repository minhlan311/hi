import { Steps, theme } from 'antd'
import React, { useState } from 'react'
import CreateCourse from './CreateCourse'
import CreateSteps2 from './components/Step2/CreateSteps2'

const StepCreate: React.FC = () => {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const [dataIdCouser, setDataIdCouser] = useState<string>('')

  const steps = [
    {
      title: 'Tạo khóa học',
      content: <CreateCourse next={setCurrent} dataIdCouser={setDataIdCouser} />,
    },
    {
      title: 'Lộ trình học',
      content: <CreateSteps2 dataId={dataIdCouser} stepPrev={setCurrent} stepNext={setCurrent} />,
    },
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    minHeight: '500px',
    color: token.colorTextTertiary,
    marginTop: 32,
  }

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  )
}

export default StepCreate
