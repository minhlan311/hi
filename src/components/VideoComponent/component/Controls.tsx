import { forwardRef, useContext } from 'react'
import { Slider, Tooltip, Typography } from 'antd'
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled, TbArrowsRightLeft } from 'react-icons/Tb'
import { BsPlayFill, BsFillPauseFill, BsArrowsFullscreen } from 'react-icons/bs'
import { BiSolidVolumeFull, BiSolidVolumeMute, BiSolidVolumeLow } from 'react-icons/bi'
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import style from './Controls.module.scss'
import { AppContext } from '~/contexts/app.context'

const Controls = forwardRef(
  (
    {
      handlePlaybackRate,
      playbackRate,
      handleSeekMouseUp,
      handleRewind,
      handlePlayPause,
      handleFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      handleMute,
      muted,
      onChangeDispayFormat,
      volume,
      onVolumeChange,
      toggleFullScreen
    }: any,
    ref: any
  ) => {
    const { scaleScreen, setScaleScreen } = useContext(AppContext)

    return (
      <div ref={ref} className={style.controlsWrapper}>
        {/* top  */}
        <div className={style.top}>
          <p style={{ color: '#fff' }}>みんなのAI講座 ゼロからPythonで学ぶ人工知能と機械学習 【2023年最新版】</p>
        </div>
        {/* mid  */}
        <div className={style.mid}>
          <div onClick={handleRewind}>
            <TbPlayerTrackPrevFilled className={style.icon25} />
          </div>
          <div onClick={handlePlayPause}>
            {!playing ? (
              <AiOutlinePlayCircle className={style.icon60} />
            ) : (
              <AiOutlinePauseCircle className={style.icon60} />
            )}
          </div>
          <div onClick={handleFastForward}>
            <TbPlayerTrackNextFilled className={style.icon25} />
          </div>
        </div>
        {/* bottom  */}

        <div className={style.bot}>
          <div>
            <div>
              <Slider
                railStyle={{ background: '#2c2c2c' }}
                trackStyle={{ background: '#d1d7dc' }}
                min={0}
                max={100}
                value={played * 100}
                tooltip={{ formatter: () => <>{elapsedTime}</> }}
                style={{
                  margin: '0 15px'
                }}
                onChange={handleSeekMouseUp}
              />
            </div>
            <div className={style.boxBotbot}>
              <div className={style.botLeft}>
                <div onClick={handlePlayPause}>
                  {!playing ? <BsPlayFill className={style.icon35} /> : <BsFillPauseFill className={style.icon35} />}
                </div>
                {/* volume  */}
                <div
                  onClick={handleMute}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {muted ? (
                    <BiSolidVolumeMute className={style.icon25} />
                  ) : volume > 0.5 ? (
                    <BiSolidVolumeFull className={style.icon25} />
                  ) : (
                    <BiSolidVolumeLow className={style.icon25} />
                  )}
                </div>
                <Slider
                  railStyle={{ background: '#2c2c2c' }}
                  trackStyle={{ background: 'white' }}
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  style={{
                    width: '80px',
                    marginTop: '12px'
                  }}
                  //   onMouseDown={onSeekMouseDown}
                  //   onChangeCommitted={onVolumeSeekDown}
                />
                <div onClick={onChangeDispayFormat}>
                  <Typography style={{ color: '#fff', marginLeft: 16 }}>
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </div>
              </div>

              <div style={{ cursor: 'pointer' }} className={style.botRight}>
                <Tooltip
                  placement='top'
                  trigger={'click'}
                  color='white'
                  title={
                    <>
                      <div
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {[0.5, 1, 1.5, 2].map((rate) => (
                          <div key={rate} className={style.tooltip1x} onClick={() => handlePlaybackRate(rate)}>
                            <Typography className={style.tooltip1xHover}>{rate}X</Typography>
                          </div>
                        ))}
                      </div>
                    </>
                  }
                >
                  <div className={style.button1x}>{playbackRate ? playbackRate : '1'}X</div>
                </Tooltip>
                <div onClick={toggleFullScreen}>
                  <BsArrowsFullscreen className={style.icon25} />
                </div>
                <div onClick={() => setScaleScreen(!scaleScreen)}>
                  <TbArrowsRightLeft className={style.icon25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
export default Controls
