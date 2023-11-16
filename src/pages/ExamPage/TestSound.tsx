import { AppContext } from '@/contexts/app.context'
import { Button, Flex } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaMusic } from 'react-icons/fa6'
import { WarningOutlined } from '@ant-design/icons'
import './TestSound.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function TestSound({ nextSteps }: Props) {
  const { volume } = useContext(AppContext)
  const [isPlay, setIsPlay] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const playAudio = () => {
    if (!isPlay) {
      setIsPlay(true)
      if (audioRef.current) {
        audioRef.current.play()
      }
    } else {
      setIsPlay(false)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }

  const handleNextStep = () => {
    nextSteps(1)
  }

  return (
    <div className='row-antd-sound'>
      <Flex justify='start' align='center' gap={'small'}>
        <FaMusic
          style={{
            scale: '1.4',
          }}
        />
        <h2>Test sound</h2>
      </Flex>
      <div className='p-sound-div'>
        <p className='p-sound'>
          Put on your headphones and click on the <strong> Play sound </strong>button to play a sample sound.
        </p>
        <Flex justify='center' className='flex-sound-buttton'>
          {!isPlay ? (
            <Button type='primary' onClick={playAudio}>
              Play sound
            </Button>
          ) : (
            <Button type='primary' onClick={playAudio}>
              Stop sound
            </Button>
          )}
        </Flex>

        <audio
          ref={audioRef}
          src='https://smartcom.vn/ielts-computer-based-tests/media/sample-audio.a3b0b348.ogg'
          controls
          hidden
          loop
          controlsList='nodownload noplaybackrate'
        >
          Your browser does not support the audio element.
        </audio>
      </div>
      <Flex align='center' gap={'small'}>
        <WarningOutlined
          style={{
            scale: '1.4',
          }}
        />
        <p className='p-sound'>If you cannot hear the sound clearly, please tell the invigilator.</p>
      </Flex>
      <Flex justify='center' className='flex-sound-buttton'>
        <Button type='primary' onClick={() => handleNextStep()}>
          Continue
        </Button>
      </Flex>
    </div>
  )
}
