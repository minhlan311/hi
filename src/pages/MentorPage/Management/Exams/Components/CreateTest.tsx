/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import LoadingCustom from '@/components/LoadingCustom'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { ExamState } from '@/interface/exam'
import { useQuery } from '@tanstack/react-query'
import { Col, Form, Input, Row, Select } from 'antd'
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
  const [typePlan, setTypePlan] = useState('FREE')

  useEffect(() => {
    if (examData?._id) form.setFieldsValue(examData)
  }, [examData])

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

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      type: 'TEST',
      cost: parseInt(values?.cost),
      id: examData?._id,
    }

    testMutation.mutate(payload)
  }

  return (
    <LoadingCustom loading={typeAction === 'createTest' ? false : isLoading} tip='Vui lòng chờ...'>
      <Form onFinish={onFinish} layout='vertical' form={form} initialValues={{ plan: 'FREE' }}>
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
              <Select placeholder='Chọn khóa học' options={subjectList} />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name='plan'
              label='Loại phí'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng loại phí',
                },
              ]}
            >
              <Select
                placeholder='Chọn loại phí'
                options={[
                  {
                    value: 'FREE',
                    label: 'Miễn phí',
                  },
                  {
                    value: 'PREMIUM',
                    label: 'Có phí',
                  },
                ]}
                onChange={(e) => setTypePlan(e)}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              name='cost'
              label='Số tiền'
              rules={[
                {
                  required: typePlan === 'PREMIUM',
                  message: `Vui lòng nhập số tiền`,
                },
              ]}
            >
              <Input type='number' disabled={typePlan !== 'PREMIUM'} placeholder='Nhập số tiền'></Input>
            </Form.Item>
          </Col>
        </Row>
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
        <TextAreaCustom name='description' label='Chú thích' data={examData} />{' '}
      </Form>
    </LoadingCustom>
  )
}

export default CreateTest
