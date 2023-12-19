/* eslint-disable @typescript-eslint/no-explicit-any */
import assessmentApi from '@/apis/assessment.api'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import Header from '@/components/layout/Header/Header'
import { AssessmentState } from '@/interface/assessment'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Flex, Form, Input, Rate, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { BiHappyAlt } from 'react-icons/bi'
import { FaArrowRight, FaRegFaceSadTear } from 'react-icons/fa6'
import css from './styles.module.scss'

type Props = {
  userId: string
  meId: string
}

const Feedback = ({ userId, meId }: Props) => {
  const [data, setData] = useState<AssessmentState[]>([])
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries(['getAssessmentDetail'])
    },
  })

  const [page, setPage] = useState<number>(1)
  const { data: assessmentList, isLoading } = useQuery({
    queryKey: ['assessmentList', userId, page],
    queryFn: () => {
      return assessmentApi.findAssessment({
        filterQuery: { targetId: userId },
        options: { limit: 3, page: page, sort: { createdAt: -1, totalAssessments: -1 } },
      })
    },

    enabled: Boolean(userId),
  })

  const customIcons: Record<number, React.ReactNode> = {
    1: <FaRegFaceSadTear style={{ marginBottom: -3 }} />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <BiHappyAlt size={31} style={{ marginBottom: -6, marginLeft: -3 }} />,
  }

  const detailedAssessments = [
    { name: 'expertise', label: 'Kiến thức chuyên môn' },
    { name: 'skills', label: 'Kỹ năng giảng dạy' },
    { name: 'care', label: 'Quan tâm học viên' },
    { name: 'interact', label: 'Tương tác với lớp' },
    { name: 'creative', label: 'Sáng tạo giảng dạy' },
    { name: 'tuitionFee', label: 'Hài lòng về học phí' },
    { name: 'classify', label: 'Tư vấn xếp lớp' },
    { name: 'ready', label: 'Sẵn sàng giới thiệu' },
  ]

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const resultArray = Object.entries(values)
      .filter(([key, value]) => key !== 'description' && value !== undefined)
      .map(([name, evaluate]) => ({ name, evaluate }))

    const payload = {
      targetModel: 'USER',
      targetId: userId,
      description: values.description,
      detailedAssessments: resultArray,
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
        filterQuery: { targetId: userId, createdById: meId },
      })
    },

    enabled: Boolean(userId),
  })

  const check = checkData && checkData?.data.totalDocs > 0

  return (
    <Header background='var(--whiteBg)' padding={'25px 0 50px 0'} size='sm'>
      <h2>Đánh giá</h2>
      <div className={css.fbMain}>
        <Row gutter={[24, 24]}>
          <Col span={24} md={userId !== meId && !check ? 17 : 24}>
            <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
              <Space direction='vertical' size='large' className={'sp100'}>
                {data.length > 0 ? (
                  data.map((item) => (
                    <Card key={item._id} className={css.fbItem}>
                      <Space direction='vertical'>
                        <Space>
                          <Avatar userData={item.userData} avtUrl={item.userData.avatarUrl} />
                          <div>
                            <h3>{item.userData.fullName}</h3>
                            <Rate disabled value={item.totalAssessments} allowHalf style={{ fontSize: 16 }} />
                          </div>
                        </Space>
                        <h3>
                          {item.detailedAssessments.map(
                            (i, id) =>
                              `"${detailedAssessments.find((d) => d.name === i.name)?.label}" ${
                                item.detailedAssessments.length - 1 > id ? ', ' : '.'
                              }`,
                          )}
                        </h3>
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
          </Col>
          {userId !== meId && !check && (
            <Col span={24} md={7} className={css.form}>
              <Form form={form} onFinish={onFinish} layout='vertical'>
                <Row gutter={[24, 7]}>
                  {detailedAssessments.map((item) => (
                    <Col span={12} md={24} key={item.name}>
                      <Form.Item
                        name={item.name}
                        label={item.label}
                        style={{ margin: 0 }}
                        rules={[
                          {
                            validator: async (_, names) => {
                              if (!names || names.length < 1) {
                                return Promise.reject(new Error('Vui lòng lựa chọn đánh giá'))
                              }
                            },
                          },
                        ]}
                      >
                        <Rate character={({ index }: any) => customIcons[index + 1] as any} />
                      </Form.Item>
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item name='description'>
                      <Input.TextArea
                        autoSize={{ minRows: 6, maxRows: 6 }}
                        placeholder='Cảm nhận của bạn'
                        maxLength={350}
                        showCount
                      ></Input.TextArea>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <ButtonCustom type='primary' onClick={() => form.submit()} className={'sp100'}>
                      Gửi đánh giá <FaArrowRight size={14} style={{ marginLeft: 5 }} />
                    </ButtonCustom>
                  </Col>
                </Row>
              </Form>
            </Col>
          )}
        </Row>
      </div>
    </Header>
  )
}

export default Feedback
