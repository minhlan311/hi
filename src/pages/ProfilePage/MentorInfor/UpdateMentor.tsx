/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserState } from '@/interface/user'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Space, Spin } from 'antd'
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
  const queryClient = useQueryClient()
  const { id } = useParams()

  const mutation = useMutation((dataForm: UserState) => {
    return userApi.updateUser(dataForm)
  })

  const onFinish = (values: any) => {
    console.log('Success:', values)

    mutation.mutate(
      { ...values, _id: id },
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
            status: 'success',
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

  console.log(user?.birthday, '--------------+++++++++++')

  const [form] = Form.useForm()

  form.setFieldsValue({
    fullName: user?.fullName,
    phoneNumber: user?.phoneNumber,
    email: user?.email,
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
                      <Form.Item<FieldType>
                        name='social'
                        // rules={[{ required: true, message: 'Vui lòng điền đầy đủ họ tên' }]}
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
          <div className={css.flexButton}>
            <Button
              htmlType='button'
              type='dashed'
              onClick={() => {
                checkOk(false)
              }}
            >
              Hủy bỏ
            </Button>
            <Button htmlType='submit' type='primary'>
              Cập nhật {mutation.isLoading && <Spin />}
            </Button>
          </div>
        </Col>
      </Form>
    </div>
  )
}

export default UpdateMentor
