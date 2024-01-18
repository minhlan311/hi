/* eslint-disable @typescript-eslint/no-explicit-any */
import assessmentApi from '@/apis/assessment.api'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import { AssessmentState } from '@/interface/assessment'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Col, Flex, Form, Input, Progress, Rate, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import style from './styles.module.scss'
type Props = {
  courseId: string
  userId: string
  checkEnrolls?: boolean
}

const FeedbackCourse = ({ courseId, userId, checkEnrolls }: Props) => {
  const navitage = useNavigate()
  const [openFeedback, setOpenFeedback] = useState<boolean>(false)
  const [assessmentData, setAssessmentData] = useState<AssessmentState[]>([])
  const { mutate, isSuccess } = useMutation({
    mutationFn: (body) => assessmentApi.createAssessment(body),
    onSuccess: (data) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Đã gửi đánh giá của bạn!',
      })
      form.resetFields()
      setOpenFeedback(false)
      setAssessmentData([data.data, ...assessmentData])
    },
  })

  const [page, setPage] = useState<number>(1)
  const { data: assessmentList, isLoading } = useQuery({
    queryKey: ['assessmentList', page],
    queryFn: () => {
      return assessmentApi.findAssessment({
        filterQuery: { targetId: courseId },
        options: { limit: 2, page, sort: { createdAt: -1, totalAssessments: -1 } },
      })
    },

    enabled: Boolean(courseId),
  })

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    if (!userId) {
      navitage('/login')
    }

    const resultArray = Object.entries(values)
      .filter(([key, value]) => key !== 'description' && value !== undefined)
      .map(([name, evaluate]) => ({ name, evaluate }))

    const payload = {
      targetModel: 'COURSE',
      targetId: courseId,
      description: values.description,
      evaluate: resultArray.length > 0 ? undefined : 5,
      detailedAssessments: resultArray.length > 0 ? resultArray : [],
    }

    mutate(payload as any)
  }

  const assessData = assessmentList?.data

  const { data: checkData } = useQuery({
    queryKey: ['checkData'],
    queryFn: () => {
      return assessmentApi.findAssessment({
        filterQuery: { targetId: courseId, createdById: userId },
      })
    },

    enabled: Boolean(courseId),
  })

  useEffect(() => {
    if (assessData && assessData.docs && assessData?.totalDocs > 0) {
      setAssessmentData([...assessmentData, ...assessData.docs])
    }
  }, [assessData])

  const check = checkData && checkData?.data.totalDocs > 0
  const detailedAssessments = [
    { name: 'mentor', label: 'Giảng viên' },
    { name: 'classify', label: 'Tư vấn xếp lớp' },
    { name: 'infrastructure', label: 'Cơ sở vật chất' },
    { name: 'students', label: 'Số lượng học viên' },
    { name: 'study-env', label: 'Môi trường HT' },
    { name: 'care', label: 'Quan tâm học viên' },
    { name: 'practice-skills', label: 'Thực hành kỹ năng ' },
    { name: 'tuitionFee', label: 'Hài lòng về học phí' },
    { name: 'self-improvement', label: 'Tiến bộ bản thân' },
    { name: 'ready', label: 'Sẵn sàng giới thiệu' },
  ]

  const { data: getAssessmentDetail } = useQuery({
    queryKey: ['getAssessmentDetail', isSuccess],
    queryFn: () => {
      return assessmentApi.getAssessmentDetail(courseId)
    },

    enabled: Boolean(courseId),
  })

  return (
    <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
      <Space direction='vertical' size='large' className={`sp100 ${style.fbCourseMain}`}>
        <Flex justify='end'>
          {!check && checkEnrolls && (
            <ButtonCustom icon={<FaStar />} onClick={() => setOpenFeedback(!openFeedback)} className={style.fbButt}>
              <Flex gap={5} align='center'>
                Viết đánh giá {openFeedback ? <FaMinus /> : <FaPlus />}
              </Flex>
            </ButtonCustom>
          )}
        </Flex>
        {openFeedback && (
          <Form form={form} layout='vertical' onFinish={onFinish}>
            <div className={style.fbContainer}>
              <Space direction='vertical'>
                <Row justify='space-between'>
                  {detailedAssessments.map((item, id) => (
                    <Col span={24} md={10} key={item.name}>
                      <Flex justify={id % 2 ? 'end' : 'start'}>
                        <Form.Item name={item.name} label={item.label} style={{ margin: 0 }}>
                          <Rate />
                        </Form.Item>
                      </Flex>
                    </Col>
                  ))}
                </Row>
                <Form.Item name='description'>
                  <Input.TextArea
                    placeholder='Nhập đánh giá của bạn...'
                    autoSize={{ minRows: 3 }}
                    showCount
                    maxLength={300}
                  />
                </Form.Item>

                <Form.Item>
                  <ButtonCustom onClick={() => form.submit()} className={`${style.fbButt} sp100`} size='large'>
                    Gửi đánh giá
                  </ButtonCustom>
                </Form.Item>
              </Space>
            </div>
          </Form>
        )}
        {assessmentData.length > 0 ? (
          <Space direction='vertical' size='large' className={'sp100'}>
            <div>
              <h3>Đánh giá tổng quan</h3>
              <Row gutter={[24, 0]}>
                {getAssessmentDetail?.data?.totalDetailedAverages?.map((item) => (
                  <Col span={24} md={12}>
                    <div>
                      <Progress percent={(item.evaluate / 5) * 100} strokeColor='var(--green)' showInfo={false} />
                      <Flex justify='space-between'>
                        <p>{detailedAssessments.find((i) => i.name === item.name)?.label}</p>
                        <b>{(item.evaluate / 5) * 10}</b>
                      </Flex>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <Space direction='vertical' className={'sp100'}>
              <Space>
                <h2>Đánh giá </h2> <b>({assessmentList?.data?.totalDocs} đánh giá)</b>
              </Space>
              {assessmentData.map((item) => (
                <div key={item._id}>
                  <Space direction='vertical'>
                    <Flex gap={12}>
                      <Avatar userData={item.userData} avtUrl={item.userData.avatarUrl} size={55} />
                      <Space direction='vertical'>
                        <Space>
                          <h3>{item.userData.fullName}</h3>
                          <Rate disabled value={item.totalAssessments} allowHalf style={{ fontSize: 16 }} />
                        </Space>
                        <p>
                          {item?.detailedAssessments?.map((r, id) => (
                            <span key={r._id}>
                              "<b>{detailedAssessments.find((i) => i.name === r.name)?.label}</b>"
                              {id < item.detailedAssessments.length - 1 && ', '}
                            </span>
                          ))}
                        </p>
                        <span>{item.description}</span>
                      </Space>
                    </Flex>
                  </Space>
                </div>
              ))}
            </Space>
          </Space>
        ) : (
          <EmptyCustom description='Không có đánh giá nào'></EmptyCustom>
        )}
        {assessData?.totalPages && assessData.totalPages > page && (
          <ButtonCustom
            onClick={() => {
              setPage((prev) => prev + 1)
            }}
            type='link'
            className={'link-2'}
          >
            <b>Xem tiếp {assessData?.totalDocs - assessmentData.length} đánh giá</b>
          </ButtonCustom>
        )}
      </Space>
    </LoadingCustom>
  )
}

export default FeedbackCourse
