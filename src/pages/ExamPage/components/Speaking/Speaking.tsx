/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import NavigationTest from '@/components/layout/ExamLayout/Components/NavigationTest'
import { AppContext } from '@/contexts/app.context'
import { Skill } from '@/interface/exam'
import { Flex, Modal, Space } from 'antd'
import { useContext, useState } from 'react'
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import { GrPowerReset } from 'react-icons/gr'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './Speaking.scss'

type Props = {
  data: Skill
  nextSteps: React.Dispatch<React.SetStateAction<number>>
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Speaking({ data, nextSteps, setSubmit }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { setOverView, setStart } = useContext(AppContext)

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  const handleOk = () => {
    stateAction(
      setOverView,
      data?.questions?.[0]._id as string,
      {
        index: 1,
        _id: data?.questions?.[0]._id,
        anwser: transcript,
        correctAnswers: transcript,
      },
      'update',
    )
    setStart(false)
    setTimeout(() => {
      setSubmit(true)
      nextSteps(6)
      setIsModalOpen(false)
    }, 300)
  }

  const [blob, setBlob] = useState<any>()
  const [reset, setReset] = useState<boolean>(false)
  const recorder = useAudioRecorder()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

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
