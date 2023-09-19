/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { MentorForm as TMentorForm } from '../Auth/Register/constants'
import './FormUpdateProfile.scss'
import { Button, Steps, theme } from 'antd'
import { useMutation } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import UpdateProfileSteps1 from './Step1/UpdateProfileSteps1'
import UploadProfileSteps2 from './Step2/UploadProfileSteps2'
import UploadProfileSteps3 from './Step3/UploadProfileSteps3'
import { useNavigate } from 'react-router-dom'
import openNotification from '@/components/Notification'

export default function FormUpdateProfile() {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const [dataStesp1, setDataStep1] = useState(null)
  const [dataStesp2, setDataStep2] = useState(null)
  const [dataStesp3, setDataStep3] = useState(null)
  const [dataForm, setDataForm] = useState({})
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (dataStesp1) setCurrent(current + 1)
  }, [dataStesp1])

  useEffect(() => {
    if (dataStesp2) setCurrent(current + 1)
  }, [dataStesp2])

  useEffect(() => {
    if (current === 1) setDataStep3({ ...dataStesp3, check: false })
    if (current === 0) {
      setDataStep3(null)
      setDataStep2(null)
      setDataStep1(null)
    }
  }, [current])

  const steps = [
    {
      title: 'Thông tin cơ bản',
      content: <UpdateProfileSteps1 setDataValue={setDataStep1} />
    },
    {
      title: 'Bằng cấp / chứng chỉ',
      content: <UploadProfileSteps2 setDataStep2={setDataStep2} />
    },
    {
      title: 'Thông tin bảo mật',
      content: <UploadProfileSteps3 setDataStep3={setDataStep3} />
    }
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    marginTop: 16
  }

  const getImageUrls = (fileList = [{ response: { url: String } }]) => {
    return fileList.map((item) => import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url)
  }

<<<<<<< Updated upstream
  const { id } = useParams()
  const [form] = Form.useForm()

  const { isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.getUserDetail(id!),
  })

  console.log(data, 'dataaaaaaaaaaaaaaaaaa')

  const mutation = useMutation((body: TMentorForm) => {
    return userApi.updateMentor(body)
  })

  const onFinish = (values: TMentorForm) => {
    console.log(values, 'values')

    const imageCer = getImageUrls(values?.certificate?.fileList)
    const imageAfter = getImageUrls(values?.imageAfter?.fileList)
    const imageBefore = getImageUrls(values?.imageBefore?.fileList)
    const otherDilopma = values?.otherDilopma?.fileList?.map((item: any) => ({
      dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
      schoolName: null
    }))
    const dilopma = values?.dilopma?.fileList?.map((item: any) => ({
      dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
      schoolName: values.schoolName,
    }))

    mutation.mutate(
      {
        ...values,
        // _id: id,
        certificate: imageCer,
        imageAfter: imageAfter,
        imageBefore: imageBefore,
        otherDilopma: otherDilopma,
        dilopma: dilopma,
      },
      {
        onSuccess: (data) => {
          if (data) {
            openNotification({
              status: 'success',
              message: 'Thông báo',
              description: 'Update thành công thông tin!',
            })
          }
        },
      },
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    form.setFieldsValue({
      fullName: data?.data?.fullName,
      email: data?.data?.email,
      phoneNumber: data?.data?.phoneNumber,
=======
  const imageCer = getImageUrls(dataStesp2?.certificate?.fileList)
  const imageAfter = getImageUrls(dataStesp3?.imageAfter?.fileList)
  const imageBefore = getImageUrls(dataStesp3?.imageBefore?.fileList)
  const otherDilopma = dataStesp2?.otherDilopma?.fileList?.map((item: any) => ({
    dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
    schoolName: null
  }))
  const dilopma = dataStesp2?.dilopma?.fileList?.map((item: any) => ({
    dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
    schoolName: dataStesp2?.schoolName
  }))

  useEffect(() => {
    setDataForm({
      ...dataForm,
      birthDay: dataStesp1?.birthDay,
      cccd: dataStesp1?.cccd,
      educationType: dataStesp1?.educationType,
      email: dataStesp1?.email,
      fullName: dataStesp1?.fullName,
      phoneNumber: dataStesp1?.phoneNumber,
      certificate: imageCer,
      dilopma: dilopma,
      otherDilopma: otherDilopma,
      imageAfter: imageAfter,
      imageBefore: imageBefore
>>>>>>> Stashed changes
    })
  }, [dataStesp1, dataStesp2, dataStesp3])

  const mutation = useMutation((dataForm: TMentorForm) => {
    return userApi.updateProfileUser(dataForm)
  })
  const updateProfileChange = (dataForm: TMentorForm) => {
    mutation.mutate(dataForm, {
      onSuccess: () => {
        navigate('/')
        openNotification({
          status: 'success',
          message: 'Thông báo',
          description: 'Cập Nhật thông tin thành công !'
        })
      }
    })
  }

  return (
    <div className='div-form-update'>
<<<<<<< Updated upstream
      <Form
        disabled={isLoading}
        layout='vertical'
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item<TMentorForm>
          label='Họ tên'
          name='fullName'
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input size='large' placeholder='Nhập họ và tên của bạn' />
        </Form.Item>

        <Form.Item<TMentorForm>
          label='Số căn cước công dân'
          name='cccd'
          rules={[
            { required: true, message: 'Vui lòng nhập số căn cước của bạn' },
            { min: 12, message: 'Số căn cước chưa đúng định dạng' },
            { max: 12, message: 'Số căn cước chưa đúng định dạng' },
          ]}
        >
          <Input type='number' size='large' placeholder='Nhập số căn cước của bạn' />
        </Form.Item>
        <Form.Item<TMentorForm>
          label='Email'
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
          <Input size='large' placeholder='Nhập email của bạn' />
        </Form.Item>
        {data?.data.isMentor && (
          <Form.Item<TMentorForm>
            label='Học vị'
            name='educationType'
            rules={[{ required: true, message: 'Vui lòng chọn học vị của bạn' }]}
          >
            <Select
              size='large'
              placeholder='Chọn học vị của bạn'
              options={[
                { value: 'Cử nhân', label: 'Cử nhân' },
                { value: 'Thạc sĩ', label: 'Thạc sĩ' },
                { value: 'Tiến sĩ ', label: 'Tiến sĩ' },
                { value: 'Phó giáo sư', label: 'Phó giáo sư' },
              ]}
            />
          </Form.Item>
        )}
        <Form.Item<TMentorForm>
          label='Số điện thoại'
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
          <Input type='number' placeholder='Nhập số điện thoại' size='large' />
        </Form.Item>
        <Form.Item<TMentorForm>
          label='Ngày sinh'
          name='birthDay'
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker size='large' format={'DD/MM/YYYY'} placeholder='DD/MM/YYYY' placement='topLeft' />
        </Form.Item>
        {data?.data.isMentor && (
=======
      <>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current]?.content}</div>
        <div style={{ marginTop: 24 }}></div>
        {current > 0 && !dataStesp3?.check && (
>>>>>>> Stashed changes
          <>
            <Button
              style={{
                position: 'absolute',
                bottom: '3%'
              }}
              type='dashed'
              onClick={() => setCurrent(current - 1)}
            >
              Quay lại
            </Button>
          </>
        )}

        {dataStesp3?.check && current === 2 && (
          <>
            <Button htmlType='button' onClick={() => updateProfileChange(dataForm)} type='primary'>
              Cập nhật thông tin
            </Button>
          </>
        )}
      </>
    </div>
  )
}
