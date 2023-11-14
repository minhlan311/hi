/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import courseApi from '@/apis/course.api'
import { AppContext } from '@/contexts/app.context'
import { CourseForm } from '@/types/course.type'
import { PlusOutlined } from '@ant-design/icons'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  TreeSelect,
  Upload,
  UploadProps,
  message,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import { UploadFile } from 'antd/lib'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlanEnum, planOptions } from '../constants/ultil'
import './CreateCourse.scss'

export default function CreateCourse({ next, dataIdCouser }: any) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [typeCourse, setTypeCourse] = useState('')
  const { id } = useParams()
  const [typePlan, setTypePlan] = useState<PlanEnum>(PlanEnum.FREE)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const myDataUser = queryClient.getQueryData<any>(['userDetail'])
  const dataMedia = fileList?.map((item) => item?.response?.url)

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  useEffect(() => {
    form.setFieldValue('coverMedia', dataMedia[0])

    form.setFieldValue('mentorId', myDataUser?.data?._id)
  }, [fileList, dataMedia, myDataUser])

  const editorRef = useRef('')

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData()
    // Cập nhật ref thay vì state để tránh re-render
    editorRef.current = data
  }

  const onFinish = (values: any) => {
    next(1)

    if (id) {
      mutationUpdate.mutate({ ...values, mentorId: profile._id, id: id, descriptions: editorRef.current })
    } else {
      mutation.mutate({ ...values, mentorId: profile._id, descriptions: editorRef.current })
    }
  }

  const onFinishFailed = () => {}

  const { data: subjectData } = useQuery({
    queryKey: ['categoryAll', typeCourse],
    queryFn: () =>
      categoryApi.getCategories({
        parentId: typeCourse === 'NORMAL' ? '650004a3dffb95727e9cb9fc' : '6500048ddffb95727e9cb9f1',
      }),
    enabled: !!typeCourse,
  })

  const { data: courseDetail, isLoading } = useQuery({
    queryKey: ['courseMentor'],
    queryFn: () => courseApi.getOneCourse(id!),
    enabled: id ? true : false,
  })

  console.log(courseDetail?.data?.typeCourse, 'courseDetail?.data?.typeCourse')

  useEffect(() => {
    if (courseDetail && id) {
      form.setFieldValue('plan', courseDetail?.data?.plan)
      form.setFieldValue('cost', courseDetail?.data?.cost)
      form.setFieldValue('name', courseDetail?.data?.name)
      form.setFieldValue('categoryId', courseDetail?.data?.categoryId)
      form.setFieldValue('coverMedia', courseDetail?.data?.coverMedia)
      form.setFieldValue('coverVideo', courseDetail?.data?.coverVideo)
      setTypeCourse(courseDetail?.data?.typeCourse)
      form.setFieldValue('typeCourse', courseDetail?.data?.typeCourse)
      editorRef.current = courseDetail?.data?.descriptions

      setFileList([
        {
          uid: 'áldkjalkdjalskj',
          name: 'ádacsac',
          url: import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail?.data?.coverMedia,
        },
      ])
    } else {
      form.resetFields()
    }
  }, [courseDetail, id, typeCourse])

  const subjectOptions = subjectData?.data?.docs?.map((category: any) => ({
    key: category?._id,
    title: category?.name,
    value: category?._id,
    children: category?.children?.map((item: any) => {
      return {
        key: item?._id,
        title: item?.name,
        value: item?._id,
        children: item?.children?.map((item1: any) => {
          return {
            key: item1?._id,
            title: item1?.name,
            value: item1?._id,
          }
        }),
      }
    }),
  }))

  const mutation = useMutation({
    mutationFn: (body: CourseForm) => courseApi.createCourses(body),
    onSuccess: (data: any) => {
      dataIdCouser(data?.data?._id)
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: (body: CourseForm) => courseApi.updateCourses(body),
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

  return (
    <div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>{' '}
      <Form
        disabled={!!isLoading && !!id}
        form={form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item>
          <Row>
            <Col span={22}></Col>
            <Col xs={24} xl={2}>
              <Button htmlType='submit' type='primary'>
                Tiếp theo
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Row gutter={10}>
          <Col xs={24} xl={16}>
            <Row gutter={30}>
              <Col xs={24} xl={6}>
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
              <Col xs={24} xl={3}>
                <Form.Item
                  label='Số tiền'
                  name='cost'
                  rules={[{ required: typePlan === PlanEnum.PREMIUM, message: 'Hãy nhập số tiền' }]}
                >
                  <InputNumber min={1} disabled={typePlan === PlanEnum.FREE} />
                </Form.Item>
              </Col>
              <Col xs={24} xl={9}>
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
              <Col xs={24} xl={9}>
                <Form.Item
                  label='Dạng khóa học'
                  name='typeCourse'
                  rules={[{ required: true, message: 'Vui lòng chọn dạng khóa học' }]}
                >
                  <Select
                    placeholder='Chọn dạng khóa học'
                    onChange={(value: 'NORMAL' | 'TEST' | '') => {
                      setTypeCourse(value)
                    }}
                    options={[
                      { label: 'Khóa học thường', value: 'NORMAL' },
                      { label: 'Khóa học luyện thi', value: 'TEST' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xl={10}>
                <Form.Item
                  label='Danh mục khóa học'
                  name='categoryId'
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                  <TreeSelect
                    disabled={typeCourse === ''}
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
              <Col xs={24} xl={9}>
                <Form.Item label='Video dưới thiệu' name='coverVideo'>
                  <Input placeholder='Nhập link video của bạn' allowClear />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={4}>
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
                <Upload {...propsImageDocuments} fileList={fileList} onPreview={handlePreview}>
                  {fileList.length >= 1 ? null : <PlusOutlined />}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label={'Mô tả khóa học'} name='descriptions'>
              <CKEditor editor={ClassicEditor} data={editorRef.current} onChange={handleEditorChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
