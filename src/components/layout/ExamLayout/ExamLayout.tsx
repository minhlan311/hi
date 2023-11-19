import { AppContext } from '@/contexts/app.context'
import { QuestionCircleOutlined, SoundOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Layout, Modal, Row, Slider } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ExamLayout.scss'

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
  const { profile, setVolume, volume } = useContext(AppContext)

  const [modal1Visible, setModal1Visible] = useState(false)
  const [modal2Visible, setModal2Visible] = useState(false)
  const [modal3Visible, setModal3Visible] = useState(false)

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return
    }

    setVolume(value)
  }

  const navigate = useNavigate()

  const showModal1 = () => {
    setModal1Visible(true)
  }

  const showModal2 = () => {
    setModal2Visible(true)
  }

  const showModal3 = () => {
    setModal3Visible(true)
  }

  const handleOk = (modalNumber: number) => {
    switch (modalNumber) {
      case 1:
        setModal1Visible(false)
        break
      case 2:
        setModal2Visible(false)
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
        setModal2Visible(false)
        break
      case 3:
        setModal3Visible(false)
        break
      default:
        break
    }
  }

  return (
    <Layout className='layout-antd-exam'>
      <Header className='bg-white-layout exam-header'>
        <CustomModal
          title={
            <>
              <Flex align='center' gap={'small'}>
                <QuestionCircleOutlined />
                <p className='p-sound'>Help</p>
              </Flex>
            </>
          }
          visible={modal1Visible}
          onOk={() => handleOk(1)}
          onCancel={() => handleCancel(1)}
          content={
            <>
              <h3>INSTRUCTIONS TO CANDIDATES</h3>
              <ul className='p-sound-ul'>
                <li className='p-sound'>Answer all the questions.</li>
                <li className='p-sound'>You can change your answers at any time during the test.</li>
              </ul>
              <h3>INFORMATION FOR CANDIDATES</h3>
              <ul className='p-sound-ul'>
                <li>There are 40 questions in this test.</li>
                <li>Each question carries one mark.</li>
                <li>There are four parts to the test.</li>
                <li>You will hear each part once.</li>
                <li>
                  For each part of the test there will be time for you to look through the questions and time for you to
                  check your answers.
                </li>
              </ul>
            </>
          }
        />

        <CustomModal
          title='Screen hidden'
          visible={modal2Visible}
          onOk={() => handleOk(2)}
          onCancel={() => handleCancel(2)}
          content={<p>Some contents for Modal 2...</p>}
        />

        <CustomModal
          title='Screen hidden'
          visible={modal3Visible}
          onOk={() => handleOk(3)}
          onCancel={() => handleCancel(3)}
          content={<p>Bạn có chắc chắn muốn thoát không , bài thi của bạn sẽ không được lưu?</p>}
        />
        <Row justify={'center'} align={'middle'} gutter={16}>
          <Col xl={6}>
            <p>{profile?.fullName}</p>
          </Col>
          <Col xl={6}>
            <p>TIME</p>
          </Col>
          <Col xl={10}>
            <Flex justify='end' align='center' gap={'small'}>
              <Button className='dashed' type='dashed' onClick={showModal1}>
                Help <QuestionCircleOutlined />
              </Button>
              <Button className='dashed' type='dashed' onClick={showModal2}>
                Hide
              </Button>
              <Button className='dashed' type='dashed' onClick={showModal3}>
                Go to Test list
              </Button>
            </Flex>
          </Col>
          <Col xl={2}>
            <Flex justify='end' align='center'>
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
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content className='exam-content-layout'>{children}</Content>
      {/* <Footer className='exam-footer-layout'>
        <Flex justify='space-between' align={'center'}>
          <div>
            <Button className='dashed' type='dashed'>
              1
            </Button>
          </div>
          <div>
            <Button className='dashed' type='dashed'>
              2
            </Button>
          </div>
          <div>
            <Button className='dashed' type='dashed'>
              3
            </Button>
          </div>
          <div>
            <Button className='dashed' type='dashed'>
              4
            </Button>
          </div>
          <div>
            <Button type='primary'>Next</Button>
          </div>
        </Flex>
      </Footer> */}
    </Layout>
  )
}
