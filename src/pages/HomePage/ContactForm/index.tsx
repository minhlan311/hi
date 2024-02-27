/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-line @typescript-eslint/no-explicit-any
import Header from '@/components/layout/Header/Header'
import { Button, Col, Flex, Form, Image, Input, Row, Space } from 'antd'
import './styles.scss'

type FieldType = {
  username?: string
  phone?: number
  email?: string
  content?: string
}

export default function ContactForm() {
  const [form] = Form.useForm()
  const { TextArea } = Input
  // eslint-disable-next-line
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  // eslint-disable-next-line
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Header size='sm' padding={'60px 0'}>
      <Row align='middle' gutter={[24, 24]}>
        <Col span={24} md={12}>
          <Image src='https://i.ytimg.com/vi/QlkPQCeeA04/maxresdefault.jpg' preview={false} />
        </Col>
        <Col span={24} md={12}>
          <Space direction='vertical' size='large' className='sp100'>
            <h1 style={{ textAlign: 'center' }}>Liên hệ</h1>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                <Input
                  style={{
                    borderRadius: '36px',
                  }}
                  placeholder='Họ và tên'
                />
              </Form.Item>
              <Form.Item<FieldType> name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                <Input
                  style={{
                    borderRadius: '36px',
                  }}
                  placeholder='SĐT'
                />
              </Form.Item>
              <Form.Item<FieldType> name='email' rules={[{ required: true, message: 'Vui lòng nhập email của bạn' }]}>
                <Input
                  style={{
                    borderRadius: '36px',
                  }}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item<FieldType> name='content' rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                <TextArea
                  style={{ borderRadius: '26px', width: '100%', resize: 'none' }}
                  rows={4}
                  placeholder='Nội dung'
                />
              </Form.Item>

              <Flex justify='center'>
                <Button
                  className='form-button-style'
                  htmlType='submit'
                  style={{
                    borderRadius: '10px',
                  }}
                >
                  Đăng ký ngay
                </Button>
              </Flex>
            </Form>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}
