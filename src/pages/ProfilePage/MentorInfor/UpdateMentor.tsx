/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from '@/apis/user.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { ENDPOINT } from '@/constants/endpoint'
import { REGEX_PATTERN } from '@/constants/utils'
import { formatDate } from '@/helpers/common'
import { UserState } from '@/interface/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Col, DatePicker, Flex, Form, Input, Modal, Radio, Row, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
type Props = { user: UserState; setUpdate: React.Dispatch<React.SetStateAction<boolean>> }

type FieldType = {
  _id?: string
  fullName?: string
  email?: string
  phoneNumber?: string
  birthday?: any
  social?: string
}

const UpdateMentor = ({ user, setUpdate }: Props) => {
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
  const [fileList, setFileList] = useState<any[]>([])
  console.log(fileList)

  const onFinish = (values: any) => {
    mutation.mutate(
      { ...values, _id: id, socials: DataSocial, videoInfoUrl: fileList.length > 0 ? fileList?.[0].url : undefined },
      {
        onSuccess: () => {
          openNotification({
            status: 'success',
            message: 'Thông báo',
            description: 'Cập Nhật thông tin thành công !',
          })
          setUpdate(false)
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
    birthday: dayjs(user?.birthday),
    gender: user?.gender,
  })

  formSocial.setFieldsValue({
    facebook: user?.socials?.find((item) => item.type === 'facebook')?.url,
    instagram: user?.socials?.find((item) => item.type === 'instagram')?.url,
    tiktok: user?.socials?.find((item) => item.type === 'tiktok')?.url,
    youtube: user?.socials?.find((item) => item.type === 'youtube')?.url,
  })

  return (
    <div>
      <Form disabled={mutation.isLoading} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={[24, 12]}>
          <Col span={24}>
            <h3>Chỉnh sửa thông tin</h3>
          </Col>
          <Col span={24}>
            <Form.Item name='fullName' rules={[{ required: true, message: 'Vui lòng nhập Họ tên' }]}>
              <Input placeholder='Họ tên'></Input>
            </Form.Item>
          </Col>
          <Col span={24} md={14}>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Vui lòng nhập Email' },
                {
                  pattern: REGEX_PATTERN.regexEmail,
                  message: `Email không hợp lệ!`,
                },
              ]}
            >
              <Input placeholder='Email'></Input>
            </Form.Item>
          </Col>
          <Col span={24} md={10}>
            <Form.Item
              name='phoneNumber'
              rules={[
                { required: true, message: 'Vui lòng nhập SĐT' },
                {
                  pattern: REGEX_PATTERN.regexPhoneNumber,
                  message: `SĐT không hợp lệ!`,
                },
              ]}
            >
              <Input placeholder='Số điện thoại'></Input>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item name='birthday' rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
              <DatePicker
                placeholder={formatDate(user?.birthday)}
                format='DD/MM/YYYY'
                style={{ width: '100%' }}
              ></DatePicker>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              name='gender'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính',
                },
              ]}
            >
              <Radio.Group
                options={[
                  { label: 'Nam', value: 'MALE' },
                  { label: 'Nữ', value: 'FEMALE' },
                  { label: 'Khác', value: 'OTHER' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <TextAreaCustom name='descriptions' data={user?.descriptions ? user : undefined} />
          </Col>
          <Col span={24}>
            <Space direction='vertical' className='sp100'>
              Video giới thiệu:
              <UploadCustom
                action={import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_ATTACHMENT}
                uploadKey='attachment'
                callBackFileList={setFileList}
                dropArea
                showUploadList={false}
                name='video'
                maxFileSize={10}
                maxCount={1}
              />
            </Space>
          </Col>

          <Form.Item<FieldType> name='social'>
            <Modal destroyOnClose footer={[]} title='Mạng xã hội của bạn' open={isModalOpen} onCancel={handleCancel}>
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
          </Form.Item>
          <Col span={24}>
            <Flex justify='space-between'>
              <Button onClick={showModal}>
                <BiPlus /> Mạng xã hội
              </Button>
              <Space>
                <ButtonCustom onClick={() => setUpdate(false)}>Hủy</ButtonCustom>
                <ButtonCustom onClick={() => form.submit()} type='primary'>
                  Lưu
                </ButtonCustom>
              </Space>
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default UpdateMentor
