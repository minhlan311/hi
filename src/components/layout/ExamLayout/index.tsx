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
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  children: JSX.Element
}

const CustomModal = ({
  content,
  title,
  visible,
  onOk,
  onCancel,
}: {
  content: JSX.Element
  title?: string | JSX.Element
  visible: boolean
  onOk: () => void
  onCancel: () => void
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
  const { setVolume, setTime, volume, start } = useContext(AppContext)
  document.title = 'Làm bài thi | Ucam'
  const { id } = useParams()
  const { data: examDetail } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => examApi.getExamDetail(id!),
    enabled: !!id,
  })

  const [isExit, setExit] = useState<boolean>(false)

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return
    }

    setVolume(value)
  }

  const navigate = useNavigate()

  const handleOk = (modalNumber: number) => {
    switch (modalNumber) {
      case 1:
        break
      case 2:
        break
      case 3:
        setExit(false)
        navigate('/')
        break
      default:
        break
    }
  }

  const handleCancel = (modalNumber: number) => {
    switch (modalNumber) {
      case 1:
        break
      case 2:
        break
      case 3:
        setExit(false)
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
                initCountdown={examDetail?.data.duration}
                showAlex={false}
                size={16}
                start={start}
                timeFormat='mm:ss'
                type='number'
                callbackTimeEnd={(e) => setTime(e)}
              />
            </div>
            <Space size='large' className={style.action}>
              <ButtonCustom
                className={style.default}
                onClick={() => {
                  setExit(true)
                }}
              >
                Thoát
              </ButtonCustom>
              <Space>
                <SoundOutlined
                  style={{
                    scale: '1.2',
                  }}
                />
                <Slider
                  max={100}
                  min={0}
                  onChange={onChange}
                  step={1}
                  value={volume}
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
          visible={isExit}
          onOk={() => handleOk(3)}
          onCancel={() => handleCancel(3)}
          content={<p>Bạn có chắc chắn muốn thoát không, bài thi của bạn sẽ không được lưu?</p>}
        />
      </Flex>
    </Header>
  )
}
