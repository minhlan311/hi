/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { CategoryState } from '@/interface/category'
import { SuccessResponse } from '@/types/utils.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Col, Drawer, Form, Input, InputNumber, Radio, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  size?: string
  open: boolean
  examId: string | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setExamId: React.Dispatch<React.SetStateAction<string | null>>
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerExam = (props: Props) => {
  const { size, open, examId, setOpen, setExamId, setLoading } = props
  const navitage = useNavigate()
  const [form] = Form.useForm()
  const [testOptions, setTestOptions] = useState<
    {
      value: string
      label: string
    }[]
  >()
  const { data: examDetail } = useQuery({
    queryKey: ['examDetail', examId],
    queryFn: () => {
      return examApi.getExamDetail(examId!)
    },
    enabled: Boolean(examId),
  })

  const examData = examDetail?.data

  const [subjectName, setSubjectName] = useState<string>()
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

  useEffect(() => {
    form.resetFields()

    if (examData) {
      form.setFieldsValue({ ...examData, skillName: examData.skillName[0] })
      setSubjectName(subjectList?.find((item) => item.value === examData.categoryId)?.label)
    }
  }, [examData])

  const onCloseDrawer = () => {
    form.resetFields()
    setExamId(null)
    setOpen(false)
  }

  const testList = categoriesData?.data?.docs?.find((item) => item.name === 'Luyện thi')

  const handleChange = (e: string) => {
    setSubjectName(subjectList?.find((item) => item.value === e)?.label)
    form.resetFields(['categoryIdDetail'])
  }

  useEffect(() => {
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
  }, [subjectName, testList])

  const { isLoading, mutate } = useMutation({
    mutationFn: (body) => (!examData?._id ? examApi.createExam(body) : examApi.putExam(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examFilter'] })

      openNotification({
        status: 'success',
        message: !examData?._id ? 'Tạo bộ đề thành công' : 'Cập nhật bộ đề thành công',
      })
      onCloseDrawer()

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
      // coverUrl: imgUrl ? imgUrl?.[0]?.url : undefined,
      id: examData?._id,
      skillName: [values.skillName],
    }

    mutate(payload)
  }

  return (
    <div>
      <Drawer
        title={!examData?._id ? 'Thêm bộ đề' : 'Chỉnh sửa'}
        width={size}
        onClose={onCloseDrawer}
        open={open}
        extra={
          <Space>
            <ButtonCustom onClick={onCloseDrawer}>Hủy</ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary'>
              {!examData?._id ? 'Tạo bộ đề' : 'Cập nhật'}
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
                  showSearch
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

            <Col span={12}>
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

            <Col span={12}>
              <Form.Item
                name='duration'
                label='Thời gian làm bài (phút)'
                rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài' }]}
              >
                <InputNumber
                  min={1}
                  placeholder='Nhập thời gian làm bài'
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <TextAreaCustom name='description' label='Chú thích' data={examData} />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerExam
