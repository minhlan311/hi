/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import Logo from '@/components/Logo/Logo'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { ExamState } from '@/interface/exam'
import { useQueryClient } from '@tanstack/react-query'
import { Card, Col, Flex, Modal, Row, Space } from 'antd'
import { useContext, useState } from 'react'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
import { TbListSearch } from 'react-icons/tb'

type Props = {
  skillName: string
  nextSkillName?: string
  desc: string
  step: number
  buttonSubmit?: React.ReactNode
  nextSteps: React.Dispatch<React.SetStateAction<number>>
}

const NavigationTest = (props: Props) => {
  const { overView } = useContext(AppContext)
  const { sm } = useResponsives()
  const { skillName, nextSkillName, desc, step = 0, buttonSubmit, nextSteps } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const examDetail = queryClient.getQueryData<{ data: ExamState }>(['examDetail'])

  const handleOk = () => {
    nextSteps(step)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const [isFullScreen, setIsFullScreen] = useState(false)
  const [openReview, setOpenReview] = useState(false)

  const fullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false)
      })
    }
  }

  const totalQuestions = examDetail?.data?.countQuestionsBySkill.reduce(
    (total: any, item: any) => total + item.questions.length,
    0,
  )
  console.log(overView)

  return (
    <Card size='small'>
      <Flex justify='space-between' align='center'>
        <Space size='large'>
          <Logo size={sm ? 115 : undefined} />
          <div>
            <h3>{skillName}</h3>
            <p>{desc}</p>
          </div>
        </Space>
        <Flex gap={12}>
          <ButtonCustom
            icon={isFullScreen ? <BiExitFullscreen size={25} /> : <BiFullscreen size={25} />}
            onClick={fullScreen}
            size='small'
            tooltip='Full màn hình'
            type='text'
          ></ButtonCustom>
          <ButtonCustom
            icon={<TbListSearch size={25} />}
            size='small'
            tooltip='Review'
            type='text'
            onClick={() => setOpenReview(!openReview)}
          ></ButtonCustom>
          {buttonSubmit ? (
            buttonSubmit
          ) : (
            <ButtonCustom onClick={showModal}>{sm ? nextSkillName : 'Go to ' + nextSkillName}</ButtonCustom>
          )}
        </Flex>
      </Flex>
      <Modal
        okText='Tiếp tục'
        cancelText='Hủy'
        destroyOnClose
        title='Thông báo'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>Bạn có muốn hoàn thành kỹ năng {skillName} không?</div>
        <i>
          (*) Lưu ý: <b>Sau khi</b> chuyển kỹ năng khác, sẽ <b>không thể quay lại</b> để chỉnh sửa câu trả lời.
        </i>
      </Modal>
      <Modal
        title='Xem lại câu trả lời'
        open={openReview}
        onCancel={() => setOpenReview(false)}
        footer={<ButtonCustom onClick={() => setOpenReview(false)}>Thoát</ButtonCustom>}
      >
        <Space direction='vertical' size='large' className='sp100'>
          <i>* Cửa sổ này chỉ để xem lại câu trả lời của bạn, bạn không thể thay đổi câu trả lời ở đây!</i>
          <div>
            <Row gutter={[24, 24]}>
              {Array.from({ length: totalQuestions as number }).map((_, index) => (
                <Col span={12} md={6} key={index}>
                  <Flex gap={10}>
                    <p>Q{index + 1}:</p> <b>{overView[index]?.anwser}</b>
                  </Flex>
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </Modal>
    </Card>
  )
}

export default NavigationTest
