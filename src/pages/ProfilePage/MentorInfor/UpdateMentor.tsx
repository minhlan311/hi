/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserState } from '@/interface/user'
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Space, Spin, Tooltip } from 'antd'
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons'
import { FaBirthdayCake, FaUserAlt } from 'react-icons/fa'
import { FaEarthAsia } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import css from './styles.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import openNotification from '@/components/Notification'
import { REGEX_PATTERN } from '@/constants/utils'
import { formatDate } from '@/helpers/common'
import { useState, useEffect } from 'react'
type Props = { user: UserState; checkOk: any }

type FieldType = {
  _id?: string
  fullName?: string
  email?: string
  phoneNumber?: string
  birthday?: any
  social?: string
}

const UpdateMentor = ({ user, checkOk }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [DataSocial, setDataSocial] = useState<{ type: string; url: string }[]>([])
  const queryClient = useQueryClient()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [formSocial] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setDataSocial(user.socials)
  }, [user])

  const mutation = useMutation((dataForm: UserState) => {
    return userApi.updateUser(dataForm)
  })

  const onFinish = (values: any) => {
    console.log('Success:', values)

    mutation.mutate(
      { ...values, _id: id, socials: DataSocial },
      {
        onSuccess: () => {
          openNotification({
            status: 'success',
            message: 'Thông báo',
            description: 'Cập Nhật thông tin thành công !',
          })
          checkOk(false)
          queryClient.invalidateQueries({ queryKey: ['userDetail'] })
        },
        onError: () => {
          openNotification({
            status: 'error',
            message: 'Thông báo',
            description: 'Có lỗi xảy ra,vui lòng thử lại sau !',
          })
        },
      },
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishSocial = (values: any) => {
    const tempArray = []

    for (const [key, value] of Object.entries(values)) {
      tempArray.push({ type: key, url: value })
    }

    setDataSocial(tempArray as any)
    setIsModalOpen(false)
    form.resetFields([''])
  }

  form.setFieldsValue({
    fullName: user?.fullName,
    phoneNumber: user?.phoneNumber,
    email: user?.email,
  })

  formSocial.setFieldsValue({
    facebook: user?.socials?.find((item) => item.type === 'facebook')?.url,
    instagram: user?.socials?.find((item) => item.type === 'instagram')?.url,
    tiktok: user?.socials?.find((item) => item.type === 'tiktok')?.url,
    youtube: user?.socials?.find((item) => item.type === 'youtube')?.url,
  })

  return (
    <div className={css.cardUpdate}>
      <Form disabled={mutation.isLoading} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Col span={24} md={17} xl={14}>
          <div className={css.infor}>
            <Space direction='vertical' className={'sp100'}>
              <Row justify='space-between'>
                <Col span={24} md={8}>
                  <Space>
                    <div className={css.icon}>
                      <FaUserAlt />
                    </div>
                    <Space direction='vertical'>
                      <b>Giảng viên</b>
                      <Form.Item<FieldType>
                        name='fullName'
                        rules={[{ required: true, message: 'Vui lòng điền đầy đủ họ tên' }]}
                      >
                        <Input
                          size='middle'
                          style={{
                            width: '150px',
                          }}
                        />
                      </Form.Item>
                    </Space>
                  </Space>
                </Col>
                <Col>
                  {' '}
                  <div className={css.flexButton}>
                    <Tooltip title='Hủy bỏ'>
                      {' '}
                      <Button
                        htmlType='button'
                        type='dashed'
                        className='dashed'
                        onClick={() => {
                          checkOk(false)
                        }}
                      >
                        <StopOutlined />
                      </Button>
                    </Tooltip>

                    <Tooltip title='Cập nhật'>
                      <Button type='primary' htmlType='submit'>
                        {mutation.isLoading ? <Spin /> : <CheckCircleOutlined />}
                      </Button>
                    </Tooltip>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Row justify='space-between'>
                <Col span={24} md={8}>
                  <Space>
                    <div className={css.icon}>
                      <MdEmail />
                    </div>
                    <Space direction='vertical'>
                      <b>Email</b>
                      <Form.Item<FieldType>
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập email',
                          },
                          {
                            pattern: REGEX_PATTERN.regexEmail,
                            message: `Email không hợp lệ!`,
                          },
                        ]}
                      >
                        <Input
                          size='middle'
                          style={{
                            width: '150px',
                          }}
                        />
                      </Form.Item>
                    </Space>
                  </Space>
                </Col>
                <Col span={24} md={12}>
                  <Space>
                    <div className={css.icon}>
                      <FaEarthAsia />
                    </div>
                    <Space direction='vertical'>
                      <b>Mạng xã hội</b>
                      <Form.Item<FieldType> name='social'>
                        <Modal
                          destroyOnClose
                          footer={[]}
                          title='Mạng xã hội của bạn'
                          open={isModalOpen}
                          onCancel={handleCancel}
                        >
                          <Form layout='vertical' form={formSocial} onFinish={onFinishSocial}>
                            <Form.Item name='facebook' label='Facebook'>
                              <Input></Input>
                            </Form.Item>
                            <Form.Item name='instagram' label='Instagram'>
                              <Input></Input>
                            </Form.Item>
                            <Form.Item name='tiktok' label='Tiktok'>
                              <Input></Input>
                            </Form.Item>
                            <Form.Item name='youtube' label='Youtube'>
                              <Input></Input>
                            </Form.Item>
                            <Button type='primary' htmlType='submit'>
                              Đồng ý
                            </Button>
                          </Form>
                        </Modal>
                        <Button type='dashed' className='dashed' onClick={showModal}>
                          {' '}
                          Mạng xã hội{' '}
                        </Button>
                      </Form.Item>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row justify='space-between'>
                <Col span={24} md={8}>
                  <Space>
                    <div className={css.icon}>
                      <BsFillTelephoneFill />
                    </div>
                    <Space direction='vertical'>
                      <b>Điện thoại liên hệ</b>
                      <Form.Item<FieldType>
                        required
                        name='phoneNumber'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại',
                          },
                          {
                            pattern: REGEX_PATTERN.regexPhoneNumber,
                            message: `SĐT không hợp lệ!`,
                          },
                        ]}
                      >
                        <Input
                          size='middle'
                          style={{
                            width: '150px',
                          }}
                        />
                      </Form.Item>
                    </Space>
                  </Space>
                </Col>
                <Col span={24} md={12}>
                  <Space>
                    <div className={css.icon}>
                      <FaBirthdayCake />
                    </div>
                    <Space direction='vertical'>
                      <b>Ngày sinh</b>
                      <Form.Item<FieldType> name='birthday'>
                        <DatePicker
                          placeholder={formatDate(user?.birthday)}
                          style={{
                            width: '150px',
                          }}
                          format={'DD/MM/YYYY'}
                          size='middle'
                        />
                      </Form.Item>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Space>
          </div>
        </Col>
      </Form>
    </div>
  )
}

export default UpdateMentor
