import React from 'react'
import './PreListening.scss'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function PreListening({ nextSteps }: Props) {
  const handleNextStep = () => {
    nextSteps(2)
  }

  return (
    <div className='container-prelisten'>
      <h2>IELTS Listening</h2>
      <p className='p-sound'>Time: Approximately 30 minutes</p>
      <h3>INSTRUCTIONS TO CANDIDATES</h3>
      <ul className='p-sound-ul'>
        <li className='p-sound'>Answer all the questions.</li>
        <li className='p-sound'>You can change your answers at any time during the test.</li>
      </ul>
      <h3>INFORMATION FOR CANDIDATES</h3>
      <ul className='p-sound-ul'>
        <li>There are 40 questions in this test.</li>
        <li>Each question carries one mark.</li>
        <li>There are four parts to the test.</li>
        <li>You will hear each part once.</li>
        <li>
          For each part of the test there will be time for you to look through the questions and time for you to check
          your answers.
        </li>
      </ul>
      <Flex
        justify='center'
        align='center'
        gap={'small'}
        style={{
          margin: '20px 0 10px 0',
        }}
      >
        <WarningOutlined />
        <p className='p-sound'>
          Do not click <strong>Start test</strong> until you are told to do so.
        </p>
      </Flex>
      <Flex justify='center' align='center'>
        <Button type='primary' onClick={() => handleNextStep()}>
          Start test
        </Button>
      </Flex>
    </div>
  )
}
