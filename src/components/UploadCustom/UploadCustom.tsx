import { Progress, Space, Upload, message } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import css from './UploadCustom.module.scss'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import axios from 'axios'
type Props = {
  children?: React.ReactNode
  action?: string
  showLoading?: boolean
  showUploadList?: boolean
  typeLoading?: 'button'
  setLoading?: (() => boolean | undefined) | undefined
  cropBeforeUpload?: boolean
  cropAspect?: number
  maxCount?: number
  multiple?: boolean
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle'
  accessType?: 'image/jpeg' | 'image/png' | 'image/*' | string
  maxFileSize?: number
}

const UploadCustom = (props: Props) => {
  const {
    children,
    action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    showLoading,
    showUploadList = false,
    typeLoading,
    // setLoading,
    cropBeforeUpload = false,
    cropAspect = 16 / 9,
    maxCount = 1,
    multiple = false,
    listType,
    accessType,
    maxFileSize
  } = props

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null)
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 50, x: 0, y: 25 })
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
  const [save, setSave] = useState(false)
  const previewCanvasRef = useRef<any>()

  const handleBeforeUpload = async (file: RcFile) => {
    if (accessType && file.type !== accessType) {
      message.error('You can only upload type file!')
      return false
    }
    if (maxFileSize) {
      const max = file.size / 1024 / 1024 < maxFileSize
      if (!max) {
        message.error(`Image must smaller than ${maxFileSize}MB!`)
      }
      return false
    } else {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(`${e?.target?.result}`)
      }
      reader.readAsDataURL(file)
      return false
    }
  }

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop)
  }

  const createCroppedImage = (file: File, crop: Crop) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    if (previewCanvasRef.current)
      image.onload = () => {
        const canvas = previewCanvasRef.current
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const croppedWidth = crop.width ? crop.width * scaleX : 0
        const croppedHeight = crop.height ? crop.height * scaleY : 0

        canvas.width = croppedWidth
        canvas.height = croppedHeight

        const ctx = canvas.getContext('2d')

        if (ctx) {
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            croppedWidth,
            croppedHeight,
            0,
            0,
            croppedWidth,
            croppedHeight
          )

          canvas.toBlob((blob: Blob) => {
            if (blob) {
              setCroppedImage(blob)
            }
          })
        }
      }
  }

  const onImageCropComplete = (crop: Crop) => {
    if (selectedFile) {
      createCroppedImage(selectedFile, crop)
    }
  }

  const handleUpload = async () => {
    if (!croppedImage) {
      message.error('Please crop the image before uploading.')
      return
    }

    const formData = new FormData()
    formData.append('croppedImage', croppedImage)

    try {
      const response = await axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setFileList([...fileList, response.data])
      message.success('Upload successful')
    } catch (error) {
      message.error('Upload failed')
    }
  }

  useEffect(() => {
    if (save) handleUpload()
  }, [save])

  const handleClose = () => {
    setSave(false)
    setSelectedFile(null)
    setPreviewUrl('')
  }
  if (cropBeforeUpload) {
    return (
      <div>
        <Space direction='vertical' className={css.main}>
          <h3>画像プレビュー</h3>
          <div className={css.preview}>
            <canvas
              ref={previewCanvasRef}
              className={css.canvasPreview}
              style={{ height: save ? 'auto' : 0, marginTop: save ? 15 : 0 }}
            ></canvas>
            {save ? null : selectedFile ? (
              <ReactCrop
                style={{ marginTop: selectedFile ? 15 : 0 }}
                crop={crop}
                onChange={handleCropChange}
                onComplete={onImageCropComplete}
                aspect={cropAspect}
              >
                <img src={previewUrl} alt='previewUrl' />
              </ReactCrop>
            ) : (
              <div className={css.imgPr}>
                <img src='https://img-c.udemycdn.com/user/200_H/anonymous_3.png' alt='avt' />
              </div>
            )}
          </div>
          <h3>画像を追加・変更</h3>
          {save && (
            <Space.Compact className={css.buttGr}>
              <Progress
                strokeLinecap='butt'
                percent={100}
                size={['100%', 38]}
                format={(percent) => <h3 className={css.percent}>{percent}%</h3>}
                strokeColor={'#5624d0'}
                showInfo={false}
                className={css.progress}
              />
              <ButtonCustom onClick={handleClose}>変更</ButtonCustom>
            </Space.Compact>
          )}
          {selectedFile && !save ? (
            <Space>
              <ButtonCustom onClick={() => setSave(true)}>OK</ButtonCustom>{' '}
              <ButtonCustom onClick={handleClose}>変更</ButtonCustom>{' '}
            </Space>
          ) : null}
        </Space>

        <Upload
          multiple={multiple || (!multiple && maxCount > 1) ? true : undefined}
          maxCount={maxCount}
          listType={listType}
          showUploadList={showUploadList}
          beforeUpload={handleBeforeUpload}
          accept={accessType}
        >
          <Space.Compact className={css.buttGr}>
            {/* {showLoading && typeLoading === 'button' && save && (
              <ButtonCustom className={css.buttLoad}>ファイルが選択されていません</ButtonCustom>
            )} */}
            {/* <Progress
              strokeLinecap='butt'
              percent={50}
              size={[450, 38.5]}
              format={(percent) => <h3 className={css.percent}>{percent}%</h3>}
              strokeColor={'#5624d0'}
              className={css.progress}
              showInfo={false}
            /> */}
            {previewUrl ? null : <ButtonCustom>画像をアップロード</ButtonCustom>}
          </Space.Compact>
        </Upload>
      </div>
    )
  }
  return (
    <Upload
      multiple={multiple || (!multiple && maxCount > 1) ? true : undefined}
      maxCount={maxCount}
      listType={listType}
      defaultFileList={[...fileList]}
      fileList={fileList}
      showUploadList={showUploadList}
      beforeUpload={handleBeforeUpload}
      // onDrop={}
    >
      <Space.Compact className={css.buttGr}>
        <Progress
          strokeLinecap='butt'
          percent={50}
          size={[490, 38.5]}
          format={(percent) => <h3 className={css.percent}>{percent}%</h3>}
          strokeColor={'#5624d0'}
          className={css.progress}
        />
        {showLoading && typeLoading === 'button' && (
          <ButtonCustom className={css.buttLoad}>ファイルが選択されていません</ButtonCustom>
        )}
        <ButtonCustom>画像をアップロード</ButtonCustom>
        {children}
      </Space.Compact>
    </Upload>
  )
}

export default UploadCustom
