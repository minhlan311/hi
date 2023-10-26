/* eslint-disable @typescript-eslint/no-explicit-any */
import useIsMobile from '@/hooks/useCheckMobile'
import { BackwardOutlined, ForwardOutlined, PlusCircleOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Popover, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import style from './VideoComponent.module.scss'
import Controls from './component/Controls'

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
  names?: string
}

export default function VideoComponent({ video, names, dataLession }: VideoProps) {
  const playerRef = useRef<any>(null)
  const controlsRef = useRef<any>(null)
  const playerContainerRef = useRef<any>(null)
  const [playeds, setPlayeds] = useState<number | string>(0)
  const [bookmarks, setBookmarks] = useState<{ time: number; note: string }[]>([])
  const [volumeNotification, setVolumeNotification] = useState<{ show: boolean; volume: number }>({
    show: false,
    volume: 0,
  })

  const [seekNotification, setSeekNotification] = useState<{ show: boolean; type: 'forward' | 'rewind' }>({
    show: false,
    type: 'forward',
  })
  const isMobile = useIsMobile()

  const handleDeleteBookmark = (index: number) => {
    const newBookmarks = [...bookmarks]
    newBookmarks.splice(index, 1)
    setBookmarks(newBookmarks)

    // Cập nhật localStorage ngay sau khi cập nhật state
    const allBookmarks = JSON.parse(localStorage.getItem('bookmarks-video') || '{}')
    localStorage.setItem('bookmarks-video', JSON.stringify({ ...allBookmarks, [video!]: newBookmarks }))
  }

  let hideControlsTimeout: string | number | NodeJS.Timeout | undefined

  const handleMouseMove = () => {
    if (controlsRef.current) {
      controlsRef.current.style.visibility = 'visible'
    }

    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout)
    }

    hideControlsTimeout = setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.style.visibility = 'hidden'
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout)
      }
    }
  }, [])

  useEffect(() => {
    if (seekNotification.show || volumeNotification.show) {
      const timeout = setTimeout(() => {
        setSeekNotification((prev) => ({ ...prev, show: false }))
        setVolumeNotification((prev) => ({ ...prev, show: false }))
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [seekNotification, volumeNotification])

  useEffect(() => {
    // Lấy tất cả bookmarks từ localStorage
    const allBookmarks = JSON.parse(localStorage.getItem('bookmarks-video') || '{}')

    // Nếu có bookmarks cho video hiện tại, cập nhật state, nếu không đặt danh sách rỗng
    if (Object.prototype.hasOwnProperty.call(allBookmarks, video!)) {
      setBookmarks(allBookmarks[video!])
    } else {
      setBookmarks([]) // Đặt bookmarks về mảng trống nếu không có bookmarks cho video
    }
  }, [video]) // Dependency là video, nghĩa là useEffect sẽ chạy mỗi khi video thay đổi

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

  const handleProgress = (state: any) => {
    setPlayeds(state.played)
    if (state.played === 1) setState({ ...state, playing: false })
  }

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing })
  }

  //  tua nguocj
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
    setSeekNotification({ show: true, type: 'rewind' })
  }

  // tua nhanh
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
    setSeekNotification({ show: true, type: 'forward' })
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
    const newVolume = parseFloat(e as string) / 100
    setState({
      ...state,
      volume: newVolume,
      muted: e === 0 ? true : false,
    })
    setVolumeNotification({ show: true, volume: Math.round(newVolume * 100) })
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

  const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : 0

  const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'

  const elapsedTime = format(currentTime)

  const totalDuration = format(duration)

  const handlePlaybackRate = (rate: number) => {
    setState({ ...state, playbackRate: rate })
  }

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current)
  }

  const handleAddBookmark = () => {
    const note = prompt('Ghi chú :')

    if (note) {
      const newBookmark = { time: currentTime, note }
      const updatedBookmarks = [...bookmarks, newBookmark]
      setBookmarks(updatedBookmarks)

      // Cập nhật localStorage ngay sau khi cập nhật state
      const allBookmarks = JSON.parse(localStorage.getItem('bookmarks-video') || '{}')
      localStorage.setItem('bookmarks-video', JSON.stringify({ ...allBookmarks, [video!]: updatedBookmarks }))
    }
  }

  const handleGoToBookmark = (time: number) => {
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(time)
    }
  }

  return (
    <>
      <div className={style.boxContainer}>
        <div ref={playerContainerRef} className={style.container} onMouseMove={isMobile ? undefined : handleMouseMove}>
          {volumeNotification.show ? (
            <div className={style.volumeNotification} style={{ opacity: volumeNotification.show ? 1 : 0 }}>
              {`Âm lượng: ${Math.round(volume * 100)}%`}
            </div>
          ) : null}

          {seekNotification.show ? (
            <div className={style.seekNotification} style={{ opacity: seekNotification.show ? 1 : 0 }}>
              {seekNotification.type === 'forward' ? (
                <ForwardOutlined
                  style={{
                    scale: '1.5',
                  }}
                />
              ) : (
                <BackwardOutlined
                  style={{
                    scale: '1.5',
                  }}
                />
              )}
            </div>
          ) : null}
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
            controls={isMobile ? true : false}
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
          {!isMobile && (
            <Controls
              names={names}
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
          )}
        </div>
        <div
          className='flex'
          style={{
            marginTop: '5px',
          }}
        >
          <Tooltip placement='bottom' title='Thêm ghi chú'>
            <Button type='dashed' className='dashed' onClick={handleAddBookmark}>
              <PlusCircleOutlined />
            </Button>
          </Tooltip>

          <Popover
            trigger={'click'}
            title={
              <>
                <div>
                  <ul>
                    {bookmarks && bookmarks?.length > 0 ? (
                      bookmarks?.map((bookmark, index) => (
                        <li key={index}>
                          Time: {format(bookmark.time)} - Note: {bookmark.note}
                          <Button
                            type='primary'
                            style={{
                              margin: '5px',
                            }}
                            onClick={() => handleGoToBookmark(bookmark.time)}
                          >
                            Go to
                          </Button>
                          <Button type='dashed' className='dashed' onClick={() => handleDeleteBookmark(index)}>
                            Xóa
                          </Button>
                        </li>
                      ))
                    ) : (
                      <p>Không có ghi chú nào</p>
                    )}
                  </ul>
                </div>
              </>
            }
          >
            <Tooltip
              getPopupContainer={(triggerNode) => triggerNode.parentElement || triggerNode}
              placement='bottom'
              title='Danh sách ghi chú'
            >
              <Button
                style={{
                  cursor: 'pointer',
                }}
                type='primary'
              >
                <StarOutlined
                  style={{
                    scale: '1.5',
                  }}
                />
              </Button>
            </Tooltip>
          </Popover>
        </div>
      </div>
    </>
  )
}
