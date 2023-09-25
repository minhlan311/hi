/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import courseApi from '@/apis/course.api'
import { AppContext } from '@/contexts/app.context'
import { debounce } from '@/helpers/common'
import { CourseForm } from '@/types/course.type'
import { PlusOutlined } from '@ant-design/icons'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, Form, Input, InputNumber, Row, Select, TreeSelect, Upload, UploadProps, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import { UploadFile } from 'antd/lib'
import { useContext, useEffect, useState } from 'react'
import { PlanEnum, planOptions } from '../constants/ultil'
import './CreateCourse.scss'

export default function CreateCourse({ next, dataIdCouser }: any) {
  const [typePlan, setTypePlan] = useState<PlanEnum>(PlanEnum.FREE)
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()
  const { profile } = useContext(AppContext)

  const queryClient = useQueryClient()

  const myDataUser = queryClient.getQueryData<any>(['userDetail'])

  const dataMedia = fileList?.map((item) => item?.response?.url)

  useEffect(() => {
    form.setFieldValue('coverMedia', dataMedia[0])
    form.setFieldValue('descriptions', content)
    form.setFieldValue('mentorId', myDataUser?.data?._id)
  }, [fileList, dataMedia, content, myDataUser])

  function handleEditorChange(_event: any, editor: any) {
    const data = editor.getData()
    setContent(data)
  }

  const onFinish = (values: any) => {
    next(1)

    mutation.mutate({ ...values, mentorId: profile._id })
  }

  const onFinishFailed = () => {}

  const { data: subjectData } = useQuery({
    queryKey: ['categoryAll'],
    queryFn: () => categoryApi.getCategories(),
  })
  const subjectOptions = subjectData?.data?.docs?.map((user: any) => ({
    label: user.name,
    value: user._id,
  }))

  const mutation = useMutation({
    mutationFn: (body: CourseForm) => courseApi.createCourses(body),
    onSuccess: (data: any) => {
      dataIdCouser(data?.data?._id)
    },
  })

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

  const debouncedHandleEditorChange = debounce(handleEditorChange, 300)

  return (
    <div>
      <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={10}>
          <Col span={16}>
            <Row gutter={30}>
              <Col span={6}>
                <Form.Item
                  rules={[{ required: true, message: 'Vui lòng chọn loại khóa học' }]}
                  label='Loại'
                  name='plan'
                  initialValue={PlanEnum.FREE}
                >
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
                <Form.Item label='Số tiền' name='cost'>
                  <InputNumber min={1} max={10} disabled={typePlan === PlanEnum.FREE} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label='Tiêu đề khóa học'
                  name='name'
                  rules={[{ required: true, message: 'Vui lòng điền tiêu đề khóa học' }]}
                >
                  <Input placeholder='Nhập tiêu đề khoá học' allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={9}>
                <Form.Item
                  label='Tiêu đề khóa học'
                  name='categoryId'
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                  <TreeSelect
                    showSearch
                    style={{ width: '90%' }}
                    value={form.getFieldValue('categoryId')}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder='Chọn danh mục'
                    allowClear
                    treeDefaultExpandAll={false}
                    onChange={(newValue: string) => {
                      form.setFieldValue('categoryId', newValue)
                    }}
                    treeData={subjectOptions}
                  />
                </Form.Item>

                <Form.Item hidden name='mentorId'>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={9}></Col>
            </Row>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Ảnh khoá học'
              name='coverMedia'
              // rules={[{ required: true, message: 'Vui lòng chọn ảnh khóa học' }]}
              // type='upload-image-crop'
              //   cropOptions={propsImageCrop}
            >
              <ImgCrop
                aspect={2 / 1}
                cropShape='rect'
                rotationSlider
                modalCancel='Hủy'
                modalOk='Cắt'
                modalTitle='Chỉnh sửa hình ảnh'
              >
                <Upload {...propsImageDocuments} fileList={fileList}>
                  {fileList.length >= 1 ? null : <PlusOutlined />}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'Mô tả khóa học'} name='descriptions'>
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
