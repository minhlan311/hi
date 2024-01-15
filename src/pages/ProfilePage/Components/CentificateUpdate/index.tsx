/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from '@/apis/user.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { REGEX_PATTERN } from '@/constants/utils'
import { UserState } from '@/interface/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Divider, Flex, Form, Input, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { MdDeleteOutline, MdOutlineAddPhotoAlternate } from 'react-icons/md'

type Props = {
  user: UserState
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const CentificateUpdate = (props: Props) => {
  const { user, setUpdate } = props
  const [form] = Form.useForm()
  const [show, setShow] = useState<any[]>([])
  const queryClient = useQueryClient()

  const { data: mentorData } = useQuery({
    queryKey: ['mentorData', location],
    queryFn: () => {
      return userApi.getMentorDetail(user._id)
    },
    enabled: Boolean(user._id),
  })

  const mentorDetail = mentorData?.data

  const { mutate } = useMutation({
    mutationFn: (body: any) => (mentorDetail?._id ? userApi.updateMentor(body) : userApi.createMentor(body)),
    onSuccess: () => {
      setUpdate(false)
      queryClient.invalidateQueries({ queryKey: ['userDetail'] })
      openNotification({ status: 'success', message: 'Thông báo', description: 'Cập nhật thông tin thành công!' })
    },
    onError: () => {
      openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi sảy ra' })
    },
  })

  useEffect(() => {
    if (mentorDetail) {
      form.setFieldsValue({
        cccd: mentorDetail.cccd,
        educationType: mentorDetail.educationType,
        showCentificate: mentorDetail.showCentificate,
        imageAfter: mentorDetail.imageAfter,
        imageBefore: mentorDetail.imageBefore,
        diploma: mentorDetail.diploma,
        certificates: mentorDetail.certificates,
      })
    }
  }, [mentorDetail])

  const onFinish = (values: any) => {
    mutate({ ...values, _id: mentorDetail?._id, userId: user._id })
  }

  return (
    <Space direction='vertical' className='sp100' size='large'>
      <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
        <h3>Thông tin cá nhân</h3>
        <Form.Item
          label='CCCD'
          name='cccd'
          rules={[
            { required: true, message: 'Vui lòng nhập mã CCCD' },
            {
              min: 8,
              message: 'Mã CCCD hoặc CMND gồm có 8 - 12 chữ số',
            },
            {
              pattern: REGEX_PATTERN.cccd,
              message: 'Mã CCCD không đúng định dạng',
            },
          ]}
        >
          <Input placeholder='Mã CCCD' />
        </Form.Item>

        <UploadCustom
          label='Mặt trước'
          name='imageBefore'
          listType='picture-card'
          accessType='image/*'
          maxFileSize={1}
          form={form}
          showPreview
          showUploadList
          required
          defaultFileList={
            mentorDetail?.imageBefore
              ? [
                  {
                    uid: mentorDetail.imageBefore,
                    name: mentorDetail.imageBefore,
                    status: 'done',
                    url: import.meta.env.VITE_FILE_ENDPOINT + '/' + mentorDetail.imageBefore,
                  },
                ]
              : []
          }
        >
          <ButtonCustom
            icon={<MdOutlineAddPhotoAlternate size={40} />}
            className='sp100'
            size='large'
            type='link'
          ></ButtonCustom>
        </UploadCustom>

        <UploadCustom
          label='Mặt sau'
          name='imageAfter'
          listType='picture-card'
          accessType='image/*'
          maxFileSize={1}
          form={form}
          showPreview
          showUploadList
          required
          defaultFileList={
            mentorDetail?.imageAfter
              ? [
                  {
                    uid: mentorDetail.imageAfter,
                    name: mentorDetail.imageAfter,
                    status: 'done',
                    url: import.meta.env.VITE_FILE_ENDPOINT + '/' + mentorDetail.imageAfter,
                  },
                ]
              : []
          }
        >
          <ButtonCustom
            icon={<MdOutlineAddPhotoAlternate size={40} />}
            className='sp100'
            size='large'
            type='link'
          ></ButtonCustom>
        </UploadCustom>
        <h3>Thông tin pháp lý</h3>
        <Form.Item label='Học vị' name='educationType' rules={[{ required: true, message: 'Vui lòng chọn học vị' }]}>
          <Select
            placeholder='Chọn học vị'
            options={[
              { value: 'Cử nhân', label: 'Cử nhân' },
              { value: 'Thạc sĩ', label: 'Thạc sĩ' },
              { value: 'Tiến sĩ ', label: 'Tiến sĩ' },
              { value: 'Phó giáo sư', label: 'Phó giáo sư' },
            ]}
          />
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
        <Divider>Bằng cấp</Divider>
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
              <Space direction='vertical' className={'sp100'}>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <b>Bằng cấp {name + 1}:</b>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label='Tên bằng cấp'
                      rules={[{ required: true, message: 'Vui nhập tên bằng cấp' }]}
                    >
                      <Input placeholder='Nhập tên bằng cấp' />
                    </Form.Item>

                    <Space direction='vertical' className='sp100'>
                      <UploadCustom
                        restField={restField}
                        listType='picture-card'
                        name={[name, 'url']}
                        accessType='image/*'
                        maxCount={1}
                        form={form}
                        showPreview
                        showUploadList
                        defaultFileList={
                          mentorDetail?.certificates?.[name]?.url
                            ? [
                                {
                                  uid: mentorDetail?.diploma?.[name].url,
                                  name: mentorDetail?.diploma?.[name].url,
                                  status: 'done',
                                  url: import.meta.env.VITE_FILE_ENDPOINT + '/' + mentorDetail?.diploma?.[name].url,
                                },
                              ]
                            : []
                        }
                      >
                        <ButtonCustom
                          icon={<MdOutlineAddPhotoAlternate size={40} />}
                          className='sp100'
                          size='large'
                          type='link'
                        ></ButtonCustom>
                      </UploadCustom>

                      {fields.length > 1 ? (
                        <ButtonCustom onClick={() => remove(name)} icon={<MdDeleteOutline />} className='sp100' danger>
                          Xóa bằng cấp
                        </ButtonCustom>
                      ) : null}
                    </Space>
                  </div>
                ))}

                <ButtonCustom onClick={() => add()} icon={<BsPlus />} className='sp100'>
                  Thêm bằng cấp
                </ButtonCustom>
                <Form.ErrorList errors={errors} />
              </Space>
            )
          }}
        </Form.List>
        <Divider>Chứng chỉ</Divider>
        <Form.List name='certificates'>
          {(fields, { add, remove }, { errors }) => {
            return (
              <Space direction='vertical' className={'sp100'}>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key}>
                    <b>Chứng chỉ {name + 1}:</b>
                    <Form.Item
                      name={[name, 'name']}
                      label='Tên chứng chỉ'
                      rules={[{ required: true, message: 'Vui nhập tên chứng chỉ' }]}
                    >
                      <Input placeholder='Nhập tên chứng chỉ' />
                    </Form.Item>

                    <Space direction='vertical' className='sp100'>
                      <UploadCustom
                        restField={restField}
                        listType='picture-card'
                        name={[name, 'url']}
                        accessType='image/*'
                        maxCount={1}
                        form={form}
                        showPreview
                        showUploadList
                        defaultFileList={
                          mentorDetail?.certificates?.[name]?.url
                            ? [
                                {
                                  uid: mentorDetail?.certificates?.[name].url,
                                  name: mentorDetail?.certificates?.[name].url,
                                  status: 'done',
                                  url:
                                    import.meta.env.VITE_FILE_ENDPOINT + '/' + mentorDetail?.certificates?.[name].url,
                                },
                              ]
                            : []
                        }
                      >
                        <ButtonCustom
                          icon={<MdOutlineAddPhotoAlternate size={40} />}
                          className='sp100'
                          size='large'
                          type='link'
                        ></ButtonCustom>
                      </UploadCustom>

                      {fields.length >= 1 ? (
                        <ButtonCustom onClick={() => remove(name)} icon={<MdDeleteOutline />} className='sp100' danger>
                          Xóa chứng chỉ
                        </ButtonCustom>
                      ) : null}
                    </Space>
                  </div>
                ))}

                <ButtonCustom onClick={() => add()} icon={<BsPlus />} className='sp100'>
                  Thêm chứng chỉ
                </ButtonCustom>
                <Form.ErrorList errors={errors} />
              </Space>
            )
          }}
        </Form.List>
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
