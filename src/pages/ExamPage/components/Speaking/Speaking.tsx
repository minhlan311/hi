import examApi from '@/apis/exam.api'
import Logo from '@/components/Logo/Logo'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Button, Flex, Modal } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import './Speaking.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function Speaking({ nextSteps }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: dataQuestion } = useQuery({
    queryKey: ['questionList'],
    queryFn: () => examApi.getExamDetail('6541e1106580b32bd7dd8f14'),
  })

  const dataListQuestion = dataQuestion?.data.questionsDetail

  console.log(dataListQuestion, 'dataQuestiondataQuestion')

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    nextSteps(6)
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
        <p>Do you want to submit this test?</p>
      </Modal>
      <Flex className='div-in-part' justify='space-between' align='center'>
        <Flex gap={'large'}>
          <Logo size={sm ? 115 : undefined} />
          <Flex vertical gap={'small'}>
            <h3>Speaking </h3>
            <p>Speaking to the audio and answer questions below.</p>
          </Flex>
        </Flex>
        <Button type='dashed' className='dashed' onClick={showModal}>
          Submit
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

      <div className='border-2-div'>
        {dataListQuestion &&
          dataListQuestion?.length &&
          dataListQuestion?.map((item, index) => (
            <>
              <p
                style={{
                  marginTop: '20px',
                  fontWeight: '700',
                }}
              >
                Câu số {index + 1}
              </p>
              <div className='html-ques-choice' dangerouslySetInnerHTML={{ __html: item?.question }}></div>
              {item?.choices?.map((choice) => (
                <>
                  <Button>{choice?.answer}</Button>
                </>
              ))}
            </>
          ))}
      </div>
    </div>
  )
}
