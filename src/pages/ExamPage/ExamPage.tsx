import { Button, message } from 'antd'
import { useState } from 'react'
import TestSound from './TestSound'
import Listening from './components/Listening/Listening'
import PreListening from './components/Listening/PreListening'
import Reading from './components/Reading/Reading'

export default function ExamPage() {
  const [current, setCurrent] = useState(0)
  const steps = [
    {
      title: 'First',
      content: <TestSound nextSteps={setCurrent} />,
    },
    {
      title: 'Second',
      content: <PreListening nextSteps={setCurrent} />,
    },
    {
      title: 'Last',
      content: <Listening nextSteps={setCurrent} />,
    },
    {
      title: 'Last',
      content: <Reading />,
    },
  ]

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  // const contentStyle: React.CSSProperties = {
  //   textAlign: 'center',
  //   backgroundColor: 'white',
  //   borderRadius: token.borderRadiusLG,
  //   border: `1px dashed ${token.colorBorder}`,
  //   marginTop: 16,
  // }

  return (
    <>
      <div>{steps[current].content}</div>
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
