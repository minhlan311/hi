/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { REGEX_PATTERN } from '@/constants/utils'
import { UserState } from '@/interface/user'
import { Col, DatePicker, Flex, Form, Input, Modal, Radio, Row, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'

type Props = {
  user: UserState
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  mutation: any
}

const InforUpdate = (props: Props) => {
  const { user, setUpdate, mutation } = props
  const [form] = Form.useForm()
  const [formSocial] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        birthday: dayjs(user.birthday),
        gender: user.gender,
      })
      formSocial.setFieldsValue({
        facebook: user.socials?.find((item) => item.type === 'facebook')?.url,
        instagram: user.socials?.find((item) => item.type === 'instagram')?.url,
        tiktok: user.socials?.find((item) => item.type === 'tiktok')?.url,
        youtube: user.socials?.find((item) => item.type === 'youtube')?.url,
      })
    }
  }, [user])

  const onFinish = (values: any) => {
    mutation.mutate({ ...values, _id: user._id })
  }

  const onFinishSocial = (values: any) => {
    const tempArray: any[] = []

    for (const [key, value] of Object.entries(values)) {
      if (value) tempArray.push({ type: key, url: value })
    }

    mutation.mutate({ _id: user._id, socials: tempArray })

    setIsModalOpen(false)
    form.resetFields()
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[24, 12]}>
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
              placeholder={dayjs(user?.birthday).format('DD/MM/YYYY')}
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

        <Modal destroyOnClose title='Mạng xã hội' open={isModalOpen} onCancel={showModal} footer={null}>
          <Form layout='vertical' form={formSocial} onFinish={onFinishSocial}>
            <Form.Item
              name='facebook'
              label='Facebook'
              rules={[
                {
                  pattern: REGEX_PATTERN.regexUrl,
                  message: `Đường link không hợp lệ!`,
                },
              ]}
            >
              <Input placeholder='Nhập đường link Facebook' />
            </Form.Item>
            <Form.Item
              name='instagram'
              label='Instagram'
              rules={[
                {
                  pattern: REGEX_PATTERN.regexUrl,
                  message: `Đường link không hợp lệ!`,
                },
              ]}
            >
              <Input placeholder='Nhập đường link Instagram' />
            </Form.Item>
            <Form.Item
              name='tiktok'
              label='Tiktok'
              rules={[
                {
                  pattern: REGEX_PATTERN.regexUrl,
                  message: `Đường link không hợp lệ!`,
                },
              ]}
            >
              <Input placeholder='Nhập đường link Tiktok' />
            </Form.Item>
            <Form.Item
              name='youtube'
              label='Youtube'
              rules={[
                {
                  pattern: REGEX_PATTERN.regexUrl,
                  message: `Đường link không hợp lệ!`,
                },
              ]}
            >
              <Input placeholder='Nhập đường link Youtube' />
            </Form.Item>
          </Form>
          <Flex gap={12} justify='end'>
            <ButtonCustom onClick={showModal}>Hủy</ButtonCustom>
            <ButtonCustom type='primary' onClick={() => formSocial.submit()}>
              Thêm
            </ButtonCustom>
          </Flex>
        </Modal>

        <Col span={24}>
          <Flex justify='space-between'>
            <ButtonCustom icon={<BiPlus />} onClick={showModal}>
              Mạng xã hội
            </ButtonCustom>
            <Space>
              <ButtonCustom onClick={() => setUpdate(false)}>Hủy</ButtonCustom>
              <ButtonCustom onClick={() => form.submit()} type='primary'>
                Lưu thông tin
              </ButtonCustom>
            </Space>
          </Flex>
        </Col>
      </Row>
    </Form>
  )
}

export default InforUpdate
