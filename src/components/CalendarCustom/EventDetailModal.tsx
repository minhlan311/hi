/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventState } from '@/interface/event'
import { Descriptions, Modal, Space } from 'antd'
import moment from 'moment-timezone'
import { AiOutlineClockCircle, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { TbRepeat } from 'react-icons/tb'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import TagCustom from '../TagCustom/TagCustom'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
  eventDetail: EventState | null
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EventDetailModal = (props: Props) => {
  const { open, setOpen, eventDetail, setOpenModal } = props
  //   const { mutate, isLoading, status, isSuccess } = useMutation({
  //     mutationFn: (id) => eventApi.deleteEvent(id),
  //   })
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

    console.log(between, endClass)

    return (
      <>
        <Modal title='Chi tiết cuộc họp' open={open} onCancel={() => setOpen(!open)} footer={<p></p>} width={'50vw'}>
          <h2>{eventDetail.classData?.title}</h2>
          {/* <h4>{eventDetail.classData?.}</h4> */}
          <Space direction='vertical' className='sp100'>
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
            <Space>
              <ButtonCustom
                onClick={() => {
                  setOpenModal(true)
                  setOpen(!open)
                }}
                icon={<AiOutlineEdit />}
              >
                Cập nhật
              </ButtonCustom>
              <ButtonCustom icon={<AiOutlineDelete />} danger>
                Xóa
              </ButtonCustom>
            </Space>
            <Descriptions>
              <Descriptions.Item label='Giảng viên'>
                <b>{eventDetail.classData?.owner.fullName}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Sĩ số'>
                <b>{eventDetail.classData?.students.length}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Loại'>
                <b>{eventDetail.classData?.plan}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Ghi chú' className='sp100'>
                <p>{eventDetail.classData?.description}</p>
              </Descriptions.Item>
            </Descriptions>

            <ButtonCustom size='large' type='primary' disabled={!between && !endClass}>
              Tham gia
            </ButtonCustom>
          </Space>
        </Modal>
      </>
    )
  }
}

export default EventDetailModal
