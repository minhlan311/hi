/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './FormUpdateProfile.scss'
import { Button, Steps, theme } from 'antd'
import { useMutation } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import UpdateProfileSteps1 from './Step1/UpdateProfileSteps1'
import UploadProfileSteps2 from './Step2/UploadProfileSteps2'
import UploadProfileSteps3 from './Step3/UploadProfileSteps3'
import { useNavigate } from 'react-router-dom'
import openNotification from '@/components/Notification'
import { UserState } from '@/interface/user'

export default function FormUpdateProfile() {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const [dataStesp1, setDataStep1] = useState<{
    birthDay: string
    cccd: string
    educationType: string
    email: string
    fullName: string
    phoneNumber: string
  } | null>(null)
  const [dataStesp2, setDataStep2] = useState<any>(null)
  const [dataStesp3, setDataStep3] = useState<any>(null)
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
      content: <UpdateProfileSteps1 setDataValue={setDataStep1} />,
    },
    {
      title: 'Bằng cấp / chứng chỉ',
      content: <UploadProfileSteps2 setDataStep2={setDataStep2} />,
    },
    {
      title: 'Thông tin bảo mật',
      content: <UploadProfileSteps3 setDataStep3={setDataStep3} />,
    },
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    marginTop: 16,
  }

  const getImageUrls = (fileList = [{ response: { url: String } }]) => {
    return fileList.map((item) => import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url)
  }

  const imageCer = getImageUrls(dataStesp2?.certificate?.fileList)
  const imageAfter = getImageUrls(dataStesp3?.imageAfter?.fileList)
  const imageBefore = getImageUrls(dataStesp3?.imageBefore?.fileList)
  const otherDilopma = dataStesp2?.otherDilopma?.fileList?.map((item: any) => ({
    dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
    schoolName: null,
  }))
  const dilopma = dataStesp2?.dilopma?.fileList?.map((item: any) => ({
    dilopma: import.meta.env.VITE_SERVICE_ENDPOINT + '/' + item?.response?.url,
    schoolName: dataStesp2?.schoolName,
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
      imageBefore: imageBefore,
    })
  }, [dataStesp1, dataStesp2, dataStesp3])

  const mutation = useMutation((dataForm: UserState) => {
    return userApi.updateUser(dataForm)
  })
  const updateProfileChange = (dataForm: UserState) => {
    mutation.mutate(dataForm, {
      onSuccess: () => {
        navigate('/')
        openNotification({
          status: 'success',
          message: 'Thông báo',
          description: 'Cập Nhật thông tin thành công !',
        })
      },
    })
  }

  return (
    <div className='div-form-update'>
      <>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current]?.content}</div>
        <div style={{ marginTop: 24 }}></div>
        {current > 0 && !dataStesp3?.check && (
          <>
            <Button
              style={{
                position: 'absolute',
                bottom: '3%',
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
            <Button htmlType='button' onClick={() => updateProfileChange(dataForm as UserState)} type='primary'>
              Cập nhật thông tin
            </Button>
          </>
        )}
      </>
    </div>
  )
}
