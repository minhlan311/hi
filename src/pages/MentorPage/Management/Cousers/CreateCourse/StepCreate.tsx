import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd'
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
      content: <CreateSteps2 dataId={dataIdCouser} />,
    },
    {
      title: 'Bài kiểm tra',
      content: 'Last-content',
    },
  ]
  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    color: token.colorTextTertiary,
    marginTop: 32,
  }

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type='primary' onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  )
}

export default StepCreate
