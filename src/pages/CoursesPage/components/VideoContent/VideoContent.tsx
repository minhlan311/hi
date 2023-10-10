/* eslint-disable @typescript-eslint/no-explicit-any */
import cartApi from '@/apis/cart.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
import { AppContext } from '@/contexts/app.context'
import { formatPriceVND } from '@/helpers/common'
import { TCourse } from '@/types/course.type'
import { ClockCircleOutlined, PlayCircleFilled } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import style from './VideoContent.module.scss'
import { useParams } from 'react-router-dom'
type Props = {
  data?: TCourse
}

export default function VideoContent({ data }: Props) {
  const contentRef = useRef<HTMLHeadingElement | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [datas, setDatas] = useState<TCourse>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [check, setCheck] = useState(false)
  const { profile } = useContext(AppContext)
  const { id } = useParams()

  const queryClient = useQueryClient()
  const cartData = queryClient.getQueryData<any>(['dataCart'])

  useEffect(() => {
    setCheck(cartData?.data?.docs?.some((item: any) => item.id === id))
  }, [id, cartData])

  const mutate = useMutation({
    mutationFn: (body: any) => {
      return cartApi.addtoCart(body)
    },
    onSuccess: (data: any) => {
      openNotification({
        message: 'Thông báo',
        status: data?.data?.message ? 'warning' : 'success',
        description: data?.data?.message ? data?.data?.message : 'Thêm khóa học vào giỏ hàng thành công !',
        duration: 1.5,
      })
      queryClient.invalidateQueries({ queryKey: ['dataCart'] })
      setCheck(true)
    },
    onError: () => ({
      message: 'Thông báo',
      status: 'error',
      description: 'Có lỗi xảy ra',
    }),
  })

  const addCart = (id: string) => {
    if (!profile) {
      openNotification({
        status: 'warning',
        message: 'Thông báo',
        description: 'Bạn cần đăng nhập để thực hiện chức năng này',
      })
    } else {
      mutate.mutate({
        userId: profile._id,
        courseId: id,
      })
    }
  }

  useEffect(() => {
    setDatas(data)
  }, [data])

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
        <VideoComponent video={'https://vimeo.com/90509568'} />
      </Modal>

      <div className={style.boxVideo} ref={contentRef}>
        {/* // ảnh video  */}

        {datas ? (
          <div onClick={showModal} className={style.video} hidden={visible}>
            <ImageCustom
              width='100%'
              height='198px'
              preview={false}
              src={`${import.meta.env.VITE_FILE_ENDPOINT}/${datas?.coverMedia}`}
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
        ) : (
          <LoadingCustom
            style={{
              marginTop: '30px',
            }}
          />
        )}

        {/* end ảnh video  */}
        <div className={style.contentVideo}>
          <div className={style.flexBoxContent}>
            <p className={style.price}>{datas?.cost ? formatPriceVND(datas?.cost || 0) : 'FREE'}</p>
          </div>
          <p className={style.off}>68%OFF</p>
          <div className={style.boxClock}>
            <p>
              <ClockCircleOutlined />
            </p>
            <p>この価格で購入できるのは、あと2日!</p>
          </div>

          <div>
            {check ? (
              <Button disabled className={style.buttonCart} children='Đã thêm vào giỏ hàng' />
            ) : (
              <Button
                loading={mutate.isLoading}
                htmlType='submit'
                className={style.buttonCart}
                children='Thêm vào giỏ hàng'
                onClick={() => {
                  addCart(datas!._id!)
                }}
              />
            )}
          </div>
          <ButtonCustom className={style.buttonDetail} children={'Mua ngay'} />
          <p className={style.refund}>30日間返金保証</p>
          <div className={style.boxLessonContent}>
            <div className={style.tagBox}>
              <h4 className={style.tag}>Từ khóa</h4>
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
