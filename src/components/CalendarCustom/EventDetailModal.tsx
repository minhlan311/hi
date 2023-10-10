/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventState } from '@/interface/event'
import { Descriptions, Modal, Space, Switch } from 'antd'
import moment from 'moment-timezone'
import { AiOutlineClockCircle, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { TbRepeat } from 'react-icons/tb'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import TagCustom from '../TagCustom/TagCustom'
import PriceCalculator from '../PriceCalculator/PriceCalculator'
import { BsCartPlus } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/contexts/app.context'
import PopConfirmAntd from '../PopConfirmAntd/PopConfirmAntd'
import eventApi from '@/apis/event.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import openNotification from '../Notification'
import EventActionModal from './EventActionModal'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
  eventDetail: EventState | null
}

const EventDetailModal = (props: Props) => {
  const { open, setOpen, eventDetail } = props
  const { profile } = useContext(AppContext)

  const [openUpload, setOpenUpload] = useState<boolean>(false)

  const [check, setCheck] = useState(false)
  const [type, setType] = useState(false)

  const { mutate } = useMutation({
    mutationFn: (id) => eventApi.deleteEvent(id),
    onSuccess: () =>
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Xóa lịch thành công!',
      }),
  })
  const queryClient = useQueryClient()

  const updateEvent = useMutation({
    mutationFn: (data) => eventApi.updateEvent(data),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Cập nhật trạng thái lịch thành công',
      }),
        queryClient.invalidateQueries({ queryKey: ['eventsData'] })
    },
  })

  useEffect(() => {
    if (eventDetail?.status) {
      setCheck(eventDetail.status === 'ACTIVE')
    }
  }, [eventDetail])

  useEffect(() => {
    if (eventDetail) {
      const payload = {
        id: eventDetail._id,
        status: check ? 'ACTIVE' : 'INACTIVE',
      }
      updateEvent.mutate(payload as unknown as any)
    }
  }, [type])

  const handleUpdate = () => {
    setCheck(!check)
    setType(!type)
  }

  const daysOfWeek = [
    { label: 'T2', value: 1 },
    { label: 'T3', value: 2 },
    { label: 'T4', value: 3 },
    { label: 'T5', value: 4 },
    { label: 'T6', value: 5 },
    { label: 'T7', value: 6 },
    { label: 'CN', value: 0 },
  ]

  if (eventDetail) {
    const mappedLabels = eventDetail.classData?.schedules
      .map((value) => {
        const foundDay = daysOfWeek.find((day) => day.value === value)

        return foundDay ? foundDay.label : ''
      })
      .filter(Boolean)
      .join(', ')

    const currentTime = moment()
    const startTime = moment(eventDetail.start)
    const endTime = moment(eventDetail.end)
    const between = currentTime.isBetween(startTime, endTime)
    const endClass = currentTime.isAfter(endTime)

    const buy = true

    return (
      <>
        <Modal title='Chi tiết cuộc họp' open={open} onCancel={() => setOpen(!open)} footer={<p></p>} width={'50vw'}>
          <Space direction='vertical' size='large' className='sp100'>
            <div>
              <h2>{eventDetail.classData?.title}</h2>
              <Space>
                <b className='custom-butt-icon' style={{ color: 'var(--light-gray-2)' }}>
                  <AiOutlineClockCircle size='18' />

                  <Space>
                    {moment(eventDetail.start).format('HH:mmA') + ' - ' + moment(eventDetail.end).format('HH:mmA')}
                    {moment(eventDetail.end).format('DD/MM/YYYY')}
                  </Space>
                </b>
                {eventDetail.classData?.isRepeat && (
                  <TagCustom
                    color='yellow'
                    content={
                      <div className='custom-butt-icon'>
                        <TbRepeat size='15' style={{ marginRight: 5 }} /> {mappedLabels} hàng tuần
                      </div>
                    }
                  ></TagCustom>
                )}
              </Space>
            </div>

            {eventDetail.classData?.createdById === profile._id && (
              <Space size='large'>
                <ButtonCustom
                  onClick={() => {
                    setOpenUpload(true)
                  }}
                  icon={<AiOutlineEdit />}
                  size='small'
                >
                  Cập nhật lớp học
                </ButtonCustom>
                <Space>
                  Trạng thái:
                  <Switch checked={check} onChange={handleUpdate} />
                </Space>
                <PopConfirmAntd
                  desc='Bạn có muốn xóa sự kiện này?'
                  onConfirm={() => {
                    mutate(eventDetail._id as unknown as any)
                  }}
                  okText='Xóa'
                >
                  <ButtonCustom icon={<AiOutlineDelete />} danger size='small'>
                    Xóa
                  </ButtonCustom>
                </PopConfirmAntd>
              </Space>
            )}
            <Space direction='vertical' className='sp100'>
              <div>
                <Descriptions>
                  <Descriptions.Item label='Môn học'>
                    <b>{eventDetail.classData?.category.name}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Giảng viên'>
                    <b>{eventDetail.classData?.owner.fullName}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Sĩ số'>
                    <b>{eventDetail.classData?.students.length}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Loại'>
                    <TagCustom
                      content={eventDetail.classData?.plan}
                      intArrType={['FREE', 'PREMIUM']}
                      intAlternativeType={['Miễn phí', 'Có phí']}
                      intColor={['green', 'red']}
                    ></TagCustom>
                  </Descriptions.Item>
                  {eventDetail.classData?.cost && (
                    <Descriptions.Item label='Giá'>
                      <PriceCalculator price={eventDetail.classData?.cost} discount={0} showTotal></PriceCalculator>
                    </Descriptions.Item>
                  )}
                  {eventDetail.classData?.cost && (
                    <Descriptions.Item label='Trạng thái'>
                      <b>{buy ? 'Đã thanh toán' : 'Chưa thanh toán'}</b>
                    </Descriptions.Item>
                  )}
                </Descriptions>
                {eventDetail.classData?.description && (
                  <Descriptions column={1}>
                    <Descriptions.Item label='Ghi chú' className='sp100'>
                      <p>{eventDetail.classData?.description}</p>
                    </Descriptions.Item>
                  </Descriptions>
                )}
              </div>
              <Space>
                <ButtonCustom
                  type='primary'
                  disabled={(!buy && eventDetail.classData?.cost) || !between || endClass}
                  href={`/live/index.html?room_id=${eventDetail._id}`}
                  linkTarget='_parent'
                >
                  Tham gia
                </ButtonCustom>

                {!buy && eventDetail.classData?.cost && (
                  <ButtonCustom type='primary' icon={<BsCartPlus />}>
                    Thêm vào giỏ hàng
                  </ButtonCustom>
                )}
              </Space>
            </Space>
          </Space>
        </Modal>
        <EventActionModal open={openUpload} setOpen={setOpenUpload} eventDetail={eventDetail ? eventDetail : null} />
      </>
    )
  }
}

export default EventDetailModal
