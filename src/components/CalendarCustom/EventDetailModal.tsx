/* eslint-disable @typescript-eslint/no-explicit-any */
import eventApi from '@/apis/event.api'
import { AppContext } from '@/contexts/app.context'
import { EventState } from '@/interface/event'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Descriptions, Modal, Space } from 'antd'
import moment from 'moment-timezone'
import { useContext, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BiTimer } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import openNotification from '../Notification'
import PopConfirmAntd from '../PopConfirmAntd/PopConfirmAntd'
import PopoverCustom from '../PopoverCustom'
import TagCustom from '../TagCustom/TagCustom'
import EventActionModal from './EventActionModal'
import dayjs from 'dayjs'
import useResponsives from '@/hooks/useResponsives'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
  eventDetail: EventState | null
}

const EventDetailModal = (props: Props) => {
  const { open, setOpen, eventDetail } = props
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [openUpload, setOpenUpload] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id) => eventApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventsData'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Xóa lịch thành công!',
      })
      setOpen(false)
    },
  })
  const { sm } = useResponsives()

  if (eventDetail) {
    const currentTime = moment()
    const startTime = moment(eventDetail.start)
    const endTime = moment(eventDetail.end)
    const between = currentTime.isBetween(startTime, endTime)
    const endClass = currentTime.isAfter(endTime)

    const testTime = [
      { label: '15 phút', value: 15 },
      { label: '35 phút', value: 35 },
      { label: '45 phút', value: 45 },
      { label: '60 phút', value: 60 },
      { label: '90 phút', value: 90 },
      { label: '120 phút', value: 120 },
    ]

    const examTime = dayjs(eventDetail.end).diff(dayjs(eventDetail.start)) / 60000
    const selectedOption = testTime.find(
      (item) => item.value <= examTime && testTime[testTime.indexOf(item) + 1]?.value > examTime,
    )

    return (
      <>
        <Modal title='Chi tiết cuộc họp' open={open} onCancel={() => setOpen(!open)} footer={<p></p>}>
          <Space direction='vertical' className='sp100'>
            <div>
              <h2>{eventDetail.name}</h2>
              <Space direction={sm ? 'vertical' : 'horizontal'}>
                <b className='custom-butt-icon' style={{ color: 'var(--light-gray-2)' }}>
                  <AiOutlineClockCircle size='18' style={{ marginRight: 5 }} />

                  <Space>
                    {moment(eventDetail.start).format('HH:mmA') + ' - ' + moment(eventDetail.end).format('HH:mmA')}
                    {moment(eventDetail.end).format('DD/MM/YYYY')}
                  </Space>
                </b>

                <Space>
                  {endClass && <TagCustom color='gray' content={'Đã kết thúc'}></TagCustom>}
                  {eventDetail.testId && (
                    <TagCustom
                      color='yellow'
                      content={
                        <div className='custom-butt-icon'>
                          <BiTimer size='15' style={{ marginRight: 5 }} />
                          {endTime.diff(startTime) / 60000} phút
                        </div>
                      }
                    ></TagCustom>
                  )}
                </Space>
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
                  Cập nhật
                </ButtonCustom>

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
              <Descriptions column={sm ? 1 : 2}>
                <Descriptions.Item label='Giảng viên'>
                  <PopoverCustom type='showProfile' userData={eventDetail.classData?.owner} trigger='click'>
                    <ButtonCustom type='link' style={{ padding: 0, height: 0 }}>
                      <b>{eventDetail.classData?.owner.fullName}</b>
                    </ButtonCustom>
                  </PopoverCustom>
                </Descriptions.Item>
                <Descriptions.Item label='Sĩ số'>
                  <b>{eventDetail.classData?.students.length}</b>
                </Descriptions.Item>
              </Descriptions>
              {eventDetail.description && (
                <Descriptions column={1}>
                  <Descriptions.Item label='Ghi chú' className='sp100'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: eventDetail.description !== '<p></p>' ? eventDetail.description : 'Không có ghi chú',
                      }}
                    ></div>
                  </Descriptions.Item>
                </Descriptions>
              )}

              <Space>
                {eventDetail.testId && selectedOption ? (
                  <ButtonCustom
                    type='primary'
                    disabled={!between || endClass}
                    onClick={() =>
                      navigate('/lam-bai-thi-online', {
                        state: {
                          testId: eventDetail.testId,
                          testTime: selectedOption.label,
                          addTime: examTime - selectedOption?.value,
                        },
                      })
                    }
                  >
                    Làm bài thi
                  </ButtonCustom>
                ) : (
                  <ButtonCustom
                    type='primary'
                    disabled={!between || endClass}
                    href={`/live?id=${eventDetail._id}`}
                    linkTarget='_parent'
                  >
                    Tham gia
                  </ButtonCustom>
                )}
              </Space>
            </Space>
          </Space>
        </Modal>
        <EventActionModal
          open={openUpload}
          type={eventDetail.testId ? 'test' : 'event'}
          setOpen={setOpenUpload}
          eventDetail={eventDetail ? eventDetail : null}
        />
      </>
    )
  }
}

export default EventDetailModal
