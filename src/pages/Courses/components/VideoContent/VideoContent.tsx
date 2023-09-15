import { useEffect, useRef, useState } from 'react'
import style from './VideoContent.module.scss'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { ClockCircleOutlined, PlayCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
export default function VideoContent() {
  // const videoList = [
  //   { id: 1, name: 'https://vimeo.com/90509568' },
  //   { id: 2, name: 'https://www.youtube.com/watch?v=Q9GLCcJ27TA' }
  // ]

  const contentRef = useRef<HTMLHeadingElement | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [state, setState] = useState<string>('')

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    let prevScrollPos = window.scrollY

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      if (currentScrollPos >= 501) {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1'
          contentRef.current.style.transition = 'opacity 1s ease'
          contentRef.current.style.position = 'fixed'
          contentRef.current.style.zIndex = '30000'
          contentRef.current.style.top = '10px'
          setVisible(true)
        }
        prevScrollPos = currentScrollPos
      } else if (currentScrollPos >= 400 && currentScrollPos <= 500) {
        if (contentRef.current) {
          contentRef.current.style.opacity = '0'
          contentRef.current.style.transition = 'opacity 1s ease'
          setVisible(true)
        }
        prevScrollPos = currentScrollPos
      } else {
        if (prevScrollPos > currentScrollPos) {
          if (contentRef.current) {
            setVisible(false)
            contentRef.current.style.opacity = '1'
            contentRef.current.style.transition = 'opacity 1s ease'
            contentRef.current.style.position = ''
            contentRef.current.style.zIndex = '1'
            contentRef.current.style.top = ''
            contentRef.current.style.border = ''
          }
          prevScrollPos = currentScrollPos
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={style.col2}>
      <Modal
        destroyOnClose
        zIndex={9999989999}
        maskClosable={false}
        title='Basic Modal'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <VideoComponent video={state} />
        <Button onClick={() => setState('https://vimeo.com/90509568')}>1</Button>
        <Button onClick={() => setState('https://www.youtube.com/watch?v=Q9GLCcJ27TA')}>2</Button>
      </Modal>
      <div className={style.boxVideo} ref={contentRef}>
        {/* // ảnh video  */}
        <div onClick={showModal} className={style.video} hidden={visible}>
          <ImageCustom
            width='100%'
            height='100%'
            preview={false}
            src='https://img-c.udemycdn.com/course/240x135/1014354_b2e9_4.jpg'
          />

          <div className={style.videoPosition}>
            <div className={style.videoPositionText}>
              <p>このコースをプレビュー</p>
            </div>
          </div>
          <div>
            <PlayCircleFilled
              style={{ color: 'white', fontSize: '65px', position: 'absolute', top: '32%', right: '40%' }}
              className=''
            />
          </div>
        </div>
        {/* end ảnh video  */}
        <div className={style.contentVideo}>
          <div className={style.flexBoxContent}>
            <p className={style.price}>
              {new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY'
              }).format(23900)}
            </p>
            <p className={style.delPrice}>
              {' '}
              {new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY'
              }).format(30000)}
            </p>
          </div>
          <p className={style.off}>68%OFF</p>
          <div className={style.boxClock}>
            <p>
              <ClockCircleOutlined />
            </p>
            <p>この価格で購入できるのは、あと2日!</p>
          </div>
          <div className={style.boxButton}>
            <ButtonCustom className={style.buttonCart} children='カートに移動' />
            <ButtonCustom className={style.buttonDetail} children={'今すぐ購入する'} />
          </div>
          <p className={style.refund}>30日間返金保証</p>
          <div className={style.boxLessonContent}>
            <div className={style.tagBox}>
              <h4 className={style.tag}>タグ</h4>
              <p className={style.tagDesc}>#Python</p>
              <p className={style.tagDesc}>#Excel</p>
              <p className={style.tagDesc}>#Java Script</p>
              <p className={style.tagDesc}>#ウェブ開発</p>
              <p className={style.tagDesc}>#Amazon AWS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
