/* eslint-disable @typescript-eslint/no-explicit-any */
import assessmentApi from '@/apis/assessment.api'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import { AssessmentState } from '@/interface/assessment'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Col, Flex, Form, Input, Rate, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './styles.module.scss'
type Props = {
  courseId: string
  userId: string
}

const FeedbackCourse = ({ courseId, userId }: Props) => {
  const [data, setData] = useState<AssessmentState[]>([])
  const navitage = useNavigate()
  useEffect(() => {
    setData([])
  }, [])

  const { mutate, isSuccess } = useMutation({
    mutationFn: (body) => assessmentApi.createAssessment(body),

    onSuccess: (data) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Đã gửi đánh giá của bạn!',
      })
      setData((prev) => [data.data, ...prev])
      form.resetFields()
    },
  })

  const [page, setPage] = useState<number>(1)
  const [value, setValue] = useState<number>(5)
  const { data: assessmentList, isLoading } = useQuery({
    queryKey: ['assessmentList', page],
    queryFn: () => {
      return assessmentApi.findAssessment({
        filterQuery: { targetId: courseId },
        options: { limit: 3, page: page, sort: { createdAt: -1, totalAssessments: -1 } },
      })
    },

    enabled: Boolean(courseId),
  })

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    if (!userId) {
      navitage('/login')
    }

    const payload = {
      targetModel: 'COURSE',
      targetId: courseId,
      description: values.description,
      evaluate: value,
      detailedAssessments: [],
    }

    mutate(payload as any)
  }

  const assessData = assessmentList?.data

  useEffect(() => {
    if (assessData && assessData?.totalDocs > 0) {
      setData((prev) => {
        if (assessData.docs) return [...(prev as any), ...assessData.docs]
        else return prev
      })
    }
  }, [assessData])

  const { data: checkData } = useQuery({
    queryKey: ['checkData', isSuccess],
    queryFn: () => {
      return assessmentApi.findAssessment({
        filterQuery: { targetId: courseId, createdById: userId },
      })
    },

    enabled: Boolean(courseId),
  })

  const check = checkData && checkData?.data.totalDocs > 0

  return (
    <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
      <Space direction='vertical' size='large' className={`sp100 ${style.fbCourseMain}`}>
        {!check && (
          <Form form={form} onFinish={onFinish}>
            <Form.Item name='description'>
              <Input.TextArea
                placeholder='Nhập đánh giá của bạn...'
                autoSize={{ minRows: 3 }}
                showCount
                maxLength={300}
              />
            </Form.Item>

            <Row gutter={[24, 24]} justify='space-between'>
              <Col span={24} md={12}>
                <Form.Item name='evaluate'>
                  <Rate onChange={(e) => setValue(e)} value={value} defaultValue={5} />
                </Form.Item>
              </Col>
              <Col span={24} md={4}>
                <Form.Item>
                  <ButtonCustom onClick={() => form.submit()} type='primary' className={'sp100'}>
                    Gửi phản hồi
                  </ButtonCustom>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {data.length > 0 ? (
          data.map((item) => (
            <Card key={item._id}>
              <Space direction='vertical'>
                <Space>
                  <Avatar userData={item.userData} avtUrl={item.userData.avatarUrl} />
                  <div>
                    <h3>{item.userData.fullName}</h3>
                    <Rate disabled value={item.totalAssessments} allowHalf style={{ fontSize: 16 }} />
                  </div>
                </Space>

                <span>{item.description}</span>
              </Space>
            </Card>
          ))
        ) : (
          <EmptyCustom description='Không có đánh giá nào'></EmptyCustom>
        )}
        {assessData && data.length < assessData.totalDocs && (
          <Flex justify='center'>
            <ButtonCustom onClick={() => setPage((prev) => prev++)}>Xem thêm</ButtonCustom>
          </Flex>
        )}
      </Space>
    </LoadingCustom>
  )
}

export default FeedbackCourse
