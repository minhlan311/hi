/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { Space, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import css from './UploadCustom.module.scss'
import { UploadProps } from 'antd/lib'
import { TbDragDrop } from 'react-icons/tb'
type Props = {
  children?: React.ReactNode
  action?: string
  uploadKey?: 'attachment' | 'image' | 'video'
  uploadQuality?: 'medium' | 'high'
  showUploadList?: boolean
  cropBeforeUpload?: boolean
  cropAspect?: number
  maxCount?: number
  multiple?: boolean
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle'
  accessType?: 'image/jpeg' | 'image/png' | 'image/*' | string
  maxFileSize?: number
  dropArea?: boolean
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
    uploadKey = 'image',
    uploadQuality = 'medium',
    showUploadList = false,
    cropBeforeUpload = false,
    cropAspect = 16 / 9,
    maxCount = 1,
    multiple = false,
    listType,
    accessType,
    maxFileSize,
    dropArea = false,
    cropShape,
    name,
    setLoading,
    setPreviewUrl,
    callBackFileList,
  } = props
  const { Dragger } = Upload
  const [fileList, setFileList] = useState<any[]>([])
  //   const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 50, x: 0, y: 25 })

  const convertFilelist = (arr: any) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return []
    }

    const convertedArray = arr.map((item) => ({
      uid: item.url,
      name: item.name,
      status: 'done',
      url: item.url,
    }))

    return convertedArray
  }

  const handleBeforeUpload = async (file: RcFile) => {
    setLoading && setLoading(true)

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
    formData.append(uploadKey, file)

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
      const newData = convertFilelist(response.data)
      if (multiple) setFileList([...fileList, ...newData])
      else setFileList(newData)

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
  console.log(fileList)

  const uploadProps: UploadProps = {
    name: name,
    multiple: multiple || (!multiple && maxCount > 1) ? true : undefined,
    maxCount: maxCount,
    listType: listType,
    defaultFileList: fileList,
    fileList: fileList,
    showUploadList: showUploadList,
    beforeUpload: handleBeforeUpload,
    accept: accessType,
  }

  if (cropBeforeUpload) {
    return (
      <ImgCrop rotationSlider cropShape={cropShape} showReset resetText='Đặt lại' aspect={cropAspect}>
        {dropArea ? (
          <Dragger {...uploadProps}>
            {' '}
            <p className={'ant-upload-drag-icon'}>
              <TbDragDrop style={{ fontSize: 40 }} />
            </p>
            <p className={'ant-upload-text'}>Click hoặc kéo thả file vào đây để đăng tải</p>
            <p className={'ant-upload-hint'}></p>
          </Dragger>
        ) : (
          <Upload {...uploadProps}>{children}</Upload>
        )}
      </ImgCrop>
    )
  }

  return dropArea ? (
    <Dragger {...uploadProps}>
      <div className={css.dropArea}>
        <p className={'ant-upload-drag-icon'}>
          <TbDragDrop style={{ fontSize: 40 }} />
        </p>
        <p className={'ant-upload-text'}>Click hoặc kéo thả file vào đây để đăng tải</p>
        <p className={'ant-upload-hint'}></p>
      </div>
    </Dragger>
  ) : (
    <Upload {...uploadProps}>
      <Space.Compact className={css.buttGr}>{children}</Space.Compact>
    </Upload>
  )
}

export default UploadCustom
