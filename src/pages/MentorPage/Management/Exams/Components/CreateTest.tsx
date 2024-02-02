/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import LoadingCustom from '@/components/LoadingCustom'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { ExamState } from '@/interface/exam'
import { useQuery } from '@tanstack/react-query'
import { Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd'
import { FormInstance } from 'antd/lib'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  form: FormInstance
  testMutation: any
  examData: ExamState
  isLoading: boolean
}

const CreateTest = ({ form, testMutation, examData, isLoading }: Props) => {
  const location = useLocation()
  const typeAction = location.pathname.split('/')[3]
  const [testOptions, setTestOptions] = useState<
    {
      value: string
      label: string
    }[]
  >()

  const [examStatus, setExamStatus] = useState<boolean>(true)

  useEffect(() => {
    if (examData?._id) {
      setExamStatus(examData.status === 'ACTIVE')
      setSubjectName(subjectList?.find((item) => item.value === examData.categoryId)?.label)
      form.setFieldsValue(examData)
    }
  }, [examData])

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })

  const subjectList = categoriesData?.data?.docs
    ?.find((item) => item.name === 'Khóa học')
    ?.children?.map((sj) => {
      return {
        value: sj._id,
        label: sj.name,
      }
    })
  const [subjectName, setSubjectName] = useState<string>()
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
  }, [subjectName])

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      type: 'TEST',
      id: examData?._id,
      status: examStatus ? 'ACTIVE' : 'INACTIVE',
    }

    testMutation.mutate(payload)
  }

  return (
    <LoadingCustom loading={typeAction === 'createTest' ? false : isLoading} tip='Vui lòng chờ...'>
      <Form onFinish={onFinish} layout='vertical' form={form}>
        <Row gutter={24}>
          <Col span={24} md={examData ? 8 : 12}>
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

          <Col span={24} md={examData ? 8 : 12}>
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

          {examData && (
            <Col span={24} md={8}>
              <Form.Item name='status' label='Trạng thái'>
                <Switch checked={examStatus} onChange={() => setExamStatus(!examStatus)} />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={24}>
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
        </Row>
        <TextAreaCustom name='description' label='Chú thích' data={examData} />{' '}
      </Form>
    </LoadingCustom>
  )
}

export default CreateTest
