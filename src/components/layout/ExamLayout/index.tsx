/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CountDownTimer from '@/components/CountDownTimer'
import { AppContext } from '@/contexts/app.context'
import { SoundOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Card, Flex, Modal, Slider, Space } from 'antd'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header/Header'
import style from './styles.module.scss'
type Props = {
  children: JSX.Element
}

const CustomModal = ({
  title,
  content,
  visible,
  onCancel,
  onOk,
}: {
  title?: string | JSX.Element
  content: JSX.Element
  visible: boolean
  onCancel: () => void
  onOk: () => void
}) => {
  return (
    <Modal
      destroyOnClose
      closable={false}
      maskClosable={true}
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      {content}
    </Modal>
  )
}

export default function ExamLayout({ children }: Props) {
  const { setVolume, volume, start } = useContext(AppContext)
  const { id } = useParams()
  const { data: examDetail } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => examApi.getExamDetail(id!),
    enabled: !!id,
  })

  const [modal1Visible, setModal1Visible] = useState(false)
  const [modal3Visible, setModal3Visible] = useState(false)
  console.log(modal1Visible)

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return
    }

    setVolume(value)
  }

  const navigate = useNavigate()

  const showModal3 = () => {
    setModal3Visible(true)
  }

  const handleOk = (modalNumber: number) => {
    switch (modalNumber) {
      case 1:
        setModal1Visible(false)
        break
      case 2:
        break
      case 3:
        setModal3Visible(false)
        navigate('/')
        break
      default:
        break
    }
  }

  const handleCancel = (modalNumber: number) => {
    switch (modalNumber) {
      case 1:
        setModal1Visible(false)
        break
      case 2:
        break
      case 3:
        setModal3Visible(false)
        break
      default:
        break
    }
  }

  return (
    <Header type='fullsize'>
      <Flex justify='space-between' vertical className={style.testLayout}>
        <div className={style.children}>{children}</div>
        <Card size='small' className={style.bottom}>
          <Flex justify='space-between' align='center' gap={12}>
            <b className={style.name}>{examDetail?.data.name}</b>

            <div className={style.time}>
              <CountDownTimer
                type='number'
                initCountdown={examDetail?.data.duration}
                timeFormat='mm:ss'
                size={16}
                start={start}
              />
            </div>

            <Space size='large' className={style.action}>
              <ButtonCustom className={style.default} onClick={showModal3}>
                Thoát
              </ButtonCustom>

              <Space>
                <SoundOutlined
                  style={{
                    scale: '1.2',
                  }}
                />

                <Slider
                  min={0}
                  max={100}
                  value={volume}
                  onChange={onChange}
                  step={1}
                  style={{
                    width: '80px',
                  }}
                />
              </Space>
            </Space>
          </Flex>
        </Card>

        <CustomModal
          title='Kết thúc làm bài'
          visible={modal3Visible}
          onOk={() => handleOk(3)}
          onCancel={() => handleCancel(3)}
          content={<p>Bạn có chắc chắn muốn thoát không , bài thi của bạn sẽ không được lưu?</p>}
        />
      </Flex>
    </Header>
  )
}
