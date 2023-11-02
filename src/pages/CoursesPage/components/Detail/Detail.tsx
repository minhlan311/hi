/* eslint-disable @typescript-eslint/no-explicit-any */
import cartApi from '@/apis/cart.api'
import enrollsApi from '@/apis/enrolls.api'
import vnpayApi from '@/apis/vnpay.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import openNotification from '@/components/Notification'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
import ProductRating from '@/components/ProductRating'
import { colorStar } from '@/components/ProductRating/pickColor.enum'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { TCourse } from '@/types/course.type'
import { TargetModelEnum } from '@/types/utils.type'
import { CreditCardOutlined, GlobalOutlined, WarningFilled, PlayCircleFilled } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb, Button, Modal } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from './Detail.module.scss'
import ReactPlayer from 'react-player'

type Props = {
  data?: TCourse
  checkEnrolls?: any
}

export default function Detail({ data, checkEnrolls }: Props) {
  const [datas, setDatas] = useState<TCourse>()
  const [check, setCheck] = useState(false)
  const { profile } = useContext(AppContext)
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const cartData = queryClient.getQueryData<any>(['dataCart'])
  const items = [
    {
      title: <p className={style.breadCrumbs}>Trang chủ</p>,
      href: '/',
    },
    {
      title: <p className={style.breadCrumbs}>Khóa học</p>,
      href: '#',
    },
    {
      title: <p className={style.breadCrumbs}>-</p>,
      href: '#',
    },
  ]
  const { lg } = useResponsives()

  useEffect(() => {
    setCheck(cartData?.data?.docs?.some((item: any) => item?.id === id))
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

  const mutationPay = useMutation({
    mutationFn: (body: { value: number; targetModel: string; targetId: string }) => vnpayApi.pay(body),
    onSuccess: (data: any) => {
      window.open(data?.data?.url)
    },
  })

  const mutationLocked = useMutation({
    mutationFn: (body: any) => enrollsApi.createEnroll(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrolls'] })
      openNotification({
        description: 'Tham gia khóa học thành công',
        status: 'success',
        message: 'Thông báo',
      })
      navigate('/myCourse')
    },
  })
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }, [mutationLocked.isSuccess])
  const checkLession = datas?.topics && datas?.topics?.some((item: any) => item?.countLessons > 0)

  return (
    <div className={style.col1}>
      <Modal
        footer={null}
        destroyOnClose
        maskClosable={true}
        title={null}
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        width={750}
      >
        {datas?.coverVideo ? (
          <ReactPlayer width={'100%'} controls url={datas?.coverVideo} />
        ) : (
          'Không có video giới thiệu nào'
        )}
      </Modal>
      <div>
        {lg && (
          <div className={style.video} onClick={showModal}>
            <ImageCustom
              width='100%'
              height='198px'
              preview={false}
              src={`${import.meta.env.VITE_FILE_ENDPOINT}/${datas?.coverMedia}`}
            />

            <div>
              <PlayCircleFilled
                style={{ color: 'white', fontSize: '65px', position: 'absolute', top: '32%', right: '40%' }}
                className=''
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <Breadcrumb separator={<span className={style.breadCrumbs}>{'>'}</span>} items={items} />
      </div>
      <div className={style.boxStyle}>
        <h2 className={style.title}>{data?.name}</h2>
      </div>
      <div className={style.boxDesc}>
        {/* <Paragraph ellipsis={true} className={style.desc}>
          {data?.descriptions || 'Không có mô tả'}
        </Paragraph> */}
      </div>
      <div className={style.detailPrice} style={{ marginTop: '10px' }}>
        <div className={style.specialPrice}>ベストセラー</div>
        <div className={style.flex}>
          <p className={style.score}>4.5</p>
          <Link to={'#'}>
            <ProductRating color={colorStar.light} rating={4.5} />
          </Link>
          <Link to={'#'}>
            <p className={style.total}>(9999 Đánh giá)</p>
          </Link>
          <p className={style.member}>72,785 Người đăng ký</p>
        </div>
      </div>
      <Link to={'#'}>
        <p className={style.text}>
          Mentor: <span className={style.textSpan}>{data?.mentor?.fullName}</span>
        </p>
      </Link>
      <div className={style.info}>
        <div className={style.flexBoxInfo}>
          <WarningFilled />
          <p>Ngày bắt đầu: 7/2023</p>
        </div>
        <div className={style.flexBoxInfo}>
          <GlobalOutlined />
          <p>Việt Nam</p>
        </div>
        <div className={style.flexBoxInfo}>
          <CreditCardOutlined />
          <p>Tiếng Việt</p>
        </div>
      </div>
      {lg && (
        <div className={style.moduleButtonFlex}>
          {datas?.topics && datas?.topics?.length > 0 && checkLession ? (
            checkEnrolls?.data?.docs?.length === 0 ? (
              datas?.cost ? (
                <>
                  {check ? (
                    <>
                      <Button disabled className={style.buttonCart} children='Đã thêm vào giỏ hàng' />
                      <ButtonCustom
                        className={style.buttonDetail}
                        children={'Mua ngay'}
                        onClick={() =>
                          mutationPay.mutate({
                            value: datas?.cost,
                            targetModel: TargetModelEnum.COURSE,
                            targetId: datas._id!,
                          })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        loading={mutate.isLoading}
                        htmlType='submit'
                        className={style.buttonCart}
                        children='Thêm vào giỏ hàng'
                        onClick={() => {
                          addCart(datas!._id!)
                        }}
                      />
                      <ButtonCustom
                        className={style.buttonDetail}
                        children={'Mua ngay'}
                        onClick={() =>
                          mutationPay.mutate({
                            value: datas?.cost,
                            targetModel: TargetModelEnum.COURSE,
                            targetId: datas._id!,
                          })
                        }
                      />
                    </>
                  )}
                </>
              ) : (
                <PopConfirmAntd
                  onConfirm={() =>
                    mutationLocked.mutate({
                      targetId: datas?._id,
                      targetModel: 'COURSE',
                      type: profile.isMentor ? 'MENTOR' : 'STUDENT',
                      userIds: [profile._id],
                    })
                  }
                  desc='Bạn có chắc chắn muốn tham gia khóa học này'
                >
                  <ButtonCustom className={style.buttonCart} children={'Tham gia khóa học này'} />
                </PopConfirmAntd>
              )
            ) : (
              <ButtonCustom
                className={style.buttonCart}
                children={'Vào khóa học'}
                onClick={() => {
                  navigate('/myCourseLearning/' + datas._id)
                }}
              />
            )
          ) : (
            <div
              style={{
                padding: '20px 0',
              }}
            >
              <h3>Khóa học đang hoàn thiện</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
