/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, Popconfirm, Row, Select, Upload } from 'antd'
import { MentorForm, MentorForm as TMentorForm } from '@/pages/Auth/Register/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import openNotification from '@/components/Notification'
import { useParams } from 'react-router-dom'
import { optionsEducationType } from './constants/ultil'
import UploadCer from '@/pages/ProfilePage/Certificate/components/UploadCer'
import UploadOtherDilopma from './components/UploadOtherDIlopma'
import UploadCMNDBefore from '@/pages/ProfilePage/Certificate/components/UploadCMNDBefore'
import UploadCMNDAfter from './components/UploadCMNDAfter'

export default function UpdateCertificate() {
  const [data, setData] = useState<MentorForm>()
  const { id } = useParams()
  const mutation = useMutation((dataForm: MentorForm) => {
    return userApi.updateMentorForm(dataForm)
  })
  const queryClient = useQueryClient()

  const [form] = Form.useForm()

  const diplomaData =
    data?.diploma &&
    data?.diploma?.length &&
    data?.diploma?.map((item: { schoolName: string; image: any }) => {
      return {
        schoolName: item.schoolName,
        image: item?.image?.file?.response?.url,
      }
    })

  const certificateData = data?.certificates?.fileList?.map((item: any) => item?.response?.url)
  const imageBefore = data?.imageBefore?.fileList?.map((item: any) => item?.response?.url)
  const imageAfter = data?.imageAfter?.fileList?.map((item: any) => item?.response?.url)

  const otherDiplomaData = data?.otherDiploma?.fileList?.map((item: any) => ({
    image: item?.response?.url,
    schoolName: 'other',
  }))

  const result = diplomaData?.concat(otherDiplomaData)

  const onFinish = async (values: TMentorForm) => {
    setData(values)
  }

  const confirm = () => {
    if (
      data?.diploma.fileList?.length === 0 ||
      data?.imageAfter.fileList?.length === 0 ||
      data?.imageBefore.fileList?.length === 0
    ) {
      openNotification({
        status: 'warning',
        message: 'Thông báo',
        description: 'Vui lòng điền đầy đủ thông tin Bằng cấp và CMND',
      })
    } else {
      mutation.mutate(
        {
          diploma: otherDiplomaData ? result : diplomaData,
          userId: id,
          imageAfter: imageAfter[0],
          imageBefore: imageBefore[0],
          educationType: data?.educationType,
          certificates: certificateData,
        },
        {
          onSuccess: () => {
            openNotification({
              status: 'success',
              message: 'Thông báo',
              description: 'Cập Nhật thông tin thành công !',
            })
            queryClient.invalidateQueries({ queryKey: ['userDetail'] })
          },
          onError: () => {
            openNotification({
              status: 'error',
              message: 'Thông báo',
              description: 'Vui lòng kiểm tra lại tất cả thông tin và thử lại sau !',
            })
          },
        },
      )
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        layout='vertical'
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item<TMentorForm>
          label='Học vị'
          name='educationType'
          rules={[{ required: true, message: 'Vui lòng cập nhật học vị của bạn' }]}
        >
          <Select size='large' placeholder='Học vị của bạn là ' options={optionsEducationType} />
        </Form.Item>
        <br />
        <Form.List
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
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Divider>Bằng cấp {index + 1}</Divider>
                    <Form.Item noStyle name={[index, 'schoolName']} label='Tên bằng cấp'>
                      <Input size='large' placeholder='Tên bằng cấp' />
                    </Form.Item>
                    <br />
                    <br />
                    <Form.Item
                      label='Hình ảnh'
                      name={[index, 'image']}
                      rules={[{ required: true, message: 'Vui lòng cập nhật bằng cấp của bạn' }]}
                    >
                      <Upload
                        name='image'
                        action={import.meta.env.VITE_FILE_ENDPOINT + '/upload/image'}
                        listType='picture'
                        maxCount={1}
                      >
                        <Button type='dashed' className='dashed' icon={<UploadOutlined />}>
                          Tải hình ảnh
                        </Button>
                      </Upload>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Button
                        type='dashed'
                        className='dashed'
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      >
                        Xóa bằng cấp
                      </Button>
                    ) : null}
                  </div>
                ))}
                <Divider />
                <Form.Item>
                  <Button type='dashed' className='dashed' onClick={() => add()} style={{ width: '100%' }}>
                    <PlusOutlined /> Thêm bằng cấp
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </div>
            )
          }}
        </Form.List>
        <Row gutter={64}>
          <Col>
            <UploadCer />
          </Col>
          <Col>
            <UploadOtherDilopma />
          </Col>
        </Row>
        <Row gutter={64}>
          <Col>
            <UploadCMNDBefore />
          </Col>
          <Col>
            <UploadCMNDAfter />
          </Col>
        </Row>

        <div className='flex-btn'>
          <Form.Item<TMentorForm>>
            <Popconfirm
              arrow
              destroyTooltipOnHide
              placement='topLeft'
              title={'Thông báo'}
              description={'Bạn có chắc chắn muốn cập nhật bằng cấp không ?'}
              onConfirm={confirm}
              okText='Đồng ý'
              cancelText='Hủy bỏ'
            >
              <Button type='primary' htmlType='submit'>
                Cập nhật
              </Button>
            </Popconfirm>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
