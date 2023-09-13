/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Button, Form, List, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PaperClipOutlined } from '@ant-design/icons'
import axios from 'axios'
import { ENDPOINT } from '@/constants/endpoint'

const MentorForm = ({ form }: any) => {
  const [educationType, setEducationType] = useState('')
  const education = []
  educations?.data?.forEach((o) =>
    education.push({
      value: o._id,
      label: o.name
    })
  )

  //   useEffect(() => {
  //     const payload = {
  //       filterQuery: {},
  //       options: {
  //         pagination: false
  //       }
  //     }
  //     dispatch(getEducationsRequest(payload))
  //   }, [])

  //   const educationInfo = educations?.data?.find((edu) => edu._id === educationId)

  //   useEffect(() => {
  //     setEducationType(educationInfo?.educationType)
  //   }, [educationInfo])

  const [loading, setLoading] = useState(false)

  const onPreview = async (file: any) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const props = {
    name: 'image',
    multiple: true,
    accept: '.png, .jpg, .jpge, .webp, .docx, .doc, .pdf',
    onChange(info: any) {
      if (info.file.status === 'uploading') {
        setLoading(true)
      }
      if (info.file.status === 'done') {
        setLoading(false)
        return info.file.response
      } else if (info.file.status === 'error') {
        setLoading(false)
      }
    },
    onPreview: onPreview,
    customRequest: async ({ onSuccess, onError, file }: any) => {
      const formData = new FormData()
      formData.append('certificate', file)
      formData.append('subjectIds', '')

      try {
        const response = await axios.post(import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_CERTIFICATES, formData)
        const data = response.data
        onSuccess(data)
      } catch (error) {
        onError(error)
      }
    }
  }
  return (
    <>
      <h3>Chứng chỉ liên quan</h3>
      <div>
        <Form.List
          name='certificate'
          initialValue={[
            {
              files: []
            }
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              <List
                dataSource={fields}
                renderItem={(key, name, ...field) => (
                  <List.Item
                    key={key}
                    style={{
                      padding: '0 0 10px 0'
                    }}
                    className='d-col-c'
                  >
                    <b
                      style={{
                        position: 'sticky',
                        top: 0,
                        background: 'white',
                        zIndex: 10,
                        margin: 0,
                        width: '100%',
                        padding: '10px 0'
                      }}
                    >
                      <h4>{name === 1 ? 'Bằng cấp - Chứng chỉ khác' : null}</h4>

                      {name === 0 ? 'Bằng cấp - Chứng chỉ Cao nhất' : 'Bằng cấp - Chứng chỉ ' + name}
                    </b>
                    <div style={{ width: '100%' }}>
                      <Form.Item
                        style={{
                          width: '100%'
                        }}
                        {...field}
                        label='Bằng cấp - Chứng chỉ liên quan'
                        name={[name, 'files']}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng upload chứng chỉ liên quan!'
                          }
                        ]}
                      >
                        <Upload {...props} listType='picture'>
                          <Button
                            icon={<PaperClipOutlined />}
                            style={{
                              width: '100%'
                            }}
                          >
                            {loading ? 'Đang tải lên...' : 'Tải lên'}
                          </Button>
                        </Upload>
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Button onClick={() => remove(name)} danger>
                          Xóa
                        </Button>
                      ) : null}
                    </div>
                  </List.Item>
                )}
              />

              <Form.Item>
                <Button onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  )
}
MentorForm.propTypes = {}
export default MentorForm
