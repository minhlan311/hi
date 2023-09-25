import { ENDPOINT } from '@/constants/endpoint'
import { Space, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import css from './UploadCustom.module.scss'
type Props = {
  children?: React.ReactNode
  action?: string
  uploadQuality?: 'medium' | 'high'
  showUploadList?: boolean
  cropBeforeUpload?: boolean
  cropAspect?: number
  maxCount?: number
  multiple?: boolean
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle'
  accessType?: 'image/jpeg' | 'image/png' | 'image/*' | string
  maxFileSize?: number
  cropShape?: 'rect' | 'round'
  name?: string
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string>>
  callBackFileList?: React.Dispatch<React.SetStateAction<UploadFile[]>>
}

const UploadCustom = (props: Props) => {
  const {
    children,
    action,
    uploadQuality = 'medium',
    showUploadList = false,
    cropBeforeUpload = false,
    cropAspect = 16 / 9,
    maxCount = 1,
    multiple = false,
    listType,
    accessType,
    maxFileSize,
    cropShape,
    name,
    setLoading,
    setPreviewUrl,
    callBackFileList,
  } = props

  const [fileList, setFileList] = useState<UploadFile[]>([])
  //   const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 50, x: 0, y: 25 })

  const handleBeforeUpload = async (file: RcFile) => {
    setLoading && setLoading(true)

    if (accessType && file.type !== accessType) {
      message.error('You can only upload type file!')
      setLoading && setLoading(false)

      return false
    }

    if (maxFileSize) {
      const max = file.size / 1024 / 1024 < maxFileSize

      if (!max) {
        message.error(`Image must smaller than ${maxFileSize}MB!`)
      }

      setLoading && setLoading(false)

      return false
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (e) => {
      if (setPreviewUrl) setPreviewUrl(`${e?.target?.result}`)
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(
        action
          ? action
          : uploadQuality === 'high'
          ? import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_LARGE_IMAGE
          : import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      if (multiple) setFileList([...fileList, response.data])
      else setFileList([response.data])

      message.success('Đăng ảnh thành công')
    } catch (error) {
      message.error('Đăng ảnh lỗi')
    }

    setLoading && setLoading(false)
  }

  useEffect(() => {
    if (fileList.length > 0 && callBackFileList) {
      callBackFileList(fileList)
    }
  }, [fileList])

  if (cropBeforeUpload) {
    return (
      <ImgCrop rotationSlider cropShape={cropShape} showReset resetText='Đặt lại' aspect={cropAspect}>
        <Upload
          name={name}
          multiple={multiple || (!multiple && maxCount > 1) ? true : undefined}
          maxCount={maxCount}
          listType={listType}
          defaultFileList={[...fileList]}
          fileList={fileList}
          showUploadList={showUploadList}
          beforeUpload={handleBeforeUpload}
        >
          {children}
        </Upload>
      </ImgCrop>
    )
  }

  return (
    <Upload
      name={name}
      multiple={multiple || (!multiple && maxCount > 1) ? true : undefined}
      maxCount={maxCount}
      listType={listType}
      defaultFileList={[...fileList]}
      fileList={fileList}
      showUploadList={showUploadList}
      beforeUpload={handleBeforeUpload}
    >
      <Space.Compact className={css.buttGr}>{children}</Space.Compact>
    </Upload>
  )
}

export default UploadCustom
