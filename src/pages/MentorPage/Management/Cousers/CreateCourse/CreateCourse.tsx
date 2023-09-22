import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Upload, UploadProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { EducationTypeEnum, PlanEnum, planOptions } from '../constants/ultil'
import { UploadFile } from 'antd/lib'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined } from '@ant-design/icons'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { RcFile } from 'antd/es/upload'
import { useQuery } from '@tanstack/react-query'
import subjectApi from '@/apis/subject.api'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './CreateCourse.scss'
import { debounce } from '@/helpers/common'

export default function CreateCourse() {
  const [typePlan, setTypePlan] = useState<PlanEnum>(PlanEnum.FREE)
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [educationType, setEducationType] = useState(EducationTypeEnum.UNIVERSITY)
  const [form] = Form.useForm()

  function handleEditorChange(event, editor) {
    const data = editor.getData()
    setContent(data)
  }

  console.log('render')

  const onFinish = (values: any) => {
    console.log(values, 'values')
  }

  const onFinishFailed = (values: any) => {
    console.log(values, 'values')
  }

  const { data: subjectData } = useQuery({
    queryKey: ['subject'],
    queryFn: () => subjectApi.getNews(),
  })
  const subjectOptions = subjectData?.data?.docs?.map((user: any) => ({
    label: user.name,
    value: user._id,
  }))

  console.log(content, 'contentcontent')

  useEffect(() => {
    if (form.getFieldValue('plan')) {
      setTypePlan(form.getFieldValue('plan') === PlanEnum.FREE ? PlanEnum.FREE : PlanEnum.PREMIUM)
    }
  }, [form.getFieldValue('plan')])

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error: any) => reject(error)
    })

  const propsImageDocuments: UploadProps = {
    name: 'image',
    multiple: true,
    maxCount: 1,
    listType: 'picture-card',
    action: import.meta.env.VITE_FILE_ENDPOINT + '/upload/large-image',
    onChange(info) {
      const { status } = info.file

      setFileList(info.fileList)

      if (status === 'done') {
        message.success(`Tải file ${info.file.name} thành công.`)
        form.setFieldValue('coverMedia', info)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    },
    async onPreview(file: UploadFile) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile)
      }
    },
  }

  const propsImageCrop = {
    aspect: 2 / 1,
    rotationSlider: true,
    cropShape: 'rect',
  }
  const debouncedHandleEditorChange = debounce(handleEditorChange, 800)

  return (
    <div>
      <p>Tạo khóa học</p>
      <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={10}>
          <Col span={16}>
            <Row gutter={30}>
              <Col span={6}>
                <Form.Item label='Loại' name='plan' initialValue={PlanEnum.FREE} required>
                  <Select
                    options={planOptions}
                    onChange={(value: PlanEnum) => {
                      setTypePlan(value)
                      form.setFieldValue('cost', undefined)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  label={'Số tiền'}
                  name='cost'
                  required={typePlan === PlanEnum.PREMIUM}
                  rules={[{ min: 1, message: 'Vui lòng nhập số tiền' }]}
                >
                  <Input type='number' disabled={typePlan === PlanEnum.FREE} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label='Tiêu đề khóa học' name='name' required>
                  <Input placeholder='Nhập tiêu đề khoá học' allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={9}>
                <Form.Item
                  label={'Chọn khóa học'}
                  name='subject'
                  //   type='select-debounce'
                  //   fetchOptions={fetchSubjects}
                  //   otherFilter={{ educationType: educationType }}
                  required
                >
                  <Select options={subjectOptions} placeholder='Chọn môn học' allowClear />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label={'Giảng viên'}
                  name='mentor'
                  //   options={mentorOptions}
                  //   type='select-debounce'
                  //   fetchOptions={fetchMentorList}
                  //   innerProps={{ placeholder: 'Chọn giảng viên', allowClear: true, showSearch: true }}
                  required
                >
                  {' '}
                  <Select placeholder='Chọn giảng viên' allowClear showSearch></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={6}>
                <Form.Item label={'Ngày khai giảng'} name='startDate'>
                  <DatePicker placeholder='DD/MM/YYYY' format={'DD/MM/YYYY'} allowClear />{' '}
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  label={'Schedules'}
                  name='schedules'
                  //   type='checkbox'
                  //   options={dateInWeek}
                  //   innerProps={{ placeholder: 'Schedules' }}
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Ảnh khoá học'
              name='coverMedia'
              // type='upload-image-crop'
              //   cropOptions={propsImageCrop}
            >
              <ImgCrop {...propsImageCrop} modalCancel='Hủy' modalOk='Cắt' modalTitle='Chỉnh sửa hình ảnh'>
                <Upload {...propsImageDocuments} fileList={fileList}>
                  {fileList.length >= 1 ? null : <PlusOutlined />}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'Mô tả khóa học'} name='editor-1'>
              <CKEditor editor={ClassicEditor} data={content} onChange={debouncedHandleEditorChange} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Tiếp theo
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
