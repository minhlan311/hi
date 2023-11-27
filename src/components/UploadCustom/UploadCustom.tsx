/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { Image, Space, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile } from 'antd/es/upload/interface'
import { UploadProps } from 'antd/lib'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TbDragDrop } from 'react-icons/tb'
import css from './UploadCustom.module.scss'
interface FileList {
  name: string
  url: string
  uid?: string
  status?: string
}

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
  defaultFileList?: FileList[]
  showPreview?: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string>>
  callBackFileList?: React.Dispatch<React.SetStateAction<FileList[]>>
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
    defaultFileList,
    showPreview = false,
    setLoading,
    setPreviewUrl,
    callBackFileList,
  } = props
  const { Dragger } = Upload
  const [fileList, setFileList] = useState<FileList[]>([])
  //   const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 50, x: 0, y: 25 })

  useEffect(() => {
    if (defaultFileList && defaultFileList?.length > 0) setFileList(defaultFileList)
  }, [defaultFileList])

  const convertFilelist = (arr: any) => {
    if (!arr) {
      return []
    }

    console.log(arr)

    if (Array.isArray(arr)) {
      const convertedArray = arr.map((item) => ({
        uid: item.url,
        name: item.name,
        status: 'done',
        url: item.url,
      }))

      return convertedArray
    }

    if (arr) {
      const convertedArray = {
        uid: arr.url,
        name: arr.name,
        status: 'done',
        url: arr.url,
      }

      return [convertedArray]
    }
  }

  const handleBeforeUpload = async (file: RcFile) => {
    setLoading && setLoading(true)

    if (maxFileSize) {
      const max = file.size / 1024 / 1024 < maxFileSize

      if (!max) {
        message.error(
          `File của bạn có kích thước quá lớn, vui lòng upload file có dung lượng từ ${maxFileSize}MB trở xuống!`,
        )
        setLoading && setLoading(false)

        return false
      }
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
      )
      const newData = convertFilelist(response.data)

      if (multiple) setFileList([...fileList, ...(newData as unknown as FileList[])])
      else setFileList(newData as unknown as FileList[])

      message.success('Đăng tải thành công')
    } catch (error) {
      message.error('Đăng tải lỗi')
    }

    setLoading && setLoading(false)
  }

  useEffect(() => {
    if (fileList.length > 0 && callBackFileList) {
      callBackFileList(fileList)
    }
  }, [fileList])

  const uploadProps: UploadProps = {
    name: name,
    multiple: multiple || (!multiple && maxCount > 1) ? true : undefined,
    maxCount: maxCount,
    listType: listType,
    defaultFileList: fileList as unknown as any,
    fileList: fileList as unknown as any,
    showUploadList: showUploadList,
    beforeUpload: handleBeforeUpload,
    accept: accessType,
  }

  if (cropBeforeUpload) {
    return (
      <ImgCrop rotationSlider cropShape={cropShape} showReset resetText='Đặt lại' aspect={cropAspect}>
        {dropArea ? (
          <Dragger {...uploadProps}>
            {!fileList.length && !showPreview ? (
              <div className={css.dropArea}>
                <p className={'ant-upload-drag-icon'}>
                  <TbDragDrop style={{ fontSize: 40 }} />
                </p>
                <p className={'ant-upload-text'}>Click hoặc kéo thả file vào đây để đăng tải</p>
                <p className={'ant-upload-hint'}></p>
              </div>
            ) : (
              <Image
                width={'96%'}
                preview={false}
                src={import.meta.env.VITE_FILE_ENDPOINT + '/' + fileList[0].url}
              ></Image>
            )}
          </Dragger>
        ) : (
          <Upload {...uploadProps}>{children}</Upload>
        )}
      </ImgCrop>
    )
  }

  return dropArea ? (
    <Dragger {...uploadProps}>
      {!fileList.length && !showPreview ? (
        <div className={css.dropArea}>
          <p className={'ant-upload-drag-icon'}>
            <TbDragDrop style={{ fontSize: 40 }} />
          </p>
          <p className={'ant-upload-text'}>Click hoặc kéo thả file vào đây để đăng tải</p>
          <p className={'ant-upload-hint'}></p>
        </div>
      ) : (
        <Image width={'96%'} preview={false} src={import.meta.env.VITE_FILE_ENDPOINT + '/' + fileList[0].url}></Image>
      )}
    </Dragger>
  ) : (
    <Upload {...uploadProps}>
      <Space.Compact className={css.buttGr}>{children}</Space.Compact>
    </Upload>
  )
}

export default UploadCustom
