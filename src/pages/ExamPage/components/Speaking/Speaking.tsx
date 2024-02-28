/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { Skill } from '@/interface/exam'
import { Flex, Modal, Space } from 'antd'
import { useState } from 'react'
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import { GrPowerReset } from 'react-icons/gr'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './Speaking.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  data: Skill
  submit: any
}

export default function Speaking({ nextSteps, data, submit }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  const handleOk = () => {
    submit(true)
    nextSteps(6)
    setIsModalOpen(false)
  }

  const [blob, setBlob] = useState<any>()
  const [reset, setReset] = useState<boolean>(false)
  const recorder = useAudioRecorder()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  console.log(transcript)

  return (
    <div className='reading'>
      <Modal
        okText='Nộp bài'
        cancelText='Hủy'
        destroyOnClose
        title='Thông báo'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Bạn có muốn nộp bài kiểm tra?</p>
      </Modal>

      <NavigationTest
        skillName='Writing'
        desc='Nhấn vào biểu tượng micro và trả lời câu hỏi bên dưới.'
        nextSteps={nextSteps}
        step={7}
        questionsLength={data?.questions?.length as number}
        buttonSubmit={<ButtonCustom onClick={() => setIsModalOpen(true)}>Submit</ButtonCustom>}
      />

      <Space direction='vertical'>
        <div className={'dangerHTML'} dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        <div
          className={'dangerHTML'}
          dangerouslySetInnerHTML={{
            __html: data?.questions?.[0].question as any,
          }}
        ></div>

        <Flex justify='center' align='center' vertical className='audioMic' gap={24}>
          <Space>
            <div onClick={() => (listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening())}>
              <AudioRecorder onRecordingComplete={setBlob} recorderControls={recorder} />
            </div>
            {blob && (
              <ButtonCustom
                icon={<GrPowerReset />}
                onClick={() => {
                  resetTranscript()
                  setReset(true)
                }}
              ></ButtonCustom>
            )}
          </Space>

          {recorder.mediaRecorder ? (
            <LiveAudioVisualizer mediaRecorder={recorder.mediaRecorder} width={200} height={75} />
          ) : !reset && blob ? (
            <AudioVisualizer blob={blob} width={500} height={75} barWidth={1} gap={0} barColor={'#019d44'} />
          ) : null}
        </Flex>
      </Space>
    </div>
  )
}
