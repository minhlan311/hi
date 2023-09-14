/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { ENDPOINT } from '@/constants/endpoint'
import LevelComponent from './Level/Level'

type Props = {
  dataChild: (data: { educationType: string; link: string[] }) => void
}

const Certificate = ({ dataChild }: Props) => {
  const [link, setLink] = useState<string[]>([])
  const [data, setData] = useState<any>({})

  console.log(data, 'oooooooooooooooooo')

  useEffect(() => {
    setData({ ...data, link })
  }, [link])
  useEffect(() => {
    dataChild(data)
  }, [data])

  const props = {
    name: 'image',
    multiple: true,
    accept: '.png, .jpg, .jpge, .webp, .docx, .doc, .pdf',
    onChange(info: any) {
      if (info.file.status === 'done') {
        return info.file.response
      }
    },
    customRequest: async ({ onSuccess, onError, file }: any) => {
      const formData = new FormData()
      formData.append('image', file)
      try {
        const response = await axios.post(import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE, formData)
        const data = response.data
        if (data) setLink([...link, data.url])
        onSuccess(data)
      } catch (error) {
        onError(error)
      }
    }
  }

  const levels = (lv: string) => {
    setData({ ...data, educationType: lv })
  }

  return (
    <>
      <LevelComponent levels={levels} />
      <br />
      <h3>Bằng cấp chứng chỉ</h3>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
      </Upload>
    </>
  )
}

export default Certificate
