import testVol from '@/assets/sounds/testVol.mp3'
import { AppContext } from '@/contexts/app.context'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaMusic } from 'react-icons/fa6'
import './TestSound.scss'

type Props = {
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

export default function TestSound({ nextSteps }: Props) {
  const { volume, setStart } = useContext(AppContext)
  const [isPlay, setIsPlay] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])
  useEffect(() => {
    setStart(false)
  }, [])

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
    <div className='test-sound'>
      <Space direction='vertical' size='large' align='center'>
        <Space>
          <FaMusic
            style={{
              scale: '1.4',
            }}
          />
          <h2>Test sound</h2>
        </Space>
        <Space direction='vertical' size='large' align='center'>
          <p>
            Đeo tai nghe vào và nhấp vào nút <strong>Phát âm thanh</strong> để phát âm thanh mẫu.
          </p>

          <Button type='primary' onClick={playAudio}>
            {isPlay ? 'Dừng âm thanh' : 'Phát âm thanh'}
          </Button>

          <audio ref={audioRef} src={testVol} controls hidden loop controlsList='nodownload noplaybackrate'>
            Your browser does not support the audio element.
          </audio>
        </Space>
        <Space direction='vertical' size='large' align='center'>
          <Space>
            <WarningOutlined
              style={{
                scale: '1.4',
              }}
            />
            <p className='p-sound'>Nếu bạn không thể nghe rõ âm thanh, hãy báo cho giám thị biết.</p>
          </Space>
          <Button type='primary' onClick={() => handleNextStep()}>
            Tiếp tục
          </Button>
        </Space>
      </Space>
    </div>
  )
}
