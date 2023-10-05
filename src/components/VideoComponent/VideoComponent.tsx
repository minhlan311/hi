/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import style from './VideoComponent.module.scss'
import Controls from './component/Controls'
import screenfull from 'screenfull'

const format = (seconds: number) => {
  if (isNaN(seconds)) {
    return `00:00`
  }

  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds().toString().padStart(2, '0')
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
  }
  return `${mm}:${ss}`
}

let count = 0

type Props = {
  pip: boolean
  playing: boolean
  controls: boolean
  light: boolean
  muted: boolean
  played: number
  duration: number
  playbackRate: number | undefined
  volume: number
  loop: boolean
  seeking: boolean
}

type VideoProps = {
  video?: string
  dataLession?: any[]
}

export default function VideoComponent({ video, dataLession }: VideoProps) {
  const playerRef = useRef<any>(null)
  const controlsRef = useRef<any>(null)
  const playerContainerRef = useRef<any>(null)
  const [playeds, setPlayeds] = useState<number | string>(0)

  const [state, setState] = useState<Props>({
    pip: false,
    playing: true,
    controls: false,
    light: false,
    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  })
  // const playerRef = useRef<HTMLDataElement | null>(null);
  const { playing, light, muted, loop, playbackRate, pip, volume } = state

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = 'visible'
    count = 0
  }

  const hanldeMouseLeave = () => {
    // controlsRef.current.style.visibility = 'hidden'
    count = 0
  }

  const handleProgress = (state: any) => {
    setPlayeds(state.played)
    if (count > 2) {
      controlsRef.current.style.visibility = 'hidden'
      count = 0
    }
    if (controlsRef.current.style.visibility == 'visible') {
      count += 1
    }

    if (state.played === 1) setState({ ...state, playing: false })
  }

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing })
  }

  //  tua nguocj
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }
  // tua nhanh
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  }
  // mute âm
  const handleMute = () => {
    setState({ ...state, muted: !state.muted })
  }

  // chinh volume
  const handleVolumeSeekDown = (e: string) => {
    setState({ ...state, seeking: false, volume: parseFloat(e) / 100 })
  }
  // chinh volume
  const onVolumeChange = (e: string | number) => {
    setState({
      ...state,
      volume: parseFloat(e as string) / 100,
      muted: e === 0 ? true : false,
    })
  }

  const handleDuration = (duration: number) => {
    setState({ ...state, duration })
  }
  const handleSeekChange = (e: string) => {
    setState({ ...state, played: parseFloat(e) / 100 })
  }

  const handleSeekMouseUp = (e: number) => {
    setState({ ...state, seeking: false })
    playerRef.current.seekTo(e / 100, 'fraction')
  }

  const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : '00:00'

  const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'

  const elapsedTime = format(currentTime)

  const totalDuration = format(duration)

  const handlePlaybackRate = (rate: number) => {
    setState({ ...state, playbackRate: rate })
  }

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current)
  }
  return (
    <>
      <div className={style.boxContainer}>
        <div
          ref={playerContainerRef}
          className={style.container}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        >
          <ReactPlayer
            width='100%'
            height='100%'
            loop={loop}
            pip={pip}
            light={light}
            volume={volume}
            playbackRate={playbackRate}
            muted={muted}
            ref={playerRef}
            playing={playing}
            controls={false}
            onProgress={handleProgress}
            style={{
              width: '1200px',
              height: '800px',
            }}
            url={video}
            config={{
              file: {
                attributes: {
                  crossorigin: 'anonymous',
                },
              },
            }}
          />

          <Controls
            dataLession={dataLession}
            ref={controlsRef}
            onSeek={handleSeekChange}
            onDuration={handleDuration}
            handleRewind={handleRewind}
            handlePlayPause={handlePlayPause}
            handleFastForward={handleFastForward}
            handleMute={handleMute}
            onVolumeChange={onVolumeChange}
            toggleFullScreen={toggleFullScreen}
            handlePlaybackRate={handlePlaybackRate}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={playing}
            played={playeds}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            muted={muted}
            handleSeekMouseUp={handleSeekMouseUp}
            onVolumeSeekDown={handleVolumeSeekDown}
            playbackRate={playbackRate}
            volume={volume}
          />
        </div>
      </div>
    </>
  )
}
