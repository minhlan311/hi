/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { AppContext } from '@/contexts/app.context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlanEnum, planOptions } from '../constants/ultil'

type Props = {
  setCourseId: React.Dispatch<React.SetStateAction<string>>
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const CourseForm = ({ setCourseId, setCurrent }: Props) => {
  const { id } = useParams()
  const [typeCourse, setTypeCourse] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [typePlan, setTypePlan] = useState<PlanEnum>(PlanEnum.FREE)
  const [fileList, setFileList] = useState<any[]>([])
  const [fileVideo, setFileVideo] = useState<any[]>([])
  const [form] = Form.useForm()
  const { profile } = useContext(AppContext)

  function numberFormatter(value: any) {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const courseMutation = useMutation({
    mutationFn: (body) => (id ? courseApi.updateCourses(body) : courseApi.createCourses(body)),
    onSuccess: (data: any) => {
      setCourseId(data.data._id)
      setCurrent(1)
    },
    onError: (error: any) => {
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: error?.response?.data?.message,
      })
    },
  })

  const onFinish = (values: any) => {
    courseMutation.mutate({ ...values, coverVideo: values.coverVideo?.[0], mentorId: profile._id, id })
  }

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })
  const coursesList = categoriesData?.data?.docs?.find((item) => item.name === 'Khóa học')

  const subjectList = coursesList?.children?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })

  const cateSelect = coursesList?.children.find((item) => item._id === categoryId)

  const subCateList = cateSelect?.children.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })

  const { data: courseDetail, isLoading } = useQuery({
    queryKey: ['courseDetail', id],
    queryFn: () => courseApi.courseDetail(id as string),
    enabled: Boolean(id),
  })

  useEffect(() => {
    if (id && typeCourse !== courseDetail?.data?.typeCourse) {
      form.resetFields(['categoryId'])
    }
  }, [typeCourse])

  useEffect(() => {
    if (typePlan === PlanEnum.FREE) {
      form.setFieldValue('cost', null)
    }
  }, [typePlan])

  useEffect(() => {
    if (courseDetail && id) {
      form.setFieldsValue({ ...courseDetail.data })
      setTypeCourse(courseDetail.data.typeCourse)
      setCategoryId(courseDetail.data.categoryId)
      setTypePlan(courseDetail.data.plan as any)
      if (courseDetail.data.coverMedia)
        setFileList([
          {
            uid: courseDetail.data.coverMedia as string,
            name: courseDetail.data.coverMedia as string,
            status: 'done',
            url: courseDetail.data.coverMedia,
            thumbUrl: import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail.data.coverMedia,
          },
        ])

      if (courseDetail.data.coverVideo)
        setFileVideo([
          {
            uid: courseDetail.data.coverVideo,
            name: courseDetail.data.coverVideo,
            status: 'done',
            url: courseDetail.data.coverVideo,
            thumbUrl: import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail.data.coverVideo,
          },
        ])
    } else {
      form.resetFields()
    }
  }, [courseDetail, id])

  return (
    <Form form={form} onFinish={onFinish} disabled={isLoading && Boolean(id)} layout='vertical'>
      <Row justify='end'>
        <ButtonCustom onClick={() => form.submit()} type='primary'>
          Tiếp theo
        </ButtonCustom>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Row gutter={24}>
            <Col span={24} md={16}>
              <Form.Item
                label='Tiêu đề khóa học'
                name='name'
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề khóa học' }]}
              >
                <Input placeholder='Nhập tiêu đề khóa học' />
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
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
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item
                label='Giá'
                name='cost'
                rules={[{ required: typePlan === PlanEnum.PREMIUM, message: 'Nhập giá' }]}
              >
                <InputNumber
                  className='sp100'
                  formatter={numberFormatter}
                  min={1}
                  disabled={typePlan === PlanEnum.FREE}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item
                label='Dạng khóa học'
                name='typeCourse'
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề khóa học' }]}
              >
                <Select
                  placeholder='Chọn dạng khóa học'
                  onChange={(e) => {
                    setTypeCourse(e)
                  }}
                  options={[
                    { label: 'Khóa học thường', value: 'NORMAL' },
                    { label: 'Khóa học luyện thi', value: 'TEST' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item
                label='Môn học'
                name='categoryId'
                rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}
              >
                <Select
                  disabled={!typeCourse}
                  placeholder='Chọn môn học'
                  options={subjectList}
                  onChange={(e) => {
                    setCategoryId(e)
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item
                label='Danh mục'
                name='subCategoryId'
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề khóa học' }]}
              >
                <Select placeholder='Chọn danh mục' options={subCateList} disabled={!subCateList?.length} />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24} md={10}>
          <UploadCustom
            form={form}
            name='coverMedia'
            listType='picture-card'
            label='Ảnh khóa học'
            accessType='image/*'
            defaultFileList={fileList}
            showUploadList
          >
            <ButtonCustom size='large' className='sp100' style={{ height: 125 }} type='link'>
              Thêm ảnh
            </ButtonCustom>
          </UploadCustom>
        </Col>
        <Col span={24} md={14}>
          <UploadCustom
            form={form}
            name='coverVideo'
            listType='picture-card'
            uploadKey='attachment'
            label='Video giới thiệu'
            accessType='video/*'
            defaultFileList={fileVideo}
            dropArea
          >
            <ButtonCustom size='large' className='sp100' style={{ height: 125 }} type='link'>
              Thêm video
            </ButtonCustom>
          </UploadCustom>
        </Col>
      </Row>
      <TextAreaCustom name='descriptions' data={courseDetail?.data ? courseDetail.data : null} label='Nội dung' />
    </Form>
  )
}

export default CourseForm
