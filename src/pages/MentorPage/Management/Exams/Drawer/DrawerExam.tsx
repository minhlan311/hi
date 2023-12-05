/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { CategoryState } from '@/interface/category'
import { ExamState } from '@/interface/exam'
import { SuccessResponse } from '@/types/utils.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Col, Drawer, Form, Input, Radio, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  examData?: ExamState
  size?: string
}

const DrawerExam = (props: Props) => {
  const { open, setOpen, setLoading, examData, size } = props
  const navitage = useNavigate()
  const [imgUrl, setImgUrl] = useState<any>()
  const [action, setAction] = useState('create')
  const [form] = Form.useForm()
  const [testOptions, setTestOptions] = useState<
    {
      value: string
      label: string
    }[]
  >()

  useEffect(() => {
    if (examData) {
      setAction('update')
      form.setFieldsValue(examData)
    } else {
      setAction('create')
      form.resetFields()
    }
  }, [examData])

  const onCloseDrawer = () => {
    setOpen(false)
  }

  const queryClient = useQueryClient()

  const categoriesData = queryClient.getQueryData<{ data: SuccessResponse<CategoryState[]> }>(['categoriesList'])
  const subjectList = categoriesData?.data?.docs
    ?.find((item) => item.name === 'Khóa học')
    ?.children?.map((sj) => {
      return {
        value: sj._id,
        label: sj.name,
      }
    })

  const testList = categoriesData?.data?.docs?.find((item) => item.name === 'Luyện thi')

  const handleChange = (e: string) => {
    const subjectName = subjectList?.find((item) => item.value === e)?.label

    if (subjectName && testList) {
      const testData = testList?.children
        ?.find((item) => item.name === subjectName)
        ?.children?.map((sj) => {
          return {
            value: sj._id,
            label: sj.name,
          }
        })

      setTestOptions(testData)
    }
  }

  const { isLoading, mutate } = useMutation({
    mutationFn: (body) => (action === 'create' ? examApi.createExam(body) : examApi.putExam(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examFilter'] })

      openNotification({
        status: 'success',
        message: action === 'create' ? 'Tạo bộ đề thành công' : 'Cập nhật bộ đề thành công',
      })
      setOpen(false)

      form.resetFields()
    },

    onError: () => openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi xảy ra' }),
  })

  useEffect(() => {
    setLoading && setLoading(isLoading)
  }, [isLoading])

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      coverUrl: imgUrl ? imgUrl?.[0]?.url : undefined,
      id: examData?._id,
    }

    mutate(payload)
  }

  return (
    <div>
      <Drawer
        title={action === 'create' ? 'Thêm bộ đề' : 'Chỉnh sửa'}
        width={size}
        onClose={onCloseDrawer}
        open={open}
        extra={
          <Space>
            <ButtonCustom
              onClick={() => {
                setOpen(false)
                form.resetFields()
              }}
            >
              Hủy
            </ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary'>
              {action === 'create' ? 'Tạo bộ đề' : 'Cập nhật'}
            </ButtonCustom>
          </Space>
        }
      >
        <Form
          onFinish={onFinish}
          layout='vertical'
          form={form}
          initialValues={{
            plan: 'FREE',
            type: 'QUIZ',
          }}
        >
          <Form.Item
            name='type'
            label='Loại bộ đề'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn loại bộ đề',
              },
            ]}
          >
            <Radio.Group value={size}>
              <Radio.Button value='QUIZ'>Bài Quiz</Radio.Button>
              <Radio.Button
                value='TEST'
                onClick={() => {
                  navitage('/mentor/exams/createTest')
                }}
              >
                Bài Thi
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Row gutter={24}>
            <Col span={24} md={8}>
              <Form.Item
                name='categoryId'
                label='Chọn khóa học'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn khóa học',
                  },
                ]}
              >
                <Select placeholder='Chọn khóa học' options={subjectList} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item
                name='categoryIdDetail'
                label='Loại khóa học'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng loại khóa học',
                  },
                ]}
              >
                <Select placeholder='Chọn loại khóa học' options={testOptions} disabled={!testOptions?.length} />
              </Form.Item>
            </Col>

            <Col span={24} md={8}>
              <Form.Item
                name='skillName'
                label='Loại kỹ năng'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn loại kỹ năng',
                  },
                ]}
              >
                <Select
                  placeholder='Chọn loại kỹ năng'
                  mode='multiple'
                  options={[
                    {
                      value: 'READING',
                      label: 'Đọc',
                    },
                    {
                      value: 'LISTENING',
                      label: 'Nghe',
                    },
                    {
                      value: 'WRITING',
                      label: 'Viết',
                    },
                    {
                      value: 'SPEAKING',
                      label: 'Nói',
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name='name'
                label='Tiêu đề bộ đề'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tiêu đề bộ đề',
                  },
                ]}
              >
                <Input placeholder='Nhập tên tiêu đề bộ đề' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <TextAreaCustom name='description' label='Chú thích' data={examData} />
            </Col>
            <Col span={24}>
              <Form.Item name='coverUrl' label='Ảnh bộ đề'>
                <UploadCustom
                  uploadKey='image'
                  uploadQuality='medium'
                  cropBeforeUpload
                  dropArea
                  accessType='image/*'
                  callBackFileList={setImgUrl}
                  maxCount={1}
                  defaultFileList={
                    examData && examData.coverUrl
                      ? [{ name: examData.name as string, url: examData.coverUrl as string }]
                      : []
                  }
                ></UploadCustom>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerExam
