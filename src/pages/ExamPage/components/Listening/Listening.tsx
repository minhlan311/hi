import examApi from '@/apis/exam.api'
import Logo from '@/components/Logo/Logo'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Button, Flex, Modal } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import './Listening.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Listening({ nextSteps }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    nextSteps(3)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const { volume } = useContext(AppContext)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlayed, setIsAudioPlayed] = useState(false)
  const { sm } = useResponsives()
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handleAudioEnded = () => {
    if (!isAudioPlayed && audioRef.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
          setIsAudioPlayed(true)
        }
      }, 5000)
    }
  }

  // const handleNextStep = () => {
  //   nextSteps(3)
  // }

  const { data: dataQuestion } = useQuery({
    queryKey: ['questionList'],
    queryFn: () => examApi.getExamDetail('6541de0c89f61e825108a981'),
  })

  console.log(dataQuestion, 'dataQuestiondataQuestion')

  return (
    <div className='listen-div-fixed'>
      <Modal
        okText={'Yes'}
        cancelText='No'
        destroyOnClose
        title='Notification'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to finish this skill?</p>
      </Modal>
      <Flex className='div-in-part' justify='space-between' align='center'>
        <Flex gap={'large'}>
          <Logo size={sm ? 115 : undefined} />
          <Flex vertical gap={'small'}>
            <h3>Part 1</h3>
            <p>Listen to the audio and answer questions below.</p>
          </Flex>
        </Flex>
        <Button type='dashed' className='dashed' onClick={showModal}>
          Go to Reading
        </Button>
      </Flex>

      <audio
        autoPlay
        hidden
        onEnded={handleAudioEnded}
        ref={audioRef}
        src='https://ielts-computer-api.smartcom.vn/api/files/fGruXpxj-zE5z89z9118zsection1zpart1.mp3'
        controls
        controlsList='nodownload noplaybackrate'
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
