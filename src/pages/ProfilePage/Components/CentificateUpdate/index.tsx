/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { ENDPOINT } from '@/constants/endpoint'
import { UserState } from '@/interface/user'
import { Checkbox, Divider, Flex, Form, Input, List, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { optionsEducationType } from '../../Certificate/constants/ultil'

type Props = {
  user: UserState
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  mutation: any
}

const CentificateUpdate = (props: Props) => {
  const { user, setUpdate, mutation } = props
  const [form] = Form.useForm()

  const [show, setShow] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ educationType: user.mentorInfo.educationType })
    }
  }, [user])

  const onFinish = (values: any) => {
    mutation.mutate({ ...values, _id: user._id })
  }

  return (
    <Space direction='vertical' className='sp100' size='large'>
      <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
        <Form.Item label='Học vị' name='educationType' rules={[{ required: true, message: 'Vui lòng chọn học vị' }]}>
          <Select placeholder='Chọn học vị' options={optionsEducationType} />
        </Form.Item>
        <Form.Item label='Hiển thị bằng cấp' name='showCentificate'>
          <Checkbox.Group
            options={[
              { label: 'Bằng cấp', value: 'centificate' },
              { label: 'Chứng chỉ', value: 'diploma' },
            ]}
            onChange={(e) => setShow(e)}
            value={show}
          />
        </Form.Item>
        <h3>Bằng cấp</h3>
        <Form.List
          initialValue={[1]}
          name='diploma'
          rules={[
            {
              validator: (_, items) => {
                if (!items || items.length === 0) {
                  return Promise.reject(new Error('Bạn cần ít nhất một bằng cấp'))
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => {
            return (
              <div>
                <List
                  dataSource={fields}
                  renderItem={(field, index) => (
                    <List.Item key={field.key}>
                      <Divider style={{ margin: '5px 0' }}>Bằng cấp {index + 1}</Divider>
                      <Form.Item name={[index, 'schoolName']} label='Tên bằng cấp'>
                        <Input placeholder='Tên bằng cấp' />
                      </Form.Item>

                      <Space direction='vertical' className='sp100'>
                        <UploadCustom
                          action={import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_CERTIFICATES}
                          uploadKey='certificates'
                          showUploadList
                          name={[index, 'image']}
                          maxFileSize={10}
                          form={form}
                          multiple
                        >
                          <ButtonCustom>Thêm bằng cấp</ButtonCustom>
                        </UploadCustom>

                        {fields.length > 1 ? (
                          <ButtonCustom
                            onClick={() => remove(field.name)}
                            icon={<MdDeleteOutline />}
                            className='sp100'
                            danger
                          >
                            Xóa bằng cấp
                          </ButtonCustom>
                        ) : null}
                      </Space>
                    </List.Item>
                  )}
                />

                <ButtonCustom onClick={() => add()} icon={<BsPlus />} className='sp100'>
                  Thêm bằng cấp
                </ButtonCustom>
                <Form.ErrorList errors={errors} />
              </div>
            )
          }}
        </Form.List>
        {/* <Row gutter={64}>
            <Col>Chứng chỉ</Col>
            <Col>Bằng cấp khác</Col>
          </Row>
          <Row gutter={64}>
            <Col>CCCD T</Col>
            <Col>CCCD S</Col>
          </Row>
    
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button> */}
      </Form>
      <Flex justify='end' gap={12}>
        <ButtonCustom onClick={() => setUpdate(false)}>Hủy</ButtonCustom>
        <ButtonCustom onClick={() => form.submit()} type='primary'>
          Lưu
        </ButtonCustom>
      </Flex>
    </Space>
  )
}

export default CentificateUpdate
