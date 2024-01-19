/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { Form, Image, Modal, Space, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { FormInstance, UploadProps } from 'antd/lib'
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
  restField?: { fieldKey?: number | undefined }
  children?: React.ReactNode
  action?: string
  uploadKey?: 'attachment' | 'image' | 'certificates'
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
  name?: any | any[]
  form?: FormInstance
  defaultFileList?: FileList[]
  showPreview?: boolean
  required?: boolean
  label?: React.ReactNode | string
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string>>
  callBackFileList?: React.Dispatch<React.SetStateAction<FileList[] | any[]>>
  onChange?: (e: any) => void
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const UploadCustom = (props: Props) => {
  const {
    restField,
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
    required,
    form,
    label,
    setLoading,
    setPreviewUrl,
    callBackFileList,
    onChange,
  } = props
  const { Dragger } = Upload
  const [fileList, setFileList] = useState<FileList[]>([])

  const handleBeforeUpload = async (file: RcFile) => {
    if (maxFileSize) {
      const max = file.size / 1024 / 1024 < maxFileSize

      if (!max) {
        message.error(
          `File của bạn có kích thước quá lớn, vui lòng upload file có dung lượng từ ${maxFileSize}MB trở xuống!`,
        )

        return false
      }
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (e) => {
      if (setPreviewUrl) setPreviewUrl(`${e?.target?.result}`)
    }
  }

  useEffect(() => {
    if (fileList.length > 0 && callBackFileList) {
      callBackFileList(fileList)
    }
  }, [fileList])

  useEffect(() => {
    if (defaultFileList && !fileList.length) {
      setFileList(defaultFileList)
    }
  }, [defaultFileList])

  const handleChange: UploadProps['onChange'] = (info) => {
    onChange && onChange(info)
    const { status } = info.file

    setFileList(info.fileList as any[])

    if (status === 'uploading') {
      setLoading && setLoading(true)

      return
    }

    if (status === 'done') {
      if (uploadKey === 'attachment') {
        const newFileArr = info.fileList.map((file) => {
          if (file.response) {
            return {
              uid: file.response[0].url,
              name: file.name,
              status: 'done',
              url: file.response[0].url,
              thumbUrl: import.meta.env.VITE_FILE_ENDPOINT + '/' + file.response[0].url,
            }
          }

          return file
        })
        callBackFileList && callBackFileList(newFileArr)
        setFileList(newFileArr as any[])
      } else {
        form && form.setFieldValue(name, info.file.response.url)

        const newFileArr = info.fileList.map((file) => {
          if (file.response) {
            return {
              uid: file.response.url,
              name: file.name,
              status: 'done',
              url: file.response.url,
              thumbUrl: import.meta.env.VITE_FILE_ENDPOINT + '/' + file.response[0].url,
            }
          }

          return file
        })
        callBackFileList && callBackFileList(newFileArr)
      }

      setLoading && setLoading(false)
    } else if (status === 'error') {
      message.error(`Tải file ${info.file.name} thất bại.`)
      setLoading && setLoading(false)
    }
  }

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const uploadProps: UploadProps = {
    name: uploadKey,
    multiple: multiple || (!multiple && maxCount > 1) ? true : undefined,
    maxCount: maxCount,
    listType: listType,
    fileList: fileList as unknown as any,
    showUploadList: showUploadList,
    accept: accessType,
    action:
      (action && action) ||
      (uploadQuality === 'high' && import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_LARGE_IMAGE) ||
      (uploadKey === 'certificates' && import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_CERTIFICATES) ||
      (uploadKey === 'attachment' && import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_ATTACHMENT) ||
      import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE,
    onPreview: previewImage ? handlePreview : undefined,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
  }

  return (
    <div>
      <Form.Item
        {...restField}
        label={label}
        name={name}
        rules={[{ required: required, message: 'Vui lòng đăng tải file' }]}
        getValueFromEvent={(e) => {
          if (e.file.response) {
            if (Array.isArray(e.file.response)) return e.file.response.map((item: any) => item.url)

            return e.file.response.url
          }
        }}
      >
        {cropBeforeUpload ? (
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
        ) : dropArea ? (
          <Dragger {...uploadProps}>
            {(!fileList.length && !showPreview) || name?.toLowerCase().includes('file') ? (
              <div className={css.dropArea}>
                <p className={'ant-upload-drag-icon'}>
                  <TbDragDrop style={{ fontSize: 40 }} />
                </p>
                <p className={'ant-upload-text'}>Click hoặc kéo thả file vào đây để đăng tải</p>
                <p className={'ant-upload-hint'}></p>
              </div>
            ) : name?.toLowerCase().includes('video') ? (
              <video
                width={'100%'}
                style={{ maxHeight: '40vh' }}
                src={import.meta.env.VITE_FILE_ENDPOINT + '/' + fileList[0].url}
              ></video>
            ) : (
              <Image
                width={'96%'}
                preview={false}
                src={import.meta.env.VITE_FILE_ENDPOINT + '/' + fileList[0].url}
              ></Image>
            )}
          </Dragger>
        ) : (
          <Upload {...uploadProps}>
            <Space.Compact className={css.buttGr}>{children}</Space.Compact>
          </Upload>
        )}
      </Form.Item>
      {previewImage && (
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      )}
    </div>
  )
}

export default UploadCustom
