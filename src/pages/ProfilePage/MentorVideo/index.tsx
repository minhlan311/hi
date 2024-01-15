import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { useRef, useState } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import style from './styles.module.scss'

const MentorVideo = ({ videoUrl }: { videoUrl: string }) => {
  const { sm, md } = useResponsives()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current)
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }

    setIsPlaying(!isPlaying)
  }

  return (
    <Header padding={'15px 0 50px 0'} size='sm' title='Video giới thiệu' titleSize={35}>
      <div className={style.videoMain} style={{ backgroundColor: isPlaying ? 'rgb(17, 17, 17)' : undefined }}>
        <video
          onClick={togglePlay}
          ref={videoRef}
          width='100%'
          height={(md && '420') || (sm && '350') || '523'}
          src={import.meta.env.VITE_FILE_ENDPOINT + '/' + videoUrl}
          title='Video info'
          className={style.video}
        ></video>
        <ButtonCustom
          className={`${isPlaying ? style.playButton : style.pause} ${style.playIcon}`}
          icon={isPlaying ? <MdPause /> : <MdPlayArrow />}
          shape='circle'
          onClick={togglePlay}
        ></ButtonCustom>
      </div>
    </Header>
  )
}

export default MentorVideo
